console.time('c');
import readline from 'readline';

enum Color {
	black = 'BLACK',
	white = 'WHITE',
}

type Move = {
	startSq: Square;
	endSq: Square;
	startSquarePiece: Piece;
	promotion?: Piece | null;
};

type SingleMove = {
	startSq: string;
	endSq: string;
};

type PieceSquare = {
	square: string;
	piece: Piece;
};

enum ChessPieces {
	PAWN_WHITE = 'pawn',
	PAWN_BLACK = 'PAWN',
	KNIGHT_WHITE = 'night', //first letter n for printing purposes
	KNIGHT_BLACK = 'NIGHT', //first letter N for printing purposes
	BISHOP_WHITE = 'bishop',
	BISHOP_BLACK = 'BISHOP',
	ROOK_WHITE = 'rook',
	ROOK_BLACK = 'ROOK',
	QUEEN_WHITE = 'queen',
	QUEEN_BLACK = 'QUEEN',
	KING_WHITE = 'king',
	KING_BLACK = 'KING',
}

class Board {
	private _board: Square[];
	static files: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

	constructor(board: Square[]) {
		this._board = board;
	}

	get getBoard() {
		return this._board;
	}

	getSquare(name: string): Square | null {
		let sq = this._board.find((s: Square) => s.getSquareName === name);
		return sq ? sq.getSquare : null;
	}

	getSquareById(id: number): Square | null {
		let sq = this._board.find((s: Square) => s.getId === id);
		return sq ? sq.getSquare : null;
	}

	static findFileIndex(s: string): number {
		return Board.files.findIndex((e) => e === s);
	}
}

class Square {
	private _file: string;
	private _rank: number;
	private _squareName: string;
	private _color: Color;
	private _piece?: Piece | null;
	private _id: number;

	constructor(
		file: string,
		rank: number,
		squareName: string,
		color: Color,
		id: number,
		piece?: Piece | null
	) {
		this._file = file;
		this._rank = rank;
		this._squareName = squareName;
		this._color = color;
		this._piece = piece;
		this._id = id;
	}

	get getSquare() {
		return this;
	}

	get getFile() {
		return this._file;
	}

	get getRank() {
		return this._rank;
	}

	get getSquareName() {
		return this._squareName;
	}

	get getId() {
		return this._id;
	}

	get getColor() {
		return this._color;
	}

	get getPiece() {
		return this._piece;
	}

	setPiece(piece: Piece | null) {
		this._piece = piece;
	}

	setSquareForPiece(sq: Square) {
		this._piece?.setSquare(sq);
	}

	static omitPiece(s: Square) {
		let sq = s;
		sq._piece = null;
		return sq;
	}

	isSquareOccupied(): boolean {
		return this._piece === null;
	}
}

export default class Chess {
	private _board: Board;
	private _moves: Move[];

	private _pieces: PieceSquare[];
	private _turnNumber: number;

	static STARTING_POSITION =
		'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

	constructor(moves?: Move[], pieces?: PieceSquare[]) {
		let tempBoard = new Array(64);
		this._moves = moves ? moves : [];

		this._pieces = pieces ? pieces : [];
		this._turnNumber = 0;

		let firstSquare = Color.black;
		let secondSquare = Color.white;
		let rank = 1;

		for (let i = 0, file = 0; i < tempBoard.length; i++, file++) {
			if (file === 8) {
				file = 0;
				rank++;
				let temp: Color = firstSquare;
				firstSquare = secondSquare;
				secondSquare = temp;
			}

			if (i % 2 === 0) {
				tempBoard[i] = new Square(
					Board.files[file],
					rank,

					`${Board.files[file]}${rank}`,
					firstSquare,
					i,
					null
				);
			} else {
				tempBoard[i] = new Square(
					Board.files[file],
					rank,
					`${Board.files[file]}${rank}`,
					secondSquare,
					i,
					null
				);
			}
		}
		this._board = new Board(tempBoard);
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

	latestMove(): Move | null {
		if (this._moves.length > 0) {
			return this._moves[this._moves.length - 1];
		}
		return null;
	}

	whoseTurn(): string {
		return this.checkTurn() === Color.white ? 'White' : 'Black';
	}

	isGameOver(n: boolean): boolean {
		return n;
	}

	printBoardWhite() {
		let rows = ['', '', '', '', '', '', '', ''];

		for (const i of this._board.getBoard) {
			let piece = i.getPiece;
			if (piece) {
				rows[i.getRank - 1] += piece.getFirstLetter() + '  ';
			} else {
				rows[i.getRank - 1] += i.getFile + i.getRank + ' ';
			}
		}
		return rows.reverse();
	}

	printBoardBlack() {
		let rows = ['', '', '', '', '', '', '', ''];

		for (const i of this._board.getBoard) {
			let piece = i.getPiece;
			if (piece) {
				rows[i.getRank - 1] =
					' ' + piece.getFirstLetter() + ' ' + rows[i.getRank - 1];
			} else {
				rows[i.getRank - 1] = i.getFile + i.getRank + ' ' + rows[i.getRank - 1];
			}
		}

		return rows.reverse();
	}

	movePiece(startSquare: string, endSquare: string, pieceName?: string): void {
		if (startSquare === endSquare) {
			console.log('Same starting and ending square');
			throw new Error("Didn't move the piece");
		}
		let startSq = this._board.getSquare(startSquare);
		let endSq = this._board.getSquare(endSquare);

		//returns piece if promoting a pawn
		let isLegalMoveOrPiece: boolean | Piece;
		if (startSq?.getPiece?.getColor !== this.checkTurn()) {
			console.log('Wrong players turn');
			throw new Error();
		}

		if (startSq !== null && startSq.getPiece !== null && endSq !== null) {
			//check if pawn is about to promote
			if (
				(startSq?.getRank === 7 &&
					endSq?.getRank === 8 &&
					startSq.getPiece?.getName === ChessPieces.PAWN_WHITE) ||
				(startSq?.getRank === 2 &&
					endSq?.getRank === 1 &&
					startSq.getPiece?.getName === ChessPieces.PAWN_BLACK)
			) {
				isLegalMoveOrPiece = startSq.getPiece.move(
					startSq,
					endSq,
					this._board,
					pieceName
				);
			} else {
				isLegalMoveOrPiece = startSq.getPiece.move(startSq, endSq, this._board);
			}

			//is only an object if promoting a pawn, if not object this runs
			if (typeof isLegalMoveOrPiece !== 'object' && isLegalMoveOrPiece) {
				this.addMove(startSq, endSq);

				return;
			}
			//promotion logic
			else if (isLegalMoveOrPiece) {
				endSq.setPiece(isLegalMoveOrPiece);
				endSq.setSquareForPiece(endSq);
				this.addMove(startSq, endSq);
				startSq.setPiece(null);
				return;
			}
		}
		console.log(
			'Starting square is invalid, no piece to be found or ending square is invalid, inputted invalid move or a piece is on the way'
		);
		throw new Error();
	}

	addMove(startSq: Square, endSq: Square): void {
		this.handleMove(startSq, endSq);
		this.handlePieces(startSq, endSq);
		this.incrementMoveNumber();
	}

	handleMove(startSq: Square, endSq: Square): void {
		if (startSq.getPiece) {
			this._moves.push({
				startSq: startSq,
				endSq: endSq,
				startSquarePiece: startSq.getPiece,
			});
		}
	}

	handlePieces(startSq: Square, endSq: Square): void {
		let startPiece = startSq.getPiece;
		let endPiece = endSq.getPiece;

		if (endPiece) {
			console.log('Removing piece from the end square');
			this._pieces = this._pieces.filter(
				(p: PieceSquare) => p.square !== endSq.getSquareName
			);
		}
		if (startSq.getPiece) {
			console.log('Removing piece from the starting square');
			this._pieces = this._pieces.filter(
				(p: PieceSquare) => p.square !== startSq.getSquareName
			);
			console.log('Adding piece to the end square');
			endSq.setPiece(startSq.getPiece);
			let endSquareToPiece = endSq;
			endSq.setSquareForPiece(endSquareToPiece);
			startSq.setPiece(null);
			this._pieces.push({
				square: endSq.getSquareName,
				piece: endSq.getPiece!,
			});
		}
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

	analyzeFen(pieces: string[]) {
		for (let i = 0; i < 8; i++) {
			let str = pieces[i];
			if (str.length !== 8) {
				//todo non-starting position
			} else if (str !== '8') {
				//if str is 8 its an empty row
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

class Game {
	chess: Chess;
	gameOver: boolean;

	constructor(chess: Chess) {
		this.chess = chess;
		this.gameOver = false;
	}

	async playTerminal() {
		chess.startingPosition();
		while (!this.gameOver) {
			await this.terminalMoves();
		}
		console.log('Game over!');
	}

	terminalMoves(): Promise<void> {
		console.log(chess.printBoardWhite());
		const rl = readline.createInterface(process.stdin, process.stdout);
		rl.question(`Input move for ${chess.whoseTurn()}:\n`, (input) => {
			if (input === '') {
				this.gameOver = true;
				rl.close();
				return new Promise((resolve) => rl.on('close', resolve));
			}

			console.log(`Trying ${input}`);
			let split = input.toLowerCase().split(' ');
			try {
				chess.movePiece(split[0], split[1]);
				rl.close();
				return new Promise((resolve) => rl.on('close', resolve));
			} catch {
				console.log('Invalid move, try again');
				rl.close();
				return new Promise((resolve) => rl.on('close', resolve));
			}
		});
		return new Promise((resolve) => rl.on('close', resolve));
	}
}

class Piece {
	protected name: string;
	protected color: Color | undefined;
	protected square?: Square;

	constructor(square?: Square, color?: Color) {
		this.name = '';
		this.square = square;
		this.color = color;
	}

	get getName() {
		return this.name;
	}

	get getColor() {
		return this.color;
	}

	get getSquare() {
		return this.square;
	}

	move(
		startSq: Square,
		endSq: Square,
		board: Board,
		piece?: string
	): boolean | Piece {
		return false;
	}

	getFirstLetter() {
		return this.name[0];
	}

	setSquare(sq: Square) {
		console.log(`${this.getName} set on ${sq}`);
		this.square = sq;
	}

	static capturable(startSq: Square, endSq: Square): boolean {
		if (
			startSq.getPiece?.color === endSq.getPiece?.color &&
			endSq.getPiece !== null
		) {
			console.log('Cannot capture own piece or capture on an empty square');
			return false;
		}
		console.log('capturable');
		return true;
	}

	possibleMoves(board: Board): SingleMove[] {
		console.log('Piece without type has no possible moves');
		return [];
	}

	//for bishop and queen
	static isDiagonal(startSq: Square, endSq: Square, board: Board): boolean {
		let fileDiff = Math.abs(
			Board.findFileIndex(startSq.getFile) - Board.findFileIndex(endSq.getFile)
		);
		let rankDiff = Math.abs(startSq.getRank - endSq.getRank);
		if (fileDiff === rankDiff && fileDiff === 1) {
			return true;
		}
		if (fileDiff === rankDiff) {
			return Piece.diagonalPiecesOnTheWay(startSq, endSq, rankDiff, board);
		}
		return false;
	}
	//for bishop and queen
	static diagonalPiecesOnTheWay(
		startSq: Square,
		endSq: Square,
		rankDiff: number,
		board: Board
	): boolean {
		let index = 0;
		let startFileIndex = Board.findFileIndex(startSq.getFile);
		let endFileIndex = Board.findFileIndex(endSq.getFile);
		//find index of the next square to test
		if (startSq.getRank < endSq.getRank && startFileIndex > endFileIndex) {
			index = 7;
		} else if (
			startSq.getRank < endSq.getRank &&
			startFileIndex < endFileIndex
		) {
			index = 9;
		} else if (
			startSq.getRank > endSq.getRank &&
			startFileIndex > endFileIndex
		) {
			index = -9;
		} else index = -7;

		let startSqIndex = startSq.getId + index;

		for (let i = 0; i < rankDiff; i++, startSqIndex += index) {
			let sq = board.getSquareById(startSqIndex);
			if (sq === endSq) break;
			else if (!sq) return false;
			else if (sq.getPiece !== null) {
				console.log('Piece on the way');
				return false;
			}
		}
		console.log('No diagonal pieces on the way');
		return true;
	}

	//for rook and queen
	//left and right movement
	static horizontalMove(startSq: Square, endSq: Square, board: Board): boolean {
		console.log('horizontal move by ' + startSq.getPiece?.getName);
		let index = startSq.getFile < endSq.getFile ? 1 : -1;
		let startSqIndex = startSq.getId + index;
		let horizontalDiff = Math.abs(endSq.getId - startSq.getId);
		if (horizontalDiff === 1 && endSq.getPiece === null) return true;
		for (let i = 0; i < horizontalDiff; i++, startSqIndex += index) {
			let sq = board.getSquareById(startSqIndex);
			if (sq === startSq) continue;
			else if (sq === endSq) break;
			else if (!sq) return false;
			else if (sq.getPiece !== null) {
				console.log('Piece on the way');
				return false;
			}
		}
		return true;
	}
	//for rook and queen
	//up and down movement
	static verticalMove(startSq: Square, endSq: Square, board: Board): boolean {
		console.log('vertical move by ' + startSq.getPiece?.getName);
		let index = startSq.getId < endSq.getId ? 8 : -8;
		let startSqIndex = startSq.getId + index;
		let verticalDiff = Math.abs(endSq.getRank - startSq.getRank);
		if (verticalDiff === 1 && endSq.getPiece === null) return true;
		for (let i = 0; i < verticalDiff; i++, startSqIndex += index) {
			let sq = board.getSquareById(startSqIndex);
			if (sq === startSq) continue;
			if (!sq) return false;
			else if (sq === endSq) break;
			else if (sq.getPiece !== null) {
				console.log('Piece on the way');
				return false;
			}
		}
		return true;
	}
}

class Pawn extends Piece {
	override readonly color: Color;

	constructor(square: Square, color: Color) {
		super(square);
		this.color = color;
		if (color === Color.white) {
			this.name = ChessPieces.PAWN_WHITE;
		} else {
			this.name = ChessPieces.PAWN_BLACK;
		}
	}

	override move(
		startSq: Square,
		endSq: Square,
		board: Board,
		piece?: string
	): boolean | Piece {
		if (this.color === Color.white) {
			return Pawn.moveWhite(startSq, endSq, board, piece);
		} else if (this.color === Color.black) {
			return Pawn.moveBlack(startSq, endSq, board, piece);
		} else {
			console.log('Piece not found');
			return false;
		}
	}

	static moveWhite(
		startSq: Square,
		endSq: Square,
		board: Board,
		pieceToPromote?: string
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
			return Pawn.capture(startSq, endSq, pieceToPromote);
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

	static moveBlack(
		startSq: Square,
		endSq: Square,
		board: Board,
		pieceToPromote?: string
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
			return Pawn.capture(startSq, endSq, pieceToPromote);
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
		pieceToPromote?: string
	): boolean | Piece {
		let secondToLastRank = startSq.getPiece?.getColor === Color.white ? 7 : 2;
		let promotionRank = startSq.getPiece?.getColor === Color.white ? 8 : 1;
		let EpStartSqRank = startSq.getPiece?.getColor === Color.white ? 5 : 4;
		let EpEndSqRank = startSq.getPiece?.getColor === Color.white ? 6 : 3;
		let color: Color | null =
			startSq.getPiece?.getColor === Color.white ? Color.black : null;

		//check if it's your own piece
		if (Piece.capturable(startSq, endSq)) {
			//check if it's en passant
			if (
				startSq.getRank === EpStartSqRank &&
				endSq.getRank === EpEndSqRank &&
				Pawn.compareFiles(startSq.getFile, endSq.getFile)
			) {
				return this.enPassant(EpStartSqRank);
			}
			//check if it's a promotion
			//enpassant is checked before this cause endSq.piece is null on enpassant
			else if (endSq.getPiece === null) {
				console.log("Pawns can't go diagonally without capturing a piece");
				return false;
			}
			//check if it's a promotion
			else if (
				startSq.getRank === secondToLastRank &&
				endSq.getRank === promotionRank &&
				Pawn.compareFiles(startSq.getFile, endSq.getFile) &&
				pieceToPromote &&
				color
			) {
				return Pawn.promotion(endSq, pieceToPromote, color);
			}
			//normal capture logic
			else if (
				Math.abs(startSq.getRank - endSq.getRank) === 1 &&
				Pawn.compareFiles(startSq.getFile, endSq.getFile)
			) {
				console.log('Captured a piece with pawn on ' + endSq.getSquareName);
				return true;
			}
		}
		console.log('Error capturing with pawn');
		return false;
	}

	static startingSquareMove(
		startSq: Square,
		endSq: Square,
		board: Board
	): boolean {
		if (
			Math.abs(startSq.getRank - endSq.getRank) === 1 &&
			endSq.getPiece === null
		) {
			console.log('Moved pawn one square forward');
			return true;
		} else if (
			endSq.getRank - startSq.getRank === 2 &&
			endSq.getPiece === null &&
			board.getSquare(`${startSq.getFile}${startSq.getRank + 1}`)?.getPiece ===
				null
		) {
			console.log('Moved and sniped white pawn');
			return true;
		} else if (
			startSq.getRank - endSq.getRank === 2 &&
			endSq.getPiece === null &&
			board.getSquare(`${startSq.getFile}${startSq.getRank - 1}`)?.getPiece ===
				null
		) {
			console.log('Moved and sniped black pawn');
			return true;
		} else {
			console.log('Error moving the pawn from starting square');
			return false;
		}
	}

	static promotion(endSq: Square, piece: string, color: Color): Piece {
		switch (piece) {
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

	static enPassant(EpStartSqRank: number): boolean {
		let latestMove = chess.latestMove();
		if (
			(EpStartSqRank === 5 &&
				latestMove?.startSq.getRank === 7 &&
				latestMove.endSq.getRank === 5) ||
			(EpStartSqRank === 4 &&
				latestMove?.startSq.getRank === 2 &&
				latestMove.endSq.getRank === 4)
		) {
			console.log('En passant successful');
			latestMove.endSq.setPiece(null);
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

class Knight extends Piece {
	override readonly color: Color;

	constructor(square: Square, color: Color) {
		super(square);
		this.color = color;
		if (color === Color.white) {
			this.name = ChessPieces.KNIGHT_WHITE;
		} else this.name = ChessPieces.KNIGHT_BLACK;
	}

	override move(startSq: Square, endSq: Square): boolean {
		if (startSq.getColor === endSq.getColor) {
			console.log('Knight cannot move to same color square');
			return false;
		} else if (
			startSq.getPiece &&
			Knight.knightMoves(startSq, endSq) &&
			endSq.getPiece === null
		) {
			return true;
		} else if (
			startSq.getPiece &&
			Knight.knightMoves(startSq, endSq) &&
			endSq.getPiece !== null
		) {
			return Knight.capture(startSq, endSq);
		} else return false;
	}

	static capture(startSq: Square, endSq: Square): boolean {
		if (Piece.capturable(startSq, endSq)) {
			return true;
		} else {
			console.log('Capturing with knight failed');
			return false;
		}
	}

	static knightMoves(startSq: Square, endSq: Square): boolean {
		return (
			(Math.abs(
				Board.findFileIndex(startSq.getFile) -
					Board.findFileIndex(endSq.getFile)
			) === 1 &&
				Math.abs(startSq.getRank - endSq.getRank) === 2) ||
			(Math.abs(
				Board.findFileIndex(startSq.getFile) -
					Board.findFileIndex(endSq.getFile)
			) === 2 &&
				Math.abs(startSq.getRank - endSq.getRank) === 1)
		);
	}

	override possibleMoves(board: Board): SingleMove[] {
		let moves: SingleMove[] = [];
		let startSq = this.square;
		if (startSq) {
			let rank = startSq.getRank;
			let file = startSq.getFile;
			let startSqName = startSq.getSquareName;

			let files = [2, 2, 1, 1, -1, -2, -2, -1];
			let ranks = [1, -1, 2, -2, -2, -1, 1, 2];

			for (let i = 0; i < 8; i++) {
				let nextFile = String.fromCharCode(file.charCodeAt(0) + files[i]);
				let nextRank = rank + ranks[i];
				let sq = board.getSquare(`${nextFile}${nextRank}`);
				if (sq && sq.getSquareName) {
					let endSq = sq.getSquareName;
					moves.push({
						startSq: startSqName,
						endSq: endSq,
					});
				}
			}

			return moves;
		}
		throw new Error('Error making possible knight moves');
	}

	static knightMoveHelper(sq: Square, board: Board): number[] {
		let endSquares: number[] = [];
		let files = [2, 2, 1, 1, -1, -2, -2, -1];
		let ranks = [1, -1, 2, -2, -2, -1, 1, 2];
		if (!sq) return [];
		let file = sq.getFile;
		let rank = sq.getRank;
		for (let i = 0; i < 8; i++) {
			let nextFile = String.fromCharCode(file.charCodeAt(0) + files[i]);
			let nextRank = rank + ranks[i];
			let sq = board.getSquare(`${nextFile}${nextRank}`);
			if (sq && sq.getSquareName) {
				endSquares.push(sq.getSquare.getId);
			}
		}
		return endSquares;
	}
}

class Bishop extends Piece {
	override readonly color: Color;

	constructor(square: Square, color: Color) {
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
			let startSqName = startSq.getSquareName;
			let files = [1, 1, -1, -1];
			let ranks = [1, -1, 1, -1];

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
		throw new Error('Error making possible bishop moves');
	}
}

class Rook extends Piece {
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

class Queen extends Piece {
	override readonly color: Color;

	constructor(square: Square, color: Color) {
		super(square);
		this.color = color;
		if (color === Color.white) {
			this.name = ChessPieces.QUEEN_WHITE;
		} else {
			this.name = ChessPieces.QUEEN_BLACK;
		}
	}

	override move(startSq: Square, endSq: Square, board: Board): boolean {
		if (startSq.getPiece && endSq.getPiece !== null) {
			if (Piece.capturable(startSq, endSq)) {
				return Queen.queenMoves(startSq, endSq, board);
			} else {
				console.log('Capturing with queen failed');
				return false;
			}
		}
		return Queen.queenMoves(startSq, endSq, board);
	}

	static queenMoves(startSq: Square, endSq: Square, board: Board): boolean {
		let fileDiff = Math.abs(
			Board.findFileIndex(startSq.getFile) - Board.findFileIndex(endSq.getFile)
		);
		let rankDiff = Math.abs(startSq.getRank - endSq.getRank);
		if (fileDiff === rankDiff && startSq !== endSq) {
			return Piece.isDiagonal(startSq, endSq, board);
		} else if (fileDiff === 0) {
			return Piece.verticalMove(startSq, endSq, board);
		} else if (rankDiff === 0) {
			return Piece.horizontalMove(startSq, endSq, board);
		} else return false;
	}

	override possibleMoves(board: Board): SingleMove[] {
		let moves: SingleMove[] = [];
		let startSq = this.square;
		if (startSq) {
			let rookMoveFiles = [1, -1, 0, 0];
			let rookMoveRanks = [0, 0, 1, -1];
			let bishopMoveFiles = [1, 1, -1, -1];
			let bishopMoveRanks = [1, -1, 1, -1];

			moves = moves.concat(
				Queen.queenMoveHelper(rookMoveFiles, rookMoveRanks, board, startSq),
				Queen.queenMoveHelper(bishopMoveFiles, bishopMoveRanks, board, startSq)
			);
			return moves;
		}
		throw new Error('Error making possible queen moves');
	}

	static queenMoveHelper(
		k: number[],
		t: number[],
		board: Board,
		startSq: Square
	) {
		let moves: SingleMove[] = [];
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 7; j++) {
				let rank = startSq.getRank;
				let file = startSq.getFile;
				let startSqName = startSq.getSquareName;
				let nextFile = String.fromCharCode(
					file.charCodeAt(0) + k[i] + j * k[i]
				);
				let nextRank = rank + t[i] + j * t[i];
				let sq = board.getSquare(`${nextFile}${nextRank}`);

				if (!sq) break;
				if (sq && sq.getSquareName) {
					moves.push({
						startSq: startSqName,
						endSq: sq.getSquareName,
					});
				}
			}
		}
		return moves;
	}
}

class King extends Piece {
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

	whiteCheck(board: Board): boolean {
		let sq = this.getSquare;
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
				(testSqPieceName && testSqPieceName === 'B') ||
				testSqPieceName === 'Q'
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
				(testSqPieceName && testSqPieceName === 'B') ||
				testSqPieceName === 'Q'
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
				(testSqPieceName && testSqPieceName === 'B') ||
				testSqPieceName === 'Q'
			) {
				console.log(
					'King is in check from square ' +
						testSq.getSquareName +
						' by ' +
						testSqPiece
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

	blackCheck(board: Board): boolean {
		let sq = this.getSquare;
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
						testSqPiece
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

const chess = new Chess();
// chess.putPieceOnBoard(
// 	'e2',
// 	new Pawn(chess.getBoard.getSquare('e2')!, Color.white)
// );
// chess.putPieceOnBoard(
// 	'd7',
// 	new Pawn(chess.getBoard.getSquare('d7')!, Color.black)
// );
// console.log(chess.printBoardWhite());
// chess.movePiece('e2', 'e4');
// chess.movePiece('d7', 'd5');
// chess.movePiece('e4', 'd5');

// console.log(chess.getPieces);

// chess.fen(Chess.STARTING_POSITION);
// console.log(chess.printBoardWhite());

// // enpassant test
// chess.fen(Chess.STARTING_POSITION);
// chess.movePiece('e2', 'e4');
// chess.movePiece('d7', 'd5');
// chess.movePiece('e4', 'd5');
// chess.movePiece('g8', 'f6');
// chess.movePiece('g1', 'e2');
// chess.movePiece('c7', 'c5');
// chess.movePiece('d5', 'c6');

// // // knights test
// chess.fen(Chess.STARTING_POSITION);
// chess.movePiece('b1', 'c3');
// chess.movePiece('b8', 'c6');
// chess.movePiece('c3', 'd5');
// chess.movePiece('c6', 'e5');
// chess.movePiece('d5', 'b6');
// chess.movePiece('e5', 'f3');
// chess.movePiece('g2', 'f3');
// chess.movePiece('g8', 'h6');

// // // bishop test
// chess.fen(Chess.STARTING_POSITION);
// chess.movePiece('e2', 'e4');
// chess.movePiece('e7', 'e5');
// chess.movePiece('f1', 'c4');
// chess.movePiece('a7', 'a5');
// chess.movePiece('d2', 'd3');
// chess.movePiece('a5', 'a4');
// chess.movePiece('c4', 'd5');
// chess.movePiece('h7', 'h6');
// chess.movePiece('d5', 'c6');
// chess.movePiece('h6', 'h5');
// chess.movePiece('c6', 'a4');

// // // //rook test
// chess.emptyBoard();
// chess.putPieceOnBoard(
// 	'a1',
// 	new Rook(chess.getBoard.getSquare('a1')!, Color.white)
// );
// chess.putPieceOnBoard(
// 	'd8',
// 	new Rook(chess.getBoard.getSquare('a1')!, Color.black)
// );
// chess.movePiece('a1', 'h1');
// chess.movePiece('d8', 'd1');
// chess.movePiece('h1', 'd1');

// // //queen testing
// chess.emptyBoard();
// chess.putPieceOnBoard(
// 	'a1',
// 	new Queen(chess.getBoard.getSquare('a1')!, Color.white)
// );
// chess.putPieceOnBoard(
// 	'a1',
// 	new Queen(chess.getBoard.getSquare('a1')!, Color.white)
// );
// chess.putPieceOnBoard(
// 	'a7',
// 	new Queen(chess.getBoard.getSquare('a7')!, Color.black)
// );
// chess.putPieceOnBoard(
// 	'd8',
// 	new Queen(chess.getBoard.getSquare('d8')!, Color.black)
// );
// chess.movePiece('a1', 'h1');
// chess.movePiece('d8', 'd1');
// chess.movePiece('h1', 'f3');
// chess.movePiece('d1', 'f3');

// // //king testing
// chess.emptyBoard();
// chess.putPieceOnBoard(
// 	'e1',
// 	new King(chess.getBoard.getSquare('e1')!, Color.white)
// );
// chess.putPieceOnBoard(
// 	'e8',
// 	new King(chess.getBoard.getSquare('e8')!, Color.black)
// );
// chess.movePiece('e1', 'e2');
// chess.movePiece('e8', 'd7');
// chess.movePiece('e2', 'f3');
// chess.movePiece('d7', 'e7');

// console.log(chess.algebraicNotation());
// console.log(chess.printBoardWhite());

// console.log(chess.latestMove());
// console.log(chess.printBoardWhite());
// console.log(chess.getBoard);
// chess.startingPosition();

// //get
// console.log(
// 	chess.getBoard.getSquare(
// 		`${String.fromCharCode(
// 			chess.getBoard.getSquare('e2')!.getFile.charCodeAt(0) + 1
// 		)}${chess.getBoard.getSquare('e2')!.getRank + 1}`
// 	)
// );

// console.log(
// 	chess.getBoard.getSquare('a2')!.getPiece?.possibleMoves(chess.getBoard)
// );
// console.log(chess.printBoardWhite());

// console.log(chess.printBoardWhite());
// chess.movePiece('d5', 'd4');
// console.log(chess.getBoard.getSquare('d4')?.getPiece);
// chess.emptyBoard();
const knight = new Knight(chess.getBoard.getSquare('a1')!, Color.black);
chess.putPieceOnBoard('a1', knight);
// console.log(queen.possibleMoves(chess.getBoard));
// chess.emptyBoard();
const king = new King(chess.getBoard.getSquare('c2')!, Color.white);
chess.putPieceOnBoard('c2', king);
king.whiteCheck(chess.getBoard);
// console.log(chess.getBoard.getSquare('a2'));
// console.log(chess.getBoard.getSquareById(21));
// console.log(chess.getBoard.getSquareById(28));

// chess.fen(Chess.STARTING_POSITION);
// console.log(chess.printBoardWhite());

// const game = new Game(chess);
// game.playTerminal();
console.timeEnd('c');

//possible moves
//checking
