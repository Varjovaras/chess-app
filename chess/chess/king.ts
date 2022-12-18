import { Board } from './Board';
import { Knight } from './Knight';
import { Piece } from './Piece';
import { Square } from './Square';
import { Color, ChessPieces } from './types';

export class King extends Piece {
	override readonly color: Color;

	constructor(square: Square, color: Color) {
		super(square);
		this.color = color;
		if (color === Color.white) {
			this.name = ChessPieces.KING_WHITE;
		} else {
			this.name = ChessPieces.KING_BLACK;
		}
	}

	override move(startSq: Square, endSq: Square, board: Board): boolean {
		if (startSq.getPiece && endSq.getPiece !== null) {
			if (Piece.capturable(startSq, endSq)) {
				return King.kingMoves(startSq, endSq, board);
			} else {
				console.log('Capturing with queen failed');
				return false;
			}
		}
		return King.kingMoves(startSq, endSq, board);
	}

	static kingMoves(startSq: Square, endSq: Square, board: Board): boolean {
		let fileDiff = Math.abs(
			Board.findFileIndex(startSq.getFile) - Board.findFileIndex(endSq.getFile)
		);
		let rankDiff = Math.abs(startSq.getRank - endSq.getRank);

		if (fileDiff > 1 || rankDiff > 1) {
			return false;
		}
		if (fileDiff === rankDiff && startSq !== endSq) {
			return Piece.isDiagonal(startSq, endSq, board);
		} else if (fileDiff === 0) {
			return Piece.verticalMove(startSq, endSq, board);
		} else if (rankDiff === 0) {
			return Piece.horizontalMove(startSq, endSq, board);
		} else return false;
	}


}
