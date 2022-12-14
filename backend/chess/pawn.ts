import { Bishop } from './bishop';
import { Board } from './board';
import { Knight } from './knight';
import { Piece } from './piece';
import { Queen } from './queen';
import { Rook } from './rook';
import { Square } from './square';
import {
	ChessPieces,
	Color,
	ColorType,
	Move,
	SingleMove,
} from '../../types/types';

export class Pawn extends Piece {
	override readonly color: ColorType;

	constructor(square: Square, color: ColorType) {
		super(square);
		this.color = color;
		if (color === Color.white) this.name = ChessPieces.PAWN_WHITE;
		else this.name = ChessPieces.PAWN_BLACK;
	}

	override move(
		startSq: Square,
		endSq: Square,
		board: Board,
		move?: Move
	): boolean {
		if (this.color === Color.white) {
			let bool = Pawn.moveWhite(startSq, endSq, board, undefined, move);
			if (typeof bool === 'boolean') return bool;
		} else if (this.color === Color.black) {
			let bool = Pawn.moveBlack(startSq, endSq, board, undefined, move);
			if (typeof bool === 'boolean') return bool;
		}
		return false;
	}

	//only ran by chess.ts
	promote(startSq: Square, endSq: Square, board: Board, piece: string): Piece {
		if (this.color === Color.white) {
			let returnPiece = Pawn.moveWhite(startSq, endSq, board, piece);
			if (!(returnPiece instanceof Piece)) {
				throw new Error('Error promoting');
			} else {
				console.log('White promotion successful');
				return returnPiece;
			}
		} else {
			let returnPiece = Pawn.moveBlack(startSq, endSq, board, piece);
			if (!(returnPiece instanceof Piece)) {
				throw new Error('Error promoting');
			} else {
				console.log('Black promotion successful');
				return returnPiece;
			}
		}
	}

	private static moveWhite(
		startSq: Square,
		endSq: Square,
		board: Board,
		pieceToPromote?: string,
		move?: Move
	): boolean | Piece {
		if (startSq.getRank === 8) {
			console.log('How is white pawn on rank 8???');
			return false;
		} else if (endSq.getRank < startSq.getRank) {
			console.log("Pawns can't go backwards!");
			return false;
		}
		//Moving diagonally logic
		else if (startSq.getFile !== endSq.getFile) {
			return Pawn.capture(startSq, endSq, pieceToPromote, move);
		}
		//startSquare logic
		else if (startSq.getRank === 2) {
			return Pawn.startingSquareMove(startSq, endSq, board);
		}

		//lastrow promote and possibly capture
		else if (
			startSq.getRank === 7 &&
			endSq.getRank === 8 &&
			endSq.getPiece === null
		) {
			{
				if (pieceToPromote) {
					return Pawn.promotion(endSq, pieceToPromote, Color.white);
				} else {
					console.log('No piece to promote to');
					return false;
				}
			}
		}

		//move one square forwards
		else if (endSq.getRank - startSq.getRank === 1 && endSq.getPiece === null) {
			console.log('Moved pawn one square forward');
			return true;
		}

		//no valid moves
		return false;
	}

	private static moveBlack(
		startSq: Square,
		endSq: Square,
		board: Board,
		pieceToPromote?: string,
		move?: Move
	): boolean | Piece {
		if (startSq.getRank === 1) {
			console.log('How is black pawn on rank 8???');
			return false;
		} else if (endSq.getRank > startSq.getRank) {
			console.log("Pawns can't go backwards!");
			return false;
		}

		//Moving diagonally logic
		else if (startSq.getFile !== endSq.getFile) {
			return Pawn.capture(startSq, endSq, pieceToPromote, move);
		}

		//startSquare logic
		else if (startSq.getRank === 7) {
			return Pawn.startingSquareMove(startSq, endSq, board);
		}

		//lastrow promote and possibly capture
		else if (
			startSq.getRank === 2 &&
			endSq.getRank === 1 &&
			endSq.getPiece === null
		) {
			{
				if (pieceToPromote) {
					return Pawn.promotion(endSq, pieceToPromote, Color.black);
				} else {
					console.log('No piece to promote to');
					return false;
				}
			}
		}

		//move one square forwards
		else if (startSq.getRank - endSq.getRank === 1 && endSq.getPiece === null) {
			console.log('Moved pawn one square forward');
			return true;
		}

		//no valid moves
		return false;
	}

	static capture(
		startSq: Square,
		endSq: Square,
		pieceToPromote?: string,
		move?: Move
	): boolean | Piece {
		if (!Piece.capturable(startSq, endSq)) {
			return false;
		}
		//what is the rank you need to start on to be able to promote
		let secondToLastRank = startSq.getPiece?.getColor === Color.white ? 7 : 2;
		let promotionRank = startSq.getPiece?.getColor === Color.white ? 8 : 1;

		//what is the rank you need to start and end on to be able to en passant
		let enPassantStartSqRank =
			startSq.getPiece?.getColor === Color.white ? 5 : 4;
		let enPassantEndSqRank = startSq.getPiece?.getColor === Color.white ? 6 : 3;

		let color: ColorType | undefined = startSq.getPiece?.getColor;
		//is pawn capturing or not
		let diagonalMove: boolean = Pawn.compareFiles(
			startSq.getFile,
			endSq.getFile
		);

		//check if it's en passant
		if (
			startSq.getRank === enPassantStartSqRank &&
			endSq.getRank === enPassantEndSqRank &&
			diagonalMove
		) {
			if (!move) return false;
			return this.enPassant(move, enPassantStartSqRank);
		}

		//check if it's your own piece
		//check if it's a promotion
		//enpassant is checked before this cause endSq.piece is null on enpassant
		if (endSq.getPiece === null) {
			console.log("Pawns can't go diagonally without capturing a piece");
			return false;
		}
		//check if it's a promotion
		else if (
			startSq.getRank === secondToLastRank &&
			endSq.getRank === promotionRank &&
			diagonalMove &&
			pieceToPromote !== undefined &&
			color
		) {
			console.log('trolled');
			console.log(color);
			let promotedPiece = Pawn.promotion(endSq, pieceToPromote, color);
			console.log(promotedPiece);
			return promotedPiece;
		}
		//normal capture logic
		else if (Math.abs(startSq.getRank - endSq.getRank) === 1 && diagonalMove) {
			console.log('Captured a piece with pawn on ' + endSq.getSquareName);
			return true;
		}
		console.log('Error capturing with pawn');
		return false;
	}

	static startingSquareMove(
		startSq: Square,
		endSq: Square,
		board: Board
	): boolean {
		//one square forwards
		if (
			Math.abs(startSq.getRank - endSq.getRank) === 1 &&
			endSq.getPiece === null
		) {
			console.log('Moved pawn one square forward');
			return true;
		}
		//white pawn two squares forwards
		else if (
			endSq.getRank - startSq.getRank === 2 &&
			endSq.getPiece === null &&
			board.getSquare(`${startSq.getFile}${startSq.getRank + 1}`)?.getPiece ===
				null
		) {
			console.log('Moved white pawn two squares forward');
			return true;
		}
		//black pawn two squares forwards
		else if (
			startSq.getRank - endSq.getRank === 2 &&
			endSq.getPiece === null &&
			board.getSquare(`${startSq.getFile}${startSq.getRank - 1}`)?.getPiece ===
				null
		) {
			console.log('Moved black pawn two squares forward');
			return true;
		} else {
			console.log('Error moving the pawn from starting square');
			return false;
		}
	}

	static promotion(endSq: Square, piece: string, color: ColorType): Piece {
		console.log(piece);
		switch (piece.toUpperCase()) {
			case 'PAWN':
				console.log('Promote to pawn');
				return new Pawn(endSq, color);
			case 'KNIGHT':
				console.log('Promote to knight');
				return new Knight(endSq, color);
			case 'BISHOP':
				console.log('Promote to bishop');
				return new Bishop(endSq, color);
			case 'ROOK':
				console.log('Promote to rook');
				return new Rook(endSq, color);
			case 'QUEEN':
				console.log('Promote to queen');
				return new Queen(endSq, color);
			case 'KING':
				console.log("Can't promote to king!");
				throw new Error();
			default:
				console.log('Error');
				throw new Error();
		}
	}

	static enPassant(move: Move, EpStartSqRank: number): boolean {
		if (
			(EpStartSqRank === 5 &&
				move.startSq.getRank === 7 &&
				move.endSq.getRank === 5) ||
			(EpStartSqRank === 4 &&
				move.startSq.getRank === 2 &&
				move.endSq.getRank === 4)
		) {
			console.log('En passant successful');
			return true;
		} else {
			console.log('En passant unsuccessful');
			return false;
		}
	}

	static compareFiles(startSqFile: string, endSqFile: string): boolean {
		return (
			Math.abs(
				Board.findFileIndex(startSqFile) - Board.findFileIndex(endSqFile)
			) === 1
		);
	}

	override possibleMoves(board: Board): SingleMove[] {
		let startSq = this.getSquare;
		if (startSq) {
			if (this.getColor === Color.white) {
				return Pawn.possibleWhiteMoves(startSq, board);
			} else if (this.getColor === Color.black) {
				return Pawn.possibleBlackMoves(startSq, board);
			} else throw new Error("Pawn doesn't have a color");
		} else throw new Error('Pawn doesnt have a square');
	}

	static possibleWhiteMoves(sq: Square, board: Board): SingleMove[] {
		let moves: SingleMove[] = [];
		let startSq = sq.getSquareName;
		if (sq.getRank === 1) {
			throw new Error('How is the white pawn on the first rank?');
		}
		if (sq.getRank === 2) {
			moves.push(
				{
					startSq: startSq,
					endSq: board.getSquare(`${sq.getFile}${sq.getRank + 1}`)!
						.getSquareName,
				},
				{
					startSq: startSq,
					endSq: board.getSquare(`${sq.getFile}${sq.getRank + 2}`)!
						.getSquareName,
				}
			);
		}
		if (sq.getFile === 'a') {
			moves.push({
				startSq: startSq,
				endSq: board.getSquare(`${'b'}${sq.getRank + 1}`)!.getSquareName,
			});
		} else if (sq.getFile === 'h') {
			moves.push({
				startSq: startSq,
				endSq: board.getSquare(`${'g'}${sq.getRank + 1}`)!.getSquareName,
			});
		} else {
			moves.push(
				{
					startSq: startSq,
					endSq: board.getSquare(
						`${String.fromCharCode(sq.getFile.charCodeAt(0) + 1)}${
							sq.getRank + 1
						}`
					)!.getSquareName,
				},
				{
					startSq: startSq,
					endSq: board.getSquare(
						`${String.fromCharCode(sq.getFile.charCodeAt(0) - 1)}${
							sq.getRank + 1
						}`
					)!.getSquareName,
				}
			);
		}
		return moves;
	}

	static possibleBlackMoves(sq: Square, board: Board): SingleMove[] {
		let moves: SingleMove[] = [];
		let startSq = sq.getSquareName;
		if (sq.getRank === 8) {
			throw new Error('How is the black pawn on the 8th rank?');
		}
		if (sq.getRank === 7) {
			moves.push(
				{
					startSq: startSq,
					endSq: board.getSquare(`${sq.getFile}${sq.getRank - 1}`)!
						.getSquareName,
				},
				{
					startSq: startSq,
					endSq: board.getSquare(`${sq.getFile}${sq.getRank - 2}`)!
						.getSquareName,
				}
			);
		}
		if (sq.getFile === 'a') {
			moves.push({
				startSq: startSq,
				endSq: board.getSquare(`${'b'}${sq.getRank - 1}`)!.getSquareName,
			});
		} else if (sq.getFile === 'h') {
			moves.push({
				startSq: startSq,
				endSq: board.getSquare(`${'g'}${sq.getRank - 1}`)!.getSquareName,
			});
		} else {
			moves.push(
				{
					startSq: startSq,
					endSq: board.getSquare(
						`${String.fromCharCode(sq.getFile.charCodeAt(0) - 1)}${
							sq.getRank - 1
						}`
					)!.getSquareName,
				},
				{
					startSq: startSq,
					endSq: board.getSquare(
						`${String.fromCharCode(sq.getFile.charCodeAt(0) - 1)}${
							sq.getRank - 1
						}`
					)!.getSquareName,
				}
			);
		}
		return moves;
	}
}
