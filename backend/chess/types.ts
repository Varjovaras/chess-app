import { Knight } from './Knight';
import { Piece } from './Piece';
import { Queen } from './Queen';
import { Rook } from './Rook';
import { Square } from './Square';
import { Bishop } from './bishop';
import { King } from './king';
import { Pawn } from './pawn';

export const Color = {
	black: 'BLACK',
	white: 'WHITE',
} as const;

type ObjectValues<T> = T[keyof T];

export type ColorType = ObjectValues<typeof Color>;

export const ChessPieces = {
	PAWN_WHITE: 'pawn',
	PAWN_BLACK: 'PAWN',
	KNIGHT_WHITE: 'night', //first letter n for printing purposes
	KNIGHT_BLACK: 'NIGHT', //first letter N for printing purposes
	BISHOP_WHITE: 'bishop',
	BISHOP_BLACK: 'BISHOP',
	ROOK_WHITE: 'rook',
	ROOK_BLACK: 'ROOK',
	QUEEN_WHITE: 'queen',
	QUEEN_BLACK: 'QUEEN',
	KING_WHITE: 'king',
	KING_BLACK: 'KING',
} as const;

export type ChessPieceType = ObjectValues<typeof ChessPieces>;

export type Move = {
	startSq: Square;
	endSq: Square;
	startSquarePiece: Piece;
	promotion?: Piece | null;
};

export type Pieces = {
	Piece: Piece;
	// Pawn: Pawn;
	// Bishop: Bishop;
	// Knight: Knight;
	// Queen: Queen;
	// Rook: Rook;
	// King: King;
};

export type SingleMove = {
	startSq: string;
	endSq: string;
};

export type PieceSquare = {
	square: string;
	piece: Piece;
};
