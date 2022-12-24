"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Pawn = void 0;
var Bishop_1 = require("./Bishop");
var Board_1 = require("./Board");
var Knight_1 = require("./Knight");
var Piece_1 = require("./Piece");
var Queen_1 = require("./Queen");
var Rook_1 = require("./Rook");
var types_1 = require("./types");
var Pawn = /** @class */ (function (_super) {
    __extends(Pawn, _super);
    function Pawn(square, color) {
        var _this = _super.call(this, square) || this;
        _this.color = color;
        if (color === types_1.Color.white)
            _this.name = types_1.ChessPieces.PAWN_WHITE;
        else
            _this.name = types_1.ChessPieces.PAWN_BLACK;
        return _this;
    }
    Pawn.prototype.move = function (startSq, endSq, board, piece, move) {
        if (this.color === types_1.Color.white)
            return Pawn.moveWhite(startSq, endSq, board, piece, move);
        else if (this.color === types_1.Color.black)
            return Pawn.moveBlack(startSq, endSq, board, piece, move);
        else {
            console.log('Piece not found');
            return false;
        }
    };
    Pawn.moveWhite = function (startSq, endSq, board, pieceToPromote, move) {
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
            return Pawn.capture(startSq, endSq, pieceToPromote, move);
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
    };
    Pawn.moveBlack = function (startSq, endSq, board, pieceToPromote, move) {
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
            return Pawn.capture(startSq, endSq, pieceToPromote, move);
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
    };
    Pawn.capture = function (startSq, endSq, pieceToPromote, move) {
        var _a, _b, _c, _d, _e;
        //what is the rank you need to start on to be able to promote
        var secondToLastRank = ((_a = startSq.getPiece) === null || _a === void 0 ? void 0 : _a.getColor) === types_1.Color.white ? 7 : 2;
        var promotionRank = ((_b = startSq.getPiece) === null || _b === void 0 ? void 0 : _b.getColor) === types_1.Color.white ? 8 : 1;
        //what is the rank you need to start and end on to be able to en passant
        var enPassantStartSqRank = ((_c = startSq.getPiece) === null || _c === void 0 ? void 0 : _c.getColor) === types_1.Color.white ? 5 : 4;
        var enPassantEndSqRank = ((_d = startSq.getPiece) === null || _d === void 0 ? void 0 : _d.getColor) === types_1.Color.white ? 6 : 3;
        var color = ((_e = startSq.getPiece) === null || _e === void 0 ? void 0 : _e.getColor) === types_1.Color.white ? types_1.Color.black : null;
        //is pawn capturing or not
        var diagonalMove = Pawn.compareFiles(startSq.getFile, endSq.getFile);
        //check if it's en passant
        if (startSq.getRank === enPassantStartSqRank &&
            endSq.getRank === enPassantEndSqRank &&
            diagonalMove) {
            if (!move)
                return false;
            if (Piece_1.Piece.capturable(startSq, move.endSq)) {
                return this.enPassant(move, enPassantStartSqRank);
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
    };
    Pawn.startingSquareMove = function (startSq, endSq, board) {
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
            ((_a = board.getSquare("".concat(startSq.getFile).concat(startSq.getRank + 1))) === null || _a === void 0 ? void 0 : _a.getPiece) ===
                null) {
            console.log('Moved white pawn two squares forward');
            return true;
        }
        //black pawn two squares forwards
        else if (startSq.getRank - endSq.getRank === 2 &&
            endSq.getPiece === null &&
            ((_b = board.getSquare("".concat(startSq.getFile).concat(startSq.getRank - 1))) === null || _b === void 0 ? void 0 : _b.getPiece) ===
                null) {
            console.log('Moved black pawn two squares forward');
            return true;
        }
        else {
            console.log('Error moving the pawn from starting square');
            return false;
        }
    };
    Pawn.promotion = function (endSq, piece, color) {
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
    };
    Pawn.enPassant = function (move, EpStartSqRank) {
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
    };
    Pawn.compareFiles = function (startSqFile, endSqFile) {
        return (Math.abs(Board_1.Board.findFileIndex(startSqFile) - Board_1.Board.findFileIndex(endSqFile)) === 1);
    };
    Pawn.prototype.possibleMoves = function (board) {
        var startSq = this.getSquare;
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
    };
    Pawn.possibleWhiteMoves = function (sq, board) {
        var moves = [];
        var startSq = sq.getSquareName;
        if (sq.getRank === 1) {
            throw new Error('How is the white pawn on the first rank?');
        }
        if (sq.getRank === 2) {
            moves.push({
                startSq: startSq,
                endSq: board.getSquare("".concat(sq.getFile).concat(sq.getRank + 1))
                    .getSquareName
            }, {
                startSq: startSq,
                endSq: board.getSquare("".concat(sq.getFile).concat(sq.getRank + 2))
                    .getSquareName
            });
        }
        if (sq.getFile === 'a') {
            moves.push({
                startSq: startSq,
                endSq: board.getSquare("".concat('b').concat(sq.getRank + 1)).getSquareName
            });
        }
        else if (sq.getFile === 'h') {
            moves.push({
                startSq: startSq,
                endSq: board.getSquare("".concat('g').concat(sq.getRank + 1)).getSquareName
            });
        }
        else {
            moves.push({
                startSq: startSq,
                endSq: board.getSquare("".concat(String.fromCharCode(sq.getFile.charCodeAt(0) + 1)).concat(sq.getRank + 1)).getSquareName
            }, {
                startSq: startSq,
                endSq: board.getSquare("".concat(String.fromCharCode(sq.getFile.charCodeAt(0) - 1)).concat(sq.getRank + 1)).getSquareName
            });
        }
        return moves;
    };
    Pawn.possibleBlackMoves = function (sq, board) {
        var moves = [];
        var startSq = sq.getSquareName;
        if (sq.getRank === 8) {
            throw new Error('How is the black pawn on the 8th rank?');
        }
        if (sq.getRank === 7) {
            moves.push({
                startSq: startSq,
                endSq: board.getSquare("".concat(sq.getFile).concat(sq.getRank - 1))
                    .getSquareName
            }, {
                startSq: startSq,
                endSq: board.getSquare("".concat(sq.getFile).concat(sq.getRank - 2))
                    .getSquareName
            });
        }
        if (sq.getFile === 'a') {
            moves.push({
                startSq: startSq,
                endSq: board.getSquare("".concat('b').concat(sq.getRank - 1)).getSquareName
            });
        }
        else if (sq.getFile === 'h') {
            moves.push({
                startSq: startSq,
                endSq: board.getSquare("".concat('g').concat(sq.getRank - 1)).getSquareName
            });
        }
        else {
            moves.push({
                startSq: startSq,
                endSq: board.getSquare("".concat(String.fromCharCode(sq.getFile.charCodeAt(0) - 1)).concat(sq.getRank - 1)).getSquareName
            }, {
                startSq: startSq,
                endSq: board.getSquare("".concat(String.fromCharCode(sq.getFile.charCodeAt(0) - 1)).concat(sq.getRank - 1)).getSquareName
            });
        }
        return moves;
    };
    return Pawn;
}(Piece_1.Piece));
exports.Pawn = Pawn;
