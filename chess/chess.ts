import { Bishop } from './chess/bishop';
import { Board } from './chess/Board';
import { King } from './chess/king';
import { Knight } from './chess/knight';
import { enPassantHelper } from './chess/moveHelpers';
import { Pawn } from './chess/pawn';
import { Piece } from './chess/Piece';
import { Queen } from './chess/Queen';
import { Rook } from './chess/Rook';
import { Square } from './chess/Square';
import { Move, PieceSquare, Color, ChessPieces } from './chess/types';

export default class Chess {
	private _board: Board;
	private _moves: Move[];

	private _pieces: PieceSquare[];
	private _turnNumber: number;

	static STARTING_POSITION =
		'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

	constructor(moves?: Move[], pieces?: PieceSquare[]) {
		this._moves = moves ? moves : [];
		this._pieces = pieces ? pieces : [];
		this._turnNumber = 0;
		this._board = new Board();
	}

	get getBoard() {
		return this._board;
	}

	get getMoves() {
		return this._moves;
	}

	get getPieces() {
		return this._pieces;
	}

	get getTurnNumber() {
		return this._turnNumber;
	}

	incrementMoveNumber() {
		this._turnNumber++;
	}

	checkTurn(): Color {
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
		// console.log(startSq);
		// console.log(endSq);
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

	movePiece(startSq: Square, endSq: Square, pieceName?: string): void {
		//returns piece if promoting a pawn
		let isLegalMoveOrPiece: boolean | Piece;
		if (startSq.getPiece?.getColor !== this.checkTurn()) {
			console.log('Wrong players turn');
			return;
			// throw new Error();
		}

		if (startSq.getPiece !== null && endSq !== null) {
			//check if pawn is about to promote
			if (
				startSq?.getRank === 7 &&
				endSq?.getRank === 8 &&
				startSq.getPiece?.getName.toUpperCase() === ChessPieces.PAWN_BLACK
			) {
				isLegalMoveOrPiece = startSq.getPiece.move(
					startSq,
					endSq,
					this._board,
					pieceName
				);
			} else {
				let move = this.latestMove();
				if (move && startSq.getPiece.getFirstLetter().toUpperCase() === 'P')
					isLegalMoveOrPiece = startSq.getPiece.move(
						startSq,
						endSq,
						this._board,
						undefined,
						move
					);
				else
					isLegalMoveOrPiece = startSq.getPiece.move(
						startSq,
						endSq,
						this._board
					);
			}
			let move = this.latestMove();
			//is only an object if promoting a pawn, if not object this runs
			if (move && enPassantHelper(startSq, endSq, move)) {
				this._board.getSquareById(move.endSq.getSquare.getId)?.setPiece(null);
				this._pieces = this._pieces.filter(
					(p: PieceSquare) => p.square !== move?.endSq.getSquareName
				);
			}
			if (typeof isLegalMoveOrPiece !== 'object' && isLegalMoveOrPiece) {
				this.handleMove(startSq, endSq);
				return;
			}
			//promotion logic
			else if (isLegalMoveOrPiece) {
				endSq.setPiece(isLegalMoveOrPiece);
				endSq.setSquareForPiece(endSq);
				this.handleMove(startSq, endSq);
				startSq.setPiece(null);
				return;
			}
		}
		console.log(
			'Starting square is invalid, no piece to be found or ending square is invalid, inputted invalid move or a piece is on the way'
		);
		throw new Error();
	}

	handleMove(startSq: Square, endSq: Square): void {
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

	handlePieces(startSq: Square, endSq: Square, enPassantSquare?: Square): void {
		let startSqPiece = startSq.getPiece;
		let endSqPiece = endSq.getPiece;
		if (enPassantSquare) {
			this._pieces = this._pieces.filter(
				(p: PieceSquare) => p.square !== enPassantSquare.getSquareName
			);
		}
		if (endSqPiece) {
			this._pieces = this._pieces.filter(
				(p: PieceSquare) => p.square !== endSq.getSquareName
			);
		}
		if (startSqPiece) {
			this._pieces = this._pieces.filter(
				(p: PieceSquare) => p.square !== startSq.getSquareName
			);
			endSq.setPiece(startSqPiece);
			let endSquareToPiece = endSq;
			endSq.setSquareForPiece(endSquareToPiece);
			startSq.setPiece(null);
			this._pieces.push({
				square: endSq.getSquareName,
				piece: endSq.getPiece!,
			});
		}
	}

	handleTempPieces(
		startSq: Square,
		endSq: Square,
		enPassantSquare?: Square
	): void {
		let startSqPiece = startSq.getPiece;
		let endSqPiece = endSq.getPiece;
		// if (enPassantSquare) {
		// 	this._pieces = this._pieces.filter(
		// 		(p: PieceSquare) => p.square !== enPassantSquare.getSquareName
		// 	);
		// }
		// if (endSqPiece) {
		// 	this._pieces = this._pieces.filter(
		// 		(p: PieceSquare) => p.square !== endSq.getSquareName
		// 	);
		// }
		// if (startSqPiece) {§
		// 	this._pieces = this._pieces.filter(
		// 		(p: PieceSquare) => p.square !== startSq.getSquareName
		// 	);
		endSq.setPiece(startSqPiece!);
		let endSquareToPiece = endSq;
		endSq.setSquareForPiece(endSquareToPiece);
		startSq.setPiece(null);
	}

	fakeMovePiece(
		startSq: Square,
		endSq: Square,
		board: Board,
		pieceName?: string
	): void {
		//returns piece if promoting a pawn
		let isLegalMoveOrPiece: boolean | Piece;
		if (startSq.getPiece?.getColor !== this.checkTurn()) {
			console.log('Wrong players turn');
			throw new Error();
		}

		if (startSq.getPiece !== null && endSq !== null) {
			//check if pawn is about to promote
			if (
				startSq?.getRank === 7 &&
				endSq?.getRank === 8 &&
				startSq.getPiece?.getName.toUpperCase() === ChessPieces.PAWN_BLACK
			) {
				isLegalMoveOrPiece = startSq.getPiece.move(
					startSq,
					endSq,
					board,
					pieceName
				);
			} else {
				let move = this.latestMove();
				if (move && startSq.getPiece.getFirstLetter().toUpperCase() === 'P')
					isLegalMoveOrPiece = startSq.getPiece.move(
						startSq,
						endSq,
						board,
						undefined,
						move
					);
				else isLegalMoveOrPiece = startSq.getPiece.move(startSq, endSq, board);
			}
			let move = this.latestMove();
			//is only an object if promoting a pawn, if not object this runs
			if (move && enPassantHelper(startSq, endSq, move)) {
				board.getSquareById(move.endSq.getSquare.getId)?.setPiece(null);
				// this._pieces = this._pieces.filter(
				// 	(p: PieceSquare) => p.square !== move?.endSq.getSquareName
				// );
			}

			//
			if (typeof isLegalMoveOrPiece !== 'object' && isLegalMoveOrPiece) {
				// this.handleMove(startSq, endSq);
				this.handleTempPieces(startSq, endSq);
				return;
			}
			//promotion logic
			else if (isLegalMoveOrPiece) {
				endSq.setPiece(isLegalMoveOrPiece);
				endSq.setSquareForPiece(endSq);
				this.handleTempPieces(startSq, endSq);
				startSq.setPiece(null);
				return;
			}
		}
		console.log(
			'Starting square is invalid, no piece to be found or ending square is invalid, inputted invalid move or a piece is on the way'
		);
		throw new Error();
	}

	//initialization or promoting
	putPieceOnBoard(square: string, piece: Piece): void {
		let sq = this._board.getSquare(square);
		if (sq && !this.getBoard.getSquare(sq.getSquareName)!.isSquareOccupied()) {
			this.removePiece(square);
		}
		if (sq) {
			sq.setPiece(piece);
			this.addPiece(piece, square);
			console.log(`${piece.getName} put on ${square}`);
		} else {
			console.log('No square found');
			throw new Error();
		}
	}

	addPiece(piece: Piece, square: string): void {
		this._pieces.push({ square: square, piece: piece });
	}

	removePiece(square: string): void {
		this._pieces = this._pieces.filter((p: PieceSquare) => p.square !== square);
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
		this._pieces = [];
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
		this._pieces = [];
		this._turnNumber = 0;
		this._board.getBoard.forEach((s) => {
			s.setPiece(null);
		});
	}

	startingPosition(): void {
		this.fen(Chess.STARTING_POSITION);
	}
}
