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
exports.Knight = void 0;
var Board_1 = require("./Board");
var Piece_1 = require("./Piece");
var types_1 = require("./types");
var Knight = /** @class */ (function (_super) {
    __extends(Knight, _super);
    function Knight(square, color) {
        var _this = _super.call(this, square) || this;
        _this.color = color;
        if (color === types_1.Color.white) {
            _this.name = types_1.ChessPieces.KNIGHT_WHITE;
        }
        else
            _this.name = types_1.ChessPieces.KNIGHT_BLACK;
        return _this;
    }
    Knight.prototype.move = function (startSq, endSq) {
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
    };
    Knight.capture = function (startSq, endSq) {
        if (Piece_1.Piece.capturable(startSq, endSq)) {
            return true;
        }
        else {
            console.log('Capturing with knight failed');
            return false;
        }
    };
    Knight.knightMoves = function (startSq, endSq) {
        return ((Math.abs(Board_1.Board.findFileIndex(startSq.getFile) -
            Board_1.Board.findFileIndex(endSq.getFile)) === 1 &&
            Math.abs(startSq.getRank - endSq.getRank) === 2) ||
            (Math.abs(Board_1.Board.findFileIndex(startSq.getFile) -
                Board_1.Board.findFileIndex(endSq.getFile)) === 2 &&
                Math.abs(startSq.getRank - endSq.getRank) === 1));
    };
    Knight.prototype.possibleMoves = function (board) {
        var moves = [];
        var startSq = this.square;
        if (startSq) {
            var rank = startSq.getRank;
            var file = startSq.getFile;
            var startSqName = startSq.getSquareName;
            var files = [2, 2, 1, 1, -1, -2, -2, -1];
            var ranks = [1, -1, 2, -2, -2, -1, 1, 2];
            for (var i = 0; i < 8; i++) {
                var nextFile = String.fromCharCode(file.charCodeAt(0) + files[i]);
                var nextRank = rank + ranks[i];
                var sq = board.getSquare("".concat(nextFile).concat(nextRank));
                if (sq && sq.getSquareName) {
                    var endSq = sq.getSquareName;
                    moves.push({
                        startSq: startSqName,
                        endSq: endSq
                    });
                }
            }
            return moves;
        }
        throw new Error('Error making possible knight moves');
    };
    return Knight;
}(Piece_1.Piece));
exports.Knight = Knight;
