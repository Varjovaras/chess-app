import Board from './Board';
import Knight from './Knight';
// import Knight from './Knight';
import Piece from './Piece';
import Square from './Square';
import { Color, ChessPieces } from './types';

export default class King extends Piece {
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
			if (King.capturable(startSq, endSq)) {
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

	static whiteCheck(sq: Square, board: Board): boolean {
		if (!sq) {
			throw new Error('No square for king found');
		}
		let sqId = board.getSquareById(sq.getId)?.getId;
		if (!sqId) {
			throw new Error('No square id for king found');
		}

		// upwards
		for (let i = 1; i < 8; i++) {
			let testSq = board.getSquareById(sqId + 8 * i);
			if (!testSq) break;
			let testSqPiece = testSq.getPiece;
			if (!testSqPiece) continue;
			let testSqPieceName = testSqPiece.getFirstLetter();
			if (
				(testSqPieceName && testSqPieceName === 'R') ||
				testSqPieceName === 'Q'
			) {
				console.log(
					'King is in check from square ' +
						testSq.getSquareName +
						' by ' +
						testSqPieceName
				);
				return true;
			}
			if (testSqPiece) {
				break;
			}
		}
		// downwards
		for (let i = 1; i < 8; i++) {
			let testSq = board.getSquareById(sqId - 8 * i);
			if (!testSq) break;
			let testSqPiece = testSq.getPiece;
			if (!testSqPiece) continue;
			let testSqPieceName = testSqPiece.getFirstLetter();
			if (
				(testSqPieceName && testSqPieceName === 'R') ||
				testSqPieceName === 'Q'
			) {
				console.log(
					'King is in check from square ' +
						testSq.getSquareName +
						' by ' +
						testSqPieceName
				);
				return true;
			}
			if (testSqPiece) {
				break;
			}
		}
		// up and right
		console.log('up and right');
		for (let i = 1; i < 8; i++) {
			let testSq = board.getSquareById(sqId + 9 * i);
			if (!testSq) break;
			let testSqPiece = testSq.getPiece;
			if (!testSqPiece) continue;
			let testSqPieceName = testSqPiece.getFirstLetter();
			if (
				(testSqPieceName && testSqPieceName === 'B') ||
				testSqPieceName === 'Q'
			) {
				console.log(
					'King is in check from square ' +
						testSq.getSquareName +
						' by ' +
						testSqPieceName
				);
				return true;
			}
			if (testSq.getFile === 'h') break;
			if (testSqPiece) {
				break;
			}
		}
		// up and left
		console.log('up and left');
		for (let i = 1; i < 8; i++) {
			let testSq = board.getSquareById(sqId + 7 * i);
			if (!testSq) break;
			let testSqPiece = testSq.getPiece;
			if (!testSqPiece) continue;
			let testSqPieceName = testSqPiece.getFirstLetter();
			if (
				(testSqPieceName && testSqPieceName === 'B') ||
				testSqPieceName === 'Q'
			) {
				console.log(
					'King is in check from square ' +
						testSq.getSquareName +
						' by ' +
						testSqPieceName
				);
				return true;
			}
			if (testSq.getFile === 'a') break;
			if (testSqPiece) {
				break;
			}
		}
		// down and left
		console.log('down and left');
		for (let i = 1; i < 8; i++) {
			let testSq = board.getSquareById(sqId - 9 * i);
			if (!testSq) break;
			let testSqPiece = testSq.getPiece;
			if (!testSqPiece) continue;
			let testSqPieceName = testSqPiece.getFirstLetter();
			if (
				(testSqPieceName && testSqPieceName === 'B') ||
				testSqPieceName === 'Q'
			) {
				console.log(
					'King is in check from square ' +
						testSq.getSquareName +
						' by ' +
						testSqPieceName
				);

				return true;
			}
			if (testSq.getId < 8 || testSq.getFile === 'a') {
				break;
			}
			if (testSqPiece) {
				break;
			}
		}
		// down and right
		console.log('down and right');
		for (let i = 1; i < 8; i++) {
			let testSq = board.getSquareById(sqId - 7 * i);
			if (!testSq) break;
			let testSqPiece = testSq.getPiece;
			if (!testSqPiece) continue;
			let testSqPieceName = testSqPiece.getFirstLetter();
			if (
				(testSqPieceName && testSqPieceName === 'B') ||
				testSqPieceName === 'Q'
			) {
				console.log(
					'King is in check from square ' +
						testSq.getSquareName +
						' by ' +
						testSqPieceName
				);
				return true;
			}
			if (testSq.getId < 8) {
				break;
			}
			if (testSqPiece) {
				break;
			}
		}

		//horse things
		let knightSquares = Knight.knightMoveHelper(sq, board);
		knightSquares.forEach((k) => {
			let sq = board.getSquareById(k);
			if (sq && sq.getPiece && sq.getPiece.getFirstLetter() === 'N') {
				return true;
			}
		});

		//pawn things
		if (sq.getFile === 'a') {
			if (board.getSquareById(sqId + 9)?.getPiece?.getFirstLetter() === 'P') {
				console.log(
					'King is in check from square ' +
						board.getSquareById(sqId + 9)!.getSquareName +
						' by ' +
						board.getSquareById(sqId + 9)?.getPiece!.getFirstLetter
				);
				return true;
			}
		} else if (sq.getFile === 'h') {
			if (board.getSquareById(sqId + 7)?.getPiece?.getFirstLetter() === 'P') {
				console.log(
					'King is in check from square ' +
						board.getSquareById(sqId + 7)!.getSquareName +
						' by ' +
						board.getSquareById(sqId + 7)?.getPiece!.getFirstLetter
				);
				return true;
			}
		} else {
			if (board.getSquareById(sqId + 9)?.getPiece?.getFirstLetter() === 'P') {
				console.log(
					'King is in check from square ' +
						board.getSquareById(sqId + 9)!.getSquareName +
						' by ' +
						board.getSquareById(sqId + 9)?.getPiece!.getFirstLetter
				);
				return true;
			}
			if (board.getSquareById(sqId + 7)?.getPiece?.getFirstLetter() === 'P') {
				console.log(
					'King is in check from square ' +
						board.getSquareById(sqId + 7)!.getSquareName +
						' by ' +
						board.getSquareById(sqId + 7)?.getPiece!.getFirstLetter
				);
				return true;
			}
		}
		//if no checks found
		return false;
	}

	static blackCheck(sq: Square, board: Board): boolean {
		if (!sq) {
			throw new Error('No square for king found');
		}
		let sqId = board.getSquareById(sq.getId)?.getId;
		if (!sqId) {
			throw new Error('No square id for king found');
		}

		// upwards
		for (let i = 1; i < 8; i++) {
			let testSq = board.getSquareById(sqId + 8 * i);
			if (!testSq) break;
			let testSqPiece = testSq.getPiece;
			if (!testSqPiece) continue;
			let testSqPieceName = testSqPiece.getFirstLetter();
			if (
				(testSqPieceName && testSqPieceName === 'r') ||
				testSqPieceName === 'q'
			) {
				console.log(
					'King is in check from square ' +
						testSq.getSquareName +
						' by ' +
						testSqPieceName
				);
				return true;
			}
			if (testSqPiece) {
				break;
			}
		}
		// downwards
		for (let i = 1; i < 8; i++) {
			let testSq = board.getSquareById(sqId - 8 * i);
			if (!testSq) break;
			let testSqPiece = testSq.getPiece;
			if (!testSqPiece) continue;
			let testSqPieceName = testSqPiece.getFirstLetter();
			if (
				(testSqPieceName && testSqPieceName === 'r') ||
				testSqPieceName === 'q'
			) {
				console.log(
					'King is in check from square ' +
						testSq.getSquareName +
						' by ' +
						testSqPieceName
				);
				return true;
			}
			if (testSqPiece) {
				break;
			}
		}
		// up and right
		console.log('up and right');
		for (let i = 1; i < 8; i++) {
			let testSq = board.getSquareById(sqId + 9 * i);
			if (!testSq) break;
			let testSqPiece = testSq.getPiece;
			if (!testSqPiece) continue;
			let testSqPieceName = testSqPiece.getFirstLetter();
			if (
				(testSqPieceName && testSqPieceName === 'b') ||
				testSqPieceName === 'q'
			) {
				console.log(
					'King is in check from square ' +
						testSq.getSquareName +
						' by ' +
						testSqPiece
				);
				return true;
			}
			if (testSq.getFile === 'h') break;
			if (testSqPiece) {
				break;
			}
		}
		// up and left
		console.log('up and left');
		for (let i = 1; i < 8; i++) {
			let testSq = board.getSquareById(sqId + 7 * i);
			if (!testSq) break;
			let testSqPiece = testSq.getPiece;
			if (!testSqPiece) continue;
			let testSqPieceName = testSqPiece.getFirstLetter();
			if (
				(testSqPieceName && testSqPieceName === 'b') ||
				testSqPieceName === 'q'
			) {
				console.log(
					'King is in check from square ' +
						testSq.getSquareName +
						' by ' +
						testSqPiece
				);
				return true;
			}
			if (testSq.getFile === 'a') break;
			if (testSqPiece) {
				break;
			}
		}
		// down and left
		console.log('down and left');
		for (let i = 1; i < 8; i++) {
			let testSq = board.getSquareById(sqId - 9 * i);
			if (!testSq) break;
			let testSqPiece = testSq.getPiece;
			if (!testSqPiece) continue;
			let testSqPieceName = testSqPiece.getFirstLetter();
			if (
				(testSqPieceName && testSqPieceName === 'b') ||
				testSqPieceName === 'q'
			) {
				console.log(
					'King is in check from square ' +
						testSq.getSquareName +
						' by ' +
						testSqPiece
				);

				return true;
			}
			if (testSq.getId < 8 || testSq.getFile === 'a') {
				break;
			}
			if (testSqPiece) {
				break;
			}
		}
		// down and right
		console.log('down and right');
		for (let i = 1; i < 8; i++) {
			let testSq = board.getSquareById(sqId - 7 * i);
			if (!testSq) break;
			let testSqPiece = testSq.getPiece;
			if (!testSqPiece) continue;
			let testSqPieceName = testSqPiece.getFirstLetter();
			if (
				(testSqPieceName && testSqPieceName === 'b') ||
				testSqPieceName === 'q'
			) {
				console.log(
					'King is in check from square ' +
						testSq.getSquareName +
						' by ' +
						testSqPieceName
				);
				return true;
			}
			if (testSq.getId < 8) {
				break;
			}
			if (testSqPiece) {
				break;
			}
		}

		//horse things
		let knightSquares = Knight.knightMoveHelper(sq, board);
		knightSquares.forEach((k) => {
			let sq = board.getSquareById(k);
			if (sq && sq.getPiece && sq.getPiece.getFirstLetter() === 'n') {
				return true;
			}
		});

		//pawn things
		if (sq.getFile === 'a') {
			if (board.getSquareById(sqId - 7)?.getPiece?.getFirstLetter() === 'p') {
				console.log(
					'King is in check from square ' +
						board.getSquareById(sqId - 7)!.getSquareName +
						' by ' +
						board.getSquareById(sqId - 7)?.getPiece!.getFirstLetter
				);
				return true;
			}
		} else if (sq.getFile === 'h') {
			if (board.getSquareById(sqId - 9)?.getPiece?.getFirstLetter() === 'p') {
				console.log(
					'King is in check from square ' +
						board.getSquareById(sqId - 9)!.getSquareName +
						' by ' +
						board.getSquareById(sqId - 9)?.getPiece!.getFirstLetter
				);
				return true;
			}
		} else {
			if (board.getSquareById(sqId - 9)?.getPiece?.getFirstLetter() === 'p') {
				console.log(
					'King is in check from square ' +
						board.getSquareById(sqId - 9)!.getSquareName +
						' by ' +
						board.getSquareById(sqId - 9)?.getPiece!.getFirstLetter
				);
				return true;
			}
			if (board.getSquareById(sqId - 7)?.getPiece?.getFirstLetter() === 'p') {
				console.log(
					'King is in check from square ' +
						board.getSquareById(sqId - 7)!.getSquareName +
						' by ' +
						board.getSquareById(sqId - 7)?.getPiece!.getFirstLetter
				);
				return true;
			}
		}
		//if no checks found
		return false;
	}
}
