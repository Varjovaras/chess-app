enum Color {
	black = 'BLACK',
	white = 'WHITE',
	none = 'NONE',
}

type Square = {
	rank: number;
	file: string;
	square: string;
	color: Color;
	piece: Piece;
	id: number;
};

interface Piece {
	name: Pieces;
	color: Color;
}

enum Pieces {
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
				this._board[i] = {
					file: files[currentFile],
					rank: rank,
					color: firstSquare,
					square: `${files[currentFile]}${rank}`,
					piece: { name: Pieces.empty, color: Color.none },
					id: i,
				};
			} else {
				this._board[i] = {
					file: files[currentFile],
					rank: rank,
					color: secondSquare,
					square: `${files[currentFile]}${rank}`,
					piece: { name: Pieces.empty, color: Color.none },
					id: i,
				};
			}
		}
	}

	printBoardWhite() {
		let rows = ['', '', '', '', '', '', '', ''];

		for (const i of this._board) {
			console.log(i);
			rows[i.rank - 1] += i.file + i.rank + ' ';
		}
		return rows.reverse();
	}

	printBoardBlack() {
		let rows = ['', '', '', '', '', '', '', ''];

		for (const i of this._board) {
			rows[i.rank - 1] = i.file + i.rank + ' ' + rows[i.rank - 1];
		}

		return rows.reverse();
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

	putPiece(square: string, piece: Pieces) {
		let sq = this._board.find((s: Square) => s.square === square);
		if (sq) {
			sq.piece.name = piece;
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

// class Pieces {}

const chess = new Chess();
// console.log(chess._board);
console.log(chess.printBoardBlack());
// console.log(chess.startingPosition());
chess.putPiece('a1', Pieces.queen);
