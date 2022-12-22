"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rook = void 0;
const Piece_1 = require("./Piece");
const types_1 = require("./types");
class Rook extends Piece_1.Piece {
    constructor(square, color) {
        super(square);
        this.color = color;
        this.hasMoved = false;
        if (color === types_1.Color.white) {
            this.name = types_1.ChessPieces.ROOK_WHITE;
        }
        else {
            this.name = types_1.ChessPieces.ROOK_BLACK;
        }
    }
    get getHasMoved() {
        return this.hasMoved;
    }
    move(startSq, endSq, board) {
        const isHorizontal = startSq.getRank === endSq.getRank ? true : false;
        //capture logic
        if (startSq.getPiece && endSq.getPiece !== null) {
            if (Piece_1.Piece.capturable(startSq, endSq)) {
                this.hasMoved = true;
                return isHorizontal
                    ? Piece_1.Piece.horizontalMove(startSq, endSq, board)
                    : Piece_1.Piece.verticalMove(startSq, endSq, board);
            }
            else {
                console.log('Capturing with rook failed');
                return false;
            }
        }
        this.hasMoved = true;
        return isHorizontal
            ? Piece_1.Piece.horizontalMove(startSq, endSq, board)
            : Piece_1.Piece.verticalMove(startSq, endSq, board);
    }
    possibleMoves(board) {
        const moves = [];
        const startSq = this.square;
        if (startSq) {
            const rank = startSq.getRank;
            const file = startSq.getFile;
            const startSqName = startSq.getSquareName;
            const files = [1, -1, 0, 0];
            const ranks = [0, 0, 1, -1];
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 7; j++) {
                    const nextFile = String.fromCharCode(file.charCodeAt(0) + files[i] + j * files[i]);
                    const nextRank = rank + ranks[i] + j * ranks[i];
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
        throw new Error('Error making possible rook moves');
    }
}
exports.Rook = Rook;
