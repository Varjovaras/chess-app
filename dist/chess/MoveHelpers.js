"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enPassantHelper = exports.knightMoveHelper = void 0;
const knightMoveHelper = (sq, board) => {
    const endSquares = [];
    const files = [2, 2, 1, 1, -1, -2, -2, -1];
    const ranks = [1, -1, 2, -2, -2, -1, 1, 2];
    if (!sq)
        return [];
    const file = sq.getFile;
    const rank = sq.getRank;
    for (let i = 0; i < 8; i++) {
        const nextFile = String.fromCharCode(file.charCodeAt(0) + files[i]);
        const nextRank = rank + ranks[i];
        const sq = board.getSquare(`${nextFile}${nextRank}`);
        if (sq && sq.getSquareName) {
            endSquares.push(sq.getSquare.getId);
        }
    }
    return endSquares;
};
exports.knightMoveHelper = knightMoveHelper;
const enPassantHelper = (startSq, endSq, move) => {
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
