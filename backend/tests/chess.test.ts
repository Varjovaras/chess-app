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

	test('Moving function works and checks if your king is in check', () => {
		chess.putPieceOnBoard(
			'a1',
			new King(chess.getBoard.getSquare('a1')!, Color.white)
		);
		chess.putPieceOnBoard(
			'a8',
			new Rook(chess.getBoard.getSquare('a8')!, Color.black)
		);
		console.log(chess.getBoard.getSquare('a1'));

		console.log(chess.getBoard.whiteCheck());
		// expect(chess.move('e2', 'e4')).toBeTruthy();
	});
});

// chess.putPieceOnBoard(
// 	'e2',
// 	new Pawn(chess.getBoard.getSquare('e2')!, Color.white)
// );
