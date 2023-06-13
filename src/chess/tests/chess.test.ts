import { Rook } from "../pieces/rook";
import Chess from "../chess";
import { King } from "../pieces/king";
import { Pawn } from "../pieces/pawn";
import { Color } from "../../types/types";

const chess = new Chess();

describe("board works", () => {
  beforeEach(() => {
    chess.emptyBoard();
  });

  test("board is empty", () => {
    expect(chess.getBoard.isEmpty()).toBe(true);
  });

  test("board is initialized", () => {
    chess.startingPosition();
    expect(chess.getBoard.isEmpty()).toBe(false);
  });

  test("turn number goes up and checks the right player", () => {
    chess.startingPosition();
    expect(
      chess.getTurnNumber === 0 && chess.whoseTurn() === "WHITE"
    ).toBeTruthy();
    chess.move("e2", "e4");
    expect(
      chess.getTurnNumber === 1 && chess.whoseTurn() === "BLACK"
    ).toBeTruthy();
  });
});

describe("adding and removing pieces works", () => {
  beforeEach(() => {
    chess.emptyBoard();
    chess.putPieceOnBoard(
      "e2",
      new Pawn(chess.getBoard.getSquare("e2")!, Color.white)
    );
  });

  test("add piece on board", () => {
    expect(chess.getBoard.isEmpty()).toBe(false);
  });

  test("Remove piece from board", () => {
    chess.getBoard.getSquare("e2")!.removePiece();
    expect(chess.getBoard.isEmpty()).toBe(true);
  });

  test("moving function works and checks if white king is in check", () => {
    chess.putPieceOnBoard(
      "a1",
      new King(chess.getBoard.getSquare("a1")!, Color.white)
    );
    chess.putPieceOnBoard(
      "a8",
      new Rook(chess.getBoard.getSquare("a8")!, Color.black)
    );
    chess.move("e2", "e4");
    expect(
      chess.getSquareFromBoard("e2").getPiece &&
        chess.getBoard.isWhiteKingInCheck()
    ).toBeTruthy();
  });

  test("moving function works and checks if black king is in check", () => {
    chess.putPieceOnBoard(
      "a1",
      new King(chess.getBoard.getSquare("a1")!, Color.black)
    );
    chess.putPieceOnBoard(
      "a8",
      new Rook(chess.getBoard.getSquare("a8")!, Color.white)
    );
    chess.putPieceOnBoard(
      "e7",
      new Pawn(chess.getBoard.getSquare("e7")!, Color.black)
    );
    chess.move("e2", "e4");
    chess.move("e7", "e5");

    expect(
      chess.getSquareFromBoard("e4").getPiece &&
        chess.getSquareFromBoard("e7").getPiece &&
        chess.getBoard.isBlackKingInCheck()
    ).toBeTruthy();
  });
});

describe("cant move in check", () => {
  beforeEach(() => {
    chess.emptyBoard();
    chess.startingPosition();
  });

  test("cannot move as white if it puts you into check", () => {
    chess.move("f2", "f3");
    chess.move("e7", "e5");
    chess.move("a2", "a4");
    chess.move("d8", "a4");
    try {
      chess.move("g2", "g4");
    } catch {}

    expect(
      chess.getSquareFromBoard("g2").getPiece &&
        !chess.getSquareFromBoard("g4").getPiece
    ).toBeTruthy();
  });
  test("cannot move as black if it puts you into check", () => {
    chess.move("e2", "e4");
    chess.move("b7", "b5");
    chess.move("f2", "f4");
    chess.move("a7", "a5");
    chess.move("d1", "h5");
    chess.move("f7", "f5");

    expect(
      chess.getSquareFromBoard("f7").getPiece &&
        !chess.getSquareFromBoard("f5").getPiece
    ).toBeTruthy();
  });
});
