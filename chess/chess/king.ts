import { Board } from './Board';
import { Piece } from './Piece';
import { Square } from './Square';
import { Color, ChessPieces } from './types';

export class King extends Piece {
	override readonly color: Color;
	private hasMoved: boolean;

	constructor(square: Square, color: Color) {
		super(square);
		this.color = color;
		this.hasMoved = false;
		if (color === Color.white) {
			this.name = ChessPieces.KING_WHITE;
		} else {
			this.name = ChessPieces.KING_BLACK;
		}
	}

	override move(startSq: Square, endSq: Square, board: Board): boolean {
		if (startSq.getPiece && endSq.getPiece !== null) {
			if (Piece.capturable(startSq, endSq)) {
				this.hasMoved = true;
				return this.kingMoves(startSq, endSq, board);
			} else {
				console.log('Capturing with queen failed');
				return false;
			}
		}
		return this.kingMoves(startSq, endSq, board);
	}

	kingMoves(startSq: Square, endSq: Square, board: Board): boolean {
		//castling
		if (
			(!this.hasMoved && startSq.getFile === 'e' && endSq.getFile === 'g') ||
			endSq.getFile === 'c'
		)
			return this.castling(startSq, endSq, board);

		const fileDiff = Math.abs(
			Board.findFileIndex(startSq.getFile) - Board.findFileIndex(endSq.getFile)
		);
		const rankDiff = Math.abs(startSq.getRank - endSq.getRank);
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

	castling(startSq: Square, endSq: Square, board: Board): boolean {
		if (endSq.getFile === 'g')
			return this.kingSideCastling(startSq, endSq, board);
		else if (endSq.getFile === 'c')
			return this.queenSideCastling(startSq, endSq, board);
		else return false;
	}

	kingSideCastling(startSq: Square, _endSq: Square, _board: Board): boolean {
		if (startSq.getRank === 5) {
			return false;
		}
		return false;
	}
	queenSideCastling(_startSq: Square, _endSq: Square, _board: Board): boolean {
		return false;
	}
}
