import { Board } from './Board';
import { Piece } from './Piece';
import { Queen } from './Queen';
import { Rook } from './Rook';
import { Square } from './Square';
import { Bishop } from './bishop';
import { King } from './king';
import { Knight } from './knight';
import { enPassantHelper } from './moveHelpers';
import { Pawn } from './pawn';
import {
	ChessPieceType,
	ChessPieces,
	Color,
	ColorType,
	Move,
	Pieces,
} from './types';

export default class Chess {
	private _board: Board;
	private _moves: Move[];

	private _turnNumber: number;

	static STARTING_POSITION =
		'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

	constructor(moves?: Move[]) {
		this._moves = moves ? moves : [];
		this._turnNumber = 0;
		this._board = new Board();
	}

	get getBoard() {
		return this._board;
	}

	get getMoves() {
		return this._moves;
	}

	get getTurnNumber() {
		return this._turnNumber;
	}

	incrementMoveNumber() {
		this._turnNumber++;
	}

	checkTurn(): ColorType {
		return this.getTurnNumber % 2 === 0 ? Color.white : Color.black;
	}

	latestMove(): Move | undefined {
		if (this._moves.length > 0) {
			return this._moves[this._moves.length - 1];
		}
		return undefined;
	}

	whoseTurn(): string {
		return this.checkTurn() === Color.white ? 'White' : 'Black';
	}

	isGameOver(n: boolean): boolean {
		return n;
	}

	whiteCheck(startSq: Square, endSq: Square, pieceName?: string) {
		console.log('Checking if move removes white king from check');
		let tempBoard: Square[] = [];
		for (let i = 0; i < 64; i++) {
			let sq = this._board.getSquareById(i);
			if (!sq) {
				throw new Error('No 64 squares');
			}
			let tempSq = new Square(
				sq.getFile,
				sq.getRank,
				sq.getSquareName,
				sq.getColor,
				sq.getId,
				sq.getPiece
			);
			tempBoard.push(tempSq);
		}

		let newBoard = new Board();
		newBoard.setBoard(tempBoard);
		let startSqTempBoard = newBoard.getSquare(startSq.getSquareName);
		let endSqTempBoard = newBoard.getSquare(endSq.getSquareName);
		if (!startSqTempBoard || !endSqTempBoard) return;
		this.fakeMovePiece(startSqTempBoard, endSqTempBoard, newBoard, pieceName);
		if (newBoard.whiteCheck()) return;
		console.log('White king not in check anymore. Move legal');

		this.movePiece(startSq, endSq, pieceName);
	}

	blackCheck(startSq: Square, endSq: Square, pieceName?: string) {
		console.log('Checking if move removes black king from check');
		let tempBoard: Square[] = [];
		for (let i = 0; i < 64; i++) {
			let sq = this._board.getSquareById(i);
			if (!sq) {
				throw new Error('No 64 squares');
			}
			let tempSq = new Square(
				sq.getFile,
				sq.getRank,
				sq.getSquareName,
				sq.getColor,
				sq.getId,
				sq.getPiece
			);
			tempBoard.push(tempSq);
		}

		let newBoard = new Board();
		newBoard.setBoard(tempBoard);
		let startSqTempBoard = newBoard.getSquare(startSq.getSquareName);
		let endSqTempBoard = newBoard.getSquare(endSq.getSquareName);
		if (!startSqTempBoard || !endSqTempBoard) return;
		this.fakeMovePiece(startSqTempBoard, endSqTempBoard, newBoard, pieceName);
		if (newBoard.whiteCheck()) return;
		console.log('White king not in check anymore. Move legal');
		this.movePiece(startSq, endSq, pieceName);
	}

	move(startSquare: string, endSquare: string, pieceName?: string): void {
		if (startSquare === endSquare) {
			console.log('Same starting and ending square');
			throw new Error("Didn't move the piece");
		}
		let startSq = this._board.getSquare(startSquare);
		let endSq = this._board.getSquare(endSquare);
		if (!startSq || !endSq) return;
		let startSqPieceColor = startSq.getPiece?.getColor;

		if (startSqPieceColor === Color.white) {
			if (!this.getBoard.whiteCheck()) {
				console.log('White king not in check');
				this.movePiece(startSq, endSq, pieceName);
			} else this.whiteCheck(startSq, endSq, pieceName);
		}
		if (startSqPieceColor === Color.black) {
			if (!this.getBoard.blackCheck()) {
				console.log('black king not in check');
				this.movePiece(startSq, endSq, pieceName);
			} else this.blackCheck(startSq, endSq);
		}
	}

	private movePiece(startSq: Square, endSq: Square, pieceName?: string): void {
		let isLegalMove: boolean = false;
		let promotedPiece: Piece | boolean = false;
		let startSqPiece = startSq.getPiece;
		if (!startSqPiece || !endSq) return;
		if (startSqPiece.getColor !== this.checkTurn()) {
			console.log('Wrong players turn');
			return;
		}
		let move = this.latestMove();

		if (startSqPiece instanceof Pawn) {
			if (
				(pieceName &&
					startSq?.getRank === 7 &&
					endSq?.getRank === 8 &&
					startSqPiece.getName === ChessPieces.PAWN_WHITE) ||
				(pieceName &&
					startSq?.getRank === 2 &&
					endSq?.getRank === 1 &&
					startSqPiece.getName === ChessPieces.PAWN_BLACK)
			) {
				promotedPiece = startSqPiece.promote(
					startSq,
					endSq,
					this._board,
					pieceName
				);
			} else if (move && enPassantHelper(startSq, endSq, move)) {
				isLegalMove = startSqPiece.move(startSq, endSq, this._board, move);
				console.log(isLegalMove);
				this._board.getSquareById(move.endSq.getSquare.getId)?.setPiece(null);
			} else isLegalMove = startSqPiece.move(startSq, endSq, this._board);
		} else isLegalMove = startSqPiece.move(startSq, endSq, this._board);

		if (promotedPiece instanceof Piece) {
			endSq.setPiece(promotedPiece);
			endSq.setSquareForPiece(endSq);
			this.handleMove(startSq, endSq);
			startSq.setPiece(null);
			return;
		}

		if (isLegalMove) {
			this.handleMove(startSq, endSq);
			return;
		}

		throw new Error(
			'Starting square is invalid, no piece to be found or ending square is invalid, inputted invalid move or a piece is on the way'
		);
	}

	private fakeMovePiece(
		startSq: Square,
		endSq: Square,
		board: Board,
		pieceName?: string
	): void {
		let isLegalMove: boolean = false;
		let promotedPiece: Piece | boolean = false;
		let startSqPiece = startSq.getPiece;
		if (!startSqPiece || !endSq) return;
		if (startSqPiece.getColor !== this.checkTurn()) {
			console.log('Wrong players turn');
			return;
		}
		let move = this.latestMove();

		if (startSqPiece instanceof Pawn) {
			if (
				(pieceName &&
					startSq?.getRank === 7 &&
					endSq?.getRank === 8 &&
					startSqPiece.getName === ChessPieces.PAWN_WHITE) ||
				(pieceName &&
					startSq?.getRank === 2 &&
					endSq?.getRank === 1 &&
					startSqPiece.getName === ChessPieces.PAWN_BLACK)
			) {
				promotedPiece = startSqPiece.promote(startSq, endSq, board, pieceName);
			} else if (move && enPassantHelper(startSq, endSq, move)) {
				isLegalMove = startSqPiece.move(startSq, endSq, this._board, move);
				console.log(isLegalMove);
				this._board.getSquareById(move.endSq.getSquare.getId)?.setPiece(null);
			} else isLegalMove = startSqPiece.move(startSq, endSq, board);
		} else isLegalMove = startSqPiece.move(startSq, endSq, board);

		if (promotedPiece instanceof Piece) {
			endSq.setPiece(promotedPiece);
			endSq.setSquareForPiece(endSq);
			this.handleTempPieces(startSq, endSq);
			startSq.setPiece(null);
			return;
		}

		if (isLegalMove) {
			this.handleTempPieces(startSq, endSq);
			return;
		}

		throw new Error(
			'Starting square is invalid, no piece to be found or ending square is invalid, inputted invalid move or a piece is on the way'
		);
	}

	handleMove(startSq: Square, endSq: Square): void {
		if (
			startSq.getPiece instanceof King &&
			startSq.getFile === 'e' &&
			(endSq.getFile === 'c' || endSq.getFile === 'g')
		) {
			this.castling(startSq, endSq);
		}
		this.addMove(startSq, endSq);
		this.handlePieces(startSq, endSq);
		this.incrementMoveNumber();
	}

	addMove(startSq: Square, endSq: Square): void {
		console.log(
			'Adding move: ' + startSq.getSquareName + ' ' + endSq.getSquareName
		);
		if (startSq.getPiece) {
			this._moves.push({
				startSq: startSq,
				endSq: endSq,
				startSquarePiece: startSq.getPiece,
			});
		}
	}

	castling(startSq: Square, endSq: Square) {
		if (endSq.getSquareName === 'g1') {
			this.castlingRookHelper('h1', 'f1');
		}
		if (endSq.getSquareName === 'c1') {
			this.castlingRookHelper('a1', 'd1');
		}
		if (endSq.getSquareName === 'g8') {
			this.castlingRookHelper('h8', 'f8');
		}
		if (endSq.getSquareName === 'c8') {
			this.castlingRookHelper('a8', 'd8');
		}
	}

	castlingRookHelper(rookStartSq: string, rookEndSq: string) {
		let rook = this._board.getSquare(rookStartSq)?.getPiece;
		if (!rook || !(rook instanceof Rook))
			throw new Error('Castling cannot be completed without a rook');
		this._board.getSquare(rookEndSq)?.setPiece(rook);
		rook.castled(this._board.getSquare('f1')!);
		this._board.getSquare(rookStartSq)?.setPiece(null);
	}

	handlePieces(startSq: Square, endSq: Square, enPassantSquare?: Square): void {
		let startSqPiece = startSq.getPiece;
		let endSqPiece = endSq.getPiece;
		if (enPassantSquare) {
			// this._pieces = this._pieces.filter(
			// 	(p: PieceSquare) => p.square !== enPassantSquare.getSquareName
			// );
		}
		if (endSqPiece) {
			// this._pieces = this._pieces.filter(
			// 	(p: PieceSquare) => p.square !== endSq.getSquareName
			// );
		}
		if (startSqPiece) {
			// this._pieces = this._pieces.filter(
			// 	(p: PieceSquare) => p.square !== startSq.getSquareName
			// );
			console.log(startSqPiece);
			endSq.setPiece(startSqPiece);
			let endSquareToPiece = endSq;
			endSq.setSquareForPiece(endSquareToPiece);
			startSq.setPiece(null);
			// this._pieces.push({
			// 	square: endSq.getSquareName,
			// 	piece: endSq.getPiece!,
			// });
		}
	}

	handleTempPieces(startSq: Square, endSq: Square): void {
		let startSqPiece = startSq.getPiece;
		endSq.setPiece(startSqPiece!);
		let endSquareToPiece = endSq;
		endSq.setSquareForPiece(endSquareToPiece);
		startSq.setPiece(null);
	}

	//initialization or promoting
	putPieceOnBoard(square: string, piece: Piece): void {
		let sq = this._board.getSquare(square);

		if (sq) {
			sq.setPiece(piece);
			console.log(`${piece.getName} put on ${square}`);
		} else throw new Error('No square found');
	}

	algebraicNotation(): string[] {
		let returnArray: string[] = [];
		let s: string = '';

		for (const move of this.getMoves) {
			let startSqPiece =
				move.startSq.getPiece &&
				move.startSq.getPiece.getFirstLetter().toLowerCase() !== 'p'
					? move.startSq.getPiece.getFirstLetter()
					: '';

			let piece = move.endSq.getPiece
				? move.endSq.getPiece.getFirstLetter()
				: '';

			s =
				s +
				`${startSqPiece}${move.startSq.getSquareName} ${
					move.endSq.getSquareName
				}${piece.toUpperCase()}`;

			returnArray = returnArray.concat(s);
			s = '';
		}

		return returnArray;
	}

	fen(fen: string): void {
		let tokens = fen.split(/\s+/);
		let pieces = tokens[0].split('/');

		//initialize
		this._moves = [];
		// this._pieces = [];
		this._turnNumber = 0;
		this._board.getBoard.forEach((s) => {
			s.setPiece(null);
		});
		this.analyzeFen(pieces);
	}

	//what the hell
	analyzeFen(pieces: string[]) {
		for (let i = 0; i < 8; i++) {
			let str = pieces[i];
			if (str.length !== 8) {
				//todo non starting position
			} else if (str !== '8') {
				//if str is 8 it's an empty row
				this.fenHelper(i, str);
			}
		}
	}

	fenHelper(i: number, str: string) {
		//i is row
		//j is row times 8
		//k iterates files
		for (let j = i * 8, k = 0; j < i * 8 + 8; j++, k++) {
			let sq = this._board.getSquareById(j);
			if (sq) {
				let piece = Chess.fenPieces(str[k], sq);

				if (piece !== null) {
					this.putPieceOnBoard(sq.getSquareName, piece);
				}
			}
		}
	}

	static fenPieces(s: string, sq: Square): Piece | null {
		switch (s) {
			case 'p':
				return new Pawn(sq, Color.white);
			case 'P':
				return new Pawn(sq, Color.black);
			case 'n':
				return new Knight(sq, Color.white);
			case 'N':
				return new Knight(sq, Color.black);
			case 'b':
				return new Bishop(sq, Color.white);
			case 'B':
				return new Bishop(sq, Color.black);
			case 'r':
				return new Rook(sq, Color.white);
			case 'R':
				return new Rook(sq, Color.black);
			case 'q':
				return new Queen(sq, Color.white);
			case 'Q':
				return new Queen(sq, Color.black);
			case 'k':
				return new King(sq, Color.white);
			case 'K':
				return new King(sq, Color.black);
			default:
				return null;
		}
	}

	emptyBoard(): void {
		this._moves = [];
		// this._pieces = [];
		this._turnNumber = 0;
		this._board.getBoard.forEach((s) => {
			s.setPiece(null);
		});
	}

	getSquareFromBoard(s: string): Square {
		let sq = this._board.getSquare(s);
		if (!sq) throw new Error('Square ' + sq + ' not found');
		return sq;
	}

	startingPosition(): void {
		this.fen(Chess.STARTING_POSITION);
	}
}
