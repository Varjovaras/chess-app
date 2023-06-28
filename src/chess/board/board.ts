import { Square } from "./square";
import { Color, ColorType } from "../../types/types";
import WhiteCheckHelper from "./whiteCheckHelper";
import BlackCheckHelper from "./blackCheckHelper";

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

  get getBoardToFront() {
    let fakeBoard: Square[] = this._board;
    let boardToFront: Square[] = [];
    let tempBoard: Square[] = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const square = fakeBoard[i * 8 + j];
        if (square) {
          tempBoard.push(square);
        }
      }
      tempBoard.reverse();
      boardToFront = boardToFront.concat(tempBoard);
      tempBoard = [];
    }
    return boardToFront.reverse();
  }

  setBoard(board: Square[]) {
    this._board = board;
  }

  getSquare(name: string): Square | null {
    let sq = this._board.find(
      (s: Square) => s.getSquareName.toUpperCase() === name.toUpperCase()
    );
    return sq ? sq.getSquare : null;
  }

  getSquareById(id: number): Square | null {
    let sq = this._board.find((s: Square) => s.getId === id);
    return sq ? sq.getSquare : null;
  }

  get getSquaresWithPieces() {
    return this._board.filter((sq) => sq.getPiece);
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
    let kingSqId = sq.getId;
    if (!kingSqId && kingSqId !== 0) {
      console.log("No square id for white king found");
      return false;
    }

    const checkHelper = new WhiteCheckHelper(this, sq, kingSqId);
    return checkHelper.whiteKingInCheck();
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
    let kingSqId = sq.getId;
    if (!kingSqId && kingSqId !== 0) {
      console.log("No square id for black king found");
      return false;
    }
    const checkHelper = new BlackCheckHelper(this, sq, kingSqId);
    return checkHelper.blackKingInCheck();
  }

  isEmpty(): boolean {
    return this._board.every((sq) => sq.getPiece === null);
  }

  static findFileIndex(s: string): number {
    return Board.files.findIndex((e) => e === s);
  }
}
