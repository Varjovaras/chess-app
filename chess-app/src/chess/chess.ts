import { Board } from "./board/board";
import { Piece } from "./pieces/piece";
import { Queen } from "./pieces/queen";
import { Rook } from "./pieces/rook";
import { Square } from "./board/square";
import { Bishop } from "./pieces/bishop";
import { King } from "./pieces/king";
import { Knight } from "./pieces/knight";
import { Pawn } from "./pieces/pawn";
import { ChessPieces, Color, ColorType, MovePiece } from "../types/types";
import MoveHelper from "./move/moveHelpers";
import Check from "./move/check";
import Checkmate from "./move/checkmate";

export default class Chess {
  private _board: Board;
  private _moves: MovePiece[];
  private _turnNumber: number;
  private _checkmate: boolean;

  static STARTING_POSITION =
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

  constructor(moves?: MovePiece[]) {
    this._moves = moves ? moves : [];
    this._turnNumber = 0;
    this._board = new Board();
    this._checkmate = false;
  }

  get getBoard() {
    return this._board;
  }

  get getMoves() {
    return this._moves;
  }

  get getTurnNumber() {
    return this._turnNumber;
  }

  get getCheckmate() {
    return this._checkmate;
  }

  private incrementMoveNumber() {
    this._turnNumber++;
  }

  getMovesAsString(): string[] {
    let moves = this.getMoves;
    let strArr: string[] = [];

    moves.forEach((move) => {
      strArr.push(`${move.startSq.getSquareName} ${move.endSq.getSquareName}`);
    });
    return strArr;
  }

  checkTurn(): ColorType {
    return this.getTurnNumber % 2 === 0 ? Color.white : Color.black;
  }

  getLatestMove(): MovePiece | undefined {
    if (this._moves.length > 0) {
      return this._moves[this._moves.length - 1];
    }
    return undefined;
  }

  whoseTurn(): string {
    return this.checkTurn() === Color.white ? "WHITE" : "BLACK";
  }

  //start function for move
  move(startSquare: string, endSquare: string, pieceName?: string): void {
    if (this.getCheckmate) {
      console.log("Game is over");
      return;
    }

    startSquare = startSquare.trim();
    endSquare = endSquare.trim();

    if (startSquare === endSquare) {
      console.log("Same starting and ending square");
      console.log("Didn't move the piece");
    }

    let startSq = this._board.getSquare(startSquare);
    let endSq = this._board.getSquare(endSquare);

    if (!startSq || !endSq) {
      console.log("No starting square or ending square while making a move");
    }

    if (!startSq.getPiece) {
      console.log("No piece on the starting square");
      return;
    }
    const inCheck: boolean =
      startSq.getPiece.getColor === "WHITE"
        ? this._board.isWhiteKingInCheck()
        : this._board.isBlackKingInCheck();
    if (inCheck) this.checkHelper(startSq, endSq);
    else this.movePiece(startSq, endSq, pieceName);
  }

  checkHelper(startSq: Square, endSq: Square, pieceName?: string) {
    if (!startSq.getPiece || !endSq) return;
    const piece = startSq.getPiece;
    if (piece instanceof King) {
      piece.castlingCheckHelper(startSq, endSq, this._board);
    }
    const latestMove = this.getLatestMove;
    if (!latestMove) return;
    const check = new Check(
      this.checkTurn(),
      this._board,
      this.getLatestMove()
    );
    const notInCheckAnymore = check.inCheckAfterMove(startSq, endSq, pieceName);
    if (notInCheckAnymore) {
      this.movePiece(startSq, endSq, pieceName);
    }
  }

  private movePiece(startSq: Square, endSq: Square, pieceName?: string): void {
    let isLegalMove: boolean = false;
    let promotedPiece: Piece | boolean = false;
    let startSqPiece = startSq.getPiece;
    if (!startSqPiece || !endSq) return;
    if (startSqPiece.getColor !== this.checkTurn()) {
      console.log("Wrong players turn");
      return;
    }
    let move = this.getLatestMove();

    const check = new Check(
      this.checkTurn(),
      this._board,
      this.getLatestMove()
    );

    const areYouInCheckAfterMove = !check.inCheckAfterMove(
      startSq,
      endSq,
      pieceName
    );

    if (areYouInCheckAfterMove) {
      // console.log("Move puts you into check. Abandoning move");
      return;
    }

    if (startSqPiece instanceof Pawn) {
      if (
        (pieceName &&
          startSq?.getRank === 7 &&
          endSq?.getRank === 8 &&
          startSqPiece.getName === ChessPieces.PAWN_WHITE) ||
        (pieceName &&
          startSq?.getRank === 2 &&
          endSq?.getRank === 1 &&
          startSqPiece.getName === ChessPieces.PAWN_BLACK)
      ) {
        promotedPiece = startSqPiece.promote(
          startSq,
          endSq,
          this._board,
          pieceName
        );
        endSq.setPiece(promotedPiece);
        this._moves.push({
          startSq: startSq,
          endSq: endSq,
          startSquarePiece: promotedPiece,
        });
        this.incrementMoveNumber();
        startSq.setPiece(null);
        return;
      } else if (move && MoveHelper.enPassantHelper(startSq, endSq, move)) {
        isLegalMove = startSqPiece.move(startSq, endSq, this._board, move);
        this._board.getSquareById(move.endSq.getSquare.getId)?.setPiece(null);
      } else isLegalMove = startSqPiece.move(startSq, endSq, this._board);
    } else isLegalMove = startSqPiece.move(startSq, endSq, this._board);

    if (isLegalMove) {
      this.handleMove(startSq, endSq);
      return;
    }

    throw new Error(
      "Starting square is invalid, no piece to be found or ending square is invalid, inputted invalid move or a piece is on the way"
    );
  }

  private handleMove(startSq: Square, endSq: Square): void {
    if (
      startSq.getPiece instanceof King &&
      startSq.getFile === "e" &&
      (endSq.getFile === "c" || endSq.getFile === "g")
    ) {
      this.castling(endSq);
    }
    this.addMove(startSq, endSq);
    this.handlePieces(startSq, endSq);
    this.incrementMoveNumber();
  }

  private addMove(startSq: Square, endSq: Square): void {
    // console.log(
    //   "Adding move: " + startSq.getSquareName + " " + endSq.getSquareName
    // );
    if (startSq.getPiece) {
      this._moves.push({
        startSq: startSq,
        endSq: endSq,
        startSquarePiece: startSq.getPiece,
      });
    }
  }

  private castling(endSq: Square) {
    if (endSq.getSquareName === "g1") {
      this.castlingRookHelper("h1", "f1");
    }
    if (endSq.getSquareName === "c1") {
      this.castlingRookHelper("a1", "d1");
    }
    if (endSq.getSquareName === "g8") {
      this.castlingRookHelper("h8", "f8");
    }
    if (endSq.getSquareName === "c8") {
      this.castlingRookHelper("a8", "d8");
    }
  }

  private castlingRookHelper(rookStartSq: string, rookEndSq: string) {
    let rook = this._board.getSquare(rookStartSq)?.getPiece;
    if (!rook || !(rook instanceof Rook))
      throw new Error("Castling cannot be completed without a rook");
    this._board.getSquare(rookEndSq)?.setPiece(rook);
    rook.castled(this._board.getSquare("f1")!);
    this._board.getSquare(rookStartSq)?.setPiece(null);
  }

  private handlePieces(startSq: Square, endSq: Square): void {
    let startSqPiece = startSq.getPiece;
    if (!startSqPiece) return;
    endSq.setPiece(startSqPiece);
    let endSquareToPiece = endSq;
    endSq.setSquareForPiece(endSquareToPiece);
    startSq.setPiece(null);
    if (this._board.isWhiteKingInCheck() || this._board.isBlackKingInCheck()) {
      const latestMove = this.getLatestMove();
      if (!latestMove) return;
      this._checkmate = Checkmate.isPositionCheckmate(this._board, latestMove);
    }
  }

  //initialization or promoting
  putPieceOnBoard(square: string, piece: Piece): void {
    let sq = this._board.getSquare(square);

    if (sq) {
      sq.setPiece(piece);
    } else throw new Error("No square found");
  }

  algebraicNotation(): string[] {
    let returnArray: string[] = [];
    let s: string = "";

    for (const move of this.getMoves) {
      let startSqPiece =
        move.startSq.getPiece &&
        move.startSq.getPiece.getFirstLetter!.toLowerCase() !== "p"
          ? move.startSq.getPiece.getFirstLetter
          : "";

      let piece = move.endSq.getPiece ? move.endSq.getPiece.getFirstLetter : "";

      s =
        s +
        `${startSqPiece}${move.startSq.getSquareName} ${
          move.endSq.getSquareName
        }${piece!.toUpperCase()}`;

      returnArray = returnArray.concat(s);
      s = "";
    }

    return returnArray;
  }

  fen(fen: string): void {
    let tokens = fen.split(/\s+/);
    let pieces = tokens[0]!.split("/");

    //initialize
    this._moves = [];
    this._turnNumber = 0;
    this._board.getBoard.forEach((s) => {
      s.setPiece(null);
    });
    this.analyzeFen(pieces);
  }

  private analyzeFen(pieces: string[]) {
    for (let i = 0; i < 8; i++) {
      let str = pieces[i];
      if (str!.length !== 8) {
        //todo non starting position
      } else if (str !== "8") {
        //if str is 8 it's an empty row
        this.fenHelper(i, str!);
      }
    }
  }

  private fenHelper(i: number, str: string) {
    //i is row
    //j is row times 8
    //k iterates files
    for (let j = i * 8, k = 0; j < i * 8 + 8; j++, k++) {
      let sq = this._board.getSquareById(j);
      if (sq) {
        let piece = Chess.fenPieces(str[k]!, sq);

        if (piece !== null) {
          this.putPieceOnBoard(sq.getSquareName, piece);
        }
      }
    }
  }

  static fenPieces(s: string, sq: Square): Piece | null {
    switch (s) {
      case "p":
        return new Pawn(sq, Color.white);
      case "P":
        return new Pawn(sq, Color.black);
      case "n":
        return new Knight(sq, Color.white);
      case "N":
        return new Knight(sq, Color.black);
      case "b":
        return new Bishop(sq, Color.white);
      case "B":
        return new Bishop(sq, Color.black);
      case "r":
        return new Rook(sq, Color.white);
      case "R":
        return new Rook(sq, Color.black);
      case "q":
        return new Queen(sq, Color.white);
      case "Q":
        return new Queen(sq, Color.black);
      case "k":
        return new King(sq, Color.white);
      case "K":
        return new King(sq, Color.black);
      default:
        return null;
    }
  }

  emptyBoard(): void {
    this._moves = [];
    this._turnNumber = 0;
    this._board.getBoard.forEach((s) => {
      s.setPiece(null);
    });
  }

  getSquareFromBoard(s: string): Square {
    let sq = this._board.getSquare(s);
    if (!sq) throw new Error("Square " + sq + " not found");
    return sq;
  }

  startingPosition(): void {
    this._checkmate = false;
    this.fen(Chess.STARTING_POSITION);
  }
}
