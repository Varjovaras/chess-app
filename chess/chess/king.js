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
exports.King = void 0;
var Board_1 = require("./Board");
var Piece_1 = require("./Piece");
var Rook_1 = require("./Rook");
var types_1 = require("./types");
var King = /** @class */ (function (_super) {
    __extends(King, _super);
    function King(square, color) {
        var _this = _super.call(this, square) || this;
        _this.color = color;
        _this.castlingAllowed = true;
        if (color === types_1.Color.white) {
            _this.name = types_1.ChessPieces.KING_WHITE;
        }
        else {
            _this.name = types_1.ChessPieces.KING_BLACK;
        }
        return _this;
    }
    King.prototype.isCastlingAllowed = function () {
        return this.castlingAllowed;
    };
    King.prototype.move = function (startSq, endSq, board) {
        if (startSq.getPiece && endSq.getPiece !== null) {
            if (Piece_1.Piece.capturable(startSq, endSq)) {
                return King.kingMoves(startSq, endSq, board);
            }
            else {
                console.log('Capturing with queen failed');
                return false;
            }
        }
        if ((startSq.getFile === 'e' && endSq.getFile === 'g') ||
            endSq.getFile === 'c') {
            return this.castling(startSq, endSq, board);
        }
        return King.kingMoves(startSq, endSq, board);
    };
    King.prototype.castling = function (startSq, endSq, board) {
        console.log('Trying castling');
        if (!this.castlingAllowed)
            return false;
        if (endSq.getFile === 'g') {
            return this.kingSideCastling(startSq, endSq, board);
        }
        else if (endSq.getFile === 'c')
            return this.queenSideCastling(startSq, endSq, board);
        else
            return false;
    };
    King.prototype.kingSideCastling = function (startSq, endSq, board) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        if (startSq.getRank === 1) {
            var rook = (_a = board.getSquare('h1')) === null || _a === void 0 ? void 0 : _a.getPiece;
            if (!rook || !(rook instanceof Rook_1.Rook) || !rook.isCastlingAllowed()) {
                console.log('no rook, piece on h1 is not a rook or the rook has moved');
                return false;
            }
            console.log((_b = board.getSquare('f1')) === null || _b === void 0 ? void 0 : _b.getPiece);
            console.log((_c = board.getSquare('f1')) === null || _c === void 0 ? void 0 : _c.getPiece);
            if (!((_d = board.getSquare('f1')) === null || _d === void 0 ? void 0 : _d.getPiece) ||
                !((_e = board.getSquare('g1')) === null || _e === void 0 ? void 0 : _e.getPiece)) {
                console.log('Castling allowed kingside. Moving king on ' +
                    ((_f = this.getSquare) === null || _f === void 0 ? void 0 : _f.getSquareName));
                return true;
            }
            if (!((_g = board.getSquare('d1')) === null || _g === void 0 ? void 0 : _g.getPiece) &&
                !((_h = board.getSquare('c1')) === null || _h === void 0 ? void 0 : _h.getPiece)) {
                console.log('Castling allowed queenside. Moving king on ' +
                    ((_j = this.getSquare) === null || _j === void 0 ? void 0 : _j.getSquareName));
                return true;
            }
        }
        console.log('castling not allowed');
        return false;
    };
    King.prototype.queenSideCastling = function (startSq, endSq, board) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        if (startSq.getRank === 1) {
            var rook = (_a = board.getSquare('h1')) === null || _a === void 0 ? void 0 : _a.getPiece;
            if (!rook || !(rook instanceof Rook_1.Rook) || !rook.isCastlingAllowed()) {
                console.log('no rook, piece on h1 is not a rook or the rook has moved');
                return false;
            }
            console.log((_b = board.getSquare('f1')) === null || _b === void 0 ? void 0 : _b.getPiece);
            console.log((_c = board.getSquare('f1')) === null || _c === void 0 ? void 0 : _c.getPiece);
            if (!((_d = board.getSquare('f1')) === null || _d === void 0 ? void 0 : _d.getPiece) ||
                !((_e = board.getSquare('g1')) === null || _e === void 0 ? void 0 : _e.getPiece)) {
                console.log('Castling allowed kingside. Moving king on ' +
                    ((_f = this.getSquare) === null || _f === void 0 ? void 0 : _f.getSquareName));
                return true;
            }
            if (!((_g = board.getSquare('d1')) === null || _g === void 0 ? void 0 : _g.getPiece) &&
                !((_h = board.getSquare('c1')) === null || _h === void 0 ? void 0 : _h.getPiece)) {
                console.log('Castling allowed queenside. Moving king on ' +
                    ((_j = this.getSquare) === null || _j === void 0 ? void 0 : _j.getSquareName));
                return true;
            }
        }
        console.log('castling not allowed');
        return false;
    };
    King.kingMoves = function (startSq, endSq, board) {
        var fileDiff = Math.abs(Board_1.Board.findFileIndex(startSq.getFile) - Board_1.Board.findFileIndex(endSq.getFile));
        var rankDiff = Math.abs(startSq.getRank - endSq.getRank);
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
    };
    return King;
}(Piece_1.Piece));
exports.King = King;
