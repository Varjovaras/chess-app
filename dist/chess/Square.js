"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Square = void 0;
class Square {
    constructor(file, rank, squareName, color, id, piece) {
        this._file = file;
        this._rank = rank;
        this._squareName = squareName;
        this._color = color;
        this._piece = piece;
        this._id = id;
    }
    get getSquare() {
        return this;
    }
    get getFile() {
        return this._file;
    }
    get getRank() {
        return this._rank;
    }
    get getSquareName() {
        return this._squareName;
    }
    get getId() {
        return this._id;
    }
    get getColor() {
        return this._color;
    }
    get getPiece() {
        return this._piece;
    }
    setFile(file) {
        this._file = file;
    }
    setRank(rank) {
        this._rank = rank;
    }
    setSquareName(squareName) {
        this._squareName = squareName;
    }
    setColor(color) {
        this._color = color;
    }
    setId(id) {
        this._id = id;
    }
    setPiece(piece) {
        this._piece = piece;
    }
    setSquareForPiece(sq) {
        var _a;
        (_a = this._piece) === null || _a === void 0 ? void 0 : _a.setSquare(sq);
    }
    static omitPiece(s) {
        var _a;
        const sq = s;
        console.log('omit piece' + ((_a = sq.getPiece) === null || _a === void 0 ? void 0 : _a.getName));
        sq._piece = null;
        return sq;
    }
    isSquareOccupied() {
        return this._piece === null;
    }
}
exports.Square = Square;
