import { Board } from "../board/board";
import { Square } from "../board/square";
import { ColorType, MovePiece, MoveSquares } from "../../types/types";

export class Piece {
  protected name: string;
  protected color: ColorType | undefined;
  protected square?: Square;

  constructor(square?: Square, color?: ColorType) {
    this.name = "a";
    this.square = square;
    this.color = color;
  }

  get getName() {
    return this.name;
  }

  get getColor() {
    return this.color;
  }

  get getSquare() {
    return this.square;
  }

  get getFirstLetter() {
    return this.getName[0];
  }

  move(
    _startSq: Square,
    _endSq: Square,
    _board: Board,
    _move?: MovePiece | undefined
  ): boolean {
    return false;
  }

  setSquare(sq: Square) {
    this.square = sq;
  }

  static capturable(startSq: Square, endSq: Square, move?: MovePiece): boolean {
    // console.log('capturable ' + endSq.getSquareName);
    let startSqPiece = startSq.getPiece;
    let endSqPiece = endSq.getPiece;

    //for en passant
    if (move) {
      endSqPiece = move.endSq.getPiece;
    }

    if (startSqPiece?.color === endSqPiece?.color && endSqPiece !== null) {
      // console.log("Cannot capture own piece or capture on an empty square");
      return false;
    }
    // console.log(
    //   `${startSqPiece?.getName} on square ${startSq.getSquareName} is able to capture ${endSqPiece?.getName} on ${endSq.getSquareName}`
    // );
    return true;
  }

  possibleMoves(_board: Board): MoveSquares[] {
    // console.log("Piece without type has no possible moves");
    return [];
  }

  //for bishop and queen
  static isDiagonal(startSq: Square, endSq: Square, board: Board): boolean {
    let fileDiff = Math.abs(
      Board.findFileIndex(startSq.getFile) - Board.findFileIndex(endSq.getFile)
    );
    let rankDiff = Math.abs(startSq.getRank - endSq.getRank);
    if (fileDiff === rankDiff && fileDiff === 1) {
      return true;
    }
    if (fileDiff === rankDiff) {
      return Piece.diagonalPiecesOnTheWay(startSq, endSq, rankDiff, board);
    }
    return false;
  }
  //for bishop and queen
  static diagonalPiecesOnTheWay(
    startSq: Square,
    endSq: Square,
    rankDiff: number,
    board: Board
  ): boolean {
    let index = 0;
    let startFileIndex = Board.findFileIndex(startSq.getFile);
    let endFileIndex = Board.findFileIndex(endSq.getFile);
    //find index of the next square to test
    if (startSq.getRank < endSq.getRank && startFileIndex > endFileIndex) {
      index = 7;
    } else if (
      startSq.getRank < endSq.getRank &&
      startFileIndex < endFileIndex
    ) {
      index = 9;
    } else if (
      startSq.getRank > endSq.getRank &&
      startFileIndex > endFileIndex
    ) {
      index = -9;
    } else index = -7;

    let startSqIndex = startSq.getId + index;

    for (let i = 0; i < rankDiff; i++, startSqIndex += index) {
      let sq = board.getSquareById(startSqIndex);
      if (sq === endSq) break;
      else if (!sq) return false;
      else if (sq.getPiece !== null) {
        // console.log("Piece on the way");
        return false;
      }
    }
    // console.log("No diagonal pieces on the way");
    return true;
  }

  //for rook and queen
  //left and right movement
  static horizontalMove(startSq: Square, endSq: Square, board: Board): boolean {
    // console.log("horizontal move by " + startSq.getPiece?.getName);
    let index = startSq.getFile < endSq.getFile ? 1 : -1;
    let startSqIndex = startSq.getId + index;
    let horizontalDiff = Math.abs(endSq.getId - startSq.getId);
    if (horizontalDiff === 1 && endSq.getPiece === null) return true;
    for (let i = 0; i < horizontalDiff; i++, startSqIndex += index) {
      let sq = board.getSquareById(startSqIndex);
      if (sq === startSq) continue;
      else if (sq === endSq) break;
      else if (!sq) return false;
      else if (sq.getPiece !== null) {
        // console.log("Piece on the way");
        return false;
      }
    }
    return true;
  }
  //for rook and queen
  //up and down movement
  static verticalMove(startSq: Square, endSq: Square, board: Board): boolean {
    // console.log("vertical move by " + startSq.getPiece?.getName);§
    let index = startSq.getId < endSq.getId ? 8 : -8;
    let startSqIndex = startSq.getId + index;
    let verticalDiff = Math.abs(endSq.getRank - startSq.getRank);
    if (verticalDiff === 1 && endSq.getPiece === null) return true;
    for (let i = 0; i < verticalDiff; i++, startSqIndex += index) {
      let sq = board.getSquareById(startSqIndex);
      if (sq === startSq) continue;
      if (!sq) return false;
      else if (sq === endSq) break;
      else if (sq.getPiece !== null) {
        // console.log("Piece on the way");
        return false;
      }
    }
    return true;
  }
}
