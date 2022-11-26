console.time('c');
import readline from 'readline';
console.time('Chess');

enum Color {
	black = 'BLACK',
	white = 'WHITE',
}

interface Move {
	startSq: Square;
	endSq: Square;
	startSquarePiece: Piece;
	promotion?: Piece | null;
}

interface SingleMove {
	startSq: string;
	endSq: string;
}

enum ChessPieces {
	PAWN_WHITE = 'pawn',
	PAWN_BLACK = 'PAWN',
	KNIGHT_WHITE = 'night', //first letter n for printing purposes
	KNIGHT_BLACK = 'NIGHT', //first letter n for printing purposes
	BISHOP_WHITE = 'bishop',
	BISHOP_BLACK = 'BISHOP',
	ROOK_WHITE = 'rook',
	ROOK_BLACK = 'ROOK',
	QUEEN_WHITE = 'queen',
	QUEEN_BLACK = 'QUEEN',
	KING_WHITE = 'king',
	KING_BLACK = 'KING',
}

class Square {
	file: string;
	rank: number;
	squareName: string;
	color: Color;
	piece: Piece | null;
	id: number;

	constructor(
		file: string,
		rank: number,
		squareName: string,
		color: Color,
		id: number,
		piece: Piece | null
	) {
		this.file = file;
		this.rank = rank;
		this.squareName = squareName;
		this.color = color;
		this.piece = piece;
		this.id = id;
	}

	get getSquare() {
		return this;
	}

	get getSquareName() {
		return this.squareName;
	}
}

interface PieceSquare {
	square: string;
	piece: Piece;
}

export default class Chess {
	private _board: Square[];
	private _moves: Move[];

	private _pieces: PieceSquare[];
	private _turnNumber: number;

	static files: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
	static STARTING_POSITION =
		'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

	constructor(moves?: Move[], pieces?: PieceSquare[]) {
		this._board = new Array(64);
		this._moves = moves ? moves : [];

		this._pieces = pieces ? pieces : [];
		this._turnNumber = 0;

		let firstSquare = Color.black;
		let secondSquare = Color.white;
		let rank = 1;

		for (let i = 0, file = 0; i < this._board.length; i++, file++) {
			if (file === 8) {
				file = 0;
				rank++;
				let temp: Color = firstSquare;
				firstSquare = secondSquare;
				secondSquare = temp;
			}

			if (i % 2 === 0) {
				this._board[i] = new Square(
					Chess.files[file],
					rank,

					`${Chess.files[file]}${rank}`,
					firstSquare,
					i,
					null
				);
			} else {
				this._board[i] = new Square(
					Chess.files[file],
					rank,
					`${Chess.files[file]}${rank}`,
					secondSquare,
					i,
					null
				);
			}
		}
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

	isGameOver(n: number): boolean {
		return n === 0 ? true : false;
	}

	printBoardWhite() {
		let rows = ['', '', '', '', '', '', '', ''];

		for (const i of this._board) {
			if (i.piece) {
				rows[i.rank - 1] += i.piece.getFirstLetter() + '  ';
			} else {
				rows[i.rank - 1] += i.file + i.rank + ' ';
			}
		}
		return rows.reverse();
	}

	printBoardBlack() {
		let rows = ['', '', '', '', '', '', '', ''];

		for (const i of this._board) {
			if (i.piece) {
				rows[i.rank - 1] =
					' ' + i.piece.getFirstLetter() + ' ' + rows[i.rank - 1];
			} else {
				rows[i.rank - 1] = i.file + i.rank + ' ' + rows[i.rank - 1];
			}
		}

		return rows.reverse();
	}

	getSquare(name: string): Square | null {
		let sq = this._board.find((s: Square) => s.squareName === name);
		return sq ? sq.getSquare : null;
	}

	getSquareById(id: number): Square | null {
		let sq = this._board.find((s: Square) => s.id === id);
		return sq ? sq.getSquare : null;
	}

	movePiece(startSquare: string, endSquare: string, pieceName?: string): void {
		if (startSquare === endSquare) {
			console.log('Same starting and ending square');
			throw new Error("Didn't move the piece");
		}
		let startSq = this.getSquare(startSquare);
		let endSq = this.getSquare(endSquare);

		//returns piece if promoting a pawn
		let isLegalMoveOrPiece: boolean | Piece;
		if (startSq?.piece?.getColor !== this.checkTurn()) {
			console.log('Wrong players turn');
			throw new Error();
		}

		if (startSq !== null && startSq.piece !== null && endSq !== null) {
			//check if pawn is about to promote
			if (
				(startSq?.rank === 7 &&
					endSq?.rank === 8 &&
					startSq.piece?.getName === ChessPieces.PAWN_WHITE) ||
				(startSq?.rank === 2 &&
					endSq?.rank === 1 &&
					startSq.piece?.getName === ChessPieces.PAWN_BLACK)
			) {
				isLegalMoveOrPiece = startSq.piece.move(startSq, endSq, pieceName);
			} else {
				isLegalMoveOrPiece = startSq.piece.move(startSq, endSq);
			}

			//is only an object if promoting a pawn, if not object this runs
			if (typeof isLegalMoveOrPiece !== 'object' && isLegalMoveOrPiece) {
				this.addMove(startSq, endSq);
				endSq.piece = startSq.piece;
				startSq.piece = null;
				return;
			}
			//promotion logic
			else if (isLegalMoveOrPiece) {
				endSq.piece = isLegalMoveOrPiece;
				this.addMove(startSq, endSq);
				startSq.piece = null;
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
		if (startSq.piece) {
			this._moves.push({
				startSq: startSq,
				endSq: endSq,
				startSquarePiece: startSq.piece,
			});
		}
	}

	handlePieces(startSq: Square, endSq: Square): void {
		if (endSq.piece) {
			console.log('Removing piece from the end square');
			this._pieces = this._pieces.filter(
				(p: PieceSquare) => p.square !== endSq.getSquareName
			);
		}
		if (startSq.piece) {
			console.log('Removing piece from the starting square');
			this._pieces = this._pieces.filter(
				(p: PieceSquare) => p.square !== startSq.getSquareName
			);
			console.log('Adding piece to the end square');
			this._pieces.push({
				square: endSq.getSquareName,
				piece: startSq.piece,
			});
		}
	}

	//initialization or promoting
	putPieceOnBoard(square: string, piece: Piece): void {
		let sq = this.getSquare(square);
		if (sq && !this.isSquareOccupied(sq)) {
			this.removePiece(square);
		}
		if (sq) {
			sq.piece = piece;
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

	isSquareOccupied(sq: Square): boolean {
		return sq.piece === null;
	}

	algebraicNotation(): string[] {
		let returnArray: string[] = [];
		let s: string = '';

		for (const move of this.getMoves) {
			let startSqPiece =
				move.startSq.piece &&
				move.startSq.piece.getFirstLetter().toLowerCase() !== 'p'
					? move.startSq.piece.getFirstLetter()
					: '';

			let piece = move.endSq.piece ? move.endSq.piece.getFirstLetter() : '';

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
		//initialize game
		this._moves = [];
		this._pieces = [];
		this._turnNumber = 0;
		this._board.forEach((s) => {
			s.piece = null;
		});
		for (let i = 0; i < 8; i++) {
			let str = pieces[i];
			if (str.length !== 8) {
				//todo non-starting position
			} else if (str !== '8') {
				for (let j = i * 8, k = 0; j < i * 8 + 8; j++, k++) {
					let sq = this.getSquareById(j);
					if (sq) {
						let piece = Chess.fenPieces(str[k], sq);

						if (piece !== null) {
							this.putPieceOnBoard(sq.getSquareName, piece);
						}
					}
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
		this._board.forEach((s) => {
			s.piece = null;
		});
		this._moves = [];
		this._pieces = [];
		this._turnNumber = 0;
	}

	startingPosition(): void {
		this.fen(Chess.STARTING_POSITION);
	}

	static findFileIndex(s: string): number {
		return Chess.files.findIndex((e) => e === s);
	}
}

class Game {
	chess: Chess;

	constructor(chess: Chess) {
		this.chess = chess;
	}

	async playTerminal() {
		chess.startingPosition();
		let gameOver: number = 1;
		while (!this.chess.isGameOver(gameOver)) {
			await this.terminalMoves();
		}
		console.log('Checkmate');
	}
	terminalMoves(): Promise<void> {
		console.log(chess.printBoardWhite());
		const rl = readline.createInterface(process.stdin, process.stdout);
		rl.question(`Input move for ${chess.whoseTurn()}:\n`, (input) => {
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
	protected square: Square;

	constructor(square: Square, color?: Color) {
		this.name = '';
		this.square = square;
		this.color = color;
	}

	move(startSq: Square, endSq: Square, piece?: string): boolean | Piece {
		return false;
	}

	getFirstLetter() {
		return this.name[0];
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

	static capturable(startSq: Square, endSq: Square): boolean {
		if (startSq.piece?.color === endSq.piece?.color && endSq.piece !== null) {
			console.log('Cannot capture own piece or capture on an empty square');
			return false;
		}
		console.log('capturable');
		return true;
	}

	possibleMoves(): SingleMove[] {
		console.log('Piece without type has no possible moves');
		return [];
	}

	//for bishop and queen
	static isDiagonal(startSq: Square, endSq: Square): boolean {
		let fileDiff = Math.abs(
			Chess.findFileIndex(startSq.file) - Chess.findFileIndex(endSq.file)
		);
		let rankDiff = Math.abs(startSq.rank - endSq.rank);
		if (fileDiff === rankDiff && fileDiff === 1) {
			return true;
		}
		if (fileDiff === rankDiff) {
			return Piece.diagonalPiecesOnTheWay(startSq, endSq, rankDiff);
		}
		return false;
	}
	//for bishop and queen
	static diagonalPiecesOnTheWay(
		startSq: Square,
		endSq: Square,
		rankDiff: number
	): boolean {
		let index: number = 0;
		let startFileIndex = Chess.findFileIndex(startSq.file);
		let endFileIndex = Chess.findFileIndex(endSq.file);
		//find index of the next square to test
		if (startSq.rank < endSq.rank && startFileIndex > endFileIndex) {
			index = 7;
		} else if (startSq.rank < endSq.rank && startFileIndex < endFileIndex) {
			index = 9;
		} else if (startSq.rank > endSq.rank && startFileIndex > endFileIndex) {
			index = -9;
		} else index = -7;

		let startSqIndex = startSq.id + index;

		for (let i = 0; i < rankDiff; i++, startSqIndex += index) {
			let sq = chess.getSquareById(startSqIndex);
			if (sq === endSq) break;
			else if (!sq) return false;
			else if (sq.piece !== null) {
				console.log('Piece on the way');
				return false;
			}
		}
		console.log('No diagonal pieces on the way');
		return true;
	}

	//for rook and queen
	static horizontalMove(startSq: Square, endSq: Square): boolean {
		console.log('horizontal move by ' + startSq.piece?.getName);
		let index = startSq.file < endSq.file ? 1 : -1;
		let startSqIndex = startSq.id + index;
		let horizontalDiff = Math.abs(endSq.id - startSq.id);
		if (horizontalDiff === 1 && endSq.piece === null) return true;
		for (let i = 0; i < horizontalDiff; i++, startSqIndex += index) {
			let sq = chess.getSquareById(startSqIndex);
			if (sq === startSq) continue;
			else if (sq === endSq) break;
			else if (!sq) return false;
			else if (sq.piece !== null) {
				console.log('Piece on the way');
				return false;
			}
		}
		return true;
	}
	//for rook and queen
	static verticalMove(startSq: Square, endSq: Square): boolean {
		console.log('vertical move by ' + startSq.piece?.getName);
		let index = startSq.id < endSq.id ? 8 : -8;
		let startSqIndex = startSq.id + index;
		let verticalDiff = Math.abs(endSq.rank - startSq.rank);
		if (verticalDiff === 1 && endSq.piece === null) return true;
		for (let i = 0; i < verticalDiff; i++, startSqIndex += index) {
			let sq = chess.getSquareById(startSqIndex);
			if (sq === startSq) continue;
			if (!sq) return false;
			else if (sq === endSq) break;
			else if (sq.piece !== null) {
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
		piece?: string
	): boolean | Piece {
		if (this.color === Color.white) {
			return Pawn.moveWhite(startSq, endSq, piece);
		} else if (this.color === Color.black) {
			return Pawn.moveBlack(startSq, endSq, piece);
		} else {
			console.log('Piece not found');
			return false;
		}
	}

	static moveWhite(
		startSq: Square,
		endSq: Square,
		pieceToPromote?: string
	): boolean | Piece {
		if (startSq.rank === 8) {
			console.log('How is white pawn on rank 8???');
			return false;
		} else if (endSq.rank < startSq.rank) {
			console.log("Pawns can't go backwards!");
			return false;
		}

		//Moving diagonally logic
		else if (startSq.file !== endSq.file) {
			return Pawn.capture(startSq, endSq, pieceToPromote);
		}

		//startSquare logic
		else if (startSq.rank === 2) {
			return Pawn.startingSquareMove(startSq, endSq);
		}

		//lastrow promote and possibly capture
		else if (startSq.rank === 7 && endSq.rank === 8 && endSq.piece === null) {
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
		else if (endSq.rank - startSq.rank === 1 && endSq.piece === null) {
			console.log('Moved pawn one square forward');
			return true;
		}

		//no valid moves
		return false;
	}

	static moveBlack(
		startSq: Square,
		endSq: Square,
		pieceToPromote?: string
	): boolean | Piece {
		if (startSq.rank === 1) {
			console.log('How is black pawn on rank 8???');
			return false;
		} else if (endSq.rank > startSq.rank) {
			console.log("Pawns can't go backwards!");
			return false;
		}

		//Moving diagonally logic
		else if (startSq.file !== endSq.file) {
			return Pawn.capture(startSq, endSq, pieceToPromote);
		}

		//startSquare logic
		else if (startSq.rank === 7) {
			return Pawn.startingSquareMove(startSq, endSq);
		}

		//lastrow promote and possibly capture
		else if (startSq.rank === 2 && endSq.rank === 1 && endSq.piece === null) {
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
		else if (startSq.rank - endSq.rank === 1 && endSq.piece === null) {
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
		let secondToLastRank = startSq.piece?.getColor === Color.white ? 7 : 2;
		let promotionRank = startSq.piece?.getColor === Color.white ? 8 : 1;
		let EpStartSqRank = startSq.piece?.getColor === Color.white ? 5 : 4;
		let EpEndSqRank = startSq.piece?.getColor === Color.white ? 6 : 3;
		let color: Color | null =
			startSq.piece?.getColor === Color.white ? Color.black : null;

		//check if it's your own piece
		if (Piece.capturable(startSq, endSq)) {
			//check if it's en passant
			if (
				startSq.rank === EpStartSqRank &&
				endSq.rank === EpEndSqRank &&
				Pawn.compareFiles(startSq.file, endSq.file)
			) {
				return this.enPassant(EpStartSqRank);
			}
			//check if it's a promotion
			//enpassant is checked before this cause endSq.piece is null on enpassant
			else if (endSq.piece === null) {
				console.log("Pawns can't go diagonally without capturing a piece");
				return false;
			}
			//check if it's a promotion
			else if (
				startSq.rank === secondToLastRank &&
				endSq.rank === promotionRank &&
				Pawn.compareFiles(startSq.file, endSq.file) &&
				pieceToPromote &&
				color
			) {
				return Pawn.promotion(endSq, pieceToPromote, color);
			}
			//normal capture logic
			else if (
				Math.abs(startSq.rank - endSq.rank) === 1 &&
				Pawn.compareFiles(startSq.file, endSq.file)
			) {
				console.log('Captured a piece with pawn on ' + endSq.squareName);
				return true;
			}
		}
		console.log('Error capturing with pawn');
		return false;
	}

	static startingSquareMove(startSq: Square, endSq: Square): boolean {
		if (Math.abs(startSq.rank - endSq.rank) === 1 && endSq.piece === null) {
			console.log('Moved pawn one square forward');
			return true;
		} else if (
			endSq.rank - startSq.rank === 2 &&
			endSq.piece === null &&
			chess.getSquare(`${startSq.file}${startSq.rank + 1}`)?.piece === null
		) {
			console.log('Moved and sniped white pawn');
			return true;
		} else if (
			startSq.rank - endSq.rank === 2 &&
			endSq.piece === null &&
			chess.getSquare(`${startSq.file}${startSq.rank - 1}`)?.piece === null
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
				latestMove?.startSq.rank === 7 &&
				latestMove.endSq.rank === 5) ||
			(EpStartSqRank === 4 &&
				latestMove?.startSq.rank === 2 &&
				latestMove.endSq.rank === 4)
		) {
			console.log('En passant successful');
			latestMove.endSq.piece = null;
			return true;
		} else {
			console.log('En passant unsuccessful');
			return false;
		}
	}

	static compareFiles(startSqFile: string, endSqFile: string): boolean {
		return (
			Math.abs(
				Chess.findFileIndex(startSqFile) - Chess.findFileIndex(endSqFile)
			) === 1
		);
	}

	override possibleMoves(): SingleMove[] {
		let startSq = this.getSquare;
		if (this.getColor === Color.white) {
			return Pawn.whiteMoves(startSq);
		} else if (this.getColor === Color.black) {
			return Pawn.blackMoves(startSq);
		} else throw new Error("Pawn doesn't have a color");
	}

	static whiteMoves(sq: Square): SingleMove[] {
		let moves: SingleMove[] = [];
		let startSq = sq.getSquareName;
		if (sq.rank === 1) {
			throw new Error('How is the white pawn on the first rank?');
		}
		if (sq.rank === 2) {
			moves.push(
				{
					startSq: startSq,
					endSq: chess.getSquare(`${sq.file}${sq.rank + 1}`)!.getSquareName,
				},
				{
					startSq: startSq,
					endSq: chess.getSquare(`${sq.file}${sq.rank + 2}`)!.getSquareName,
				}
			);
		}
		if (sq.file === 'a') {
			moves.push({
				startSq: startSq,
				endSq: chess.getSquare(`${'b'}${sq.rank + 1}`)!.getSquareName,
			});
		} else if (sq.file === 'h') {
			moves.push({
				startSq: startSq,
				endSq: chess.getSquare(`${'g'}${sq.rank + 1}`)!.getSquareName,
			});
		} else {
			moves.push(
				{
					startSq: startSq,
					endSq: chess.getSquare(
						`${String.fromCharCode(sq.file.charCodeAt(0) + 1)}${sq.rank + 1}`
					)!.getSquareName,
				},
				{
					startSq: startSq,
					endSq: chess.getSquare(
						`${String.fromCharCode(sq.file.charCodeAt(0) - 1)}${sq.rank + 1}`
					)!.getSquareName,
				}
			);
		}
		return moves;
	}

	static blackMoves(sq: Square): SingleMove[] {
		let moves: SingleMove[] = [];
		let startSq = sq.getSquareName;
		if (sq.rank === 8) {
			throw new Error('How is the black pawn on the 8th rank?');
		}
		if (sq.rank === 7) {
			moves.push(
				{
					startSq: startSq,
					endSq: chess.getSquare(`${sq.file}${sq.rank - 1}`)!.getSquareName,
				},
				{
					startSq: startSq,
					endSq: chess.getSquare(`${sq.file}${sq.rank - 2}`)!.getSquareName,
				}
			);
		}
		if (sq.file === 'a') {
			moves.push({
				startSq: startSq,
				endSq: chess.getSquare(`${'b'}${sq.rank - 1}`)!.getSquareName,
			});
		} else if (sq.file === 'h') {
			moves.push({
				startSq: startSq,
				endSq: chess.getSquare(`${'g'}${sq.rank - 1}`)!.getSquareName,
			});
		} else {
			moves.push(
				{
					startSq: startSq,
					endSq: chess.getSquare(
						`${String.fromCharCode(sq.file.charCodeAt(0) + 1)}${sq.rank + 1}`
					)!.getSquareName,
				},
				{
					startSq: startSq,
					endSq: chess.getSquare(
						`${String.fromCharCode(sq.file.charCodeAt(0) - 1)}${sq.rank + 1}`
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
		if (startSq.color === endSq.color) {
			console.log('Knight cannot move to same color square');
			return false;
		} else if (
			startSq.piece &&
			Knight.compareFilesAndRanks(startSq, endSq) &&
			endSq.piece === null
		) {
			return true;
		} else if (
			startSq.piece &&
			Knight.compareFilesAndRanks(startSq, endSq) &&
			endSq.piece !== null
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

	static compareFilesAndRanks(startSq: Square, endSq: Square): boolean {
		return (
			(Math.abs(
				Chess.findFileIndex(startSq.file) - Chess.findFileIndex(endSq.file)
			) === 1 &&
				Math.abs(startSq.rank - endSq.rank) === 2) ||
			(Math.abs(
				Chess.findFileIndex(startSq.file) - Chess.findFileIndex(endSq.file)
			) === 2 &&
				Math.abs(startSq.rank - endSq.rank) === 1)
		);
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

	override move(startSq: Square, endSq: Square): boolean {
		if (startSq.color !== endSq.color) {
			console.log('Bishop cannot move to a different color square');
			return false;
		}

		//capture logic
		if (startSq.piece && endSq.piece !== null) {
			if (Piece.capturable(startSq, endSq)) {
				return Piece.isDiagonal(startSq, endSq);
			} else {
				console.log('Capturing with bishop failed');
				return false;
			}
		}

		return Piece.isDiagonal(startSq, endSq);
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

	override move(startSq: Square, endSq: Square): boolean {
		let isHorizontal = startSq.rank === endSq.rank ? true : false;

		//capture logic
		if (startSq.piece && endSq.piece !== null) {
			if (Piece.capturable(startSq, endSq)) {
				return isHorizontal
					? Piece.horizontalMove(startSq, endSq)
					: Piece.verticalMove(startSq, endSq);
			} else {
				console.log('Capturing with rook failed');
				return false;
			}
		}

		return isHorizontal
			? Piece.horizontalMove(startSq, endSq)
			: Piece.verticalMove(startSq, endSq);
	}

	//sivuttain
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

	override move(startSq: Square, endSq: Square): boolean {
		if (startSq.piece && endSq.piece !== null) {
			if (Piece.capturable(startSq, endSq)) {
				return Queen.queenMoves(startSq, endSq);
			} else {
				console.log('Capturing with queen failed');
				return false;
			}
		}
		return Queen.queenMoves(startSq, endSq);
	}

	static queenMoves(startSq: Square, endSq: Square): boolean {
		let fileDiff = Math.abs(
			Chess.findFileIndex(startSq.file) - Chess.findFileIndex(endSq.file)
		);
		let rankDiff = Math.abs(startSq.rank - endSq.rank);
		if (fileDiff === rankDiff && startSq !== endSq) {
			return Piece.isDiagonal(startSq, endSq);
		} else if (fileDiff === 0) {
			return Piece.verticalMove(startSq, endSq);
		} else if (rankDiff === 0) {
			return Piece.horizontalMove(startSq, endSq);
		} else return false;
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

	override move(startSq: Square, endSq: Square): boolean {
		if (startSq.piece && endSq.piece !== null) {
			if (Piece.capturable(startSq, endSq)) {
				return King.kingMoves(startSq, endSq);
			} else {
				console.log('Capturing with queen failed');
				return false;
			}
		}
		return King.kingMoves(startSq, endSq);
	}

	static kingMoves(startSq: Square, endSq: Square): boolean {
		let fileDiff = Math.abs(
			Chess.findFileIndex(startSq.file) - Chess.findFileIndex(endSq.file)
		);
		let rankDiff = Math.abs(startSq.rank - endSq.rank);

		if (fileDiff > 1 || rankDiff > 1) {
			return false;
		}
		if (fileDiff === rankDiff && startSq !== endSq) {
			return Piece.isDiagonal(startSq, endSq);
		} else if (fileDiff === 0) {
			return Piece.verticalMove(startSq, endSq);
		} else if (rankDiff === 0) {
			return Piece.horizontalMove(startSq, endSq);
		} else return false;
	}
}

const chess = new Chess();
//@ts-ignore
chess.putPieceOnBoard('e2', new Pawn(chess.getSquare('e2'), Color.white));
//@ts-ignore
chess.putPieceOnBoard('d7', new Pawn('d7', Color.black));
console.log(chess.printBoardWhite());
chess.movePiece('e2', 'e4');
chess.movePiece('d7', 'd5');
chess.movePiece('e4', 'd5');

console.log(chess.getPieces);
const game = new Game(chess);
// game.playTerminal();

// chess.fen(Chess.STARTING_POSITION);
// console.log(chess.printBoardWhite());

// // enpassant test
chess.fen(Chess.STARTING_POSITION);
chess.movePiece('e2', 'e4');
chess.movePiece('d7', 'd5');
chess.movePiece('e4', 'd5');
chess.movePiece('g8', 'f6');
chess.movePiece('g1', 'e2');
chess.movePiece('c7', 'c5');
chess.movePiece('d5', 'c6');

// // knights test
chess.fen(Chess.STARTING_POSITION);
chess.movePiece('b1', 'c3');
chess.movePiece('b8', 'c6');
chess.movePiece('c3', 'd5');
chess.movePiece('c6', 'e5');
chess.movePiece('d5', 'b6');
chess.movePiece('e5', 'f3');
chess.movePiece('g2', 'f3');
chess.movePiece('g8', 'h6');

// // bishop test
chess.fen(Chess.STARTING_POSITION);
chess.movePiece('e2', 'e4');
chess.movePiece('e7', 'e5');
chess.movePiece('f1', 'c4');
chess.movePiece('a7', 'a5');
chess.movePiece('d2', 'd3');
chess.movePiece('a5', 'a4');
chess.movePiece('c4', 'd5');
chess.movePiece('h7', 'h6');
chess.movePiece('d5', 'c6');
chess.movePiece('h6', 'h5');
chess.movePiece('c6', 'a4');

// //rook test
chess.emptyBoard();
//@ts-ignore
chess.putPieceOnBoard('a1', new Rook(chess.getSquare('a1'), Color.white));
//@ts-ignore
chess.putPieceOnBoard('d8', new Rook(chess.getSquare('a1'), Color.black));
chess.movePiece('a1', 'h1');
chess.movePiece('d8', 'd1');
chess.movePiece('h1', 'd1');

// //queen testing
chess.emptyBoard();
//@ts-ignore
chess.putPieceOnBoard('a1', new Queen(chess.getSquare('a1'), Color.white));
//@ts-ignore
chess.putPieceOnBoard('a1', new Queen(chess.getSquare('a1'), Color.white));
//@ts-ignore
chess.putPieceOnBoard('a7', new Queen(chess.getSquare('a7'), Color.black));
//@ts-ignore
chess.putPieceOnBoard('d8', new Queen(chess.getSquare('d8'), Color.black));
chess.movePiece('a1', 'h1');
chess.movePiece('d8', 'd1');
chess.movePiece('h1', 'f3');
chess.movePiece('d1', 'f3');

// //king testing
chess.emptyBoard();
//@ts-ignore
chess.putPieceOnBoard('e1', new King(chess.getSquare('e1'), Color.white));
//@ts-ignore
chess.putPieceOnBoard('e8', new King(chess.getSquare('e8'), Color.black));
chess.movePiece('e1', 'e2');
chess.movePiece('e8', 'd7');
chess.movePiece('e2', 'f3');
chess.movePiece('d7', 'e7');

console.log(chess.algebraicNotation());
console.log(chess.printBoardWhite());

console.log(chess.latestMove());
console.log(chess.printBoardWhite());
console.log(chess.getBoard);
chess.startingPosition();
console.log(
	chess.getSquare(
		`${String.fromCharCode(chess.getSquare('e2')!.file.charCodeAt(0) + 1)}${
			chess.getSquare('e2')!.rank + 1
		}`
	)
);

console.log(chess.getSquare('a2')!.piece?.possibleMoves());

// console.log(chess.printBoardWhite());

// console.log(chess.printBoardWhite());
console.timeEnd('c');
