"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const readline_1 = __importDefault(require("readline"));
class Game {
    constructor(chess) {
        this.chess = chess;
        this.gameOver = false;
    }
    playTerminal() {
        return __awaiter(this, void 0, void 0, function* () {
            this.chess.startingPosition();
            while (!this.gameOver) {
                yield this.terminalMoves();
            }
            console.log('Game over!');
        });
    }
    terminalMoves() {
        console.log(this.chess.getBoard.printBoardWhite());
        const rl = readline_1.default.createInterface(process.stdin, process.stdout);
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        rl.question(`Input move for ${this.chess.whoseTurn()}:\n`, (input) => {
            if (input === '') {
                this.gameOver = true;
                rl.close();
                return new Promise((resolve) => rl.on('close', resolve));
            }
            console.log(`Trying ${input}`);
            const split = input.toLowerCase().split(' ');
            try {
                this.chess.move(split[0], split[1]);
                rl.close();
                return new Promise((resolve) => rl.on('close', resolve));
            }
            catch (_a) {
                console.log('Invalid move, try again');
                rl.close();
                return new Promise((resolve) => rl.on('close', resolve));
            }
        });
        return new Promise((resolve) => rl.on('close', resolve));
    }
}
exports.Game = Game;
