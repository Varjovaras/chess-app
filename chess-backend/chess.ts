enum SquareColor {
	black = 'BLACK',
	white = 'WHITE',
}

type Square = {
	rank: number;
	file: string;
	square: string;
	color: SquareColor;
	pieceName: PieceName;
	id: number;
};

enum file {
	a = 1,
	b,
	c,
	d,
	e,
	f,
	g,
	h,
}

enum PieceName {
	pawn = 'PAWN',
	knight = 'KNIGHT',
	bishop = 'BISHOP',
	rook = 'ROOK',
	queen = 'QUEEN',
	king = 'KING',
	empty = 'EMPTY',
}

class Chess {
	_board: Square[] = new Array(64);

	static DEFAULT_POSITION =
		'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
	static idiot = '';

	constructor() {
		let files: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
		let firstSquare = SquareColor.black;
		let secondSquare = SquareColor.white;
		let rank = 1;

		for (
			let i = 0, currentFile = 0;
			i < this._board.length;
			i++, currentFile++
		) {
			if (currentFile === 8) {
				currentFile = 0;
				rank++;
				let temp: SquareColor = firstSquare;
				firstSquare = secondSquare;
				secondSquare = temp;
			}

			if (i % 2 === 0) {
				this._board[i] = {
					file: files[currentFile],
					rank: rank,
					color: firstSquare,
					square: `${files[currentFile]}${rank}`,
					pieceName: PieceName.empty,
					id: i,
				};
			} else {
				this._board[i] = {
					file: files[currentFile],
					rank: rank,
					color: secondSquare,
					square: `${files[currentFile]}${rank}`,
					pieceName: PieceName.empty,
					id: i,
				};
			}
		}
	}

	printBoard() {
		let rows = ['', '', '', '', '', '', '', ''];

		for (const i of this._board) {
			console.log(i);
			rows[i.rank - 1] += i.file + i.rank + ' ';
		}
		rows.reverse();
		console.log(this._board);
		return rows;
	}

	startingPosition() {
		const fen = Chess.DEFAULT_POSITION;
		let tokens = fen.split(/\s+/);
		let pieces = tokens[0].split('/');
		return pieces;
	}

	movePiece() {
		/**
		 *
		 */
	}

	putPiece(square: string, piece: PieceName) {
		let sq = this._board.find((s: Square) => s.square === square);
		if (sq) {
			sq.pieceName = piece;
			console.log(`${piece} put on ${square}`);
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

class Pieces {}

const chess = new Chess();
// console.log(chess._board);
console.log(chess.printBoard());
// console.log(chess.startingPosition());
// chess.putPiece('a1', PieceName.queen);
