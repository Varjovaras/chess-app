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
exports.Queen = void 0;
var Board_1 = require("./Board");
var Piece_1 = require("./Piece");
var types_1 = require("./types");
var Queen = /** @class */ (function (_super) {
    __extends(Queen, _super);
    function Queen(square, color) {
        var _this = _super.call(this, square) || this;
        _this.color = color;
        if (color === types_1.Color.white) {
            _this.name = types_1.ChessPieces.QUEEN_WHITE;
        }
        else {
            _this.name = types_1.ChessPieces.QUEEN_BLACK;
        }
        return _this;
    }
    Queen.prototype.move = function (startSq, endSq, board) {
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
    };
    Queen.queenMoves = function (startSq, endSq, board) {
        var fileDiff = Math.abs(Board_1.Board.findFileIndex(startSq.getFile) - Board_1.Board.findFileIndex(endSq.getFile));
        var rankDiff = Math.abs(startSq.getRank - endSq.getRank);
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
    Queen.prototype.possibleMoves = function (board) {
        var moves = [];
        var startSq = this.square;
        if (startSq) {
            var rookMoveFiles = [1, -1, 0, 0];
            var rookMoveRanks = [0, 0, 1, -1];
            var bishopMoveFiles = [1, 1, -1, -1];
            var bishopMoveRanks = [1, -1, 1, -1];
            moves = moves.concat(Queen.queenMoveHelper(rookMoveFiles, rookMoveRanks, board, startSq), Queen.queenMoveHelper(bishopMoveFiles, bishopMoveRanks, board, startSq));
            return moves;
        }
        throw new Error('Error making possible queen moves');
    };
    Queen.queenMoveHelper = function (k, t, board, startSq) {
        var moves = [];
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 7; j++) {
                var rank = startSq.getRank;
                var file = startSq.getFile;
                var startSqName = startSq.getSquareName;
                var nextFile = String.fromCharCode(file.charCodeAt(0) + k[i] + j * k[i]);
                var nextRank = rank + t[i] + j * t[i];
                var sq = board.getSquare("".concat(nextFile).concat(nextRank));
                if (!sq)
                    break;
                if (sq && sq.getSquareName) {
                    moves.push({
                        startSq: startSqName,
                        endSq: sq.getSquareName
                    });
                }
            }
        }
        return moves;
    };
    return Queen;
}(Piece_1.Piece));
exports.Queen = Queen;
