import { Board } from '../board/board';
import { Piece } from './piece';
import { Square } from '../board/square';
import { ChessPieces, Color, ColorType, SingleMove } from '../../../types/types';

export class Rook extends Piece {
	override readonly color: ColorType;
	private castlingAllowed: boolean;

	constructor(square: Square, color: ColorType) {
		super(square);
		this.color = color;
		this.castlingAllowed = true;
		if (color === Color.white) {
			this.name = ChessPieces.ROOK_WHITE;
		} else {
			this.name = ChessPieces.ROOK_BLACK;
		}
	}

	isCastlingAllowed() {
		return this.castlingAllowed;
	}

	castled(sq: Square) {
		this.castlingAllowed = false;
		this.setSquare(sq);
	}

	override move(startSq: Square, endSq: Square, board: Board): boolean {
		let isHorizontal = startSq.getRank === endSq.getRank ? true : false;
		//capture logic
		if (startSq.getPiece && endSq.getPiece !== null) {
			if (Piece.capturable(startSq, endSq)) {
				return this.rookMoveHelper(startSq, endSq, board, isHorizontal);
			} else {
				console.log('Capturing with rook failed');
				return false;
			}
		}
		return this.rookMoveHelper(startSq, endSq, board, isHorizontal);
	}

	rookMoveHelper(
		startSq: Square,
		endSq: Square,
		board: Board,
		isHorizontal: boolean
	): boolean {
		let isMoveSuccessful = isHorizontal
			? Piece.horizontalMove(startSq, endSq, board)
			: Piece.verticalMove(startSq, endSq, board);

		if (isMoveSuccessful) {
			this.castlingAllowed = true;
		}
		return isMoveSuccessful;
	}

	override possibleMoves(board: Board): SingleMove[] {
		let moves: SingleMove[] = [];
		let startSq = this.square;
		if (startSq) {
			let rank = startSq.getRank;
			let file = startSq.getFile;
			let files = [1, -1, 0, 0];
			let ranks = [0, 0, 1, -1];

			for (let i = 0; i < 4; i++) {
				for (let j = 0; j < 7; j++) {
					let nextFile = String.fromCharCode(
						file.charCodeAt(0) + files[i] + j * files[i]
					);
					let nextRank = rank + ranks[i] + j * ranks[i];
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
		throw new Error('Error making possible rook moves');
	}
}
