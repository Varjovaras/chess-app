"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
class Chess {
    constructor() {
        this.board = new Array(64);
        let files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        let currentFile = 0;
        let firstSquare = types_1.SquareColor.black;
        let secondSquare = types_1.SquareColor.white;
        let rank = 1;
        for (let i = 0; i < this.board.length; i++) {
            if (rank === 9) {
                let temp = firstSquare;
                firstSquare = secondSquare;
                secondSquare = temp;
                rank = 1;
                currentFile++;
            }
            if (i % 2 === 0) {
                this.board[i] = {
                    file: files[currentFile],
                    rank: rank,
                    color: firstSquare,
                    square: `${files[currentFile]}${rank}`,
                    piece: types_1.Piece.empty,
                };
            }
            else {
                this.board[i] = {
                    file: files[currentFile],
                    rank: rank,
                    color: secondSquare,
                    square: `${files[currentFile]}${rank}`,
                    piece: types_1.Piece.empty,
                };
            }
            rank++;
        }
    }
    startingPosition() { }
}
const chess = new Chess();
console.log(chess);
