import { Board } from '../board/board';
import { Piece } from './piece';
import { Square } from '../board/square';
import { ChessPieces, Color, ColorType, SingleMove } from '../../types/types';

export class Bishop extends Piece {
	override readonly color: ColorType;

	constructor(square: Square, color: ColorType) {
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
		let moves: SingleMove[] = [];
		let startSq = this.square;
		if (startSq) {
			let rank = startSq.getRank;
			let file = startSq.getFile;
			let files = [1, 1, -1, -1];
			let ranks = [1, -1, 1, -1];

			for (let i = 0; i < 4; i++) {
				for (let j = 0; j < 7; j++) {
					let nextFile = String.fromCharCode(
						file.charCodeAt(0) + files[i]! + j * files[i]!
					);
					let nextRank = rank + ranks[i]! + j * ranks[i]!;
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
		throw new Error('Error making possible bishop moves');
	}
}
