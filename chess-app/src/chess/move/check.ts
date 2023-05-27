import { late } from "zod";
import { ColorType, MovePiece, ChessPieces } from "../../types/types";
import { Board } from "../board/board";
import { Square } from "../board/square";
import TemporaryBoard from "../board/temporaryBoard";

export default class Check {
  private _board: Board;
  private _turnColor: ColorType;
  private _latestMove?: MovePiece;

  constructor(turn: ColorType, board: Board, move?: MovePiece) {
    this._turnColor = turn;
    this._board = board;
    this._latestMove = move;
  }

  get getTurnColor() {
    return this._turnColor;
  }

  get getLatestMove() {
    return this._latestMove;
  }

  get getBoard() {
    return this._board;
  }

  /**
   * returns true if in check after doing the move
   */
  inCheckAfterMove(
    startSq: Square,
    endSq: Square,
    pieceName?: string
  ): boolean {
    const tempBoard: Board = TemporaryBoard.makeTemporaryBoard(this._board);
    const startSqTempBoard = tempBoard.getSquare(startSq.getSquareName);
    const endSqTempBoard = tempBoard.getSquare(endSq.getSquareName);
    if (!startSqTempBoard || !endSqTempBoard) return false;

    TemporaryBoard.movePieceOnTemporaryBoard(
      startSqTempBoard,
      endSqTempBoard,
      tempBoard,
      this.getTurnColor,
      this.getLatestMove,
      pieceName
    );

    return startSq.getPiece?.getColor === "WHITE"
      ? !tempBoard.isWhiteKingInCheck()
      : !tempBoard.isBlackKingInCheck();
  }
}
