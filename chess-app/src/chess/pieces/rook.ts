import { Board } from "../board/board";
import { Piece } from "./piece";
import { Square } from "../board/square";
import { ChessPieces, Color, ColorType, MoveSquares } from "../../types/types";
import { fileAndRankChecker } from "../moveHelpers";

export class Rook extends Piece {
  override readonly color: ColorType;
  private castlingAllowed: boolean;

  constructor(square: Square, color: ColorType) {
    super(square);
    this.color = color;
    this.castlingAllowed = true;
    if (color === Color.white) {
      this.name = ChessPieces.ROOK_WHITE;
    } else {
      this.name = ChessPieces.ROOK_BLACK;
    }
  }

  isCastlingAllowed() {
    return this.castlingAllowed;
  }

  castled(sq: Square) {
    this.castlingAllowed = false;
    this.setSquare(sq);
  }

  override move(startSq: Square, endSq: Square, board: Board): boolean {
    const isHorizontal = startSq.getRank === endSq.getRank;
    //capture logic
    if (startSq.getPiece && endSq.getPiece !== null) {
      if (Piece.capturable(startSq, endSq)) {
        return this.rookMoveHelper(startSq, endSq, board, isHorizontal);
      } else {
        console.log("Capturing with rook failed");
        return false;
      }
    }
    return this.rookMoveHelper(startSq, endSq, board, isHorizontal);
  }

  rookMoveHelper(
    startSq: Square,
    endSq: Square,
    board: Board,
    isHorizontal: boolean
  ): boolean {
    const isMoveSuccessful = isHorizontal
      ? Piece.horizontalMove(startSq, endSq, board)
      : Piece.verticalMove(startSq, endSq, board);

    if (isMoveSuccessful) {
      this.castlingAllowed = true;
    }
    return isMoveSuccessful;
  }

  override possibleMoves(board: Board): MoveSquares[] {
    let moves: MoveSquares[] = [];
    const startSq = this.square;
    if (startSq) {
      const files = [1, -1, 0, 0];
      const ranks = [0, 0, 1, -1];

      moves = fileAndRankChecker(startSq, files, ranks, board);

      // for (let i = 0; i < 4; i++) {
      //     for (let j = 0; j < 7; j++) {
      //         const nextFile = String.fromCharCode(
      //             file.charCodeAt(0) + files[i] + j * files[i]
      //         );
      //         const nextRank = rank + ranks[i] + j * ranks[i];
      //         const endSq = board.getSquare(`${nextFile}${nextRank}`);
      //
      //         if (!endSq) break;
      //         moves.push({
      //             startSq: startSq,
      //             endSq: endSq,
      //         });
      //     }
      //}

      return moves;
    }
    throw new Error("Error making possible rook moves");
  }
}
