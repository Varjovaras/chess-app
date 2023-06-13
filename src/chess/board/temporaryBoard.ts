import { ChessPieces, ColorType, MoveDetails } from "../../types/types";
import MoveHelper from "../move/moveHelpers";
import { Pawn } from "../pieces/pawn";
import { Piece } from "../pieces/piece";
import { Board } from "./board";
import { Square } from "./square";

export default class TemporaryBoard {
  private _board: Board;

  constructor(board: Board) {
    this._board = this.makeTemporaryBoard(board);
  }

  get getBoard() {
    return this._board;
  }

  makeTemporaryBoard(board: Board): Board {
    const tempBoard: Square[] = [];

    for (let i = 0; i < 64; i++) {
      const sq = board.getSquareById(i);
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

  movePieceOnTemporaryBoard(
    startSq: Square,
    endSq: Square,
    turnColor: ColorType,
    latestMove?: MoveDetails,
    pieceName?: string
  ): void {
    let isLegalMove = false;
    let promotedPiece: Piece | boolean = false;
    const startSqPiece = startSq.getPiece;
    if (!startSqPiece || !endSq) return;
    if (startSqPiece.getColor !== turnColor) {
      console.log("Wrong players turn");
      return;
    }
    const move = latestMove;

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
        startSq.setPiece(null);
        return;
      } else if (move && MoveHelper.enPassantHelper(startSq, endSq, move)) {
        isLegalMove = startSqPiece.move(startSq, endSq, this._board, move);
        this._board.getSquareById(move.endSq.getSquare.getId)?.setPiece(null);
      } else {
        isLegalMove = startSqPiece.move(startSq, endSq, this._board);
      }
    } else isLegalMove = startSqPiece.move(startSq, endSq, this._board);

    if (isLegalMove) {
      this.handleTempPieces(startSq, endSq);
      return;
    }
    throw new Error(" fakemoveError");
  }

  handleTempPieces(startSq: Square, endSq: Square): void {
    const startSqPiece = startSq.getPiece;
    if (!startSqPiece) return;
    endSq.setPiece(startSqPiece);
    const endSquareToPiece = endSq;
    endSq.setSquareForPiece(endSquareToPiece);
    startSq.setPiece(null);
  }
}
