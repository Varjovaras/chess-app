import { Rook } from '../chess/Rook';
import Chess from '../chess/chess';
import { King } from '../chess/king';
import { Pawn } from '../chess/pawn';
import { Color } from '../chess/types';

const chess = new Chess();
describe('Board works', () => {
	beforeEach(() => {
		chess.emptyBoard();
	});

	test('Board is empty', () => {
		expect(chess.getBoard.isEmpty()).toBe(true);
	});

	test('Board is not empty', () => {
		chess.startingPosition();
		expect(chess.getBoard.isEmpty()).toBe(false);
	});
});

describe('Adding and removing pieces works', () => {
	beforeEach(() => {
		chess.emptyBoard();
		chess.putPieceOnBoard(
			'e2',
			new Pawn(chess.getBoard.getSquare('e2')!, Color.white)
		);
	});

	test('Add piece on board', () => {
		expect(chess.getBoard.isEmpty()).toBe(false);
	});

	test('Remove piece from board', () => {
		chess.getBoard.getSquare('e2')!.removePiece();
		expect(chess.getBoard.isEmpty()).toBe(true);
	});

	test('Moving function works and checks if white king is in check', () => {
		chess.putPieceOnBoard(
			'a1',
			new King(chess.getBoard.getSquare('a1')!, Color.white)
		);
		chess.putPieceOnBoard(
			'a8',
			new Rook(chess.getBoard.getSquare('a8')!, Color.black)
		);
		chess.move('e2', 'e4');
		expect(
			chess.getSquareFromBoard('e2').getPiece && chess.getBoard.whiteCheck()
		).toBeTruthy();
	});

	test('Moving function works and checks if black king is in check', () => {
		chess.putPieceOnBoard(
			'a1',
			new King(chess.getBoard.getSquare('a1')!, Color.black)
		);
		chess.putPieceOnBoard(
			'a8',
			new Rook(chess.getBoard.getSquare('a8')!, Color.white)
		);
		chess.putPieceOnBoard(
			'e7',
			new Pawn(chess.getBoard.getSquare('e7')!, Color.black)
		);
		chess.move('e2', 'e4');
		chess.move('e7', 'e5');

		console.log(chess.getBoard.printBoardBlack());

		expect(
			chess.getSquareFromBoard('e4').getPiece &&
				chess.getSquareFromBoard('e7').getPiece &&
				chess.getBoard.blackCheck()
		).toBeTruthy();
	});
});
