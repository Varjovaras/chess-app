import { Board } from './Board';
import { Piece } from './Piece';
import { Square } from './Square';
import { Color, ChessPieces, SingleMove } from './types';

export class Rook extends Piece {
	override readonly color: Color;

	constructor(square: Square, color: Color) {
		super(square);
		this.color = color;
		if (color === Color.white) {
			this.name = ChessPieces.ROOK_WHITE;
		} else {
			this.name = ChessPieces.ROOK_BLACK;
		}
	}

	override move(startSq: Square, endSq: Square, board: Board): boolean {
		let isHorizontal = startSq.getRank === endSq.getRank ? true : false;

		//capture logic
		if (startSq.getPiece && endSq.getPiece !== null) {
			if (Piece.capturable(startSq, endSq)) {
				return isHorizontal
					? Piece.horizontalMove(startSq, endSq, board)
					: Piece.verticalMove(startSq, endSq, board);
			} else {
				console.log('Capturing with rook failed');
				return false;
			}
		}

		return isHorizontal
			? Piece.horizontalMove(startSq, endSq, board)
			: Piece.verticalMove(startSq, endSq, board);
	}

	override possibleMoves(board: Board): SingleMove[] {
		let moves: SingleMove[] = [];
		let startSq = this.square;
		if (startSq) {
			let rank = startSq.getRank;
			let file = startSq.getFile;
			let startSqName = startSq.getSquareName;
			let files = [1, -1, 0, 0];
			let ranks = [0, 0, 1, -1];

			for (let i = 0; i < 4; i++) {
				for (let j = 0; j < 7; j++) {
					let nextFile = String.fromCharCode(
						file.charCodeAt(0) + files[i] + j * files[i]
					);
					let nextRank = rank + ranks[i] + j * ranks[i];
					let sq = board.getSquare(`${nextFile}${nextRank}`);

					if (!sq) break;
					if (sq && sq.getSquareName) {
						let endSq = sq.getSquareName;
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
