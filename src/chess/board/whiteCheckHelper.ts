import MoveHelper from "../move/moveHelpers";
import { Board } from "./board";
import { Square } from "./square";

export default class WhiteCheckHelper {
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

  /**
   
   * @returns PAWN CHECK NOT WORKING PROPERLY
   */

  whiteKingInCheck(): boolean {
    if (this.whiteCheckUpwards()) return true;
    if (this.whiteCheckDownwards()) return true;
    if (this.whiteCheckUpRight()) return true;
    if (this.whiteCheckUpLeft()) return true;
    if (this.whiteCheckDownLeft()) return true;
    if (this.whiteCheckDownRight()) return true;
    if (this.whiteCheckWithHorse()) return true;
    if (this.whiteCheckWithPawn()) return true;

    return false;
  }

  private whiteCheckUpwards(): boolean {
    const kingSqId = this.getKingSquareId;

    for (let i = 1; i < 8; i++) {
      let testSq = this.getBoard.getSquareById(kingSqId + 8 * i);
      if (!testSq) break;
      let testSqPiece = testSq.getPiece;
      let testSqPieceName = testSqPiece?.getFirstLetter;
      if (
        (testSqPieceName && testSqPieceName === "R") ||
        testSqPieceName === "Q"
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

  private whiteCheckDownwards(): boolean {
    const kingSqId = this.getKingSquareId;

    for (let i = 1; i < 8; i++) {
      let testSq = this.getBoard.getSquareById(kingSqId - 8 * i);
      if (!testSq) break;
      let testSqPiece = testSq.getPiece;
      let testSqPieceName = testSqPiece?.getFirstLetter;
      if (
        (testSqPieceName && testSqPieceName === "R") ||
        testSqPieceName === "Q"
      ) {
        console.log(
          "King is in check from square " +
            testSq.getSquareName +
            " by " +
            testSqPieceName
        );
        return true;
      }
      if (!testSqPiece && testSq.getRank === 1) {
        break;
      }
      if (testSqPiece) {
        break;
      }
    }
    return false;
  }

  private whiteCheckUpRight(): boolean {
    const kingSqId = this.getKingSquareId;

    for (let i = 1; i < 8; i++) {
      let testSq = this.getBoard.getSquareById(kingSqId + 9 * i);
      if (!testSq) break;
      let testSqPiece = testSq.getPiece;
      let testSqPieceName = testSqPiece?.getFirstLetter;
      if (
        (testSqPieceName && testSqPieceName === "B") ||
        testSqPieceName === "Q"
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

  private whiteCheckUpLeft(): boolean {
    const kingSqId = this.getKingSquareId;

    for (let i = 1; i < 8; i++) {
      let testSq = this.getBoard.getSquareById(kingSqId + 7 * i);
      if (!testSq) break;
      let testSqPiece = testSq.getPiece;
      let testSqPieceName = testSqPiece?.getFirstLetter;
      if (
        (testSqPieceName && testSqPieceName === "B") ||
        testSqPieceName === "Q"
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

  private whiteCheckDownLeft(): boolean {
    const kingSqId = this.getKingSquareId;

    for (let i = 1; i < 8; i++) {
      let testSq = this.getBoard.getSquareById(kingSqId - 9 * i);
      if (!testSq) break;
      let testSqPiece = testSq.getPiece;
      let testSqPieceName = testSqPiece?.getFirstLetter;
      if (
        (testSqPieceName && testSqPieceName === "B") ||
        testSqPieceName === "Q"
      ) {
        console.log(
          "King is in check from square " +
            testSq.getSquareName +
            " by " +
            testSqPieceName
        );

        return true;
      }
      if (testSq.getFile === "a" || testSq.getId < 8) break;
      if (testSqPiece) {
        break;
      }
    }
    return false;
  }

  private whiteCheckDownRight(): boolean {
    const kingSqId = this.getKingSquareId;

    for (let i = 1; i < 8; i++) {
      let testSq = this.getBoard.getSquareById(kingSqId - 7 * i);
      if (!testSq) break;
      let testSqPiece = testSq.getPiece;

      let testSqPieceName = testSqPiece?.getFirstLetter;
      if (
        (testSqPieceName && testSqPieceName === "B") ||
        testSqPieceName === "Q"
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

  private whiteCheckWithHorse(): boolean {
    const knightSquares = MoveHelper.knightMoveHelper(
      this.getKingSquare,
      this.getBoard
    );
    const board = this.getBoard;

    for (let i = 0; i < knightSquares.length; i++) {
      if (!knightSquares[i]) break;
      let sq = board.getSquareById(knightSquares[i]!);
      if (sq?.getPiece?.getFirstLetter === "N") {
        console.log(
          "White king is in check from " + sq.getSquareName + " by a knight"
        );
        return true;
      }
    }
    return false;
  }

  private whiteCheckWithPawn(): boolean {
    const kingSq = this.getKingSquare;
    const kingSqId = this.getKingSquareId;
    const board = this.getBoard;

    if (kingSq.getFile === "a") {
      if (board.getSquareById(kingSqId + 9)?.getPiece?.getFirstLetter === "P") {
        console.log(
          "King is in check from square " +
            board.getSquareById(kingSqId + 9)?.getSquareName +
            " by " +
            board.getSquareById(kingSqId + 9)?.getPiece?.getFirstLetter
        );
        return true;
      }
    } else if (kingSq.getFile === "h") {
      if (board.getSquareById(kingSqId + 7)?.getPiece?.getFirstLetter === "P") {
        console.log(
          "King is in check from square " +
            board.getSquareById(kingSqId + 7)?.getSquareName +
            " by " +
            board.getSquareById(kingSqId + 7)?.getPiece?.getFirstLetter
        );
        return true;
      }
    } else {
      if (board.getSquareById(kingSqId + 9)?.getPiece?.getFirstLetter === "P") {
        console.log(
          "King is in check from square " +
            board.getSquareById(kingSqId + 9)?.getSquareName +
            " by " +
            board.getSquareById(kingSqId + 9)?.getPiece?.getFirstLetter
        );
        return true;
      }
      if (board.getSquareById(kingSqId + 7)?.getPiece?.getFirstLetter === "P") {
        console.log(
          "King is in check from square " +
            board.getSquareById(kingSqId + 7)?.getSquareName +
            " by " +
            board.getSquareById(kingSqId + 7)?.getPiece!.getFirstLetter
        );
        return true;
      }
    }
    return false;
  }
}
