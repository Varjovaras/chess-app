import Chess from '../chess/chess';
import { Knight } from '../chess/knight';
import { Color } from '../chess/types';

const chess = new Chess();

describe('knight tests', () => {
	beforeEach(() => {
		chess.emptyBoard();
		chess.putPieceOnBoard(
			'e4',
			new Knight(chess.getSquareFromBoard('e4'), Color.white)
		);
	});

	test('movement up 2 and left', () => {
		chess.move('e4', 'd6');
		expect(
			chess.getSquareFromBoard('d6').getPiece &&
				!chess.getSquareFromBoard('e4').getPiece
		).toBeTruthy();
	});

	test('movement up 2 and right', () => {
		chess.move('e4', 'f6');
		expect(
			chess.getSquareFromBoard('f6').getPiece &&
				!chess.getSquareFromBoard('e4').getPiece
		).toBeTruthy();
	});

	test('movement up and right 2', () => {
		chess.move('e4', 'g5');
		expect(
			chess.getSquareFromBoard('g5').getPiece &&
				!chess.getSquareFromBoard('e4').getPiece
		).toBeTruthy();
	});

	test('movement down 2 and right', () => {
		chess.move('e4', 'f2');
		expect(
			chess.getSquareFromBoard('f2').getPiece &&
				!chess.getSquareFromBoard('e4').getPiece
		).toBeTruthy();
	});

	test('movement down 2 and left', () => {
		chess.move('e4', 'd2');
		expect(
			chess.getSquareFromBoard('d2').getPiece &&
				!chess.getSquareFromBoard('e4').getPiece
		).toBeTruthy();
	});

	test('movement down and left 2', () => {
		chess.move('e4', 'c3');
		expect(
			chess.getSquareFromBoard('c3').getPiece &&
				!chess.getSquareFromBoard('e4').getPiece
		).toBeTruthy();
	});

	test('movement up and left 2', () => {
		chess.move('e4', 'c5');
		expect(
			chess.getSquareFromBoard('c5').getPiece &&
				!chess.getSquareFromBoard('e4').getPiece
		).toBeTruthy();
	});
});
