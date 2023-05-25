import { Rook } from "../pieces/rook";
import { Bishop } from "../pieces/bishop";
import Chess from "../chess";
import { King } from "../pieces/king";
import { Color } from "../../types/types";

const chess = new Chess();

describe("king tests", () => {
  beforeEach(() => {
    chess.emptyBoard();
    chess.putPieceOnBoard(
      "e4",
      new King(chess.getSquareFromBoard("e4"), Color.white)
    );
  });

  test("movement up", () => {
    chess.move("e4", "e5");
    expect(
      chess.getSquareFromBoard("e5").getPiece &&
        !chess.getSquareFromBoard("e4").getPiece
    ).toBeTruthy();
  });

  test("movement down", () => {
    chess.move("e4", "e3");
    expect(
      chess.getSquareFromBoard("e3").getPiece &&
        !chess.getSquareFromBoard("e4").getPiece
    ).toBeTruthy();
  });

  test("movement right", () => {
    chess.move("e4", "f4");
    expect(
      chess.getSquareFromBoard("f4").getPiece &&
        !chess.getSquareFromBoard("e4").getPiece
    ).toBeTruthy();
  });

  test("movement left", () => {
    chess.move("e4", "d4");
    expect(
      chess.getSquareFromBoard("d4").getPiece &&
        !chess.getSquareFromBoard("e4").getPiece
    ).toBeTruthy();
  });

  test("movement up and left", () => {
    chess.move("e4", "d5");
    expect(
      chess.getSquareFromBoard("d5").getPiece &&
        !chess.getSquareFromBoard("e4").getPiece
    ).toBeTruthy();
  });

  test("movement down and left", () => {
    chess.move("e4", "d3");
    expect(
      chess.getSquareFromBoard("d3").getPiece &&
        !chess.getSquareFromBoard("e4").getPiece
    ).toBeTruthy();
  });

  test("movement up  and right", () => {
    chess.move("e4", "f5");
    expect(
      chess.getSquareFromBoard("f5").getPiece &&
        !chess.getSquareFromBoard("e4").getPiece
    ).toBeTruthy();
  });

  test("movement down  and right", () => {
    chess.move("e4", "f3");
    expect(
      chess.getSquareFromBoard("f3").getPiece &&
        !chess.getSquareFromBoard("e4").getPiece
    ).toBeTruthy();
  });

  test("being in check works and you need to move out of it", () => {
    chess.putPieceOnBoard(
      "c2",
      new Bishop(chess.getSquareFromBoard("c2"), Color.black)
    );

    chess.putPieceOnBoard(
      "d1",
      new Rook(chess.getSquareFromBoard("d5"), Color.black)
    );

    chess.move("e4", "d5");

    expect(
      chess.getSquareFromBoard("e4").getPiece &&
        !chess.getSquareFromBoard("d5").getPiece
    ).toBeTruthy();

    chess.move("e4", "f4");

    expect(
      chess.getSquareFromBoard("f4").getPiece &&
        !chess.getSquareFromBoard("e4").getPiece
    ).toBeTruthy();
  });

  test("blocking removes check and move doesnt count if you dont block or move king", () => {
    chess.putPieceOnBoard(
      "c1",
      new Bishop(chess.getSquareFromBoard("c3"), Color.white)
    );

    chess.putPieceOnBoard(
      "e1",
      new Rook(chess.getSquareFromBoard("d5"), Color.black)
    );

    chess.move("c1", "f4");

    expect(
      chess.getSquareFromBoard("c1").getPiece &&
        !chess.getSquareFromBoard("f4").getPiece
    ).toBeTruthy();

    chess.move("c1", "e3");

    expect(
      chess.getSquareFromBoard("e3").getPiece &&
        !chess.getSquareFromBoard("c1").getPiece
    ).toBeTruthy();
  });

  test("cannot capture piece if it is guarded", () => {
    chess.putPieceOnBoard(
      "d5",
      new Bishop(chess.getSquareFromBoard("d5"), Color.black)
    );

    chess.putPieceOnBoard(
      "d1",
      new Rook(chess.getSquareFromBoard("d5"), Color.black)
    );

    try {
      chess.move("e4", "d5");
    } catch {}

    expect(
      chess.getSquareFromBoard("e4").getPiece &&
        chess
          .getSquareFromBoard("e4")
          .getPiece?.getFirstLetter!.toUpperCase() === "K" &&
        chess.getSquareFromBoard("d5").getPiece &&
        chess
          .getSquareFromBoard("d5")
          .getPiece?.getFirstLetter!.toUpperCase() === "B"
    ).toBeTruthy();
  });

  test("cannot move to a square that is guarded", () => {
    chess.putPieceOnBoard(
      "d5",
      new Bishop(chess.getSquareFromBoard("d5"), Color.black)
    );

    chess.putPieceOnBoard(
      "d1",
      new Rook(chess.getSquareFromBoard("d5"), Color.black)
    );

    try {
      chess.move("e4", "d4");
    } catch {}

    expect(
      chess.getSquareFromBoard("e4").getPiece &&
        chess
          .getSquareFromBoard("e4")
          .getPiece?.getFirstLetter!.toUpperCase() === "K" &&
        chess.getSquareFromBoard("d5").getPiece &&
        chess
          .getSquareFromBoard("d5")
          .getPiece?.getFirstLetter!.toUpperCase() === "B"
    ).toBeTruthy();
  });

  test("castling kingside works", () => {
    chess.startingPosition();
    chess.move("e2", "e4");
    chess.move("f7", "f5");
    chess.move("e4", "f5");
    chess.move("e7", "e5");
    chess.move("f5", "e6");
    chess.move("f8", "d6");
    chess.move("f1", "c4");
    chess.move("g8", "e7");
    chess.move("f2", "f4");
    chess.move("g7", "g5");
    chess.move("f4", "g5");
    chess.move("b7", "b6");
    chess.move("g1", "f3");
    chess.move("a7", "a5");

    expect(
      chess.getSquareFromBoard("f3").getPiece &&
        chess
          .getSquareFromBoard("f3")
          .getPiece?.getFirstLetter!.toUpperCase() === "N" &&
        chess.getSquareFromBoard("e1").getPiece &&
        chess.getSquareFromBoard("h1").getPiece
    ).toBeTruthy();
    try {
      chess.move("e1", "g1");
    } catch {}

    expect(
      chess.getSquareFromBoard("g1").getPiece &&
        chess.getSquareFromBoard("f1").getPiece
    ).toBeTruthy();

    try {
      chess.move("e8", "g8");
    } catch {}

    expect(
      chess.getSquareFromBoard("f8").getPiece &&
        chess.getSquareFromBoard("g8").getPiece
    ).toBeTruthy();
  });

  test("white cannot castle kingside through a check", () => {
    chess.startingPosition();
    chess.move("e2", "e4");
    chess.move("f7", "f5");
    chess.move("e4", "f5");
    chess.move("e7", "e5");
    chess.move("f5", "e6");
    chess.move("f8", "d6");
    chess.move("f1", "c4");
    chess.move("g8", "e7");
    chess.move("f2", "f4");
    chess.move("g7", "g5");
    chess.move("f4", "g5");
    chess.move("h8", "f8");
    chess.move("g1", "h3");
    chess.move("a7", "a5");

    expect(
      chess.getSquareFromBoard("h3").getPiece &&
        chess
          .getSquareFromBoard("h3")
          .getPiece?.getFirstLetter!.toUpperCase() === "N" &&
        chess.getSquareFromBoard("f8").getPiece &&
        chess
          .getSquareFromBoard("f8")
          .getPiece?.getFirstLetter!.toUpperCase() === "R" &&
        chess.getSquareFromBoard("e1").getPiece &&
        chess.getSquareFromBoard("h1").getPiece
    ).toBeTruthy();
    try {
      chess.move("e1", "g1");
    } catch {}
    console.log(chess.getBoard.printBoardWhite());

    expect(
      !chess.getSquareFromBoard("g1").getPiece &&
        !chess.getSquareFromBoard("f1").getPiece
    ).toBeTruthy();
  });

  test("black cannot castle kingside through a check", () => {
    chess.startingPosition();
    chess.move("e2", "e4");
    chess.move("f7", "f5");
    chess.move("e4", "f5");
    chess.move("e7", "e5");
    chess.move("f5", "e6");
    chess.move("f8", "d6");
    chess.move("f1", "c4");
    chess.move("g8", "e7");
    chess.move("f2", "f4");
    chess.move("g7", "g5");
    chess.move("f4", "g5");
    chess.move("b7", "b6");
    chess.move("g1", "h3");
    chess.move("a7", "a5");

    expect(
      chess.getSquareFromBoard("h3").getPiece &&
        chess
          .getSquareFromBoard("h3")
          .getPiece?.getFirstLetter!.toUpperCase() === "N" &&
        chess.getSquareFromBoard("e1").getPiece &&
        chess.getSquareFromBoard("h1").getPiece
    ).toBeTruthy();
    try {
      chess.move("e1", "g1");
    } catch {}

    expect(
      chess.getSquareFromBoard("g1").getPiece &&
        chess.getSquareFromBoard("f1").getPiece
    ).toBeTruthy();

    chess.move("e7", "c6");
    chess.move("a2", "a3");

    try {
      chess.move("e8", "g8");
    } catch {}

    console.log(chess.getBoard.printBoardWhite());

    expect(
      !chess.getSquareFromBoard("g8").getPiece &&
        !chess.getSquareFromBoard("f8").getPiece
    ).toBeTruthy();
  });
});
