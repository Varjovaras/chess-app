import { MovePiece, MoveSquares } from "../../types/types";
import { Board } from "../board/board";
import TemporaryBoard from "../board/temporaryBoard";

export default class Checkmate {
  static isPositionCheckmate(board: Board, latestMove: MovePiece): boolean {
    let squaresWithPieces = board.getSquaresWithPieces;
    let moves: MoveSquares[] = [];
    for (const sq of squaresWithPieces) {
      if (!sq.getPiece) continue;
      moves = moves.concat(sq.getPiece.possibleMoves(board));
    }

    for (const move of moves) {
      const tempBoard: Board = TemporaryBoard.makeTemporaryBoard(board);
      const startSqTempBoard = tempBoard.getSquare(move.startSq.getSquareName);
      const endSqTempBoard = tempBoard.getSquare(move.endSq.getSquareName);
      if (
        !startSqTempBoard ||
        !endSqTempBoard ||
        !startSqTempBoard.getPiece?.getColor
      )
        continue;
      try {
        TemporaryBoard.movePieceOnTemporaryBoard(
          startSqTempBoard,
          endSqTempBoard,
          tempBoard,
          startSqTempBoard.getPiece.getColor,
          latestMove
          // pieceName
        );
        return true;
      } catch {
        continue;
      }
    }
    return true;
  }
}
