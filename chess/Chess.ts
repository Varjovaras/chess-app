enum Color {
	black = 'BLACK',
	white = 'WHITE',
}

interface Move {
	startSquare: Square;
	endSquare: Square;
	startSquarePiece: Piece;
	promotion?: Piece | null;
}

enum ChessPieces {
	PAWN_WHITE = 'pawn',
	PAWN_BLACK = 'PAWN',
	KNIGHT_WHITE = 'night',
	KNIGHT_BLACK = 'NIGHT',
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

class Chess {
	private _board: Square[];
	private _moves: Move[];

	private _pieces: Piece[];
	private _turnNumber: number;

	static files: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
	static STARTING_POSITION =
		'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

	constructor(moves?: Move[], pieces?: Piece[]) {
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

	set setMoves(moves: Move[]) {
		this._moves = moves;
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
			console.log("Didn't move the piece");
			return;
		}
		let startSq = this.getSquare(startSquare);
		let endSq = this.getSquare(endSquare);
		let isLegalMoveOrPiece: boolean | Piece;
		if (startSq?.piece?.getColor !== chess.checkTurn()) {
			console.log('Wrong players turn');
			return;
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
				endSq.piece = startSq.piece;
				this.addMove(startSq, endSq);
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
	}

	addMove(startSq: Square, endSq: Square): void {
		if (startSq.piece) {
			this._moves.push({
				startSquare: startSq,
				endSquare: endSq,
				startSquarePiece: startSq.piece,
			});
		}
		this.incrementMoveNumber();
	}

	algebraicNotation(): string[] {
		let returnArray: string[] = [];
		let s: string = '';

		for (const move of this.getMoves) {
			let startSqPiece =
				move.startSquare.piece &&
				move.startSquare.piece.getFirstLetter().toLowerCase() !== 'p'
					? move.startSquare.piece.getFirstLetter()
					: '';

			let piece = move.endSquare.piece
				? move.endSquare.piece.getFirstLetter()
				: '';

			s =
				s +
				`${startSqPiece}${move.startSquare.getSquareName} ${
					move.endSquare.getSquareName
				}${piece.toUpperCase()}`;

			returnArray = returnArray.concat(s);
			s = '';
		}

		return returnArray;
	}

	//initialization or promoting
	putPiece(square: string, piece: Piece) {
		let sq = this.getSquare(square);
		if (sq) {
			sq.piece = piece;
			console.log(`${piece.getName} put on ${square}`);
		} else {
			console.log('No square found');
		}
	}

	fen(fen: string): void {
		let tokens = fen.split(/\s+/);
		let pieces = tokens[0].split('/');
		for (let i = 0; i < 8; i++) {
			let str = pieces[i];
			if (str.length !== 8) {
				//todo non-starting position
			} else if (str !== '8') {
				for (let j = i * 8, k = 0; j < i * 8 + 8; j++, k++) {
					let piece = Chess.fenPieces(str[k]);
					let sq = this.getSquareById(j)?.squareName;
					if (sq && piece !== null) {
						this.putPiece(sq, piece);
					}
				}
			}
		}
	}

	static fenPieces(s: string): Piece | null {
		switch (s) {
			case 'p':
				return new Pawn(Color.white);
			case 'P':
				return new Pawn(Color.black);
			case 'n':
				return new Knight(Color.white);
			case 'N':
				return new Knight(Color.black);
			case 'b':
				return new Bishop(Color.white);
			case 'B':
				return new Bishop(Color.black);
			case 'r':
				return new Rook(Color.white);
			case 'R':
				return new Rook(Color.black);
			case 'q':
				return new Queen(Color.white);
			case 'Q':
				return new Queen(Color.black);
			case 'k':
				return new King(Color.white);
			case 'K':
				return new King(Color.black);
			default:
				return null;
		}
	}

	startingPosition(): void {
		this.fen(Chess.STARTING_POSITION);
	}

	static findFileIndex(s: string): number {
		return Chess.files.findIndex((e) => e === s);
	}
}

class Piece {
	protected name: string;
	protected color: Color | undefined;

	constructor(color?: Color) {
		this.name = '';
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

	static capturable(startSq: Square, endSq: Square): boolean {
		if (startSq.piece?.color === endSq.piece?.color && endSq.piece !== null) {
			console.log('Cannot capture own piece or capture on an empty square');
			return false;
		}
		console.log('capturable');
		return true;
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
		console.log('horizontal move by ' + startSq.piece);
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
		console.log('vertical move by ' + startSq.piece);
		let index = startSq.id < endSq.id ? 8 : -8;
		let startSqIndex = startSq.id + index;
		let verticalDiff = Math.abs(endSq.rank - startSq.rank);
		if (verticalDiff === 1 && endSq.piece === null) return true;
		for (let i = 0; i < verticalDiff; i++, startSqIndex += index) {
			let sq = chess.getSquareById(startSqIndex);
			console.log(sq?.getSquareName);
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

	constructor(color: Color) {
		super();
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
					return Pawn.promotion(pieceToPromote, Color.white);
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
					return Pawn.promotion(pieceToPromote, Color.white);
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
				return Pawn.promotion(pieceToPromote, color);
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

	static promotion(piece: string, color: Color): Piece {
		switch (piece) {
			case 'PAWN':
				console.log('Promote to pawn');
				return new Pawn(color);
			case 'KNIGHT':
				console.log('Promote to knight');
				return new Knight(color);
			case 'BISHOP':
				console.log('Promote to bishop');
				return new Bishop(color);
			case 'ROOK':
				console.log('Promote to rook');
				return new Rook(color);
			case 'QUEEN':
				console.log('Promote to queen');
				return new Queen(color);
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
				latestMove?.startSquare.rank === 7 &&
				latestMove.endSquare.rank === 5) ||
			(EpStartSqRank === 4 &&
				latestMove?.startSquare.rank === 2 &&
				latestMove.endSquare.rank === 4)
		) {
			console.log('En passant successful');
			latestMove.endSquare.piece = null;
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
}

class Knight extends Piece {
	override readonly color: Color;

	constructor(color: Color) {
		super();
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
			console.log('knight capture failed');
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

	constructor(color: Color) {
		super();
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
				console.log('bishop capture failed');
				return false;
			}
		}

		return Piece.isDiagonal(startSq, endSq);
	}
}

class Rook extends Piece {
	override readonly color: Color;

	constructor(color: Color) {
		super();
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
				console.log('Rook capture failed');
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

	constructor(color: Color) {
		super();
		this.color = color;
		if (color === Color.white) {
			this.name = ChessPieces.QUEEN_WHITE;
		} else {
			this.name = ChessPieces.QUEEN_BLACK;
		}
	}

	override move(startSq: Square, endSq: Square): boolean {
		return true;
	}
}

class King extends Piece {
	override readonly color: Color;

	constructor(color: Color) {
		super();
		this.color = color;
		if (color === Color.white) {
			this.name = ChessPieces.KING_WHITE;
		} else {
			this.name = ChessPieces.KING_BLACK;
		}
	}

	override move(startSq: Square, endSq: Square): boolean {
		return true;
	}

	static moveWhite(): boolean {
		console.log('Move white');
		return false;
	}

	static moveBlack(): boolean {
		console.log('Move black');
		return false;
	}
}

const chess = new Chess();

// console.log(chess.printBoardWhite());
// chess.fen(Chess.STARTING_POSITION);
// console.log(chess.printBoardWhite());

// // enpassant test
// chess.movePiece('e2', 'e4');
// chess.movePiece('d7', 'd5');
// chess.movePiece('e4', 'd5');
// chess.movePiece('g8', 'f6');
// chess.movePiece('g1', 'e2');
// chess.movePiece('c7', 'c5');
// chess.movePiece('d5', 'c6');

// // knights test
// chess.movePiece('b1', 'c3');
// chess.movePiece('b8', 'c6');
// chess.movePiece('c3', 'd5');
// chess.movePiece('c6', 'e5');
// chess.movePiece('d5', 'f6');
// chess.movePiece('e5', 'f3');
// chess.movePiece('f3', 'd2');

// // bishop test
// chess.movePiece('e2', 'e4');
// chess.movePiece('e7', 'e5');
// chess.movePiece('f1', 'c4');
// chess.movePiece('a7', 'a5');
// chess.movePiece('d2', 'd3');
// chess.movePiece('a5', 'a4');
// chess.movePiece('a5', 'a4');
// chess.movePiece('c4', 'd5');
// chess.movePiece('h7', 'h6');
// chess.movePiece('d5', 'c6');
// chess.movePiece('h6', 'h5');
// chess.movePiece('c6', 'a4');

chess.putPiece('a1', new Rook(Color.white));
chess.putPiece('d8', new Rook(Color.black));

chess.movePiece('a1', 'h1');
chess.movePiece('d8', 'd1');
chess.movePiece('h1', 'b1');
// chess.movePiece('d1', 'd7');

// chess.movePiece('d7', 'd1');

// chess.movePiece('a1', 'a2');

console.log(chess.printBoardWhite());
// console.log(chess.getTurnNumber);
console.log(chess.algebraicNotation());

// console.log(chess.latestMove());
// console.log(chess.printBoardWhite());
// console.log(chess.getBoard);
// console.log(chess.startingPosition());
// console.log(chess.printBoardWhite());
