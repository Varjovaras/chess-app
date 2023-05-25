import MoveHelper from "../moveHelpers";
import { Square } from "./square";
import { Color, ColorType } from "../../types/types";

export class Board {
  private _board: Square[];
  static files: string[] = ["a", "b", "c", "d", "e", "f", "g", "h"];

  constructor() {
    let board = new Array(64);
    let firstSquare: ColorType = Color.black;
    let secondSquare: ColorType = Color.white;
    let rank = 1;
    for (let i = 0, file = 0; i < board.length; i++, file++) {
      if (file === 8) {
        file = 0;
        rank++;
        let temp: ColorType = firstSquare;
        firstSquare = secondSquare;
        secondSquare = temp;
      }

      if (i % 2 === 0) {
        board[i] = new Square(
          Board.files[file]!,
          rank,

          `${Board.files[file]}${rank}`,
          firstSquare,
          i,
          null
        );
      } else {
        board[i] = new Square(
          Board.files[file]!,
          rank,
          `${Board.files[file]}${rank}`,
          secondSquare,
          i,
          null
        );
      }
    }
    this._board = board;
  }

  get getBoard() {
    return this._board;
  }

  setBoard(board: Square[]) {
    this._board = board;
  }

  getSquare(name: string): Square | null {
    let sq = this._board.find((s: Square) => s.getSquareName === name);
    return sq ? sq.getSquare : null;
  }

  getSquareById(id: number): Square | null {
    let sq = this._board.find((s: Square) => s.getId === id);
    return sq ? sq.getSquare : null;
  }

  getSquareAndName(name?: string, id?: number): string | void {
    if (id) {
      let sq = this.getSquareById(id);
      if (sq) return sq.getSquareName;
    }
    if (name) {
      let sq = this.getSquare(name);
      if (sq) return sq.getSquareName;
    }
    console.log("No square found by id or name");
  }

  getWhiteKing() {
    return this._board.find((sq) => sq.getPiece?.getName === "king")?.getPiece;
  }

  getBlackKing() {
    return this._board.find((sq) => sq.getPiece?.getName === "KING")?.getPiece;
  }

  printBoardWhite() {
    let rows = ["", "", "", "", "", "", "", ""];

    for (const i of this._board) {
      let piece = i.getPiece;
      if (piece) {
        rows[i.getRank - 1] += piece.getFirstLetter + "  ";
      } else {
        rows[i.getRank - 1] += i.getFile + i.getRank + " ";
      }
    }
    return rows.reverse();
  }

  getBoardWhite() {
    let rows: Square[][] = [[], [], [], [], [], [], [], []];
    let row = 0;
    let i = 0;

    for (const sq of this._board) {
      rows[row]![i] = sq;
      if (i === 7) {
        i = 0;
        row++;
      } else i++;
    }

    return rows.reverse();
  }

  printBoardBlack() {
    let rows = ["", "", "", "", "", "", "", ""];

    for (const i of this._board) {
      let piece = i.getPiece;
      if (piece) {
        rows[i.getRank - 1] =
          " " + piece.getFirstLetter + " " + rows[i.getRank - 1];
      } else {
        rows[i.getRank - 1] = i.getFile + i.getRank + " " + rows[i.getRank - 1];
      }
    }

    return rows.reverse();
  }

  isWhiteKingInCheck(): boolean {
    let king = this.getWhiteKing();
    if (!king) {
      console.log("No white king found");
      return false;
    }
    let sq = king.getSquare;
    if (!sq) {
      console.log("No square for white king found");
      return false;
    }
    let sqId = sq.getId;
    if (!sqId && sqId !== 0) {
      console.log("No square id for white king found");
      return false;
    }

    // upwards
    for (let i = 1; i < 8; i++) {
      let testSq = this.getSquareById(sqId + 8 * i);
      if (!testSq) break;
      let testSqPiece = testSq.getPiece;
      if (!testSqPiece) continue;
      let testSqPieceName = testSqPiece.getFirstLetter;
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
      if (testSqPiece) {
        break;
      }
    }
    // downwards
    for (let i = 1; i < 8; i++) {
      let testSq = this.getSquareById(sqId - 8 * i);
      if (!testSq) break;
      let testSqPiece = testSq.getPiece;
      if (!testSqPiece && testSq.getRank === 1) {
        break;
      }
      if (!testSqPiece) continue;
      let testSqPieceName = testSqPiece.getFirstLetter;
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
      if (testSqPiece) {
        break;
      }
    }
    // up and right
    // console.log('up and right');
    for (let i = 1; i < 8; i++) {
      let testSq = this.getSquareById(sqId + 9 * i);
      if (!testSq) break;
      let testSqPiece = testSq.getPiece;
      if (!testSqPiece && testSq.getFile === "h") break;
      if (!testSqPiece) continue;
      let testSqPieceName = testSqPiece.getFirstLetter;
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
      if (testSqPiece) {
        break;
      }
    }
    // up and left
    // console.log('up and left');
    for (let i = 1; i < 8; i++) {
      let testSq = this.getSquareById(sqId + 7 * i);
      if (!testSq) break;
      let testSqPiece = testSq.getPiece;
      if (!testSqPiece && testSq.getFile === "a") break;
      if (!testSqPiece) continue;
      let testSqPieceName = testSqPiece.getFirstLetter;
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
      if (testSqPiece) {
        break;
      }
    }
    // down and left
    // console.log('down and left');
    for (let i = 1; i < 8; i++) {
      let testSq = this.getSquareById(sqId - 9 * i);
      if (!testSq) break;
      let testSqPiece = testSq.getPiece;
      if (testSq.getFile === "a" || testSq.getId < 8) break;
      if (!testSqPiece) continue;
      let testSqPieceName = testSqPiece.getFirstLetter;
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
      if (testSqPiece) {
        break;
      }
    }
    // down and right
    // console.log('down and right');
    for (let i = 1; i < 8; i++) {
      let testSq = this.getSquareById(sqId - 7 * i);
      if (!testSq) break;
      let testSqPiece = testSq.getPiece;
      if ((!testSqPiece && testSq.getId < 8) || testSq.getFile === "h") {
        break;
      }
      if (!testSqPiece) continue;
      let testSqPieceName = testSqPiece.getFirstLetter;
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
      if (testSqPiece) {
        break;
      }
    }

    //horse things
    let knightSquares = MoveHelper.knightMoveHelper(sq, this);
    knightSquares.forEach((k) => {
      let sq = this.getSquareById(k);
      if (sq && sq.getPiece && sq.getPiece.getFirstLetter === "N") {
        return true;
      }
    });

    //pawn things
    if (sq.getFile === "a") {
      if (this.getSquareById(sqId + 9)?.getPiece?.getFirstLetter === "P") {
        console.log(
          "King is in check from square " +
            this.getSquareById(sqId + 9)?.getSquareName +
            " by " +
            this.getSquareById(sqId + 9)?.getPiece?.getFirstLetter
        );
        return true;
      }
    } else if (sq.getFile === "h") {
      if (this.getSquareById(sqId + 7)?.getPiece?.getFirstLetter === "P") {
        console.log(
          "King is in check from square " +
            this.getSquareById(sqId + 7)?.getSquareName +
            " by " +
            this.getSquareById(sqId + 7)?.getPiece?.getFirstLetter
        );
        return true;
      }
    } else {
      if (this.getSquareById(sqId + 9)?.getPiece?.getFirstLetter === "P") {
        console.log(
          "King is in check from square " +
            this.getSquareById(sqId + 9)?.getSquareName +
            " by " +
            this.getSquareById(sqId + 9)?.getPiece?.getFirstLetter
        );
        return true;
      }
      if (this.getSquareById(sqId + 7)?.getPiece?.getFirstLetter === "P") {
        console.log(
          "King is in check from square " +
            this.getSquareById(sqId + 7)?.getSquareName +
            " by " +
            this.getSquareById(sqId + 7)?.getPiece!.getFirstLetter
        );
        return true;
      }
    }
    //if no checks found
    return false;
  }

  isBlackKingInCheck(): boolean {
    let king = this.getBlackKing();
    if (!king) {
      console.log("No black king found");
      return false;
    }
    let sq = king.getSquare;
    if (!sq) {
      console.log("No square for black king found");
      return false;
    }

    let sqId = this.getSquareById(sq.getId)?.getId;

    if (!sqId && sqId !== 0) {
      console.log("No square id for black king found");
      return false;
    }

    // upwards
    for (let i = 1; i < 8; i++) {
      let testSq = this.getSquareById(sqId + 8 * i);
      if (!testSq) break;
      let testSqPiece = testSq.getPiece;
      if (!testSqPiece && testSq.getRank === 8) break;
      if (!testSqPiece) continue;
      let testSqPieceName = testSqPiece.getFirstLetter;
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
      if (testSqPiece) {
        break;
      }
    }
    // downwards
    for (let i = 1; i < 8; i++) {
      let testSq = this.getSquareById(sqId - 8 * i);
      if (!testSq) break;
      let testSqPiece = testSq.getPiece;
      if (!testSqPiece && testSq.getRank === 1) break;
      if (!testSqPiece) continue;
      let testSqPieceName = testSqPiece.getFirstLetter;
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
      if (testSqPiece) {
        break;
      }
    }
    // up and right
    // console.log('up and right');
    for (let i = 1; i < 8; i++) {
      let testSq = this.getSquareById(sqId + 9 * i);
      if (!testSq) break;
      let testSqPiece = testSq.getPiece;
      if (!testSqPiece && testSq.getFile === "h") break;
      if (!testSqPiece) continue;
      let testSqPieceName = testSqPiece.getFirstLetter;
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
      if (testSqPiece) {
        break;
      }
    }
    // up and left
    // console.log('up and left');
    for (let i = 1; i < 8; i++) {
      let testSq = this.getSquareById(sqId + 7 * i);
      if (!testSq) break;
      let testSqPiece = testSq.getPiece;
      if (!testSqPiece && testSq.getFile === "a") break;

      if (!testSqPiece) continue;
      let testSqPieceName = testSqPiece.getFirstLetter;
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
      if (testSqPiece) {
        break;
      }
    }
    // down and left
    // console.log('down and left');
    for (let i = 1; i < 8; i++) {
      let testSq = this.getSquareById(sqId - 9 * i);
      if (!testSq) break;
      let testSqPiece = testSq.getPiece;
      if ((!testSqPiece && testSq.getFile === "a") || testSq.getId < 8) break;
      if (!testSqPiece) continue;
      let testSqPieceName = testSqPiece.getFirstLetter;
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

      if (testSqPiece) {
        break;
      }
    }
    // down and right
    // console.log('down and right');
    for (let i = 1; i < 8; i++) {
      let testSq = this.getSquareById(sqId - 7 * i);
      if (!testSq) break;
      let testSqPiece = testSq.getPiece;
      if ((!testSqPiece && testSq.getId < 8) || testSq.getFile === "h") {
        break;
      }
      if (!testSqPiece) continue;
      let testSqPieceName = testSqPiece.getFirstLetter;
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

      if (testSqPiece) {
        break;
      }
    }

    //horse things
    let knightSquares = MoveHelper.knightMoveHelper(sq, this);
    knightSquares.forEach((k) => {
      let sq = this.getSquareById(k);
      if (sq && sq.getPiece && sq.getPiece.getFirstLetter === "n") {
        return true;
      }
    });

    //pawn things
    if (sq.getFile === "a") {
      if (this.getSquareById(sqId - 7)?.getPiece?.getFirstLetter === "p") {
        console.log(
          "King is in check from square " +
            this.getSquareById(sqId - 7)!.getSquareName +
            " by " +
            this.getSquareById(sqId - 7)?.getPiece!.getFirstLetter
        );
        return true;
      }
    } else if (sq.getFile === "h") {
      if (this.getSquareById(sqId - 9)?.getPiece?.getFirstLetter === "p") {
        console.log(
          "King is in check from square " +
            this.getSquareById(sqId - 9)!.getSquareName +
            " by " +
            this.getSquareById(sqId - 9)?.getPiece!.getFirstLetter
        );
        return true;
      }
    } else {
      if (this.getSquareById(sqId - 9)?.getPiece?.getFirstLetter === "p") {
        console.log(
          "King is in check from square " +
            this.getSquareById(sqId - 9)!.getSquareName +
            " by " +
            this.getSquareById(sqId - 9)?.getPiece!.getFirstLetter
        );
        return true;
      }
      if (this.getSquareById(sqId - 7)?.getPiece?.getFirstLetter === "p") {
        console.log(
          "King is in check from square " +
            this.getSquareById(sqId - 7)!.getSquareName +
            " by " +
            this.getSquareById(sqId - 7)?.getPiece!.getFirstLetter
        );
        return true;
      }
    }
    //if no checks found
    return false;
  }

  isEmpty(): boolean {
    return this._board.every((sq) => sq.getPiece === null);
  }

  static findFileIndex(s: string): number {
    return Board.files.findIndex((e) => e === s);
  }
}
