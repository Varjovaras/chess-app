export enum Piece {
	pawn = 'PAWN',
	knight = 'KNIGHT',
	bishop = 'BISHOP',
	rook = 'ROOK',
	queen = 'QUEEN',
	king = 'KING',
	empty = 'EMPTY',
}

export enum SquareColor {
	black = 'BLACK',
	white = 'WHITE',
}

export type Square = {
	rank: number;
	file: string;
	square: string;
	color: SquareColor;
	piece: Piece;
};
