import { Board } from './Board';
import { Piece } from './Piece';
import { Square } from './Square';
import { Color, ChessPieces, SingleMove } from './types';

export class Bishop extends Piece {
	override readonly color: Color;
	//files[i] && ranks[i] counts for one possible bishop move
	static files = [1, 1, -1, -1];
	static ranks = [1, -1, 1, -1];

	constructor(square: Square, color: Color) {
		super(square);
		this.color = color;
		if (color === Color.white) {
			this.name = ChessPieces.BISHOP_WHITE;
		} else {
			this.name = ChessPieces.BISHOP_BLACK;
		}
	}

	override move(startSq: Square, endSq: Square, board: Board): boolean {
		if (startSq.getColor !== endSq.getColor) {
			console.log('Bishop cannot move to a different color square');
			return false;
		}

		//capture logic
		if (startSq.getPiece && endSq.getPiece !== null) {
			if (Piece.capturable(startSq, endSq)) {
				return Piece.isDiagonal(startSq, endSq, board);
			} else {
				console.log('Capturing with bishop failed');
				return false;
			}
		}
		return Piece.isDiagonal(startSq, endSq, board);
	}

	override possibleMoves(board: Board): SingleMove[] {
		const moves: SingleMove[] = [];
		const startSq = this.square;
		if (startSq) {
			const rank = startSq.getRank;
			const file = startSq.getFile;
			const startSqName = startSq.getSquareName;

			for (let i = 0; i < 4; i++) {
				for (let j = 0; j < 7; j++) {
					const nextFile = String.fromCharCode(
						file.charCodeAt(0) + Bishop.files[i] + j * Bishop.files[i]
					);
					const nextRank = rank + Bishop.ranks[i] + j * Bishop.ranks[i];
					const sq = board.getSquare(`${nextFile}${nextRank}`);

					if (!sq) break;
					if (sq && sq.getSquareName) {
						const endSq = sq.getSquareName;
						moves.push({
							startSq: startSqName,
							endSq: endSq,
						});
					}
				}
			}

			return moves;
		}
		throw new Error('Error making possible bishop moves');
	}
}
