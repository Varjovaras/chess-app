export enum Piece {
	pawn = 'PAWN',
	knight = 'KNIGHT',
	bishop = 'BISHOP',
	rook = 'ROOK',
	queen = 'QUEEN',
	king = 'KING',
	empty = 'EMPTY',
}

export enum Color {
	black = 'BLACK',
	white = 'WHITE',
}

export type Square = {
	square: string;
	color: Color;
	piece: Piece;
};
