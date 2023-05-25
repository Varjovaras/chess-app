import { Board } from "../board/board";
import { Piece } from "./piece";
import { Square } from "../board/square";
import { ChessPieces, Color, ColorType, MoveSquares } from "../../types/types";

export class Queen extends Piece {
  override readonly color: ColorType;

  constructor(square: Square, color: ColorType) {
    super(square);
    this.color = color;
    if (color === Color.white) {
      this.name = ChessPieces.QUEEN_WHITE;
    } else {
      this.name = ChessPieces.QUEEN_BLACK;
    }
  }

  override move(startSq: Square, endSq: Square, board: Board): boolean {
    if (startSq.getPiece && endSq.getPiece !== null) {
      if (Piece.capturable(startSq, endSq)) {
        return Queen.queenMoves(startSq, endSq, board);
      } else {
        console.log("Capturing with queen failed");
        return false;
      }
    }
    return Queen.queenMoves(startSq, endSq, board);
  }

  static queenMoves(startSq: Square, endSq: Square, board: Board): boolean {
    let fileDiff = Math.abs(
      Board.findFileIndex(startSq.getFile) - Board.findFileIndex(endSq.getFile)
    );
    let rankDiff = Math.abs(startSq.getRank - endSq.getRank);
    if (fileDiff === rankDiff && startSq !== endSq) {
      return Piece.isDiagonal(startSq, endSq, board);
    } else if (fileDiff === 0) {
      return Piece.verticalMove(startSq, endSq, board);
    } else if (rankDiff === 0) {
      return Piece.horizontalMove(startSq, endSq, board);
    } else return false;
  }

  override possibleMoves(board: Board): MoveSquares[] {
    let moves: MoveSquares[] = [];
    let startSq = this.square;
    if (startSq) {
      let rookMoveFiles = [1, -1, 0, 0];
      let rookMoveRanks = [0, 0, 1, -1];
      let bishopMoveFiles = [1, 1, -1, -1];
      let bishopMoveRanks = [1, -1, 1, -1];

      moves = moves.concat(
        Queen.queenMoveHelper(rookMoveFiles, rookMoveRanks, board, startSq),
        Queen.queenMoveHelper(bishopMoveFiles, bishopMoveRanks, board, startSq)
      );
      return moves;
    }
    throw new Error("Error making possible queen moves");
  }

  static queenMoveHelper(
    k: number[],
    t: number[],
    board: Board,
    startSq: Square
  ) {
    let moves: MoveSquares[] = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 7; j++) {
        let rank = startSq.getRank;
        let file = startSq.getFile;
        let nextFile = String.fromCharCode(
          file.charCodeAt(0) + k[i]! + j * k[i]!
        );
        let nextRank = rank + t[i]! + j * t[i]!;
        let endSq = board.getSquare(`${nextFile}${nextRank}`);

        if (!endSq) break;
        moves.push({
          startSq: startSq,
          endSq: endSq,
        });
      }
    }
    return moves;
  }
}
