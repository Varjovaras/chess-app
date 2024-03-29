import { Board } from "../board/board";
import { Piece } from "./piece";
import { Square } from "../board/square";
import { ChessPieces, Color, ColorType, MoveSquares } from "../../types/types";

export class Knight extends Piece {
  override readonly color: ColorType;

  constructor(square: Square, color: ColorType) {
    super(square);
    this.color = color;
    if (color === Color.white) {
      this.name = ChessPieces.KNIGHT_WHITE;
    } else this.name = ChessPieces.KNIGHT_BLACK;
  }

  override move(startSq: Square, endSq: Square): boolean {
    if (startSq.getColor === endSq.getColor) {
      // console.log("Knight cannot move to same color square");
      return false;
    } else if (
      startSq.getPiece &&
      Knight.knightMoves(startSq, endSq) &&
      endSq.getPiece === null
    ) {
      return true;
    } else if (
      startSq.getPiece &&
      Knight.knightMoves(startSq, endSq) &&
      endSq.getPiece !== null
    ) {
      return Knight.capture(startSq, endSq);
    } else return false;
  }

  static capture(startSq: Square, endSq: Square): boolean {
    if (Piece.capturable(startSq, endSq)) {
      return true;
    } else {
      // console.log("Capturing with knight failed");
      return false;
    }
  }

  static knightMoves(startSq: Square, endSq: Square): boolean {
    return (
      (Math.abs(
        Board.findFileIndex(startSq.getFile) -
          Board.findFileIndex(endSq.getFile)
      ) === 1 &&
        Math.abs(startSq.getRank - endSq.getRank) === 2) ||
      (Math.abs(
        Board.findFileIndex(startSq.getFile) -
          Board.findFileIndex(endSq.getFile)
      ) === 2 &&
        Math.abs(startSq.getRank - endSq.getRank) === 1)
    );
  }

  override possibleMoves(board: Board): MoveSquares[] {
    let moves: MoveSquares[] = [];
    let startSq = this.square;
    if (startSq) {
      let rank = startSq.getRank;
      let file = startSq.getFile;

      let files = [2, 2, 1, 1, -1, -2, -2, -1];
      let ranks = [1, -1, 2, -2, -2, -1, 1, 2];

      for (let i = 0; i < 8; i++) {
        let nextFile = String.fromCharCode(file.charCodeAt(0) + files[i]!);
        let nextRank = rank + ranks[i]!;
        let endSq = board.getSquare(`${nextFile}${nextRank}`)?.getSquare;
        if (!endSq) break;
        moves.push({
          startSq: startSq,
          endSq: endSq,
        });
      }

      return moves;
    }
    throw new Error("Error making possible knight moves");
  }
}
