import { Queen } from '../chess/queen';
import { Bishop } from '../chess/bishop';
import Chess from '../chess/chess';
import { Color } from '../chess/types';

const chess = new Chess();

describe('queen tests', () => {
	beforeEach(() => {
		chess.emptyBoard();
		chess.putPieceOnBoard(
			'e4',
			new Queen(chess.getSquareFromBoard('e4'), Color.white)
		);
	});

	test('movement up and left', () => {
		chess.move('e4', 'c6');
		expect(
			chess.getSquareFromBoard('c6').getPiece &&
				!chess.getSquareFromBoard('e4').getPiece
		).toBeTruthy();
	});

	test('movement down and left', () => {
		chess.move('e4', 'b1');
		expect(
			chess.getSquareFromBoard('b1').getPiece &&
				!chess.getSquareFromBoard('e4').getPiece
		).toBeTruthy();
	});

	test('movement up  and right', () => {
		chess.move('e4', 'h7');
		expect(
			chess.getSquareFromBoard('h7').getPiece &&
				!chess.getSquareFromBoard('e4').getPiece
		).toBeTruthy();
	});

	test('movement down  and right', () => {
		chess.move('e4', 'h1');
		expect(
			chess.getSquareFromBoard('h1').getPiece &&
				!chess.getSquareFromBoard('e4').getPiece
		).toBeTruthy();
	});

	test('movement up', () => {
		console.log(chess.getBoard.printBoardWhite());
		chess.move('e4', 'e8');
		console.log(chess.getBoard.printBoardWhite());

		expect(
			chess.getSquareFromBoard('e8').getPiece &&
				!chess.getSquareFromBoard('e4').getPiece
		).toBeTruthy();
	});

	test('movement down', () => {
		chess.move('e4', 'e1');
		expect(
			chess.getSquareFromBoard('e1').getPiece &&
				!chess.getSquareFromBoard('e4').getPiece
		).toBeTruthy();
	});

	test('movement right', () => {
		chess.move('e4', 'a4');
		console.log('·');
		expect(
			chess.getSquareFromBoard('a4').getPiece &&
				!chess.getSquareFromBoard('e4').getPiece
		).toBeTruthy();
	});

	test('movement right', () => {
		chess.move('e4', 'h4');
		expect(
			chess.getSquareFromBoard('h4').getPiece &&
				!chess.getSquareFromBoard('e4').getPiece
		).toBeTruthy();
	});

	test('cannot pass through other pieces', () => {
		chess.putPieceOnBoard(
			'd5',
			new Bishop(chess.getSquareFromBoard('d5'), Color.black)
		);
		chess.putPieceOnBoard(
			'd3',
			new Bishop(chess.getSquareFromBoard('d3'), Color.black)
		);
		chess.putPieceOnBoard(
			'f5',
			new Bishop(chess.getSquareFromBoard('f5'), Color.white)
		);
		chess.putPieceOnBoard(
			'f3',
			new Bishop(chess.getSquareFromBoard('f3'), Color.white)
		);

		try {
			chess.move('e4', 'c6');
		} catch {}

		try {
			chess.move('e4', 'c2');
		} catch {}

		try {
			chess.move('e4', 'g6');
		} catch {}
		try {
			chess.move('e4', 'g2');
		} catch {}
		expect(
			chess.getSquareFromBoard('e4').getPiece &&
				!chess.getSquareFromBoard('c6').getPiece &&
				!chess.getSquareFromBoard('c2').getPiece &&
				!chess.getSquareFromBoard('g6').getPiece &&
				!chess.getSquareFromBoard('g2').getPiece
		).toBeTruthy();
	});

	test('cannot pass through other pieces', () => {
		chess.putPieceOnBoard(
			'd4',
			new Bishop(chess.getSquareFromBoard('e5'), Color.black)
		);
		chess.putPieceOnBoard(
			'e2',
			new Bishop(chess.getSquareFromBoard('e3'), Color.black)
		);
		chess.putPieceOnBoard(
			'e7',
			new Bishop(chess.getSquareFromBoard('f4'), Color.white)
		);
		chess.putPieceOnBoard(
			'f4',
			new Bishop(chess.getSquareFromBoard('d4'), Color.white)
		);

		try {
			chess.move('e4', 'e1');
		} catch {}

		try {
			chess.move('e4', 'e8');
		} catch {}

		try {
			chess.move('e4', 'a4');
		} catch {}
		try {
			chess.move('e4', 'h4');
		} catch {}
		expect(
			chess.getSquareFromBoard('e4').getPiece &&
				!chess.getSquareFromBoard('e1').getPiece &&
				!chess.getSquareFromBoard('e8').getPiece &&
				!chess.getSquareFromBoard('a4').getPiece &&
				!chess.getSquareFromBoard('h4').getPiece
		).toBeTruthy();
	});
});
