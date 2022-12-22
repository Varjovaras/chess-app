"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.King = void 0;
const Board_1 = require("./Board");
const Piece_1 = require("./Piece");
const types_1 = require("./types");
class King extends Piece_1.Piece {
    constructor(square, color) {
        super(square);
        this.color = color;
        this.hasMoved = false;
        if (color === types_1.Color.white) {
            this.name = types_1.ChessPieces.KING_WHITE;
        }
        else {
            this.name = types_1.ChessPieces.KING_BLACK;
        }
    }
    move(startSq, endSq, board) {
        if (startSq.getPiece && endSq.getPiece !== null) {
            if (Piece_1.Piece.capturable(startSq, endSq)) {
                this.hasMoved = true;
                return this.kingMoves(startSq, endSq, board);
            }
            else {
                console.log('Capturing with queen failed');
                return false;
            }
        }
        return this.kingMoves(startSq, endSq, board);
    }
    kingMoves(startSq, endSq, board) {
        //castling
        if ((!this.hasMoved && startSq.getFile === 'e' && endSq.getFile === 'g') ||
            endSq.getFile === 'c')
            return this.castling(startSq, endSq, board);
        const fileDiff = Math.abs(Board_1.Board.findFileIndex(startSq.getFile) - Board_1.Board.findFileIndex(endSq.getFile));
        const rankDiff = Math.abs(startSq.getRank - endSq.getRank);
        if (fileDiff > 1 || rankDiff > 1) {
            return false;
        }
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
    castling(startSq, endSq, board) {
        if (endSq.getFile === 'g')
            return this.kingSideCastling(startSq, endSq, board);
        else if (endSq.getFile === 'c')
            return this.queenSideCastling(startSq, endSq, board);
        else
            return false;
    }
    kingSideCastling(startSq, _endSq, _board) {
        if (startSq.getRank === 5) {
            return false;
        }
        return false;
    }
    queenSideCastling(_startSq, _endSq, _board) {
        return false;
    }
}
exports.King = King;
