import { Board } from './Board';
import { Piece } from './Piece';
import { Square } from './Square';
import { Color, ChessPieces, SingleMove } from './types';

export class Queen extends Piece {
	override readonly color: Color;
	static rookMoveFiles = [1, -1, 0, 0];
	static rookMoveRanks = [0, 0, 1, -1];
	static bishopMoveFiles = [1, 1, -1, -1];
	static bishopMoveRanks = [1, -1, 1, -1];

	constructor(square: Square, color: Color) {
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
				console.log('Capturing with queen failed');
				return false;
			}
		}
		return Queen.queenMoves(startSq, endSq, board);
	}

	static queenMoves(startSq: Square, endSq: Square, board: Board): boolean {
		const fileDiff = Math.abs(
			Board.findFileIndex(startSq.getFile) - Board.findFileIndex(endSq.getFile)
		);
		const rankDiff = Math.abs(startSq.getRank - endSq.getRank);
		if (fileDiff === rankDiff && startSq !== endSq) {
			return Piece.isDiagonal(startSq, endSq, board);
		} else if (fileDiff === 0) {
			return Piece.verticalMove(startSq, endSq, board);
		} else if (rankDiff === 0) {
			return Piece.horizontalMove(startSq, endSq, board);
		} else return false;
	}

	override possibleMoves(board: Board): SingleMove[] {
		let moves: SingleMove[] = [];
		const startSq = this.square;
		if (startSq) {
			moves = moves.concat(
				Queen.queenMoveHelper(
					Queen.rookMoveFiles,
					Queen.rookMoveRanks,
					board,
					startSq
				),
				Queen.queenMoveHelper(
					Queen.bishopMoveFiles,
					Queen.bishopMoveRanks,
					board,
					startSq
				)
			);
			return moves;
		}
		throw new Error('Error making possible queen moves');
	}

	static queenMoveHelper(
		k: number[],
		t: number[],
		board: Board,
		startSq: Square
	): SingleMove[] {
		const moves: SingleMove[] = [];
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 7; j++) {
				const rank = startSq.getRank;
				const file = startSq.getFile;
				const startSqName = startSq.getSquareName;
				const nextFile = String.fromCharCode(
					file.charCodeAt(0) + k[i] + j * k[i]
				);
				const nextRank = rank + t[i] + j * t[i];
				const sq = board.getSquare(`${nextFile}${nextRank}`);

				if (!sq) break;
				if (sq && sq.getSquareName) {
					moves.push({
						startSq: startSqName,
						endSq: sq.getSquareName,
					});
				}
			}
		}
		return moves;
	}
}
