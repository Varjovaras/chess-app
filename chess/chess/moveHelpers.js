"use strict";
exports.__esModule = true;
exports.enPassantHelper = exports.knightMoveHelper = void 0;
var knightMoveHelper = function (sq, board) {
    var endSquares = [];
    var files = [2, 2, 1, 1, -1, -2, -2, -1];
    var ranks = [1, -1, 2, -2, -2, -1, 1, 2];
    if (!sq)
        return [];
    var file = sq.getFile;
    var rank = sq.getRank;
    for (var i = 0; i < 8; i++) {
        var nextFile = String.fromCharCode(file.charCodeAt(0) + files[i]);
        var nextRank = rank + ranks[i];
        var sq_1 = board.getSquare("".concat(nextFile).concat(nextRank));
        if (sq_1 && sq_1.getSquareName) {
            endSquares.push(sq_1.getSquare.getId);
        }
    }
    return endSquares;
};
exports.knightMoveHelper = knightMoveHelper;
var enPassantHelper = function (startSq, endSq, move) {
    var _a, _b;
    return !!((((_a = startSq.getPiece) === null || _a === void 0 ? void 0 : _a.getFirstLetter()) === 'p' &&
        startSq.getRank === 5 &&
        endSq.getRank === 6 &&
        startSq.getFile !== endSq.getFile &&
        move &&
        move.endSq.getRank === 5 &&
        move.startSquarePiece.getFirstLetter() === 'P' &&
        move.startSq.getFile === endSq.getFile) ||
        (((_b = startSq.getPiece) === null || _b === void 0 ? void 0 : _b.getFirstLetter()) === 'P' &&
            startSq.getRank === 4 &&
            endSq.getRank === 3 &&
            startSq.getFile !== endSq.getFile &&
            move &&
            move.endSq.getRank === 4 &&
            move.startSquarePiece.getFirstLetter() === 'p' &&
            move.endSq.getFile === endSq.getFile));
};
exports.enPassantHelper = enPassantHelper;
