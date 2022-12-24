import { Board } from './Board';
import { Piece } from './Piece';
import { Rook } from './Rook';
import { Square } from './Square';
import { Color, ChessPieces } from './types';

export class King extends Piece {
	override readonly color: Color;
	private castlingAllowed: boolean;

	constructor(square: Square, color: Color) {
		super(square);
		this.color = color;
		this.castlingAllowed = true;
		if (color === Color.white) {
			this.name = ChessPieces.KING_WHITE;
		} else {
			this.name = ChessPieces.KING_BLACK;
		}
	}

	isCastlingAllowed() {
		return this.castlingAllowed;
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
		if (
			(startSq.getFile === 'e' && endSq.getFile === 'g') ||
			endSq.getFile === 'c'
		) {
			return this.castling(startSq, endSq, board);
		}
		return King.kingMoves(startSq, endSq, board);
	}

	castling(startSq: Square, endSq: Square, board: Board): boolean {
		console.log('Trying castling');
		if (!this.castlingAllowed) return false;
		if (endSq.getFile === 'g') {
			return this.kingSideCastling(startSq, endSq, board);
		} else if (endSq.getFile === 'c')
			return this.queenSideCastling(startSq, endSq, board);
		else return false;
	}

	kingSideCastling(startSq: Square, endSq: Square, board: Board): boolean {
		if (startSq.getRank === 1) {
			let rook = board.getSquare('h1')?.getPiece;
			if (!rook || !(rook instanceof Rook) || !rook.isCastlingAllowed()) {
				console.log('no rook, piece on h1 is not a rook or the rook has moved');
				return false;
			}
			console.log(board.getSquare('f1')?.getPiece);
			console.log(board.getSquare('f1')?.getPiece);

			if (
				!board.getSquare('f1')?.getPiece ||
				!board.getSquare('g1')?.getPiece
			) {
				console.log(
					'Castling allowed kingside. Moving king on ' +
						this.getSquare?.getSquareName
				);
				return true;
			}
			if (
				!board.getSquare('d1')?.getPiece &&
				!board.getSquare('c1')?.getPiece
			) {
				console.log(
					'Castling allowed queenside. Moving king on ' +
						this.getSquare?.getSquareName
				);
				return true;
			}
		}
		console.log('castling not allowed');
		return false;
	}
	queenSideCastling(startSq: Square, endSq: Square, board: Board): boolean {
		if (startSq.getRank === 1) {
			let rook = board.getSquare('h1')?.getPiece;
			if (!rook || !(rook instanceof Rook) || !rook.isCastlingAllowed()) {
				console.log('no rook, piece on h1 is not a rook or the rook has moved');
				return false;
			}
			console.log(board.getSquare('f1')?.getPiece);
			console.log(board.getSquare('f1')?.getPiece);

			if (
				!board.getSquare('f1')?.getPiece ||
				!board.getSquare('g1')?.getPiece
			) {
				console.log(
					'Castling allowed kingside. Moving king on ' +
						this.getSquare?.getSquareName
				);
				return true;
			}
			if (
				!board.getSquare('d1')?.getPiece &&
				!board.getSquare('c1')?.getPiece
			) {
				console.log(
					'Castling allowed queenside. Moving king on ' +
						this.getSquare?.getSquareName
				);
				return true;
			}
		}
		console.log('castling not allowed');
		return false;
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
