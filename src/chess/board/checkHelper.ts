import { Board } from "./board";
export default class CheckHelper {
  static whiteCheckUpwards(board: Board, sqId: number): boolean {
    for (let i = 1; i < 8; i++) {
      let testSq = board.getSquareById(sqId + 8 * i);
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
  }

  static whiteCheckDownwards(board: Board, sqId: number): boolean {
    for (let i = 1; i < 8; i++) {
      let testSq = board.getSquareById(sqId - 8 * i);
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
  }
}
