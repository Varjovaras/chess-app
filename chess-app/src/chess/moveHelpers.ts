import { Board } from "./board/board";
import { Square } from "./board/square";
import { MovePiece, MoveSquares } from "../types/types";

export const knightMoveHelper = (sq: Square, board: Board): number[] => {
  const endSquares: number[] = [];
  const files: number[] = [2, 2, 1, 1, -1, -2, -2, -1];
  const ranks: number[] = [1, -1, 2, -2, -2, -1, 1, 2];
  if (!sq) return [];
  const file = sq.getFile;
  const rank = sq.getRank;
  for (let i = 0; i < 8; i++) {
    const nextFile = String.fromCharCode(file.charCodeAt(0) + files[i]!);
    const nextRank = rank + ranks[i]!;
    const sq = board.getSquare(`${nextFile}${nextRank}`);
    if (sq && sq.getSquareName) {
      endSquares.push(sq.getSquare.getId);
    }
  }
  return endSquares;
};

export const enPassantHelper = (
  startSq: Square,
  endSq: Square,
  move?: MovePiece
): boolean => {
  return !!(
    (startSq.getPiece?.getFirstLetter() === "p" &&
      startSq.getRank === 5 &&
      endSq.getRank === 6 &&
      startSq.getFile !== endSq.getFile &&
      move &&
      move.endSq.getRank === 5 &&
      move.startSquarePiece.getFirstLetter() === "P" &&
      move.startSq.getFile === endSq.getFile) ||
    (startSq.getPiece?.getFirstLetter() === "P" &&
      startSq.getRank === 4 &&
      endSq.getRank === 3 &&
      startSq.getFile !== endSq.getFile &&
      move &&
      move.endSq.getRank === 4 &&
      move.startSquarePiece.getFirstLetter() === "p" &&
      move.endSq.getFile === endSq.getFile)
  );
};

export const fileAndRankChecker = (
  startSq: Square,
  files: number[],
  ranks: number[],
  board: Board
): MoveSquares[] => {
  const moves: MoveSquares[] = [];
  const rank = startSq.getRank;
  const file = startSq.getFile;

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 7; j++) {
      const nextFile = String.fromCharCode(
        file.charCodeAt(0) + files[i]! + j * files[i]!
      );
      const nextRank = rank + ranks[i]! + j * ranks[i]!;
      const endSq = board.getSquare(`${nextFile}${nextRank}`);

      if (!endSq) break;
      moves.push({
        startSq: startSq,
        endSq: endSq,
      });
    }
  }
  return moves;
};
