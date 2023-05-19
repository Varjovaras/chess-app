import Chess from "../chess";
import readline from "readline";

export class Game {
  chess: Chess;
  gameOver: boolean;

  constructor(chess: Chess) {
    this.chess = chess;
    this.gameOver = false;
  }

  async playTerminal() {
    this.chess.startingPosition();
    while (!this.gameOver) {
      await this.terminalMoves();
    }
    console.log("Game over!");
  }

  terminalMoves(): Promise<void> {
    console.log(this.chess.getBoard.printBoardWhite());
    const rl = readline.createInterface(process.stdin, process.stdout);
    rl.question(`Input move for ${this.chess.whoseTurn()}:\n`, (input) => {
      if (input === "") {
        this.gameOver = true;
        rl.close();
        return new Promise((resolve) => rl.on("close", resolve));
      }

      console.log(`Trying ${input}`);
      let split = input.toLowerCase().split(" ");
      try {
        this.chess.move(split[0]!, split[1]!);
        rl.close();
        return new Promise((resolve) => rl.on("close", resolve));
      } catch {
        console.log("Invalid move, try again");
        rl.close();
        return new Promise((resolve) => rl.on("close", resolve));
      }
    });
    return new Promise((resolve) => rl.on("close", resolve));
  }
}
