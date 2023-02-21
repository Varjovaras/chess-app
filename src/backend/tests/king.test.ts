import { Rook } from '../chess/rook';
import { Bishop } from '../chess/bishop';
import Chess from '../chess/chess';
import { King } from '../chess/king';
import { Color } from '../../types/types';

const chess = new Chess();

describe('king tests', () => {
	beforeEach(() => {
		chess.emptyBoard();
		chess.putPieceOnBoard(
			'e4',
			new King(chess.getSquareFromBoard('e4'), Color.white)
		);
	});

	test('movement up', () => {
		chess.move('e4', 'e5');
		expect(
			chess.getSquareFromBoard('e5').getPiece &&
				!chess.getSquareFromBoard('e4').getPiece
		).toBeTruthy();
	});

	test('movement down', () => {
		chess.move('e4', 'e3');
		expect(
			chess.getSquareFromBoard('e3').getPiece &&
				!chess.getSquareFromBoard('e4').getPiece
		).toBeTruthy();
	});

	test('movement right', () => {
		chess.move('e4', 'f4');
		expect(
			chess.getSquareFromBoard('f4').getPiece &&
				!chess.getSquareFromBoard('e4').getPiece
		).toBeTruthy();
	});

	test('movement left', () => {
		chess.move('e4', 'd4');
		expect(
			chess.getSquareFromBoard('d4').getPiece &&
				!chess.getSquareFromBoard('e4').getPiece
		).toBeTruthy();
	});

	test('movement up and left', () => {
		chess.move('e4', 'd5');
		expect(
			chess.getSquareFromBoard('d5').getPiece &&
				!chess.getSquareFromBoard('e4').getPiece
		).toBeTruthy();
	});

	test('movement down and left', () => {
		chess.move('e4', 'd3');
		expect(
			chess.getSquareFromBoard('d3').getPiece &&
				!chess.getSquareFromBoard('e4').getPiece
		).toBeTruthy();
	});

	test('movement up  and right', () => {
		chess.move('e4', 'f5');
		expect(
			chess.getSquareFromBoard('f5').getPiece &&
				!chess.getSquareFromBoard('e4').getPiece
		).toBeTruthy();
	});

	test('movement down  and right', () => {
		chess.move('e4', 'f3');
		expect(
			chess.getSquareFromBoard('f3').getPiece &&
				!chess.getSquareFromBoard('e4').getPiece
		).toBeTruthy();
	});

	test('being in check works and you need to move out of it', () => {
		chess.putPieceOnBoard(
			'c2',
			new Bishop(chess.getSquareFromBoard('c3'), Color.black)
		);

		chess.putPieceOnBoard(
			'd1',
			new Rook(chess.getSquareFromBoard('d5'), Color.black)
		);

		chess.move('e4', 'd5');

		expect(
			chess.getSquareFromBoard('e4').getPiece &&
				!chess.getSquareFromBoard('d5').getPiece
		).toBeTruthy();

		chess.move('e4', 'f4');

		expect(
			chess.getSquareFromBoard('f4').getPiece &&
				!chess.getSquareFromBoard('e4').getPiece
		).toBeTruthy();
	});

	test('blocking removes check and move doesnt count if you dont block or move king', () => {
		chess.putPieceOnBoard(
			'c1',
			new Bishop(chess.getSquareFromBoard('c3'), Color.white)
		);

		chess.putPieceOnBoard(
			'e1',
			new Rook(chess.getSquareFromBoard('d5'), Color.black)
		);

		chess.move('c1', 'f4');

		expect(
			chess.getSquareFromBoard('c1').getPiece &&
				!chess.getSquareFromBoard('f4').getPiece
		).toBeTruthy();

		chess.move('c1', 'e3');

		expect(
			chess.getSquareFromBoard('e3').getPiece &&
				!chess.getSquareFromBoard('c1').getPiece
		).toBeTruthy();
	});

	test('cannot capture piece if it is guarded', () => {
		chess.putPieceOnBoard(
			'd5',
			new Bishop(chess.getSquareFromBoard('d5'), Color.black)
		);

		chess.putPieceOnBoard(
			'd1',
			new Rook(chess.getSquareFromBoard('d5'), Color.black)
		);

		try {
			chess.move('e4', 'd5');
		} catch {}

		console.log(chess.getBoard.printBoardBlack());

		expect(
			chess.getSquareFromBoard('e4').getPiece &&
				chess
					.getSquareFromBoard('e4')
					.getPiece?.getFirstLetter()
					.toUpperCase() === 'K' &&
				chess.getSquareFromBoard('d5').getPiece &&
				chess
					.getSquareFromBoard('d5')
					.getPiece?.getFirstLetter()
					.toUpperCase() === 'B'
		).toBeTruthy();
	});
});
