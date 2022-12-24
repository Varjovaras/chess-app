"use strict";
exports.__esModule = true;
exports.Board = void 0;
var Square_1 = require("./Square");
var types_1 = require("./types");
var moveHelpers_1 = require("./moveHelpers");
var Board = /** @class */ (function () {
    function Board() {
        var board = new Array(64);
        var firstSquare = types_1.Color.black;
        var secondSquare = types_1.Color.white;
        var rank = 1;
        for (var i = 0, file = 0; i < board.length; i++, file++) {
            if (file === 8) {
                file = 0;
                rank++;
                var temp = firstSquare;
                firstSquare = secondSquare;
                secondSquare = temp;
            }
            if (i % 2 === 0) {
                board[i] = new Square_1.Square(Board.files[file], rank, "".concat(Board.files[file]).concat(rank), firstSquare, i, null);
            }
            else {
                board[i] = new Square_1.Square(Board.files[file], rank, "".concat(Board.files[file]).concat(rank), secondSquare, i, null);
            }
        }
        this._board = board;
    }
    Object.defineProperty(Board.prototype, "getBoard", {
        get: function () {
            return this._board;
        },
        enumerable: false,
        configurable: true
    });
    Board.prototype.setBoard = function (board) {
        this._board = board;
    };
    Board.prototype.getSquare = function (name) {
        var sq = this._board.find(function (s) { return s.getSquareName === name; });
        return sq ? sq.getSquare : null;
    };
    Board.prototype.getSquareById = function (id) {
        var sq = this._board.find(function (s) { return s.getId === id; });
        return sq ? sq.getSquare : null;
    };
    Board.prototype.getSquareAndName = function (name, id) {
        if (id) {
            var sq = this.getSquareById(id);
            if (sq)
                return sq.getSquareName;
        }
        if (name) {
            var sq = this.getSquare(name);
            if (sq)
                return sq.getSquareName;
        }
        console.log('No square found by id or name');
    };
    Board.prototype.getWhiteKing = function () {
        var _a;
        return (_a = this._board.find(function (sq) { var _a; return ((_a = sq.getPiece) === null || _a === void 0 ? void 0 : _a.getName) === 'king'; })) === null || _a === void 0 ? void 0 : _a.getPiece;
    };
    Board.prototype.getBlackKing = function () {
        var _a;
        return (_a = this._board.find(function (sq) { var _a; return ((_a = sq.getPiece) === null || _a === void 0 ? void 0 : _a.getName) === 'KING'; })) === null || _a === void 0 ? void 0 : _a.getPiece;
    };
    Board.prototype.printBoardWhite = function () {
        var rows = ['', '', '', '', '', '', '', ''];
        for (var _i = 0, _a = this._board; _i < _a.length; _i++) {
            var i = _a[_i];
            var piece = i.getPiece;
            if (piece) {
                rows[i.getRank - 1] += piece.getFirstLetter() + '  ';
            }
            else {
                rows[i.getRank - 1] += i.getFile + i.getRank + ' ';
            }
        }
        return rows.reverse();
    };
    Board.prototype.printBoardBlack = function () {
        var rows = ['', '', '', '', '', '', '', ''];
        for (var _i = 0, _a = this._board; _i < _a.length; _i++) {
            var i = _a[_i];
            var piece = i.getPiece;
            if (piece) {
                rows[i.getRank - 1] =
                    ' ' + piece.getFirstLetter() + ' ' + rows[i.getRank - 1];
            }
            else {
                rows[i.getRank - 1] = i.getFile + i.getRank + ' ' + rows[i.getRank - 1];
            }
        }
        return rows.reverse();
    };
    Board.prototype.whiteCheck = function () {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        var king = this.getWhiteKing();
        if (!king) {
            console.log('No white king found');
            return false;
        }
        var sq = king.getSquare;
        if (!sq) {
            console.log('No square for white king found');
            return false;
        }
        var sqId = (_a = this.getSquareById(sq.getId)) === null || _a === void 0 ? void 0 : _a.getId;
        if (!sqId) {
            console.log('No square id for white king found');
            return false;
        }
        // upwards
        for (var i = 1; i < 8; i++) {
            var testSq = this.getSquareById(sqId + 8 * i);
            if (!testSq)
                break;
            var testSqPiece = testSq.getPiece;
            if (!testSqPiece)
                continue;
            var testSqPieceName = testSqPiece.getFirstLetter();
            if ((testSqPieceName && testSqPieceName === 'R') ||
                testSqPieceName === 'Q') {
                console.log('King is in check from square ' +
                    testSq.getSquareName +
                    ' by ' +
                    testSqPieceName);
                return true;
            }
            if (testSqPiece) {
                break;
            }
        }
        // downwards
        for (var i = 1; i < 8; i++) {
            var testSq = this.getSquareById(sqId - 8 * i);
            if (!testSq)
                break;
            var testSqPiece = testSq.getPiece;
            if (!testSqPiece && testSq.getRank === 1) {
                break;
            }
            if (!testSqPiece)
                continue;
            var testSqPieceName = testSqPiece.getFirstLetter();
            if ((testSqPieceName && testSqPieceName === 'R') ||
                testSqPieceName === 'Q') {
                console.log('King is in check from square ' +
                    testSq.getSquareName +
                    ' by ' +
                    testSqPieceName);
                return true;
            }
            if (testSqPiece) {
                break;
            }
        }
        // up and right
        // console.log('up and right');
        for (var i = 1; i < 8; i++) {
            var testSq = this.getSquareById(sqId + 9 * i);
            if (!testSq)
                break;
            var testSqPiece = testSq.getPiece;
            if (!testSqPiece && testSq.getFile === 'h')
                break;
            if (!testSqPiece)
                continue;
            var testSqPieceName = testSqPiece.getFirstLetter();
            if ((testSqPieceName && testSqPieceName === 'B') ||
                testSqPieceName === 'Q') {
                console.log('King is in check from square ' +
                    testSq.getSquareName +
                    ' by ' +
                    testSqPieceName);
                return true;
            }
            if (testSqPiece) {
                break;
            }
        }
        // up and left
        // console.log('up and left');
        for (var i = 1; i < 8; i++) {
            var testSq = this.getSquareById(sqId + 7 * i);
            if (!testSq)
                break;
            var testSqPiece = testSq.getPiece;
            if (!testSqPiece && testSq.getFile === 'a')
                break;
            if (!testSqPiece)
                continue;
            var testSqPieceName = testSqPiece.getFirstLetter();
            if ((testSqPieceName && testSqPieceName === 'B') ||
                testSqPieceName === 'Q') {
                console.log('King is in check from square ' +
                    testSq.getSquareName +
                    ' by ' +
                    testSqPieceName);
                return true;
            }
            if (testSqPiece) {
                break;
            }
        }
        // down and left
        // console.log('down and left');
        for (var i = 1; i < 8; i++) {
            var testSq = this.getSquareById(sqId - 9 * i);
            if (!testSq)
                break;
            var testSqPiece = testSq.getPiece;
            if (testSq.getFile === 'a' || testSq.getId < 8)
                break;
            if (!testSqPiece)
                continue;
            var testSqPieceName = testSqPiece.getFirstLetter();
            if ((testSqPieceName && testSqPieceName === 'B') ||
                testSqPieceName === 'Q') {
                console.log('King is in check from square ' +
                    testSq.getSquareName +
                    ' by ' +
                    testSqPieceName);
                return true;
            }
            if (testSqPiece) {
                break;
            }
        }
        // down and right
        // console.log('down and right');
        for (var i = 1; i < 8; i++) {
            var testSq = this.getSquareById(sqId - 7 * i);
            if (!testSq)
                break;
            var testSqPiece = testSq.getPiece;
            if ((!testSqPiece && testSq.getId < 8) || testSq.getFile === 'h') {
                break;
            }
            if (!testSqPiece)
                continue;
            var testSqPieceName = testSqPiece.getFirstLetter();
            if ((testSqPieceName && testSqPieceName === 'B') ||
                testSqPieceName === 'Q') {
                console.log('King is in check from square ' +
                    testSq.getSquareName +
                    ' by ' +
                    testSqPieceName);
                return true;
            }
            if (testSqPiece) {
                break;
            }
        }
        //horse things
        var knightSquares = (0, moveHelpers_1.knightMoveHelper)(sq, this);
        knightSquares.forEach(function (k) {
            var sq = _this.getSquareById(k);
            if (sq && sq.getPiece && sq.getPiece.getFirstLetter() === 'N') {
                return true;
            }
        });
        //pawn things
        if (sq.getFile === 'a') {
            if (((_c = (_b = this.getSquareById(sqId + 9)) === null || _b === void 0 ? void 0 : _b.getPiece) === null || _c === void 0 ? void 0 : _c.getFirstLetter()) === 'P') {
                console.log('King is in check from square ' +
                    this.getSquareById(sqId + 9).getSquareName +
                    ' by ' +
                    ((_d = this.getSquareById(sqId + 9)) === null || _d === void 0 ? void 0 : _d.getPiece.getFirstLetter));
                return true;
            }
        }
        else if (sq.getFile === 'h') {
            if (((_f = (_e = this.getSquareById(sqId + 7)) === null || _e === void 0 ? void 0 : _e.getPiece) === null || _f === void 0 ? void 0 : _f.getFirstLetter()) === 'P') {
                console.log('King is in check from square ' +
                    this.getSquareById(sqId + 7).getSquareName +
                    ' by ' +
                    ((_g = this.getSquareById(sqId + 7)) === null || _g === void 0 ? void 0 : _g.getPiece.getFirstLetter));
                return true;
            }
        }
        else {
            if (((_j = (_h = this.getSquareById(sqId + 9)) === null || _h === void 0 ? void 0 : _h.getPiece) === null || _j === void 0 ? void 0 : _j.getFirstLetter()) === 'P') {
                console.log('King is in check from square ' +
                    this.getSquareById(sqId + 9).getSquareName +
                    ' by ' +
                    ((_k = this.getSquareById(sqId + 9)) === null || _k === void 0 ? void 0 : _k.getPiece.getFirstLetter));
                return true;
            }
            if (((_m = (_l = this.getSquareById(sqId + 7)) === null || _l === void 0 ? void 0 : _l.getPiece) === null || _m === void 0 ? void 0 : _m.getFirstLetter()) === 'P') {
                console.log('King is in check from square ' +
                    this.getSquareById(sqId + 7).getSquareName +
                    ' by ' +
                    ((_o = this.getSquareById(sqId + 7)) === null || _o === void 0 ? void 0 : _o.getPiece.getFirstLetter));
                return true;
            }
        }
        //if no checks found
        return false;
    };
    Board.prototype.blackCheck = function () {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        var king = this.getBlackKing();
        if (!king) {
            console.log('No black king found');
            return false;
        }
        var sq = king.getSquare;
        if (!sq) {
            console.log('No square for black king found');
            return false;
        }
        var sqId = (_a = this.getSquareById(sq.getId)) === null || _a === void 0 ? void 0 : _a.getId;
        if (!sqId) {
            console.log('No square id for black king found');
            return false;
        }
        // upwards
        for (var i = 1; i < 8; i++) {
            var testSq = this.getSquareById(sqId + 8 * i);
            if (!testSq)
                break;
            var testSqPiece = testSq.getPiece;
            if (!testSqPiece && testSq.getRank === 8)
                break;
            if (!testSqPiece)
                continue;
            var testSqPieceName = testSqPiece.getFirstLetter();
            if ((testSqPieceName && testSqPieceName === 'r') ||
                testSqPieceName === 'q') {
                console.log('King is in check from square ' +
                    testSq.getSquareName +
                    ' by ' +
                    testSqPieceName);
                return true;
            }
            if (testSqPiece) {
                break;
            }
        }
        // downwards
        for (var i = 1; i < 8; i++) {
            var testSq = this.getSquareById(sqId - 8 * i);
            if (!testSq)
                break;
            var testSqPiece = testSq.getPiece;
            if (!testSqPiece && testSq.getRank === 1)
                break;
            if (!testSqPiece)
                continue;
            var testSqPieceName = testSqPiece.getFirstLetter();
            if ((testSqPieceName && testSqPieceName === 'r') ||
                testSqPieceName === 'q') {
                console.log('King is in check from square ' +
                    testSq.getSquareName +
                    ' by ' +
                    testSqPieceName);
                return true;
            }
            if (testSqPiece) {
                break;
            }
        }
        // up and right
        // console.log('up and right');
        for (var i = 1; i < 8; i++) {
            var testSq = this.getSquareById(sqId + 9 * i);
            if (!testSq)
                break;
            var testSqPiece = testSq.getPiece;
            if (!testSqPiece && testSq.getFile === 'h')
                break;
            if (!testSqPiece)
                continue;
            var testSqPieceName = testSqPiece.getFirstLetter();
            if ((testSqPieceName && testSqPieceName === 'b') ||
                testSqPieceName === 'q') {
                console.log('King is in check from square ' +
                    testSq.getSquareName +
                    ' by ' +
                    testSqPieceName);
                return true;
            }
            if (testSqPiece) {
                break;
            }
        }
        // up and left
        // console.log('up and left');
        for (var i = 1; i < 8; i++) {
            var testSq = this.getSquareById(sqId + 7 * i);
            if (!testSq)
                break;
            var testSqPiece = testSq.getPiece;
            if (!testSqPiece && testSq.getFile === 'a')
                break;
            if (!testSqPiece)
                continue;
            var testSqPieceName = testSqPiece.getFirstLetter();
            if ((testSqPieceName && testSqPieceName === 'b') ||
                testSqPieceName === 'q') {
                console.log('King is in check from square ' +
                    testSq.getSquareName +
                    ' by ' +
                    testSqPieceName);
                return true;
            }
            if (testSqPiece) {
                break;
            }
        }
        // down and left
        // console.log('down and left');
        for (var i = 1; i < 8; i++) {
            var testSq = this.getSquareById(sqId - 9 * i);
            if (!testSq)
                break;
            var testSqPiece = testSq.getPiece;
            if ((!testSqPiece && testSq.getFile === 'a') || testSq.getId < 8)
                break;
            if (!testSqPiece)
                continue;
            var testSqPieceName = testSqPiece.getFirstLetter();
            if ((testSqPieceName && testSqPieceName === 'b') ||
                testSqPieceName === 'q') {
                console.log('King is in check from square ' +
                    testSq.getSquareName +
                    ' by ' +
                    testSqPieceName);
                return true;
            }
            if (testSqPiece) {
                break;
            }
        }
        // down and right
        // console.log('down and right');
        for (var i = 1; i < 8; i++) {
            var testSq = this.getSquareById(sqId - 7 * i);
            if (!testSq)
                break;
            var testSqPiece = testSq.getPiece;
            if ((!testSqPiece && testSq.getId < 8) || testSq.getFile === 'h') {
                break;
            }
            if (!testSqPiece)
                continue;
            var testSqPieceName = testSqPiece.getFirstLetter();
            if ((testSqPieceName && testSqPieceName === 'b') ||
                testSqPieceName === 'q') {
                console.log('King is in check from square ' +
                    testSq.getSquareName +
                    ' by ' +
                    testSqPieceName);
                return true;
            }
            if (testSqPiece) {
                break;
            }
        }
        //horse things
        var knightSquares = (0, moveHelpers_1.knightMoveHelper)(sq, this);
        knightSquares.forEach(function (k) {
            var sq = _this.getSquareById(k);
            if (sq && sq.getPiece && sq.getPiece.getFirstLetter() === 'n') {
                return true;
            }
        });
        //pawn things
        if (sq.getFile === 'a') {
            if (((_c = (_b = this.getSquareById(sqId - 7)) === null || _b === void 0 ? void 0 : _b.getPiece) === null || _c === void 0 ? void 0 : _c.getFirstLetter()) === 'p') {
                console.log('King is in check from square ' +
                    this.getSquareById(sqId - 7).getSquareName +
                    ' by ' +
                    ((_d = this.getSquareById(sqId - 7)) === null || _d === void 0 ? void 0 : _d.getPiece.getFirstLetter));
                return true;
            }
        }
        else if (sq.getFile === 'h') {
            if (((_f = (_e = this.getSquareById(sqId - 9)) === null || _e === void 0 ? void 0 : _e.getPiece) === null || _f === void 0 ? void 0 : _f.getFirstLetter()) === 'p') {
                console.log('King is in check from square ' +
                    this.getSquareById(sqId - 9).getSquareName +
                    ' by ' +
                    ((_g = this.getSquareById(sqId - 9)) === null || _g === void 0 ? void 0 : _g.getPiece.getFirstLetter));
                return true;
            }
        }
        else {
            if (((_j = (_h = this.getSquareById(sqId - 9)) === null || _h === void 0 ? void 0 : _h.getPiece) === null || _j === void 0 ? void 0 : _j.getFirstLetter()) === 'p') {
                console.log('King is in check from square ' +
                    this.getSquareById(sqId - 9).getSquareName +
                    ' by ' +
                    ((_k = this.getSquareById(sqId - 9)) === null || _k === void 0 ? void 0 : _k.getPiece.getFirstLetter));
                return true;
            }
            if (((_m = (_l = this.getSquareById(sqId - 7)) === null || _l === void 0 ? void 0 : _l.getPiece) === null || _m === void 0 ? void 0 : _m.getFirstLetter()) === 'p') {
                console.log('King is in check from square ' +
                    this.getSquareById(sqId - 7).getSquareName +
                    ' by ' +
                    ((_o = this.getSquareById(sqId - 7)) === null || _o === void 0 ? void 0 : _o.getPiece.getFirstLetter));
                return true;
            }
        }
        //if no checks found
        return false;
    };
    Board.findFileIndex = function (s) {
        return Board.files.findIndex(function (e) { return e === s; });
    };
    Board.files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    return Board;
}());
exports.Board = Board;
