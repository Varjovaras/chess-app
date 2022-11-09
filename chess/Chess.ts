enum Color {
	black = 'BLACK',
	white = 'WHITE',
}

enum ChessPieces {
	Pawn = 'PAWN',
	Knight = 'KNIGHT',
	Bishop = 'BISHOP',
	Rook = 'ROOK',
	Queen = 'QUEEN',
	King = 'KING',
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

	static DEFAULT_POSITION =
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
				rows[i.rank - 1] += i.piece.getFirstLetter + '  ';
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
					' ' + i.piece.getFirstLetter + ' ' + rows[i.rank - 1];
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

	movePiece(startSquare: string, endSquare: string): void {
		if (startSquare === endSquare) {
			console.log('Same starting and ending square');
			console.log("Didn't move the piece");
			return;
		}
		let startSq = this.getSquare(startSquare);
		let endSq = this.getSquare(endSquare);
		if (startSq !== null && startSq.piece !== null && endSq !== null) {
			if (startSq.piece.move(startSq, endSq, startSq.piece.getColor)) {
				console.log('Moved');
			} else {
				console.log('Moving failed');
			}

			/***
			 *tyhjennä ruutu
			 */
		}
	}

	capturePiece(square: Square): void {
		/**
		 *
		 *
		 */
	}

	//initialization or promoting
	putPiece(square: string, piece: Piece) {
		let sq = this.getSquare(square);
		if (sq) {
			sq.piece = piece;
			console.log(sq.piece);
			console.log(`${piece.getName} put on ${square}`);
		} else {
			console.log('No square found');
		}
	}

	//     static fen(fen: string): string[] {
	//         let tokens = fen.split(/\s+/);
	//         let pieces = tokens[0].split('/');
	//         return pieces;
	//     }

	startingPosition() {
		//         let tokens = Chess.fen(Chess.DEFAULT_POSITION);
		//         return tokens;
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
		this.name = ChessPieces.Pawn;
		this.color = color;
	}

	move(startSq: Square, endSq: Square, piece?: string): boolean | Piece {
		if (this.color === Color.white) {
			return Pawn.moveWhite(startSq, endSq, piece);
		} else if (this.color === Color.black) {
			// 			return Pawn.moveBlack(startSq, endSq, piece);
		} else {
			console.log('Piece not found');
			return false;
		}

		return false;
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
			return Pawn.startingSquare(startSq, endSq);
		}

		//lastrow promote and possibly capture
		else if (
			startSq.rank === 7 &&
			endSq.rank === 8 &&
			pieceToPromote &&
			endSq.piece === null
		) {
			{
				console.log('Promoted to ' + pieceToPromote);
				return Pawn.promotion(pieceToPromote, Color.white);
			}
		}

		//move one square forwards
		else if (endSq.rank - startSq.rank === 1 && endSq.piece === null) {
			return true;
		}
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
			console.log('Promoted to ' + pieceToPromote + ' and captured');
			return Pawn.promotion(pieceToPromote, Color.white);
		} else if (
			Math.abs(startSq.rank - endSq.rank) === 1 &&
			Piece.compareFiles(startSq.file, endSq.file)
		) {
			console.log('Captured a piece with pawn');
			return true;
		} else {
			console.log('Error capturing with pawn');
			return false;
		}
	}

	static startingSquare(startSq: Square, endSq: Square): boolean {
		if (Math.abs(startSq.rank - endSq.rank) === 1 && endSq.piece === null) {
			return true;
		} else if (
			Math.abs(endSq.rank - startSq.rank) === 2 &&
			endSq.piece === null &&
			chess.getSquare(`${startSq.file}${startSq.rank + 1}`)?.piece === null
		) {
			console.log('Moved and sniped');
			return true;
		} else {
			console.log('Error moving the pawn');
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
		this.name = ChessPieces.Knight;
		this.color = color;
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
		this.name = ChessPieces.Bishop;
		this.color = color;
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
		this.name = ChessPieces.Rook;
		this.color = color;
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
		this.name = ChessPieces.Queen;
		this.color = color;
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
		this.name = ChessPieces.King;
		this.color = color;
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
// console.log(chess.getBoard);
// chess.putPiece('f7', new Queen());
// console.log(chess.getSquare('f4'));
// console.log(chess.getSquare('e5'));

// console.log(chess.getSquare('e5')?.trolled());
chess.putPiece('e4', new Pawn(Color.white));
// chess.putPiece('e5', new Piece(Color.white));
//34567890123456789012345678901234567890123456789012345678901234567890123456789
chess.movePiece('e4', 'e5');
// console.log(chess.getSquare('e5'));

// chess.movePiece('e4', 'f7');

// console.log(chess.printBoardWhite());
// console.log(chess.printBoardBlack());

// console.log(chess.get())
// console.log(chess.startingPosition());
