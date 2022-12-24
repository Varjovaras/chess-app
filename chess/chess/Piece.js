"use strict";
exports.__esModule = true;
exports.Piece = void 0;
var Board_1 = require("./Board");
var Piece = /** @class */ (function () {
    function Piece(square, color) {
        this.name = '';
        this.square = square;
        this.color = color;
    }
    Object.defineProperty(Piece.prototype, "getName", {
        get: function () {
            return this.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Piece.prototype, "getColor", {
        get: function () {
            return this.color;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Piece.prototype, "getSquare", {
        get: function () {
            return this.square;
        },
        enumerable: false,
        configurable: true
    });
    Piece.prototype.move = function (startSq, endSq, board, piece, move) {
        return false;
    };
    Piece.prototype.getFirstLetter = function () {
        return this.name[0];
    };
    Piece.prototype.setSquare = function (sq) {
        console.log("".concat(this.getName, " set on ").concat(sq.getSquareName));
        this.square = sq;
    };
    Piece.capturable = function (startSq, endSq, move) {
        console.log('capturable' + endSq.getSquareName);
        var startSqPiece = startSq.getPiece;
        var endSqPiece = endSq.getPiece;
        //for en passant
        if (move) {
            endSqPiece = move.endSq.getPiece;
        }
        if ((startSqPiece === null || startSqPiece === void 0 ? void 0 : startSqPiece.color) === (endSqPiece === null || endSqPiece === void 0 ? void 0 : endSqPiece.color) && endSqPiece !== null) {
            console.log('Cannot capture own piece or capture on an empty square');
            return false;
        }
        console.log("".concat(startSqPiece === null || startSqPiece === void 0 ? void 0 : startSqPiece.getName, " on square ").concat(startSq.getSquareName, " is able to capture ").concat(endSqPiece === null || endSqPiece === void 0 ? void 0 : endSqPiece.getName, " on ").concat(endSq.getSquareName));
        return true;
    };
    Piece.prototype.possibleMoves = function (board) {
        console.log('Piece without type has no possible moves');
        return [];
    };
    //for bishop and queen
    Piece.isDiagonal = function (startSq, endSq, board) {
        var fileDiff = Math.abs(Board_1.Board.findFileIndex(startSq.getFile) - Board_1.Board.findFileIndex(endSq.getFile));
        var rankDiff = Math.abs(startSq.getRank - endSq.getRank);
        if (fileDiff === rankDiff && fileDiff === 1) {
            return true;
        }
        if (fileDiff === rankDiff) {
            return Piece.diagonalPiecesOnTheWay(startSq, endSq, rankDiff, board);
        }
        return false;
    };
    //for bishop and queen
    Piece.diagonalPiecesOnTheWay = function (startSq, endSq, rankDiff, board) {
        var index = 0;
        var startFileIndex = Board_1.Board.findFileIndex(startSq.getFile);
        var endFileIndex = Board_1.Board.findFileIndex(endSq.getFile);
        //find index of the next square to test
        if (startSq.getRank < endSq.getRank && startFileIndex > endFileIndex) {
            index = 7;
        }
        else if (startSq.getRank < endSq.getRank &&
            startFileIndex < endFileIndex) {
            index = 9;
        }
        else if (startSq.getRank > endSq.getRank &&
            startFileIndex > endFileIndex) {
            index = -9;
        }
        else
            index = -7;
        var startSqIndex = startSq.getId + index;
        for (var i = 0; i < rankDiff; i++, startSqIndex += index) {
            var sq = board.getSquareById(startSqIndex);
            if (sq === endSq)
                break;
            else if (!sq)
                return false;
            else if (sq.getPiece !== null) {
                console.log('Piece on the way');
                return false;
            }
        }
        console.log('No diagonal pieces on the way');
        return true;
    };
    //for rook and queen
    //left and right movement
    Piece.horizontalMove = function (startSq, endSq, board) {
        var _a;
        console.log('horizontal move by ' + ((_a = startSq.getPiece) === null || _a === void 0 ? void 0 : _a.getName));
        var index = startSq.getFile < endSq.getFile ? 1 : -1;
        var startSqIndex = startSq.getId + index;
        var horizontalDiff = Math.abs(endSq.getId - startSq.getId);
        if (horizontalDiff === 1 && endSq.getPiece === null)
            return true;
        for (var i = 0; i < horizontalDiff; i++, startSqIndex += index) {
            var sq = board.getSquareById(startSqIndex);
            if (sq === startSq)
                continue;
            else if (sq === endSq)
                break;
            else if (!sq)
                return false;
            else if (sq.getPiece !== null) {
                console.log('Piece on the way');
                return false;
            }
        }
        return true;
    };
    //for rook and queen
    //up and down movement
    Piece.verticalMove = function (startSq, endSq, board) {
        var _a;
        console.log('vertical move by ' + ((_a = startSq.getPiece) === null || _a === void 0 ? void 0 : _a.getName));
        var index = startSq.getId < endSq.getId ? 8 : -8;
        var startSqIndex = startSq.getId + index;
        var verticalDiff = Math.abs(endSq.getRank - startSq.getRank);
        if (verticalDiff === 1 && endSq.getPiece === null)
            return true;
        for (var i = 0; i < verticalDiff; i++, startSqIndex += index) {
            var sq = board.getSquareById(startSqIndex);
            if (sq === startSq)
                continue;
            if (!sq)
                return false;
            else if (sq === endSq)
                break;
            else if (sq.getPiece !== null) {
                console.log('Piece on the way');
                return false;
            }
        }
        return true;
    };
    return Piece;
}());
exports.Piece = Piece;
