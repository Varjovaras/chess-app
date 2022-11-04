enum Color {
	black = 'BLACK',
	white = 'WHITE',
}

enum ChessPieces {
	pawn = 'PAWN',
	knight = 'KNIGHT',
	bishop = 'BISHOP',
	rook = 'ROOK',
	queen = 'QUEEN',
	king = 'KING',
}

class Square {
	rank: number;
	file: string;
	square: string;
	color: Color;
	piece: Piece | null;
	id: number;

	constructor(
		rank: number,
		file: string,
		square: string,
		color: Color,
		id: number,
		piece: Piece | null
	) {
		this.rank = rank;
		this.file = file;
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

	static DEFAULT_POSITION =
		'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

	constructor() {
		let files: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
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
					rank,
					files[currentFile],
					`${files[currentFile]}${rank}`,
					firstSquare,
					i,
					null
				);
			} else {
				this._board[i] = new Square(
					rank,
					files[currentFile],
					`${files[currentFile]}${rank}`,
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

	startingPosition() {
		const fen = Chess.DEFAULT_POSITION;
		let tokens = fen.split(/\s+/);
		let pieces = tokens[0].split('/');
		return pieces;
	}

	getSquare(name: string): Square | null {
		let sq = this._board.find((s: Square) => s.square === name);
		if (sq) return sq.getSquare;
		else return null;
	}

	/**
	 * siirrä piece, ehkä kaappaa
	 *tyhjennä ruutu
	 */
	movePiece(startSquare: string, endSquare: string): Piece | null {
		if (startSquare === endSquare) {
			console.log('Same starting and ending square');
			return null;
		}
		let startSq = this.getSquare(startSquare);
		let endSq = this.getSquare(endSquare);
		if (startSq && startSq.piece !== null) {
			switch (startSq.piece.getName) {
				case ChessPieces.pawn:
					console.log('1');
					break;
				case ChessPieces.knight:
					console.log('2');
					break;
				case ChessPieces.bishop:
					console.log('3');
					break;
				case ChessPieces.rook:
					console.log('4');
					break;
				case ChessPieces.queen:
					console.log('5');
					break;
				case ChessPieces.king:
					console.log('6');
					break;
				default:
					console.log('trolled');
					return new Piece();
			}
		}

		return null;
	}

	capturePiece(): void {
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

	fen(fen: string) {
		let tokens = fen.split(/\s+/);
		let pieces = tokens[0].split('/');
		return pieces;
	}
}

class Piece {
	protected name: string;
	//     file: string;
	//     rank: number;
	//     square: string;

	constructor() {
		//         rank: number, file: string
		this.name = '';
		//         this.square = file + rank;
		//         this.file = file;
		//         this.rank = rank;
	}

	get getFirstLetter() {
		return this.name[0];
	}

	get getName() {
		return this.name;
	}

	move(): Square | null {
		//boolean ???

		return null;
	}
}

class Pawn extends Piece {
	name = ChessPieces.pawn;

	move() {
		return null;
	}
}

class Knight extends Piece {
	name = ChessPieces.knight;

	move() {
		return null;
	}
}

class Bishop extends Piece {
	name = ChessPieces.bishop;

	move() {
		return null;
	}
}

class Rook extends Piece {
	name = ChessPieces.rook;

	move() {
		return null;
	}
}

class Queen extends Piece {
	name = ChessPieces.queen;

	move() {
		return null;
	}
}

class King extends Piece {
	name = ChessPieces.king;

	move() {
		return null;
	}
}

const chess = new Chess();
// console.log(chess.getBoard);
// chess.putPiece('f7', new Queen());
console.log(chess.getSquare('e4'));
console.log(chess.getSquare('e5'));

// console.log(chess.getSquare('e5')?.trolled());
chess.putPiece('e4', new King());
chess.putPiece('e5', new Pawn());

// chess.movePiece('e4', 'f7');

console.log(chess.printBoardWhite());
// console.log(chess.printBoardBlack());

// console.log(chess.get())
// console.log(chess.startingPosition());
