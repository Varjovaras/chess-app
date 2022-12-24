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
exports.Bishop = void 0;
var Piece_1 = require("./Piece");
var types_1 = require("./types");
var Bishop = /** @class */ (function (_super) {
    __extends(Bishop, _super);
    function Bishop(square, color) {
        var _this = _super.call(this, square) || this;
        _this.color = color;
        if (color === types_1.Color.white) {
            _this.name = types_1.ChessPieces.BISHOP_WHITE;
        }
        else {
            _this.name = types_1.ChessPieces.BISHOP_BLACK;
        }
        return _this;
    }
    Bishop.prototype.move = function (startSq, endSq, board) {
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
    };
    Bishop.prototype.possibleMoves = function (board) {
        var moves = [];
        var startSq = this.square;
        if (startSq) {
            var rank = startSq.getRank;
            var file = startSq.getFile;
            var startSqName = startSq.getSquareName;
            var files = [1, 1, -1, -1];
            var ranks = [1, -1, 1, -1];
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 7; j++) {
                    var nextFile = String.fromCharCode(file.charCodeAt(0) + files[i] + j * files[i]);
                    var nextRank = rank + ranks[i] + j * ranks[i];
                    var sq = board.getSquare("".concat(nextFile).concat(nextRank));
                    if (!sq)
                        break;
                    if (sq && sq.getSquareName) {
                        var endSq = sq.getSquareName;
                        moves.push({
                            startSq: startSqName,
                            endSq: endSq
                        });
                    }
                }
            }
            return moves;
        }
        throw new Error('Error making possible bishop moves');
    };
    return Bishop;
}(Piece_1.Piece));
exports.Bishop = Bishop;
