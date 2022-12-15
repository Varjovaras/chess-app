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
console.log(chess.printBoardWhite());
chess.movePiece('e2', 'e4');
chess.movePiece('d7', 'd5');
chess.movePiece('e4', 'd5');

console.log(chess.getPieces);

chess.fen(Chess.STARTING_POSITION);
console.log(chess.printBoardWhite());

// enpassant test
chess.fen(Chess.STARTING_POSITION);
chess.movePiece('e2', 'e4');
chess.movePiece('d7', 'd5');
chess.movePiece('e4', 'd5');
chess.movePiece('g8', 'f6');
chess.movePiece('g1', 'e2');
chess.movePiece('c7', 'c5');
chess.movePiece('d5', 'c6');
chess.movePiece('g7', 'g5');
chess.movePiece('c6', 'c7');
chess.movePiece('g5', 'g4');
chess.movePiece('h2', 'h4');
chess.movePiece('g4', 'h3');
console.log(chess.getPieces);
console.log(chess.printBoardWhite());

// console.log(chess.getMoves);
// // // knights test
// chess.fen(Chess.STARTING_POSITION);
// chess.movePiece('b1', 'c3');
// chess.movePiece('b8', 'c6');
// chess.movePiece('c3', 'd5');
// chess.movePiece('c6', 'e5');
// chess.movePiece('d5', 'b6');
// chess.movePiece('e5', 'f3');
// chess.movePiece('g2', 'f3');
// chess.movePiece('g8', 'h6');

// // // // bishop test
// chess.fen(Chess.STARTING_POSITION);
// chess.movePiece('e2', 'e4');
// chess.movePiece('e7', 'e5');
// chess.movePiece('f1', 'c4');
// chess.movePiece('a7', 'a5');
// chess.movePiece('d2', 'd3');
// chess.movePiece('a5', 'a4');
// chess.movePiece('c4', 'd5');
// chess.movePiece('h7', 'h6');
// chess.movePiece('d5', 'c6');
// chess.movePiece('h6', 'h5');
// chess.movePiece('c6', 'a4');

// // // // //rook test
// chess.emptyBoard();
// chess.putPieceOnBoard(
// 	'a1',
// 	new Rook(chess.getBoard.getSquare('a1')!, Color.white)
// );
// chess.putPieceOnBoard(
// 	'd8',
// 	new Rook(chess.getBoard.getSquare('a1')!, Color.black)
// );
// chess.movePiece('a1', 'h1');
// chess.movePiece('d8', 'd1');
// chess.movePiece('h1', 'd1');

// // // //queen testing
// chess.emptyBoard();
// chess.putPieceOnBoard(
// 	'a1',
// 	new Queen(chess.getBoard.getSquare('a1')!, Color.white)
// );
// chess.putPieceOnBoard(
// 	'a1',
// 	new Queen(chess.getBoard.getSquare('a1')!, Color.white)
// );
// chess.putPieceOnBoard(
// 	'a7',
// 	new Queen(chess.getBoard.getSquare('a7')!, Color.black)
// );
// chess.putPieceOnBoard(
// 	'd8',
// 	new Queen(chess.getBoard.getSquare('d8')!, Color.black)
// );
// chess.movePiece('a1', 'h1');
// chess.movePiece('d8', 'd1');
// chess.movePiece('h1', 'f3');
// chess.movePiece('d1', 'f3');

// // // //king testing
// chess.emptyBoard();
// chess.putPieceOnBoard(
// 	'e1',
// 	new King(chess.getBoard.getSquare('e1')!, Color.white)
// );
// chess.putPieceOnBoard(
// 	'e8',
// 	new King(chess.getBoard.getSquare('e8')!, Color.black)
// );
// chess.movePiece('e1', 'e2');
// chess.movePiece('e8', 'd7');
// chess.movePiece('e2', 'f3');
// chess.movePiece('d7', 'e7');

// console.log(chess.algebraicNotation());
// console.log(chess.printBoardWhite());

// console.log(chess.latestMove());
// console.log(chess.printBoardWhite());
// // console.log(chess.getBoard);
// chess.startingPosition();

// //get
// console.log(
// 	chess.getBoard.getSquare(
// 		`${String.fromCharCode(
// 			chess.getBoard.getSquare('e2')!.getFile.charCodeAt(0) + 1
// 		)}${chess.getBoard.getSquare('e2')!.getRank + 1}`
// 	)
// );

// console.log(
// 	chess.getBoard.getSquare('a2')!.getPiece?.possibleMoves(chess.getBoard)
// );
// console.log(chess.printBoardWhite());
// chess.movePiece('a2', 'a4');

// chess.movePiece('d7', 'd5');
// console.log(chess.getBoard.getSquare('d5')?.getPiece);
// chess.emptyBoard();
// const knight = new Knight(chess.getBoard.getSquare('a1')!, Color.black);
// chess.putPieceOnBoard('a1', knight);
// const queen = new Queen(chess.getBoard.getSquare('a6')!, Color.black);

// console.log(queen.possibleMoves(chess.getBoard));
// chess.emptyBoard();
// const king = new King(chess.getBoard.getSquare('c2')!, Color.white);
// chess.putPieceOnBoard('c2', king);
// king.whiteCheck(chess.getBoard);
// console.log(chess.getBoard.getSquare('a6'));
// console.log(chess.getBoard.getSquareById(21));
// console.log(chess.getBoard.getSquareById(28));

// chess.fen(Chess.STARTING_POSITION);
// console.log(chess.printBoardWhite());

// // let board = chess.getBoard;
// // for (let i = 0; i < 10000; i++) {
// // 	console.log(board);
// // }

// // let game = new Game(chess);
// // game.playTerminal();
console.timeEnd('c');

// //possible moves
// //checking
