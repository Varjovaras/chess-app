enum Color {
	black = 'BLACK',
	white = 'WHITE',
}

enum ChessPieces {
	PAWN_WHITE = 'pawn',
	PAWN_BLACK = 'PAWN',
	KNIGHT_WHITE = 'knight',
	KNIGHT_BLACK = 'KNIGHT',
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
	square: string;
	color: Color;
	piece: Piece | null;
	id: number;

	constructor(
		file: string,
		rank: number,
		square: string,
		color: Color,
		id: number,
		piece: Piece | null
	) {
		this.file = file;
		this.rank = rank;
		this.square = square;
		this.color = color;
		this.piece = piece;
		this.id = id;
	}

	get getSquare() {
		return this;
	}
}

class Chess {
	private _board: Square[] = new Array(64);
	static files: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

	static STARTING_POSITION =
		'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

	constructor() {
		let firstSquare = Color.black;
		let secondSquare = Color.white;
		let rank = 1;

		for (
			let i = 0, currentFile = 0;
			i < this._board.length;
			i++, currentFile++
		) {
			if (currentFile === 8) {
				currentFile = 0;
				rank++;
				let temp: Color = firstSquare;
				firstSquare = secondSquare;
				secondSquare = temp;
			}

			if (i % 2 === 0) {
				this._board[i] = new Square(
					Chess.files[currentFile],
					rank,

					`${Chess.files[currentFile]}${rank}`,
					firstSquare,
					i,
					null
				);
			} else {
				this._board[i] = new Square(
					Chess.files[currentFile],
					rank,
					`${Chess.files[currentFile]}${rank}`,
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

	static findFileIndex(s: string): number {
		return Chess.files.findIndex((e) => e === s);
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
		let sq = this._board.find((s: Square) => s.square === name);
		return sq ? sq.getSquare : null;
	}

	getSquareById(id: number): Square | null {
		let sq = this._board.find((s: Square) => s.id === id);
		return sq ? sq.getSquare : null;
	}

	movePiece(startSquare: string, endSquare: string): void {
		if (startSquare === endSquare) {
			console.log('Same starting and ending square');
			console.log("Didn't move the piece");
			return;
		}

		let startSq = this.getSquare(startSquare);
		let endSq = this.getSquare(endSquare);

		if (startSq !== null && startSq.piece !== null && endSq !== null) {
			let legalOrPiece = startSq.piece.move(startSq, endSq, 'QUEEN');

			//is only an object if promoting a pawn
			if (typeof legalOrPiece !== 'object' && legalOrPiece) {
				endSq.piece = startSq.piece;
				startSq.piece = null;
			} else if (legalOrPiece) {
				endSq.piece = legalOrPiece;
				startSq.piece = null;
			} else {
				console.log('Inputted invalid move or a piece is on the way');
			}
		} else
			console.log(
				'Starting square is invalid, no piece to be found or ending square is invalid.'
			);
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
					let sq = this.getSquareById(j)?.square;
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

	static compareFiles(startSqFile: string, endSqFile: string): boolean {
		return (
			Math.abs(
				Chess.findFileIndex(startSqFile) - Chess.findFileIndex(endSqFile)
			) === 1
		);
	}
}

class Pawn extends Piece {
	readonly color: Color;

	constructor(color: Color) {
		super();
		this.color = color;
		if (color === Color.white) {
			this.name = ChessPieces.PAWN_WHITE;
		} else {
			this.name = ChessPieces.PAWN_BLACK;
		}
	}

	move(startSq: Square, endSq: Square, piece?: string): boolean | Piece {
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
		else if (
			startSq.rank === 7 &&
			endSq.rank === 8 &&
			pieceToPromote &&
			endSq.piece === null
		) {
			{
				return Pawn.promotion(pieceToPromote, Color.white);
			}
		}

		//move one square forwards
		else if (endSq.rank - startSq.rank === 1 && endSq.piece === null) {
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
		else if (
			startSq.rank === 2 &&
			endSq.rank === 1 &&
			pieceToPromote &&
			endSq.piece === null
		) {
			{
				return Pawn.promotion(pieceToPromote, Color.white);
			}
		}

		//move one square forwards
		else if (startSq.rank - endSq.rank === 1 && endSq.piece === null) {
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

		if (endSq.piece === null) {
			console.log("Pawns can't go diagonally without capturing a piece");
			return false;
		} else if (
			startSq.rank === secondToLastRank &&
			endSq.rank === promotionRank &&
			pieceToPromote &&
			Piece.compareFiles(startSq.file, endSq.file)
		) {
			return Pawn.promotion(pieceToPromote, Color.white);
		} else if (
			Math.abs(startSq.rank - endSq.rank) === 1 &&
			Piece.compareFiles(startSq.file, endSq.file)
		) {
			console.log('Captured a piece with pawn on ' + endSq.square);
			return true;
		} else {
			console.log('Error capturing with pawn');
			return false;
		}
	}

	static startingSquareMove(startSq: Square, endSq: Square): boolean {
		if (Math.abs(startSq.rank - endSq.rank) === 1 && endSq.piece === null) {
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
}

class Knight extends Piece {
	readonly color: Color;

	constructor(color: Color) {
		super();
		this.color = color;
		if (color === Color.white) {
			this.name = ChessPieces.KNIGHT_WHITE;
		} else {
			this.name = ChessPieces.KNIGHT_BLACK;
		}
	}

	move(startSq: Square, endSq: Square): boolean {
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

class Bishop extends Piece {
	readonly color: Color;

	constructor(color: Color) {
		super();
		this.color = color;
		if (color === Color.white) {
			this.name = ChessPieces.BISHOP_WHITE;
		} else {
			this.name = ChessPieces.BISHOP_BLACK;
		}
	}
	move(startSq: Square, endSq: Square): boolean {
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

class Rook extends Piece {
	readonly color: Color;

	constructor(color: Color) {
		super();
		this.color = color;
		if (color === Color.white) {
			this.name = ChessPieces.ROOK_WHITE;
		} else {
			this.name = ChessPieces.ROOK_BLACK;
		}
	}

	move(startSq: Square, endSq: Square): boolean {
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

class Queen extends Piece {
	readonly color: Color;

	constructor(color: Color) {
		super();
		this.color = color;
		if (color === Color.white) {
			this.name = ChessPieces.QUEEN_WHITE;
		} else {
			this.name = ChessPieces.QUEEN_BLACK;
		}
	}

	move(startSq: Square, endSq: Square): boolean {
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

class King extends Piece {
	readonly color: Color;

	constructor(color: Color) {
		super();
		this.color = color;
		if (color === Color.white) {
			this.name = ChessPieces.KING_WHITE;
		} else {
			this.name = ChessPieces.KING_BLACK;
		}
	}
	move(startSq: Square, endSq: Square): boolean {
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

// chess.putPiece('e7', new Pawn(Color.white));
// chess.putPiece('e8', new King(Color.black));
// chess.putPiece('d8', new King(Color.black));

// console.log(chess.printBoardWhite());
chess.fen(Chess.STARTING_POSITION);
chess.movePiece('e2', 'e4');
chess.movePiece('e7', 'e5');
chess.movePiece('e6', 'e5');
chess.movePiece('e5', 'e4');
chess.movePiece('e4', 'e3');
chess.movePiece('e3', 'd2');

console.log(chess.printBoardWhite());

// console.log(chess.get())
// console.log(chess.startingPosition());
