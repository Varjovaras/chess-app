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
exports.Rook = void 0;
var Piece_1 = require("./Piece");
var types_1 = require("./types");
var Rook = /** @class */ (function (_super) {
    __extends(Rook, _super);
    function Rook(square, color) {
        var _this = _super.call(this, square) || this;
        _this.color = color;
        _this.castlingAllowed = true;
        if (color === types_1.Color.white) {
            _this.name = types_1.ChessPieces.ROOK_WHITE;
        }
        else {
            _this.name = types_1.ChessPieces.ROOK_BLACK;
        }
        return _this;
    }
    Rook.prototype.isCastlingAllowed = function () {
        return this.castlingAllowed;
    };
    Rook.prototype.castled = function () {
        this.castlingAllowed = false;
    };
    Rook.prototype.move = function (startSq, endSq, board) {
        var isHorizontal = startSq.getRank === endSq.getRank ? true : false;
        //capture logic
        if (startSq.getPiece && endSq.getPiece !== null) {
            if (Piece_1.Piece.capturable(startSq, endSq)) {
                return this.rookMoveHelper(startSq, endSq, board, isHorizontal);
            }
            else {
                console.log('Capturing with rook failed');
                return false;
            }
        }
        return this.rookMoveHelper(startSq, endSq, board, isHorizontal);
    };
    Rook.prototype.rookMoveHelper = function (startSq, endSq, board, isHorizontal) {
        var isMoveSuccessful = isHorizontal
            ? Piece_1.Piece.horizontalMove(startSq, endSq, board)
            : Piece_1.Piece.verticalMove(startSq, endSq, board);
        if (isMoveSuccessful) {
            this.castlingAllowed = true;
        }
        return isMoveSuccessful;
    };
    Rook.prototype.possibleMoves = function (board) {
        var moves = [];
        var startSq = this.square;
        if (startSq) {
            var rank = startSq.getRank;
            var file = startSq.getFile;
            var startSqName = startSq.getSquareName;
            var files = [1, -1, 0, 0];
            var ranks = [0, 0, 1, -1];
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
        throw new Error('Error making possible rook moves');
    };
    return Rook;
}(Piece_1.Piece));
exports.Rook = Rook;
