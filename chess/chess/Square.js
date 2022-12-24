"use strict";
exports.__esModule = true;
exports.Square = void 0;
var Square = /** @class */ (function () {
    function Square(file, rank, squareName, color, id, piece) {
        this._file = file;
        this._rank = rank;
        this._squareName = squareName;
        this._color = color;
        this._piece = piece;
        this._id = id;
    }
    Object.defineProperty(Square.prototype, "getSquare", {
        get: function () {
            return this;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Square.prototype, "getFile", {
        get: function () {
            return this._file;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Square.prototype, "getRank", {
        get: function () {
            return this._rank;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Square.prototype, "getSquareName", {
        get: function () {
            return this._squareName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Square.prototype, "getId", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Square.prototype, "getColor", {
        get: function () {
            return this._color;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Square.prototype, "getPiece", {
        get: function () {
            return this._piece;
        },
        enumerable: false,
        configurable: true
    });
    Square.prototype.setFile = function (file) {
        this._file = file;
    };
    Square.prototype.setRank = function (rank) {
        this._rank = rank;
    };
    Square.prototype.setSquareName = function (squareName) {
        this._squareName = squareName;
    };
    Square.prototype.setColor = function (color) {
        this._color = color;
    };
    Square.prototype.setId = function (id) {
        this._id = id;
    };
    Square.prototype.setPiece = function (piece) {
        this._piece = piece;
    };
    Square.prototype.setSquareForPiece = function (sq) {
        var _a;
        (_a = this._piece) === null || _a === void 0 ? void 0 : _a.setSquare(sq);
    };
    Square.omitPiece = function (s) {
        var sq = s;
        sq._piece = null;
        return sq;
    };
    Square.prototype.isSquareOccupied = function () {
        return this._piece === null;
    };
    return Square;
}());
exports.Square = Square;
