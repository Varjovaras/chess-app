import { Color, Piece, Square } from './types';

class Chess {
	board: Square[] = new Array(64);
	constructor() {
		let firstLetter = 'a';
		let firstSquare = Color.black;
		let secondSquare = Color.white;
		let rowIterator = 1;

		for (let i = 0; i < this.board.length; i++) {
			if (i === 8) {
				firstLetter = 'b';
				firstSquare = Color.white;
				secondSquare = Color.black;
				rowIterator = 1;
			} else if (i === 16) {
				firstLetter = 'c';
				firstSquare = Color.black;
				secondSquare = Color.white;
				rowIterator = 1;
			} else if (i === 24) {
				firstLetter = 'd';
				firstSquare = Color.white;
				secondSquare = Color.black;
				rowIterator = 1;
			} else if (i === 32) {
				firstLetter = 'e';
				firstSquare = Color.black;
				secondSquare = Color.white;
				rowIterator = 1;
			} else if (i === 40) {
				firstLetter = 'f';
				firstSquare = Color.white;
				secondSquare = Color.black;
				rowIterator = 1;
			} else if (i === 48) {
				firstLetter = 'g';
				firstSquare = Color.black;
				secondSquare = Color.white;
				rowIterator = 1;
			} else if (i === 56) {
				firstLetter = 'h';
				firstSquare = Color.white;
				secondSquare = Color.black;
				rowIterator = 1;
			}
			if (i % 2 === 0) {
				this.board[i] = {
					color: firstSquare,
					square: `${firstLetter}${rowIterator}`,
					piece: Piece.empty,
				};
			} else {
				this.board[i] = {
					color: secondSquare,
					square: `${firstLetter}${rowIterator}`,
					piece: Piece.empty,
				};
			}
			rowIterator++;
		}
	}
}

const chess = new Chess();
console.log(chess);
