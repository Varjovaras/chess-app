import { ColorType, MoveDetails } from "../../types/types";
import { Board } from "../board/board";
import { Square } from "../board/square";
import TemporaryBoard from "../board/temporaryBoard";

export default class Check {
  private _board: Board;
  private _turnColor: ColorType;
  private _latestMove?: MoveDetails;

  constructor(turn: ColorType, board: Board, move?: MoveDetails) {
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
    const color = startSq?.getPiece?.getColor;

    const tempBoard = new TemporaryBoard(this._board);
    const startSqTempBoard = tempBoard.getBoard.getSquare(
      startSq.getSquareName
    );
    const endSqTempBoard = tempBoard.getBoard.getSquare(endSq.getSquareName);
    if (!startSqTempBoard || !endSqTempBoard)
      throw new Error("No tempSq found for inCheckAfterMove");

    try {
      tempBoard.movePieceOnTemporaryBoard(
        startSqTempBoard,
        endSqTempBoard,
        this.getTurnColor,
        this.getLatestMove,
        pieceName
      );
      return color === "WHITE"
        ? !tempBoard.getBoard.isWhiteKingInCheck()
        : !tempBoard.getBoard.isBlackKingInCheck();
    } catch {
      return true;
    }
  }
}
