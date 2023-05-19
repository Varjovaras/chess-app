import { ColorType, MovePiece, ChessPieces } from "../types/types";
import { Board } from "./board/board";
import { Square } from "./board/square";
import MoveHelper from "./moveHelpers";
import { Pawn } from "./pieces/pawn";
import { Piece } from "./pieces/piece";

export default class Check {
  private _board: Board;
  private _turnColor: ColorType;
  private _latestMove?: MovePiece;

  constructor(turn: ColorType, board: Board, move?: MovePiece) {
    this._turnColor = turn;
    this._board = board;
    this._latestMove = move;
  }

  get getTurnColor() {
    return this._turnColor;
  }

  get getLatestMove() {
    return this._latestMove;
  }

  get getBoard() {
    return this._board;
  }

  doesMovingRemoveCheck(
    startSq: Square,
    endSq: Square,
    pieceName?: string
  ): boolean {
    const tempBoard: Board = this.makeTemporaryBoard();
    const startSqTempBoard = tempBoard.getSquare(startSq.getSquareName);
    const endSqTempBoard = tempBoard.getSquare(endSq.getSquareName);
    if (!startSqTempBoard || !endSqTempBoard) return false;

    this.movePieceOnTemporaryBoard(
      startSqTempBoard,
      endSqTempBoard,
      tempBoard,
      pieceName
    );

    return startSq.getPiece?.getColor === "WHITE"
      ? !tempBoard.isWhiteKingInCheck()
      : !tempBoard.isBlackKingInCheck();
  }

  doesMovePutYouIntoCheck(
    startSq: Square,
    endSq: Square,
    pieceName?: string
  ): boolean {
    const tempBoard: Board = this.makeTemporaryBoard();
    const startSqTempBoard = tempBoard.getSquare(startSq.getSquareName);
    const endSqTempBoard = tempBoard.getSquare(endSq.getSquareName);
    if (!startSqTempBoard || !endSqTempBoard) return false;

    this.movePieceOnTemporaryBoard(
      startSqTempBoard,
      endSqTempBoard,
      tempBoard,
      pieceName
    );

    return startSq.getPiece?.getColor === "WHITE"
      ? !tempBoard.isWhiteKingInCheck()
      : !tempBoard.isBlackKingInCheck();
  }

  private movePieceOnTemporaryBoard(
    startSq: Square,
    endSq: Square,
    board: Board,
    pieceName?: string
  ): void {
    let isLegalMove = false;
    let promotedPiece: Piece | boolean = false;
    const startSqPiece = startSq.getPiece;
    if (!startSqPiece || !endSq) return;
    if (startSqPiece.getColor !== this.getTurnColor) {
      console.log("Wrong players turn");
      return;
    }
    const move = this.getLatestMove;

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
        promotedPiece = startSqPiece.promote(startSq, endSq, board, pieceName);
      } else if (move && MoveHelper.enPassantHelper(startSq, endSq, move)) {
        isLegalMove = startSqPiece.move(startSq, endSq, board, move);
        board.getSquareById(move.endSq.getSquare.getId)?.setPiece(null);
      } else isLegalMove = startSqPiece.move(startSq, endSq, board);
    } else isLegalMove = startSqPiece.move(startSq, endSq, board);

    if (promotedPiece instanceof Piece) {
      endSq.setPiece(promotedPiece);
      endSq.setSquareForPiece(endSq);
      this.handleTempPieces(startSq, endSq);
      startSq.setPiece(null);
      return;
    }

    if (isLegalMove) {
      this.handleTempPieces(startSq, endSq);
      return;
    }
    console.log("fakemoveError");
    throw new Error(" fakemoveError");
  }

  private handleTempPieces(startSq: Square, endSq: Square): void {
    const startSqPiece = startSq.getPiece;
    endSq.setPiece(startSqPiece!);
    const endSquareToPiece = endSq;
    endSq.setSquareForPiece(endSquareToPiece);
    startSq.setPiece(null);
  }

  private makeTemporaryBoard(): Board {
    const tempBoard: Square[] = [];

    for (let i = 0; i < 64; i++) {
      const sq = this._board.getSquareById(i);
      if (!sq) {
        throw new Error("No 64 squares");
      }
      const tempSq = new Square(
        sq.getFile,
        sq.getRank,
        sq.getSquareName,
        sq.getColor,
        sq.getId,
        sq.getPiece
      );
      tempBoard.push(tempSq);
    }

    const newBoard = new Board();
    newBoard.setBoard(tempBoard);
    return newBoard;
  }
}
