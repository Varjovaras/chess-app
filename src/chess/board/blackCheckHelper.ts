import MoveHelper from "../move/moveHelpers";
import { Board } from "./board";
import { Square } from "./square";

export default class BlackCheckHelper {
  private _board: Board;
  private _kingSq: Square;
  private _kingSqId: number;

  constructor(board: Board, kingSq: Square, kingSquareId: number) {
    this._board = board;
    this._kingSq = kingSq;
    this._kingSqId = kingSquareId;
  }

  get getBoard() {
    return this._board;
  }

  get getKingSquare() {
    return this._kingSq;
  }

  get getKingSquareId() {
    return this._kingSqId;
  }

  blackKingInCheck(): boolean {
    if (this.blackCheckUpwards()) return true;
    if (this.blackCheckDownwards()) return true;
    if (this.blackCheckUpRight()) return true;
    if (this.blackCheckUpLeft()) return true;
    if (this.blackCheckDownLeft()) return true;
    if (this.blackCheckDownRight()) return true;
    if (this.blackCheckWithHorse()) return true;
    if (this.blackCheckWithPawn()) return true;
    return false;
  }

  private blackCheckUpwards(): boolean {
    const kingSqId = this.getKingSquareId;

    for (let i = 1; i < 8; i++) {
      let testSq = this.getBoard.getSquareById(kingSqId + 8 * i);
      if (!testSq) break;
      let testSqPiece = testSq.getPiece;
      let testSqPieceName = testSqPiece?.getFirstLetter;
      if (
        (testSqPieceName && testSqPieceName === "r") ||
        testSqPieceName === "q"
      ) {
        console.log(
          "King is in check from square " +
            testSq.getSquareName +
            " by " +
            testSqPieceName
        );
        return true;
      }
      if (!testSqPiece && testSq.getRank === 8) break;
      if (testSqPiece) {
        break;
      }
    }
    return false;
  }

  private blackCheckDownwards(): boolean {
    const kingSqId = this.getKingSquareId;

    for (let i = 1; i < 8; i++) {
      let testSq = this.getBoard.getSquareById(kingSqId - 8 * i);
      if (!testSq) break;
      let testSqPiece = testSq.getPiece;
      let testSqPieceName = testSqPiece?.getFirstLetter;
      if (
        (testSqPieceName && testSqPieceName === "r") ||
        testSqPieceName === "q"
      ) {
        console.log(
          "King is in check from square " +
            testSq.getSquareName +
            " by " +
            testSqPieceName
        );
        return true;
      }
      if (!testSqPiece && testSq.getRank === 1) break;
      if (testSqPiece) {
        break;
      }
    }
    return false;
  }

  private blackCheckUpRight(): boolean {
    const kingSqId = this.getKingSquareId;
    for (let i = 1; i < 8; i++) {
      let testSq = this.getBoard.getSquareById(kingSqId + 9 * i);
      if (!testSq) break;
      let testSqPiece = testSq.getPiece;
      let testSqPieceName = testSqPiece?.getFirstLetter;
      if (
        (testSqPieceName && testSqPieceName === "b") ||
        testSqPieceName === "q"
      ) {
        console.log(
          "King is in check from square " +
            testSq.getSquareName +
            " by " +
            testSqPieceName
        );
        return true;
      }
      if (!testSqPiece && testSq.getFile === "h") break;
      if (testSqPiece) {
        break;
      }
    }
    return false;
  }

  private blackCheckUpLeft(): boolean {
    const kingSqId = this.getKingSquareId;
    for (let i = 1; i < 8; i++) {
      let testSq = this.getBoard.getSquareById(kingSqId + 7 * i);
      if (!testSq) break;
      let testSqPiece = testSq.getPiece;
      let testSqPieceName = testSqPiece?.getFirstLetter;
      if (
        (testSqPieceName && testSqPieceName === "b") ||
        testSqPieceName === "q"
      ) {
        console.log(
          "King is in check from square " +
            testSq.getSquareName +
            " by " +
            testSqPieceName
        );
        return true;
      }
      if (!testSqPiece && testSq.getFile === "a") break;
      if (testSqPiece) {
        break;
      }
    }
    return false;
  }

  private blackCheckDownLeft(): boolean {
    const kingSqId = this.getKingSquareId;

    for (let i = 1; i < 8; i++) {
      let testSq = this.getBoard.getSquareById(kingSqId - 9 * i);
      if (!testSq) break;
      let testSqPiece = testSq.getPiece;
      let testSqPieceName = testSqPiece?.getFirstLetter;
      if (
        (testSqPieceName && testSqPieceName === "b") ||
        testSqPieceName === "q"
      ) {
        console.log(
          "King is in check from square " +
            testSq.getSquareName +
            " by " +
            testSqPieceName
        );
        return true;
      }
      if ((!testSqPiece && testSq.getFile === "a") || testSq.getId < 8) break;

      if (testSqPiece) {
        break;
      }
    }
    return false;
  }

  private blackCheckDownRight(): boolean {
    const kingSqId = this.getKingSquareId;

    for (let i = 1; i < 8; i++) {
      let testSq = this.getBoard.getSquareById(kingSqId - 7 * i);
      if (!testSq) break;
      let testSqPiece = testSq.getPiece;
      let testSqPieceName = testSqPiece?.getFirstLetter;
      if (
        (testSqPieceName && testSqPieceName === "b") ||
        testSqPieceName === "q"
      ) {
        console.log(
          "King is in check from square " +
            testSq.getSquareName +
            " by " +
            testSqPieceName
        );
        return true;
      }
      if ((!testSqPiece && testSq.getId < 8) || testSq.getFile === "h") {
        break;
      }
      if (testSqPiece) {
        break;
      }
    }
    return false;
  }

  private blackCheckWithHorse(): boolean {
    let knightSquares = MoveHelper.knightMoveHelper(
      this.getKingSquare,
      this.getBoard
    );
    const board = this.getBoard;

    for (let i = 0; i < knightSquares.length; i++) {
      if (!knightSquares[i]) break;
      let sq = board.getSquareById(knightSquares[i]!);
      if (sq?.getPiece?.getFirstLetter === "n") {
        console.log(
          "Black king is in check from " + sq.getSquareName + " by a knight"
        );
        return true;
      }
    }
    return false;
  }

  private blackCheckWithPawn(): boolean {
    const kingSq = this.getKingSquare;
    const kingSqId = this.getKingSquareId;
    const board = this.getBoard;

    if (kingSq.getFile === "a") {
      if (board.getSquareById(kingSqId - 7)?.getPiece?.getFirstLetter === "p") {
        console.log(
          "King is in check from square " +
            board.getSquareById(kingSqId - 7)?.getSquareName +
            " by " +
            board.getSquareById(kingSqId - 7)?.getPiece?.getFirstLetter
        );
        return true;
      }
    } else if (kingSq.getFile === "h") {
      if (board.getSquareById(kingSqId - 9)?.getPiece?.getFirstLetter === "p") {
        console.log(
          "King is in check from square " +
            board.getSquareById(kingSqId - 9)!.getSquareName +
            " by " +
            board.getSquareById(kingSqId - 9)?.getPiece!.getFirstLetter
        );
        return true;
      }
    } else {
      if (board.getSquareById(kingSqId - 9)?.getPiece?.getFirstLetter === "p") {
        console.log(
          "King is in check from square " +
            board.getSquareById(kingSqId - 9)!.getSquareName +
            " by " +
            board.getSquareById(kingSqId - 9)?.getPiece!.getFirstLetter
        );
        return true;
      }
      if (board.getSquareById(kingSqId - 7)?.getPiece?.getFirstLetter === "p") {
        console.log(
          "King is in check from square " +
            board.getSquareById(kingSqId - 7)!.getSquareName +
            " by " +
            board.getSquareById(kingSqId - 7)?.getPiece!.getFirstLetter
        );
        return true;
      }
    }
    return false;
  }
}
