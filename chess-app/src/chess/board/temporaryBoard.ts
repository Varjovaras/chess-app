import { ChessPieces, ColorType, MovePiece } from "../../types/types";
import MoveHelper from "../move/moveHelpers";
import { Pawn } from "../pieces/pawn";
import { Piece } from "../pieces/piece";
import { Board } from "./board";
import { Square } from "./square";

export default class TemporaryBoard {
  static makeTemporaryBoard(board: Board): Board {
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

  static movePieceOnTemporaryBoard(
    startSq: Square,
    endSq: Square,
    board: Board,
    turnColor: ColorType,

    latestMove?: MovePiece,
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
    throw new Error(" fakemoveError");
  }

  static handleTempPieces(startSq: Square, endSq: Square): void {
    const startSqPiece = startSq.getPiece;
    endSq.setPiece(startSqPiece!);
    const endSquareToPiece = endSq;
    endSq.setSquareForPiece(endSquareToPiece);
    startSq.setPiece(null);
  }
}
