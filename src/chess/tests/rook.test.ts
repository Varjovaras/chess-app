import { Rook } from "../pieces/rook";
import { Bishop } from "../pieces/bishop";
import Chess from "../chess";
import { Color } from "../../types/types";

const chess = new Chess();

describe("Rook tests", () => {
  beforeEach(() => {
    chess.emptyBoard();
    chess.putPieceOnBoard(
      "e4",
      new Rook(chess.getSquareFromBoard("e4"), Color.white)
    );
  });

  test("Movement up", () => {
    chess.move("e4", "e8");

    expect(
      chess.getSquareFromBoard("e8").getPiece &&
        !chess.getSquareFromBoard("e4").getPiece
    ).toBeTruthy();
  });

  test("Movement down", () => {
    chess.move("e4", "e1");
    expect(
      chess.getSquareFromBoard("e1").getPiece &&
        !chess.getSquareFromBoard("e4").getPiece
    ).toBeTruthy();
  });

  test("Movement right", () => {
    chess.move("e4", "a4");
    expect(
      chess.getSquareFromBoard("a4").getPiece &&
        !chess.getSquareFromBoard("e4").getPiece
    ).toBeTruthy();
  });

  test("Movement right", () => {
    chess.move("e4", "h4");
    expect(
      chess.getSquareFromBoard("h4").getPiece &&
        !chess.getSquareFromBoard("e4").getPiece
    ).toBeTruthy();
  });

  test("Cannot pass through other pieces", () => {
    chess.putPieceOnBoard(
      "d4",
      new Bishop(chess.getSquareFromBoard("e5"), Color.black)
    );
    chess.putPieceOnBoard(
      "e2",
      new Bishop(chess.getSquareFromBoard("e3"), Color.black)
    );
    chess.putPieceOnBoard(
      "e7",
      new Bishop(chess.getSquareFromBoard("f4"), Color.white)
    );
    chess.putPieceOnBoard(
      "f4",
      new Bishop(chess.getSquareFromBoard("d4"), Color.white)
    );

    try {
      chess.move("e4", "e1");
    } catch {}

    try {
      chess.move("e4", "e8");
    } catch {}

    try {
      chess.move("e4", "a4");
    } catch {}
    try {
      chess.move("e4", "h4");
    } catch {}
    expect(
      chess.getSquareFromBoard("e4").getPiece &&
        !chess.getSquareFromBoard("e1").getPiece &&
        !chess.getSquareFromBoard("e8").getPiece &&
        !chess.getSquareFromBoard("a4").getPiece &&
        !chess.getSquareFromBoard("h4").getPiece
    ).toBeTruthy();
  });
});
