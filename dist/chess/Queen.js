"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queen = void 0;
const Board_1 = require("./Board");
const Piece_1 = require("./Piece");
const types_1 = require("./types");
class Queen extends Piece_1.Piece {
    constructor(square, color) {
        super(square);
        this.color = color;
        if (color === types_1.Color.white) {
            this.name = types_1.ChessPieces.QUEEN_WHITE;
        }
        else {
            this.name = types_1.ChessPieces.QUEEN_BLACK;
        }
    }
    move(startSq, endSq, board) {
        if (startSq.getPiece && endSq.getPiece !== null) {
            if (Piece_1.Piece.capturable(startSq, endSq)) {
                return Queen.queenMoves(startSq, endSq, board);
            }
            else {
                console.log('Capturing with queen failed');
                return false;
            }
        }
        return Queen.queenMoves(startSq, endSq, board);
    }
    static queenMoves(startSq, endSq, board) {
        const fileDiff = Math.abs(Board_1.Board.findFileIndex(startSq.getFile) - Board_1.Board.findFileIndex(endSq.getFile));
        const rankDiff = Math.abs(startSq.getRank - endSq.getRank);
        if (fileDiff === rankDiff && startSq !== endSq) {
            return Piece_1.Piece.isDiagonal(startSq, endSq, board);
        }
        else if (fileDiff === 0) {
            return Piece_1.Piece.verticalMove(startSq, endSq, board);
        }
        else if (rankDiff === 0) {
            return Piece_1.Piece.horizontalMove(startSq, endSq, board);
        }
        else
            return false;
    }
    possibleMoves(board) {
        let moves = [];
        const startSq = this.square;
        if (startSq) {
            moves = moves.concat(Queen.queenMoveHelper(Queen.rookMoveFiles, Queen.rookMoveRanks, board, startSq), Queen.queenMoveHelper(Queen.bishopMoveFiles, Queen.bishopMoveRanks, board, startSq));
            return moves;
        }
        throw new Error('Error making possible queen moves');
    }
    static queenMoveHelper(k, t, board, startSq) {
        const moves = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 7; j++) {
                const rank = startSq.getRank;
                const file = startSq.getFile;
                const startSqName = startSq.getSquareName;
                const nextFile = String.fromCharCode(file.charCodeAt(0) + k[i] + j * k[i]);
                const nextRank = rank + t[i] + j * t[i];
                const sq = board.getSquare(`${nextFile}${nextRank}`);
                if (!sq)
                    break;
                if (sq && sq.getSquareName) {
                    moves.push({
                        startSq: startSqName,
                        endSq: sq.getSquareName,
                    });
                }
            }
        }
        return moves;
    }
}
exports.Queen = Queen;
Queen.rookMoveFiles = [1, -1, 0, 0];
Queen.rookMoveRanks = [0, 0, 1, -1];
Queen.bishopMoveFiles = [1, 1, -1, -1];
Queen.bishopMoveRanks = [1, -1, 1, -1];
