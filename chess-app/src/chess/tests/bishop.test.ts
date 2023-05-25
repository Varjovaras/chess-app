import { Color } from "../../types/types";
import { Bishop } from "../pieces/bishop";
import Chess from "../chess";

const chess = new Chess();

describe("bishop tests", () => {
  beforeEach(() => {
    chess.emptyBoard();
    chess.putPieceOnBoard(
      "e4",
      new Bishop(chess.getSquareFromBoard("e4"), Color.white)
    );
  });

  test("movement up and left", () => {
    chess.move("e4", "c6");
    expect(
      chess.getSquareFromBoard("c6").getPiece &&
        !chess.getSquareFromBoard("e4").getPiece
    ).toBeTruthy();
  });

  test("movement down and left", () => {
    chess.move("e4", "b1");
    expect(
      chess.getSquareFromBoard("b1").getPiece &&
        !chess.getSquareFromBoard("e4").getPiece
    ).toBeTruthy();
  });

  test("movement up  and right", () => {
    chess.move("e4", "h7");
    expect(
      chess.getSquareFromBoard("h7").getPiece &&
        !chess.getSquareFromBoard("e4").getPiece
    ).toBeTruthy();
  });

  test("movement down  and right", () => {
    chess.move("e4", "h1");
    expect(
      chess.getSquareFromBoard("h1").getPiece &&
        !chess.getSquareFromBoard("e4").getPiece
    ).toBeTruthy();
  });

  test("cannot pass through other pieces", () => {
    chess.putPieceOnBoard(
      "d5",
      new Bishop(chess.getSquareFromBoard("d5"), Color.black)
    );
    chess.putPieceOnBoard(
      "d3",
      new Bishop(chess.getSquareFromBoard("d3"), Color.black)
    );
    chess.putPieceOnBoard(
      "f5",
      new Bishop(chess.getSquareFromBoard("f5"), Color.white)
    );
    chess.putPieceOnBoard(
      "f3",
      new Bishop(chess.getSquareFromBoard("f3"), Color.white)
    );

    try {
      chess.move("e4", "c6");
    } catch {}

    try {
      chess.move("e4", "c2");
    } catch {}

    try {
      chess.move("e4", "g6");
    } catch {}
    try {
      chess.move("e4", "g2");
    } catch {}
    expect(
      chess.getSquareFromBoard("e4").getPiece &&
        !chess.getSquareFromBoard("c6").getPiece &&
        !chess.getSquareFromBoard("c2").getPiece &&
        !chess.getSquareFromBoard("g6").getPiece &&
        !chess.getSquareFromBoard("g2").getPiece
    ).toBeTruthy();
  });
});
