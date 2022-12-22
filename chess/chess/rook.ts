import { Board } from './Board';
import { Piece } from './Piece';
import { Square } from './Square';
import { Color, ChessPieces, SingleMove } from './types';

export class Rook extends Piece {
	override readonly color: Color;
	private hasMoved: boolean;

	constructor(square: Square, color: Color) {
		super(square);
		this.color = color;
		this.hasMoved = false;
		if (color === Color.white) {
			this.name = ChessPieces.ROOK_WHITE;
		} else {
			this.name = ChessPieces.ROOK_BLACK;
		}
	}

	get getHasMoved() {
		return this.hasMoved;
	}

	override move(startSq: Square, endSq: Square, board: Board): boolean {
		const isHorizontal = startSq.getRank === endSq.getRank ? true : false;

		//capture logic
		if (startSq.getPiece && endSq.getPiece !== null) {
			if (Piece.capturable(startSq, endSq)) {
				this.hasMoved = true;
				return isHorizontal
					? Piece.horizontalMove(startSq, endSq, board)
					: Piece.verticalMove(startSq, endSq, board);
			} else {
				console.log('Capturing with rook failed');
				return false;
			}
		}

		this.hasMoved = true;
		return isHorizontal
			? Piece.horizontalMove(startSq, endSq, board)
			: Piece.verticalMove(startSq, endSq, board);
	}

	override possibleMoves(board: Board): SingleMove[] {
		const moves: SingleMove[] = [];
		const startSq = this.square;
		if (startSq) {
			const rank = startSq.getRank;
			const file = startSq.getFile;
			const startSqName = startSq.getSquareName;
			const files = [1, -1, 0, 0];
			const ranks = [0, 0, 1, -1];

			for (let i = 0; i < 4; i++) {
				for (let j = 0; j < 7; j++) {
					const nextFile = String.fromCharCode(
						file.charCodeAt(0) + files[i] + j * files[i]
					);
					const nextRank = rank + ranks[i] + j * ranks[i];
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
		throw new Error('Error making possible rook moves');
	}
}
