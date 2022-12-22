"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pawn = void 0;
const Bishop_1 = require("./Bishop");
const Board_1 = require("./Board");
const Knight_1 = require("./Knight");
const Piece_1 = require("./Piece");
const Queen_1 = require("./Queen");
const Rook_1 = require("./Rook");
const types_1 = require("./types");
class Pawn extends Piece_1.Piece {
    constructor(square, color) {
        super(square);
        this.color = color;
        if (color === types_1.Color.white) {
            this.name = types_1.ChessPieces.PAWN_WHITE;
            this.enPassantStartSqRank = 5;
            this.enPassantEndSqRank = 6;
        }
        else {
            this.name = types_1.ChessPieces.PAWN_BLACK;
            this.enPassantStartSqRank = 4;
            this.enPassantEndSqRank = 3;
        }
    }
    move(startSq, endSq, board, piece, move) {
        if (this.color === types_1.Color.white)
            return this.moveWhite(startSq, endSq, board, piece, move);
        else if (this.color === types_1.Color.black)
            return this.moveBlack(startSq, endSq, board, piece, move);
        else {
            console.log('Piece not found');
            return false;
        }
    }
    moveWhite(startSq, endSq, board, pieceToPromote, move) {
        if (startSq.getRank === 8) {
            console.log('How is white pawn on rank 8???');
            return false;
        }
        else if (endSq.getRank < startSq.getRank) {
            console.log("Pawns can't go backwards!");
            return false;
        }
        //Moving diagonally logic
        else if (startSq.getFile !== endSq.getFile) {
            return this.capture(startSq, endSq, pieceToPromote, move);
        }
        //startSquare logic
        else if (startSq.getRank === 2) {
            return Pawn.startingSquareMove(startSq, endSq, board);
        }
        //lastrow promote and possibly capture
        else if (startSq.getRank === 7 &&
            endSq.getRank === 8 &&
            endSq.getPiece === null) {
            {
                if (pieceToPromote) {
                    return Pawn.promotion(endSq, pieceToPromote, types_1.Color.white);
                }
                else {
                    console.log('No piece to promote to');
                    return false;
                }
            }
        }
        //move one square forwards
        else if (endSq.getRank - startSq.getRank === 1 && endSq.getPiece === null) {
            console.log('Moved pawn one square forward');
            return true;
        }
        //no valid moves
        return false;
    }
    moveBlack(startSq, endSq, board, pieceToPromote, move) {
        if (startSq.getRank === 1) {
            console.log('How is black pawn on rank 8???');
            return false;
        }
        else if (endSq.getRank > startSq.getRank) {
            console.log("Pawns can't go backwards!");
            return false;
        }
        //Moving diagonally logic
        else if (startSq.getFile !== endSq.getFile) {
            return this.capture(startSq, endSq, pieceToPromote, move);
        }
        //startSquare logic
        else if (startSq.getRank === 7) {
            return Pawn.startingSquareMove(startSq, endSq, board);
        }
        //lastrow promote and possibly capture
        else if (startSq.getRank === 2 &&
            endSq.getRank === 1 &&
            endSq.getPiece === null) {
            {
                if (pieceToPromote) {
                    return Pawn.promotion(endSq, pieceToPromote, types_1.Color.black);
                }
                else {
                    console.log('No piece to promote to');
                    return false;
                }
            }
        }
        //move one square forwards
        else if (startSq.getRank - endSq.getRank === 1 && endSq.getPiece === null) {
            console.log('Moved pawn one square forward');
            return true;
        }
        //no valid moves
        return false;
    }
    capture(startSq, endSq, pieceToPromote, move) {
        var _a, _b, _c;
        //what is the rank you need to start on to be able to promote
        const secondToLastRank = ((_a = startSq.getPiece) === null || _a === void 0 ? void 0 : _a.getColor) === types_1.Color.white ? 7 : 2;
        const promotionRank = ((_b = startSq.getPiece) === null || _b === void 0 ? void 0 : _b.getColor) === types_1.Color.white ? 8 : 1;
        //what is the rank you need to start and end on to be able to en passant
        const color = ((_c = startSq.getPiece) === null || _c === void 0 ? void 0 : _c.getColor) === types_1.Color.white ? types_1.Color.black : null;
        //is pawn capturing or not
        const diagonalMove = Pawn.compareFiles(startSq.getFile, endSq.getFile);
        //check if it's en passant
        if (startSq.getRank === this.enPassantStartSqRank &&
            endSq.getRank === this.enPassantEndSqRank &&
            diagonalMove) {
            if (!move)
                return false;
            if (Piece_1.Piece.capturable(startSq, move.endSq)) {
                return this.enPassant(move, this.enPassantStartSqRank);
            }
            return false;
        }
        //check if it's your own piece
        if (Piece_1.Piece.capturable(startSq, endSq)) {
            //check if it's a promotion
            //enpassant is checked before this cause endSq.piece is null on enpassant
            if (endSq.getPiece === null) {
                console.log("Pawns can't go diagonally without capturing a piece");
                return false;
            }
            //check if it's a promotion
            else if (startSq.getRank === secondToLastRank &&
                endSq.getRank === promotionRank &&
                diagonalMove &&
                pieceToPromote &&
                color) {
                return Pawn.promotion(endSq, pieceToPromote, color);
            }
            //normal capture logic
            else if (Math.abs(startSq.getRank - endSq.getRank) === 1 &&
                diagonalMove) {
                console.log('Captured a piece with pawn on ' + endSq.getSquareName);
                return true;
                // }
            }
        }
        console.log('Error capturing with pawn');
        return false;
    }
    enPassant(move, EpStartSqRank) {
        if ((EpStartSqRank === 5 &&
            move.startSq.getRank === 7 &&
            move.endSq.getRank === 5) ||
            (EpStartSqRank === 4 &&
                move.startSq.getRank === 2 &&
                move.endSq.getRank === 4)) {
            console.log('En passant successful');
            // move.endSq.setPiece(null);
            return true;
        }
        else {
            console.log('En passant unsuccessful');
            return false;
        }
    }
    static startingSquareMove(startSq, endSq, board) {
        var _a, _b;
        //one square forwards
        if (Math.abs(startSq.getRank - endSq.getRank) === 1 &&
            endSq.getPiece === null) {
            console.log('Moved pawn one square forward');
            return true;
        }
        //white pawn two squares forwards
        else if (endSq.getRank - startSq.getRank === 2 &&
            endSq.getPiece === null &&
            ((_a = board.getSquare(`${startSq.getFile}${startSq.getRank + 1}`)) === null || _a === void 0 ? void 0 : _a.getPiece) ===
                null) {
            console.log('Moved white pawn two squares forward');
            return true;
        }
        //black pawn two squares forwards
        else if (startSq.getRank - endSq.getRank === 2 &&
            endSq.getPiece === null &&
            ((_b = board.getSquare(`${startSq.getFile}${startSq.getRank - 1}`)) === null || _b === void 0 ? void 0 : _b.getPiece) ===
                null) {
            console.log('Moved black pawn two squares forward');
            return true;
        }
        else {
            console.log('Error moving the pawn from starting square');
            return false;
        }
    }
    static promotion(endSq, piece, color) {
        switch (piece) {
            case 'PAWN':
                console.log('Promote to pawn');
                return new Pawn(endSq, color);
            case 'KNIGHT':
                console.log('Promote to knight');
                return new Knight_1.Knight(endSq, color);
            case 'BISHOP':
                console.log('Promote to bishop');
                return new Bishop_1.Bishop(endSq, color);
            case 'ROOK':
                console.log('Promote to rook');
                return new Rook_1.Rook(endSq, color);
            case 'QUEEN':
                console.log('Promote to queen');
                return new Queen_1.Queen(endSq, color);
            case 'KING':
                console.log("Can't promote to king!");
                throw new Error();
            default:
                console.log('Error');
                throw new Error();
        }
    }
    static compareFiles(startSqFile, endSqFile) {
        return (Math.abs(Board_1.Board.findFileIndex(startSqFile) - Board_1.Board.findFileIndex(endSqFile)) === 1);
    }
    possibleMoves(board) {
        const startSq = this.getSquare;
        if (startSq) {
            if (this.getColor === types_1.Color.white) {
                return Pawn.possibleWhiteMoves(startSq, board);
            }
            else if (this.getColor === types_1.Color.black) {
                return Pawn.possibleBlackMoves(startSq, board);
            }
            else
                throw new Error("Pawn doesn't have a color");
        }
        else
            throw new Error('Pawn doesnt have a square');
    }
    static possibleWhiteMoves(sq, board) {
        var _a, _b, _c, _d, _e, _f;
        const moves = [];
        const startSq = sq.getSquareName;
        if (sq.getRank === 1) {
            throw new Error('How is the white pawn on the first rank?');
        }
        if (sq.getRank === 2) {
            const oneForward = (_a = board.getSquare(`${sq.getFile}${sq.getRank + 1}`)) === null || _a === void 0 ? void 0 : _a.getSquareName;
            const twoForward = (_b = board.getSquare(`${sq.getFile}${sq.getRank + 2}`)) === null || _b === void 0 ? void 0 : _b.getSquareName;
            if (oneForward && twoForward) {
                moves.push({
                    startSq: startSq,
                    endSq: oneForward,
                }, {
                    startSq: startSq,
                    endSq: oneForward,
                });
            }
        }
        if (sq.getFile === 'a') {
            //capturing can only happen on b-file
            const bFileOneForward = (_c = board.getSquare(`${'b'}${sq.getRank + 1}`)) === null || _c === void 0 ? void 0 : _c.getSquareName;
            if (bFileOneForward) {
                moves.push({
                    startSq: startSq,
                    endSq: bFileOneForward,
                });
            }
        }
        else if (sq.getFile === 'h') {
            //capturing can only happen on g-file
            const gFileOneForward = (_d = board.getSquare(`${'g'}${sq.getRank + 1}`)) === null || _d === void 0 ? void 0 : _d.getSquareName;
            if (gFileOneForward) {
                moves.push({
                    startSq: startSq,
                    endSq: gFileOneForward,
                });
            }
        }
        else {
            const oneRightForward = (_e = board.getSquare(`${String.fromCharCode(sq.getFile.charCodeAt(0) + 1)}${sq.getRank + 1}`)) === null || _e === void 0 ? void 0 : _e.getSquareName;
            const oneLeftForward = (_f = board.getSquare(`${String.fromCharCode(sq.getFile.charCodeAt(0) - 1)}${sq.getRank + 1}`)) === null || _f === void 0 ? void 0 : _f.getSquareName;
            if (oneRightForward && oneLeftForward) {
                moves.push({
                    startSq: startSq,
                    endSq: oneRightForward,
                }, {
                    startSq: startSq,
                    endSq: oneLeftForward,
                });
            }
        }
        return moves;
    }
    static possibleBlackMoves(sq, board) {
        var _a, _b, _c, _d, _e, _f;
        const moves = [];
        const startSq = sq.getSquareName;
        if (sq.getRank === 8) {
            throw new Error('How is the black pawn on the 8th rank?');
        }
        if (sq.getRank === 7) {
            const oneForward = (_a = board.getSquare(`${sq.getFile}${sq.getRank - 1}`)) === null || _a === void 0 ? void 0 : _a.getSquareName;
            const twoForward = (_b = board.getSquare(`${sq.getFile}${sq.getRank - 2}`)) === null || _b === void 0 ? void 0 : _b.getSquareName;
            if (oneForward && twoForward) {
                moves.push({
                    startSq: startSq,
                    endSq: oneForward,
                }, {
                    startSq: startSq,
                    endSq: oneForward,
                });
            }
        }
        if (sq.getFile === 'a') {
            //capturing can only happen on b-file
            const bFileOneForward = (_c = board.getSquare(`${'b'}${sq.getRank - 1}`)) === null || _c === void 0 ? void 0 : _c.getSquareName;
            if (bFileOneForward) {
                moves.push({
                    startSq: startSq,
                    endSq: bFileOneForward,
                });
            }
        }
        else if (sq.getFile === 'h') {
            //capturing can only happen on g-file
            const gFileOneForward = (_d = board.getSquare(`${'g'}${sq.getRank - 1}`)) === null || _d === void 0 ? void 0 : _d.getSquareName;
            if (gFileOneForward) {
                moves.push({
                    startSq: startSq,
                    endSq: gFileOneForward,
                });
            }
        }
        else {
            const oneRightForward = (_e = board.getSquare(`${String.fromCharCode(sq.getFile.charCodeAt(0) + 1)}${sq.getRank - 1}`)) === null || _e === void 0 ? void 0 : _e.getSquareName;
            const oneLeftForward = (_f = board.getSquare(`${String.fromCharCode(sq.getFile.charCodeAt(0) - 1)}${sq.getRank - 1}`)) === null || _f === void 0 ? void 0 : _f.getSquareName;
            if (oneRightForward && oneLeftForward) {
                moves.push({
                    startSq: startSq,
                    endSq: oneRightForward,
                }, {
                    startSq: startSq,
                    endSq: oneLeftForward,
                });
            }
        }
        return moves;
    }
}
exports.Pawn = Pawn;
