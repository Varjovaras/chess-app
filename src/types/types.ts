import { Piece } from "../chess/pieces/piece";
import { Square } from "../chess/board/square";

export const Color = {
  black: "BLACK",
  white: "WHITE",
} as const;

type ObjectValues<T> = T[keyof T];

export type ColorType = ObjectValues<typeof Color>;

export const ChessPieces = {
  PAWN_WHITE: "pawn",
  PAWN_BLACK: "PAWN",
  KNIGHT_WHITE: "night", //first letter n for printing purposes
  KNIGHT_BLACK: "NIGHT", //first letter N for printing purposes
  BISHOP_WHITE: "bishop",
  BISHOP_BLACK: "BISHOP",
  ROOK_WHITE: "rook",
  ROOK_BLACK: "ROOK",
  QUEEN_WHITE: "queen",
  QUEEN_BLACK: "QUEEN",
  KING_WHITE: "king",
  KING_BLACK: "KING",
} as const;

export type ChessPieceType = ObjectValues<typeof ChessPieces>;

export type MoveDetails = {
  startSq: Square;
  endSq: Square;
  startSquarePiece: Piece;
  promotion?: Piece | null;
};

export type MoveSquares = {
  startSq: Square;
  endSq: Square;
};
