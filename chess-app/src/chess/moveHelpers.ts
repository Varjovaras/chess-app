import { Board } from "./board/board";
import { Square } from "./board/square";
import { MovePiece } from "../types/types";

export default class MoveHelper {
  static knightMoveHelper = (sq: Square, board: Board): number[] => {
    let endSquares: number[] = [];
    let files = [2, 2, 1, 1, -1, -2, -2, -1];
    let ranks = [1, -1, 2, -2, -2, -1, 1, 2];
    if (!sq) return [];
    let file = sq.getFile;
    let rank = sq.getRank;
    for (let i = 0; i < 8; i++) {
      let nextFile = String.fromCharCode(file.charCodeAt(0) + files[i]!);
      let nextRank = rank + ranks[i]!;
      let sq = board.getSquare(`${nextFile}${nextRank}`);
      if (sq?.getSquareName) {
        endSquares.push(sq.getSquare.getId);
      }
    }
    return endSquares;
  };

  static enPassantHelper = (
    startSq: Square,
    endSq: Square,
    move?: MovePiece
  ): boolean => {
    return !!(
      (startSq.getPiece?.getFirstLetter === "p" &&
        startSq.getRank === 5 &&
        endSq.getRank === 6 &&
        startSq.getFile !== endSq.getFile &&
        move &&
        move.endSq.getRank === 5 &&
        move.startSquarePiece.getFirstLetter === "P" &&
        move.startSq.getFile === endSq.getFile) ||
      (startSq.getPiece?.getFirstLetter === "P" &&
        startSq.getRank === 4 &&
        endSq.getRank === 3 &&
        startSq.getFile !== endSq.getFile &&
        move &&
        move.endSq.getRank === 4 &&
        move.startSquarePiece.getFirstLetter === "p" &&
        move.endSq.getFile === endSq.getFile)
    );
  };

  static castlingKingsideHelper = (startSq: Square, board: Board): boolean => {
    let color = startSq.getPiece!.getColor;
    return color === "WHITE"
      ? MoveHelper.piecesBlockingWhiteKingsideCastling(startSq, board)
      : MoveHelper.piecesBlockingBlackKingsideCastling(startSq, board);
  };

  static castlingQueensideHelper = (startSq: Square, board: Board): boolean => {
    let color = startSq.getPiece!.getColor;
    return color === "WHITE"
      ? MoveHelper.piecesBlockingWhiteQueensideCastling(startSq, board)
      : MoveHelper.piecesBlockingBlackQueensideCastling(startSq, board);
  };

  static piecesBlockingWhiteKingsideCastling = (
    startSq: Square,
    board: Board
  ): boolean => {
    if (!startSq.getPiece || !startSq.getPiece.getFirstLetter)
      throw new Error("White startsq has no piece while castling");

    //up and left
    let index = 7;
    let startSqIndex = startSq.getId + 8;
    for (let i = 0; i < 5; i++, startSqIndex += index) {
      let sq = board.getSquareById(startSqIndex);
      if (!sq) break;

      if (sq.getPiece) {
        if (
          sq.getPiece.getColor !== startSq.getPiece.getColor &&
          (startSq.getPiece.getFirstLetter.toUpperCase() === "Q" ||
            startSq.getPiece.getFirstLetter.toUpperCase() === "B")
        ) {
          console.log("Piece blocking castling on " + sq.getSquareName);
          return false;
        }
        console.log(
          "Piece " +
            sq.getSquare.getPiece!.getFirstLetter +
            " found, but not blocking check on " +
            sq.getSquareName
        );
        break;
      }
    }

    //up and right
    index = 9;
    startSqIndex = startSq.getId + 10;
    for (let i = 0; i < 2; i++, startSqIndex += index) {
      let sq = board.getSquareById(startSqIndex);
      if (!sq) break;

      console.log(sq.getSquareName);
      if (sq.getPiece) {
        if (
          sq.getPiece.getColor !== startSq.getPiece.getColor &&
          (startSq.getPiece.getFirstLetter.toUpperCase() === "Q" ||
            startSq.getPiece.getFirstLetter.toUpperCase() === "B")
        ) {
          console.log("Piece blocking castling on " + sq.getSquareName);
          return false;
        }
        console.log(
          "Piece " +
            sq.getSquare.getPiece!.getFirstLetter +
            " found, but not blocking castling on " +
            sq.getSquareName
        );
        break;
      }
    }

    //up
    index = 8;
    startSqIndex = startSq.getId + 9;

    for (let i = 0; i < 7; i++, startSqIndex += index) {
      let sq = board.getSquareById(startSqIndex);
      if (!sq) break;
      if (sq.getPiece) {
        if (
          sq.getPiece.getColor !== startSq.getPiece.getColor &&
          (sq.getPiece.getFirstLetter!.toUpperCase() === "Q" ||
            sq.getPiece.getFirstLetter!.toUpperCase() === "R")
        ) {
          console.log("Piece blocking castling on " + sq.getSquareName);
          return false;
        }
        break;
      }
    }

    //knights
    let knightSquares = ["d2", "e3", "g3", "h2"];

    for (const knightSquare in knightSquares) {
      const sq = board.getSquare(knightSquare);
      if (!sq) break;
      if (
        sq.getPiece &&
        sq.getPiece.getFirstLetter!.toUpperCase() === "N" &&
        sq.getPiece.getColor === "BLACK"
      ) {
        console.log("Knight blocking castling on " + sq.getSquareName);
        return false;
      }
    }

    console.log("castling allowed");
    return true;
  };

  static piecesBlockingBlackKingsideCastling = (
    startSq: Square,
    board: Board
  ): boolean => {
    if (!startSq.getPiece || !startSq.getPiece.getFirstLetter)
      throw new Error("Black startsq has no piece while castling");

    //down and left
    let index = -9;
    let startSqIndex = startSq.getId - 8;
    for (let i = 0; i < 5; i++, startSqIndex += index) {
      let sq = board.getSquareById(startSqIndex);
      if (!sq) break;
      console.log(sq.getSquareName);

      if (sq.getPiece) {
        if (
          sq.getPiece.getColor !== startSq.getPiece.getColor &&
          (startSq.getPiece.getFirstLetter.toUpperCase() === "Q" ||
            startSq.getPiece.getFirstLetter.toUpperCase() === "B")
        ) {
          console.log("Piece blocking castling on " + sq.getSquareName);
          return false;
        }
        console.log(
          "Piece " +
            sq.getSquare.getPiece!.getFirstLetter +
            " found, but not blocking check on " +
            sq.getSquareName
        );
        break;
      }
    }

    //down and right
    index = -7;
    startSqIndex = startSq.getId - 6;
    for (let i = 0; i < 2; i++, startSqIndex += index) {
      let sq = board.getSquareById(startSqIndex);
      if (!sq) break;
      if (sq.getPiece) {
        if (
          sq.getPiece.getColor !== startSq.getPiece.getColor &&
          (startSq.getPiece.getFirstLetter.toUpperCase() === "Q" ||
            startSq.getPiece.getFirstLetter.toUpperCase() === "B")
        ) {
          console.log("Piece blocking castling on " + sq.getSquareName);
          return false;
        }
        console.log(
          "Piece " +
            sq.getSquare.getPiece!.getFirstLetter +
            " found, but not blocking castling on " +
            sq.getSquareName
        );
        break;
      }
    }

    //up
    index = -8;
    startSqIndex = startSq.getId - 7;

    for (let i = 0; i < 7; i++, startSqIndex += index) {
      let sq = board.getSquareById(startSqIndex);
      if (!sq) break;
      if (sq.getPiece) {
        if (
          sq.getPiece.getColor !== startSq.getPiece.getColor &&
          (sq.getPiece.getFirstLetter!.toUpperCase() === "Q" ||
            sq.getPiece.getFirstLetter!.toUpperCase() === "R")
        ) {
          console.log("Piece blocking castling on " + sq.getSquareName);
          return false;
        }
        break;
      }
    }

    //knights
    let knightSquares = ["d7", "e6", "g6", "h2"];

    for (const knightSquare in knightSquares) {
      const sq = board.getSquare(knightSquare);
      if (!sq) break;
      if (
        sq.getPiece &&
        sq.getPiece.getFirstLetter!.toUpperCase() === "N" &&
        sq.getPiece.getColor === "BLACK"
      ) {
        console.log("Knight blocking castling on " + sq.getSquareName);
        return false;
      }
    }

    return true;
  };

  static piecesBlockingWhiteQueensideCastling = (
    startSq: Square,
    board: Board
  ): boolean => {
    if (!startSq.getPiece || !startSq.getPiece.getFirstLetter)
      throw new Error("White startsq has no piece while castling");

    //up and left
    let index = 7;
    let startSqIndex = startSq.getId + 8;
    for (let i = 0; i < 3; i++, startSqIndex += index) {
      let sq = board.getSquareById(startSqIndex);
      if (!sq) break;

      if (sq.getPiece) {
        if (
          sq.getPiece.getColor !== startSq.getPiece.getColor &&
          (startSq.getPiece.getFirstLetter.toUpperCase() === "Q" ||
            startSq.getPiece.getFirstLetter.toUpperCase() === "B")
        ) {
          console.log("Piece blocking castling on " + sq.getSquareName);
          return false;
        }
        console.log(
          "Piece " +
            sq.getSquare.getPiece!.getFirstLetter +
            " found, but not blocking check on " +
            sq.getSquareName
        );
        break;
      }
    }

    //up and right
    index = 9;
    startSqIndex = startSq.getId + 10;
    for (let i = 0; i < 4; i++, startSqIndex += index) {
      let sq = board.getSquareById(startSqIndex);
      if (!sq) break;

      if (sq.getPiece) {
        if (
          sq.getPiece.getColor !== startSq.getPiece.getColor &&
          (startSq.getPiece.getFirstLetter.toUpperCase() === "Q" ||
            startSq.getPiece.getFirstLetter.toUpperCase() === "B")
        ) {
          console.log("Piece blocking castling on " + sq.getSquareName);
          return false;
        }
        console.log(
          "Piece " +
            sq.getSquare.getPiece!.getFirstLetter +
            " found, but not blocking castling on " +
            sq.getSquareName
        );
        break;
      }
    }

    //up
    index = 8;
    startSqIndex = startSq.getId + 9;

    for (let i = 0; i < 7; i++, startSqIndex += index) {
      let sq = board.getSquareById(startSqIndex);
      if (!sq) break;
      if (sq.getPiece) {
        if (
          sq.getPiece.getColor !== startSq.getPiece.getColor &&
          (sq.getPiece.getFirstLetter!.toUpperCase() === "Q" ||
            sq.getPiece.getFirstLetter!.toUpperCase() === "R")
        ) {
          console.log("Piece blocking castling on " + sq.getSquareName);
          return false;
        }
        break;
      }
    }

    //knights
    let knightSquares = ["b2", "c3", "e3", "f2"];

    for (const knightSquare in knightSquares) {
      const sq = board.getSquare(knightSquare);
      if (!sq) break;
      if (
        sq.getPiece &&
        sq.getPiece.getFirstLetter!.toUpperCase() === "N" &&
        sq.getPiece.getColor === "BLACK"
      ) {
        console.log("Knight blocking castling on " + sq.getSquareName);
        return false;
      }
    }

    console.log("castling allowed");
    return true;
  };

  static piecesBlockingBlackQueensideCastling = (
    startSq: Square,
    board: Board
  ): boolean => {
    if (!startSq.getPiece || !startSq.getPiece.getFirstLetter)
      throw new Error("Black startsq has no piece while castling");

    //down and left
    let index = -9;
    let startSqIndex = startSq.getId - 10;
    for (let i = 0; i < 3; i++, startSqIndex += index) {
      let sq = board.getSquareById(startSqIndex);
      if (!sq) break;

      if (sq.getPiece) {
        if (
          sq.getPiece.getColor !== startSq.getPiece.getColor &&
          (startSq.getPiece.getFirstLetter.toUpperCase() === "Q" ||
            startSq.getPiece.getFirstLetter.toUpperCase() === "B")
        ) {
          console.log("Piece blocking castling on " + sq.getSquareName);
          return false;
        }
        console.log(
          "Piece " +
            sq.getSquare.getPiece!.getFirstLetter +
            " found, but not blocking check on " +
            sq.getSquareName
        );
        break;
      }
    }

    //down and right
    index = -7;
    startSqIndex = startSq.getId - 8;
    for (let i = 0; i < 4; i++, startSqIndex += index) {
      let sq = board.getSquareById(startSqIndex);
      if (!sq) break;
      if (sq.getPiece) {
        if (
          sq.getPiece.getColor !== startSq.getPiece.getColor &&
          (startSq.getPiece.getFirstLetter.toUpperCase() === "Q" ||
            startSq.getPiece.getFirstLetter.toUpperCase() === "B")
        ) {
          console.log("Piece blocking castling on " + sq.getSquareName);
          return false;
        }
        console.log(
          "Piece " +
            sq.getSquare.getPiece!.getFirstLetter +
            " found, but not blocking castling on " +
            sq.getSquareName
        );
        break;
      }
    }

    //up
    index = -8;
    startSqIndex = startSq.getId - 9;

    for (let i = 0; i < 7; i++, startSqIndex += index) {
      let sq = board.getSquareById(startSqIndex);
      if (!sq) break;
      if (sq.getPiece) {
        if (
          sq.getPiece.getColor !== startSq.getPiece.getColor &&
          (sq.getPiece.getFirstLetter!.toUpperCase() === "Q" ||
            sq.getPiece.getFirstLetter!.toUpperCase() === "R")
        ) {
          console.log("Piece blocking castling on " + sq.getSquareName);
          return false;
        }
        break;
      }
    }

    //knights
    let knightSquares = ["b7", "c6", "e6", "f7"];

    for (const knightSquare in knightSquares) {
      const sq = board.getSquare(knightSquare);
      if (!sq) break;
      if (
        sq.getPiece &&
        sq.getPiece.getFirstLetter!.toUpperCase() === "N" &&
        sq.getPiece.getColor === "BLACK"
      ) {
        console.log("Knight blocking castling on " + sq.getSquareName);
        return false;
      }
    }

    return true;
  };
}
