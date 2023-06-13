import { Board } from "../board/board";
import { Piece } from "./piece";
import { Rook } from "./rook";
import { Square } from "../board/square";
import { ChessPieces, Color, ColorType } from "../../types/types";
import MoveHelper from "../move/moveHelpers";

export class King extends Piece {
  override readonly color: ColorType;
  private castlingAllowed: boolean;

  constructor(square: Square, color: ColorType) {
    super(square);
    this.color = color;
    this.castlingAllowed = true;

    if (color === Color.white) {
      this.name = ChessPieces.KING_WHITE;
    } else {
      this.name = ChessPieces.KING_BLACK;
    }
  }

  isCastlingAllowed() {
    return this.castlingAllowed;
  }

  override move(startSq: Square, endSq: Square, board: Board): boolean {
    if (startSq.getPiece && endSq.getPiece !== null) {
      if (Piece.capturable(startSq, endSq)) {
        return King.kingMoves(startSq, endSq, board);
      } else {
        console.log("Capturing with king failed");
        return false;
      }
    }
    if (
      (startSq.getFile === "e" && endSq.getFile === "g") ||
      endSq.getFile === "c"
    ) {
      const castlingSuccessful = this.castling(startSq, endSq, board);

      if (castlingSuccessful) {
        return castlingSuccessful;
      }
    }
    const kingMoveSuccessful = King.kingMoves(startSq, endSq, board);
    this.castlingAllowed = false;
    return kingMoveSuccessful;
  }

  castling(startSq: Square, endSq: Square, board: Board): boolean {
    // console.log("Testing if castling allowed");
    if (!this.castlingAllowed) return false;
    if (endSq.getFile === "g") {
      if (MoveHelper.castlingKingsideHelper(startSq, board)) {
        return this.kingSideCastling(startSq, endSq, board);
      } else return false;
    } else if (endSq.getFile === "c") {
      if (MoveHelper.castlingQueensideHelper(startSq, board)) {
        return this.queenSideCastling(startSq, endSq, board);
      } else return false;
    } else return false;
  }

  private kingSideCastling(
    startSq: Square,
    endSq: Square,
    board: Board
  ): boolean {
    if (startSq.getRank === 1) {
      const rook = board.getSquare("h1")?.getPiece;
      if (!rook || !(rook instanceof Rook) || !rook.isCastlingAllowed()) {
        console.log("no rook, piece on h1 is not a rook or the rook has moved");
        return false;
      }

      if (
        !board.getSquare("f1")?.getPiece ||
        !board.getSquare("g1")?.getPiece
      ) {
        // console.log(
        //   "Castling allowed kingside for white king. Castling king on " +
        //     this.getSquare?.getSquareName +
        //     " to " +
        //     endSq.getSquareName
        // );
        return true;
      }
    } else if (startSq.getRank === 8) {
      const rook = board.getSquare("h8")?.getPiece;
      if (!rook || !(rook instanceof Rook) || !rook.isCastlingAllowed()) {
        // console.log("no rook, piece on h8 is not a rook or the rook has moved");
        return false;
      }
      if (
        !board.getSquare("f8")?.getPiece &&
        !board.getSquare("g8")?.getPiece
      ) {
        // console.log(
        //   "Castling allowed kingside for black king. Moving king on " +
        //     this.getSquare?.getSquareName
        // );
        return true;
      }
    }
    console.log("castling not allowed");
    return false;
  }

  private queenSideCastling(
    startSq: Square,
    endSq: Square,
    board: Board
  ): boolean {
    if (startSq.getRank === 1) {
      const rook = board.getSquare("a1")?.getPiece;
      if (!rook || !(rook instanceof Rook) || !rook.isCastlingAllowed()) {
        console.log("no rook, piece on a1 is not a rook or the rook has moved");
        return false;
      }

      if (
        !board.getSquare("d1")?.getPiece ||
        !board.getSquare("c1")?.getPiece
      ) {
        // console.log(
        //   "Castling allowed queenside for white king. Castling king on " +
        //     this.getSquare?.getSquareName +
        //     " to " +
        //     endSq.getSquareName
        // );
        return true;
      }
    } else if (startSq.getRank === 8) {
      const rook = board.getSquare("a8")?.getPiece;
      if (!rook || !(rook instanceof Rook) || !rook.isCastlingAllowed()) {
        // console.log("no rook, piece on a8 is not a rook or the rook has moved");
        return false;
      }
      if (
        !board.getSquare("d8")?.getPiece &&
        !board.getSquare("c8")?.getPiece
      ) {
        // console.log(
        //   "Castling allowed queenside for black king. Moving king on " +
        //     this.getSquare?.getSquareName
        // );
        return true;
      }
    }
    console.log("castling not allowed");
    return false;
  }

  castlingCheckHelper(startSq: Square, endSq: Square, board: Board) {
    if (!startSq?.getPiece || !endSq) return false;
    const king =
      startSq.getPiece.getColor === "WHITE"
        ? board.getWhiteKing()
        : board.getBlackKing();
    if (
      startSq.getPiece.getFirstLetter!.toUpperCase() === "K" &&
      startSq.getSquareName === "e1" &&
      this.isCastlingAllowed() &&
      (endSq.getFile === "c" || endSq.getFile === "b")
    ) {
      console.log("White king cannot castle if in check");
      return false;
    } else if (
      startSq.getPiece.getFirstLetter!.toUpperCase() === "K" &&
      startSq.getSquareName === "e8" &&
      this.isCastlingAllowed() &&
      (endSq.getFile === "c" || endSq.getFile === "b")
    ) {
      console.log("Black king cannot castle if in check");
      return false;
    }
    return true;
  }

  static kingMoves(startSq: Square, endSq: Square, board: Board): boolean {
    const fileDiff = Math.abs(
      Board.findFileIndex(startSq.getFile) - Board.findFileIndex(endSq.getFile)
    );
    const rankDiff = Math.abs(startSq.getRank - endSq.getRank);

    if (fileDiff > 1 || rankDiff > 1) {
      return false;
    }
    if (fileDiff === rankDiff && startSq !== endSq) {
      return Piece.isDiagonal(startSq, endSq, board);
    } else if (fileDiff === 0) {
      return Piece.verticalMove(startSq, endSq, board);
    } else if (rankDiff === 0) {
      return Piece.horizontalMove(startSq, endSq, board);
    } else return false;
  }
}
