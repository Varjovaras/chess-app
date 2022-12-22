"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Knight = void 0;
const Board_1 = require("./Board");
const Piece_1 = require("./Piece");
const types_1 = require("./types");
class Knight extends Piece_1.Piece {
    constructor(square, color) {
        super(square);
        this.color = color;
        if (color === types_1.Color.white) {
            this.name = types_1.ChessPieces.KNIGHT_WHITE;
        }
        else
            this.name = types_1.ChessPieces.KNIGHT_BLACK;
    }
    move(startSq, endSq) {
        if (startSq.getColor === endSq.getColor) {
            console.log('Knight cannot move to same color square');
            return false;
        }
        else if (startSq.getPiece &&
            Knight.knightMoves(startSq, endSq) &&
            endSq.getPiece === null) {
            return true;
        }
        else if (startSq.getPiece &&
            Knight.knightMoves(startSq, endSq) &&
            endSq.getPiece !== null) {
            return Knight.capture(startSq, endSq);
        }
        else
            return false;
    }
    static capture(startSq, endSq) {
        if (Piece_1.Piece.capturable(startSq, endSq)) {
            return true;
        }
        else {
            console.log('Capturing with knight failed');
            return false;
        }
    }
    static knightMoves(startSq, endSq) {
        return ((Math.abs(Board_1.Board.findFileIndex(startSq.getFile) -
            Board_1.Board.findFileIndex(endSq.getFile)) === 1 &&
            Math.abs(startSq.getRank - endSq.getRank) === 2) ||
            (Math.abs(Board_1.Board.findFileIndex(startSq.getFile) -
                Board_1.Board.findFileIndex(endSq.getFile)) === 2 &&
                Math.abs(startSq.getRank - endSq.getRank) === 1));
    }
    possibleMoves(board) {
        const moves = [];
        const startSq = this.square;
        if (startSq) {
            const rank = startSq.getRank;
            const file = startSq.getFile;
            const startSqName = startSq.getSquareName;
            for (let i = 0; i < 8; i++) {
                const nextFile = String.fromCharCode(file.charCodeAt(0) + Knight.files[i]);
                const nextRank = rank + Knight.ranks[i];
                const sq = board.getSquare(`${nextFile}${nextRank}`);
                if (sq && sq.getSquareName) {
                    const endSq = sq.getSquareName;
                    moves.push({
                        startSq: startSqName,
                        endSq: endSq,
                    });
                }
            }
            return moves;
        }
        throw new Error('Error making possible knight moves');
    }
}
exports.Knight = Knight;
//files[i] and ranks[i] counts for a single possible knight move
Knight.files = [2, 2, 1, 1, -1, -2, -2, -1];
Knight.ranks = [1, -1, 2, -2, -2, -1, 1, 2];
