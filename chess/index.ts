console.time('c');
import Chess from './chess/Chess';
import { King } from './chess/King';
import { Knight } from './chess/Knight';
import { Pawn } from './chess/Pawn';
import { Queen } from './chess/Queen';
import { Rook } from './chess/Rook';
import { Color } from './chess/types';

const chess = new Chess();
chess.putPieceOnBoard(
	'e2',
	new Pawn(chess.getBoard.getSquare('e2')!, Color.white)
);
chess.putPieceOnBoard(
	'd7',
	new Pawn(chess.getBoard.getSquare('d7')!, Color.black)
);
console.log(chess.getBoard.printBoardWhite());
chess.move('e2', 'e4');
chess.move('d7', 'd5');
chess.move('e4', 'd5');

console.log(chess.getPieces);

chess.fen(Chess.STARTING_POSITION);
console.log(chess.getBoard.printBoardWhite());

// enpassant test
chess.fen(Chess.STARTING_POSITION);
chess.move('e2', 'e4');
chess.move('d7', 'd5');
chess.move('e4', 'd5');
chess.move('g8', 'f6');
chess.move('g1', 'e2');
chess.move('c7', 'c5');
chess.move('d5', 'c6');
chess.move('g7', 'g5');
chess.move('c6', 'c7');
chess.move('g5', 'g4');
chess.move('h2', 'h4');
chess.move('g4', 'h3');
console.log(chess.getPieces);
console.log(chess.getBoard.printBoardWhite());

console.log(chess.getMoves);
// // knights test
chess.fen(Chess.STARTING_POSITION);
chess.move('b1', 'c3');
chess.move('b8', 'c6');
chess.move('c3', 'd5');
chess.move('c6', 'e5');
chess.move('d5', 'b6');
chess.move('e5', 'f3');
chess.move('g2', 'f3');
chess.move('g8', 'h6');

// // // bishop test
chess.fen(Chess.STARTING_POSITION);
chess.move('e2', 'e4');
chess.move('e7', 'e5');
chess.move('f1', 'c4');
chess.move('a7', 'a5');
chess.move('d2', 'd3');
chess.move('a5', 'a4');
chess.move('c4', 'd5');
chess.move('h7', 'h6');
chess.move('d5', 'c6');
chess.move('h6', 'h5');
chess.move('c6', 'a4');

// // // //rook test
chess.emptyBoard();
chess.putPieceOnBoard(
	'a1',
	new Rook(chess.getBoard.getSquare('a1')!, Color.white)
);
chess.putPieceOnBoard(
	'd8',
	new Rook(chess.getBoard.getSquare('a1')!, Color.black)
);
chess.move('a1', 'h1');
chess.move('d8', 'd1');
chess.move('h1', 'd1');

// // //queen testing
chess.emptyBoard();
chess.putPieceOnBoard(
	'a1',
	new Queen(chess.getBoard.getSquare('a1')!, Color.white)
);
chess.putPieceOnBoard(
	'a1',
	new Queen(chess.getBoard.getSquare('a1')!, Color.white)
);
chess.putPieceOnBoard(
	'a7',
	new Queen(chess.getBoard.getSquare('a7')!, Color.black)
);
chess.putPieceOnBoard(
	'd8',
	new Queen(chess.getBoard.getSquare('d8')!, Color.black)
);
chess.move('a1', 'h1');
chess.move('d8', 'd1');
chess.move('h1', 'f3');
chess.move('d1', 'f3');

// // //king testing
chess.emptyBoard();
chess.putPieceOnBoard(
	'e1',
	new King(chess.getBoard.getSquare('e1')!, Color.white)
);
chess.putPieceOnBoard(
	'e8',
	new King(chess.getBoard.getSquare('e8')!, Color.black)
);
chess.move('e1', 'e2');
chess.move('e8', 'd7');
chess.move('e2', 'f3');
chess.move('d7', 'e7');

console.log(chess.algebraicNotation());
console.log(chess.getBoard.printBoardWhite());

console.log(chess.latestMove());
console.log(chess.getBoard.printBoardWhite());
// console.log(chess.getBoard);
chess.startingPosition();

//get
console.log(
	chess.getBoard.getSquare(
		`${String.fromCharCode(
			chess.getBoard.getSquare('e2')!.getFile.charCodeAt(0) + 1
		)}${chess.getBoard.getSquare('e2')!.getRank + 1}`
	)
);

console.log(
	chess.getBoard.getSquare('a2')!.getPiece?.possibleMoves(chess.getBoard)
);
console.log(chess.getBoard.printBoardWhite());
chess.move('a2', 'a4');

chess.move('d7', 'd5');
console.log(chess.getBoard.getSquare('d5')?.getPiece);
chess.emptyBoard();
const knight = new Knight(chess.getBoard.getSquare('a1')!, Color.black);
chess.putPieceOnBoard('a1', knight);
const queen = new Queen(chess.getBoard.getSquare('a6')!, Color.black);

console.log(queen.possibleMoves(chess.getBoard));
chess.emptyBoard();
const king = new King(chess.getBoard.getSquare('c2')!, Color.white);
chess.putPieceOnBoard('c2', king);
// chess.getBoard.whiteCheck();
console.log(chess.getBoard.getSquare('a6'));
console.log(chess.getBoard.getSquareById(21));
console.log(chess.getBoard.getSquareById(28));
chess.emptyBoard();
console.log(chess.getBoard.printBoardWhite());

chess.fen(Chess.STARTING_POSITION);
console.log(chess.getBoard.getWhiteKing());
console.log(chess.getBoard.getBlackKing());

// // let board = chess.getBoard;
// // for (let i = 0; i < 10000; i++) {
// // 	console.log(board);
// // }

// // let game = new Game(chess);
// // game.playTerminal();
console.timeEnd('c');

// //possible moves
// //checking
