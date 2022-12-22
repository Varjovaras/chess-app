"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bishop = void 0;
const Piece_1 = require("./Piece");
const types_1 = require("./types");
class Bishop extends Piece_1.Piece {
    constructor(square, color) {
        super(square);
        this.color = color;
        if (color === types_1.Color.white) {
            this.name = types_1.ChessPieces.BISHOP_WHITE;
        }
        else {
            this.name = types_1.ChessPieces.BISHOP_BLACK;
        }
    }
    move(startSq, endSq, board) {
        if (startSq.getColor !== endSq.getColor) {
            console.log('Bishop cannot move to a different color square');
            return false;
        }
        //capture logic
        if (startSq.getPiece && endSq.getPiece !== null) {
            if (Piece_1.Piece.capturable(startSq, endSq)) {
                return Piece_1.Piece.isDiagonal(startSq, endSq, board);
            }
            else {
                console.log('Capturing with bishop failed');
                return false;
            }
        }
        return Piece_1.Piece.isDiagonal(startSq, endSq, board);
    }
    possibleMoves(board) {
        const moves = [];
        const startSq = this.square;
        if (startSq) {
            const rank = startSq.getRank;
            const file = startSq.getFile;
            const startSqName = startSq.getSquareName;
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 7; j++) {
                    const nextFile = String.fromCharCode(file.charCodeAt(0) + Bishop.files[i] + j * Bishop.files[i]);
                    const nextRank = rank + Bishop.ranks[i] + j * Bishop.ranks[i];
                    const sq = board.getSquare(`${nextFile}${nextRank}`);
                    if (!sq)
                        break;
                    if (sq && sq.getSquareName) {
                        const endSq = sq.getSquareName;
                        moves.push({
                            startSq: startSqName,
                            endSq: endSq,
                        });
                    }
                }
            }
            return moves;
        }
        throw new Error('Error making possible bishop moves');
    }
}
exports.Bishop = Bishop;
//files[i] && ranks[i] counts for one possible bishop move
Bishop.files = [1, 1, -1, -1];
Bishop.ranks = [1, -1, 1, -1];
