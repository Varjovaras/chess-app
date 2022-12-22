import { Square } from './Square';
import { Board } from './Board';
import { Move } from './types';

export const knightMoveHelper = (sq: Square, board: Board): number[] => {
	const endSquares: number[] = [];
	const files = [2, 2, 1, 1, -1, -2, -2, -1];
	const ranks = [1, -1, 2, -2, -2, -1, 1, 2];
	if (!sq) return [];
	const file = sq.getFile;
	const rank = sq.getRank;
	for (let i = 0; i < 8; i++) {
		const nextFile = String.fromCharCode(file.charCodeAt(0) + files[i]);
		const nextRank = rank + ranks[i];
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
	move?: Move
): boolean => {
	return !!(
		(startSq.getPiece?.getFirstLetter() === 'p' &&
			startSq.getRank === 5 &&
			endSq.getRank === 6 &&
			startSq.getFile !== endSq.getFile &&
			move &&
			move.endSq.getRank === 5 &&
			move.startSquarePiece.getFirstLetter() === 'P' &&
			move.startSq.getFile === endSq.getFile) ||
		(startSq.getPiece?.getFirstLetter() === 'P' &&
			startSq.getRank === 4 &&
			endSq.getRank === 3 &&
			startSq.getFile !== endSq.getFile &&
			move &&
			move.endSq.getRank === 4 &&
			move.startSquarePiece.getFirstLetter() === 'p' &&
			move.endSq.getFile === endSq.getFile)
	);
};
