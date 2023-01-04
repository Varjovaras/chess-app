import Chess from '../chess/chess';
import { Color } from '../chess/types';

const chess = new Chess();

describe('Pawn tests', () => {
	beforeEach(() => {
		chess.startingPosition();
	});

	test('One square forward works', () => {
		chess.move('e2', 'e3');
		chess.move('e7', 'e6');
		expect(
			chess.getSquareFromBoard('e3').getPiece &&
				chess.getSquareFromBoard('e6').getPiece
		).toBeTruthy();
	});

	test('Two squares forward works', () => {
		chess.move('e2', 'e4');
		chess.move('e7', 'e5');
		expect(
			chess.getSquareFromBoard('e4').getPiece &&
				chess.getSquareFromBoard('e5').getPiece
		).toBeTruthy();
	});

	test('Capturing works with both black and white', () => {
		chess.move('e2', 'e4');
		chess.move('d7', 'd5');
		chess.move('e4', 'd5');
		chess.move('a7', 'a5');
		chess.move('b2', 'b4');
		chess.move('a5', 'b4');
		expect(
			!chess.getSquareFromBoard('e4').getPiece &&
				chess.getSquareFromBoard('d5').getPiece?.getColor === Color.white &&
				!chess.getSquareFromBoard('a5').getPiece &&
				chess.getSquareFromBoard('b4').getPiece?.getColor === Color.black
		).toBeTruthy();
	});

	test('En passant white', () => {
		chess.move('e2', 'e4');
		chess.move('a7', 'a5');
		chess.move('e4', 'e5');
		chess.move('d7', 'd5');
		chess.move('e5', 'd6');
		expect(
			!chess.getSquareFromBoard('e5').getPiece &&
				!chess.getSquareFromBoard('d7').getPiece &&
				!chess.getSquareFromBoard('d5').getPiece &&
				chess.getSquareFromBoard('d6').getPiece?.getColor === Color.white
		).toBeTruthy();
	});

	test('En passant black', () => {
		chess.move('a2', 'a4');
		chess.move('e7', 'e5');
		chess.move('a4', 'a5');
		chess.move('e5', 'e4');
		chess.move('f2', 'f4');
		chess.move('e4', 'f3');

		expect(
			!chess.getSquareFromBoard('f2').getPiece &&
				!chess.getSquareFromBoard('f4').getPiece &&
				!chess.getSquareFromBoard('e4').getPiece &&
				chess.getSquareFromBoard('f3').getPiece?.getColor === Color.black
		).toBeTruthy();
	});
});
