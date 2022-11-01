import { Piece, Square, SquareColor } from './types';

class Chess {
	board: Square[] = new Array(64);
	constructor() {
		let files: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
		let currentFile = 0;
		let firstSquare = SquareColor.black;
		let secondSquare = SquareColor.white;

		for (let i = 0, rank = 1; i < this.board.length; i++, rank++) {
			if (rank === 9) {
				let temp: SquareColor = firstSquare;
				firstSquare = secondSquare;
				secondSquare = temp;
				rank = 1;
				currentFile++;
			}

			if (i % 2 === 0) {
				this.board[i] = {
					file: files[currentFile],
					rank: rank,
					color: firstSquare,
					square: `${files[currentFile]}${rank}`,
					piece: Piece.empty,
				};
			} else {
				this.board[i] = {
					file: files[currentFile],
					rank: rank,
					color: secondSquare,
					square: `${files[currentFile]}${rank}`,
					piece: Piece.empty,
				};
			}
		}
	}

	printBoard() {
		let rows = ['', '', '', '', '', '', '', ''];

		for (const i of this.board) {
			rows[i.rank - 1] += i.file + i.rank + ' ';
		}

		rows.reverse();
		return rows;
	}

	startingPosition() {}
}

const chess = new Chess();
console.log(chess.printBoard());
