"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
const Square_1 = require("./Square");
const types_1 = require("./types");
const MoveHelpers_1 = require("./MoveHelpers");
class Board {
    constructor() {
        const board = new Array(64);
        let firstSquare = types_1.Color.black;
        let secondSquare = types_1.Color.white;
        let rank = 1;
        for (let i = 0, file = 0; i < board.length; i++, file++) {
            if (file === 8) {
                file = 0;
                rank++;
                const temp = firstSquare;
                firstSquare = secondSquare;
                secondSquare = temp;
            }
            if (i % 2 === 0) {
                board[i] = new Square_1.Square(Board.files[file], rank, `${Board.files[file]}${rank}`, firstSquare, i, null);
            }
            else {
                board[i] = new Square_1.Square(Board.files[file], rank, `${Board.files[file]}${rank}`, secondSquare, i, null);
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this._board = board;
    }
    get getBoard() {
        return this._board;
    }
    setBoard(board) {
        this._board = board;
    }
    getSquare(name) {
        const sq = this._board.find((s) => s.getSquareName === name);
        return sq ? sq.getSquare : null;
    }
    getSquareById(id) {
        const sq = this._board.find((s) => s.getId === id);
        return sq ? sq.getSquare : null;
    }
    getSquareAndName(name, id) {
        if (id) {
            const sq = this.getSquareById(id);
            if (sq)
                return sq.getSquareName;
        }
        if (name) {
            const sq = this.getSquare(name);
            if (sq)
                return sq.getSquareName;
        }
        console.log('No square found by id or name');
    }
    getWhiteKing() {
        var _a;
        return (_a = this._board.find((sq) => { var _a; return ((_a = sq.getPiece) === null || _a === void 0 ? void 0 : _a.getName) === 'king'; })) === null || _a === void 0 ? void 0 : _a.getPiece;
    }
    getBlackKing() {
        var _a;
        return (_a = this._board.find((sq) => { var _a; return ((_a = sq.getPiece) === null || _a === void 0 ? void 0 : _a.getName) === 'KING'; })) === null || _a === void 0 ? void 0 : _a.getPiece;
    }
    printBoardWhite() {
        const rows = ['', '', '', '', '', '', '', ''];
        for (const i of this._board) {
            const piece = i.getPiece;
            if (piece) {
                rows[i.getRank - 1] += piece.getFirstLetter() + '  ';
            }
            else {
                rows[i.getRank - 1] += i.getFile + i.getRank + ' ';
            }
        }
        return rows.reverse();
    }
    printBoardBlack() {
        const rows = ['', '', '', '', '', '', '', ''];
        for (const i of this._board) {
            const piece = i.getPiece;
            if (piece) {
                rows[i.getRank - 1] =
                    ' ' + piece.getFirstLetter() + ' ' + rows[i.getRank - 1];
            }
            else {
                rows[i.getRank - 1] = i.getFile + i.getRank + ' ' + rows[i.getRank - 1];
            }
        }
        return rows.reverse();
    }
    whiteCheck() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
        const king = this.getWhiteKing();
        if (!king) {
            console.log('No white king found');
            return false;
        }
        const sq = king.getSquare;
        if (!sq) {
            console.log('No square for white king found');
            return false;
        }
        const sqId = (_a = this.getSquareById(sq.getId)) === null || _a === void 0 ? void 0 : _a.getId;
        if (!sqId) {
            console.log('No square id for white king found');
            return false;
        }
        // upwards
        for (let i = 1; i < 8; i++) {
            const testSq = this.getSquareById(sqId + 8 * i);
            if (!testSq)
                break;
            const testSqPiece = testSq.getPiece;
            if (!testSqPiece)
                continue;
            const testSqPieceName = testSqPiece.getFirstLetter();
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
        for (let i = 1; i < 8; i++) {
            const testSq = this.getSquareById(sqId - 8 * i);
            if (!testSq)
                break;
            const testSqPiece = testSq.getPiece;
            if (!testSqPiece && testSq.getRank === 1) {
                break;
            }
            if (!testSqPiece)
                continue;
            const testSqPieceName = testSqPiece.getFirstLetter();
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
        for (let i = 1; i < 8; i++) {
            const testSq = this.getSquareById(sqId + 9 * i);
            if (!testSq)
                break;
            const testSqPiece = testSq.getPiece;
            if (!testSqPiece && testSq.getFile === 'h')
                break;
            if (!testSqPiece)
                continue;
            const testSqPieceName = testSqPiece.getFirstLetter();
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
        for (let i = 1; i < 8; i++) {
            const testSq = this.getSquareById(sqId + 7 * i);
            if (!testSq)
                break;
            const testSqPiece = testSq.getPiece;
            if (!testSqPiece && testSq.getFile === 'a')
                break;
            if (!testSqPiece)
                continue;
            const testSqPieceName = testSqPiece.getFirstLetter();
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
        for (let i = 1; i < 8; i++) {
            const testSq = this.getSquareById(sqId - 9 * i);
            if (!testSq)
                break;
            const testSqPiece = testSq.getPiece;
            if (testSq.getFile === 'a' || testSq.getId < 8)
                break;
            if (!testSqPiece)
                continue;
            const testSqPieceName = testSqPiece.getFirstLetter();
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
        for (let i = 1; i < 8; i++) {
            const testSq = this.getSquareById(sqId - 7 * i);
            if (!testSq)
                break;
            const testSqPiece = testSq.getPiece;
            if ((!testSqPiece && testSq.getId < 8) || testSq.getFile === 'h') {
                break;
            }
            if (!testSqPiece)
                continue;
            const testSqPieceName = testSqPiece.getFirstLetter();
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
        const knightSquares = (0, MoveHelpers_1.knightMoveHelper)(sq, this);
        knightSquares.forEach((k) => {
            const sq = this.getSquareById(k);
            if (sq && sq.getPiece && sq.getPiece.getFirstLetter() === 'N') {
                return true;
            }
        });
        //pawn things
        if (sq.getFile === 'a') {
            if (((_c = (_b = this.getSquareById(sqId + 9)) === null || _b === void 0 ? void 0 : _b.getPiece) === null || _c === void 0 ? void 0 : _c.getFirstLetter()) === 'P') {
                console.log('King is in check from square ' +
                    ((_d = this.getSquareById(sqId + 9)) === null || _d === void 0 ? void 0 : _d.getSquareName) +
                    ' by ' +
                    ((_f = (_e = this.getSquareById(sqId + 9)) === null || _e === void 0 ? void 0 : _e.getPiece) === null || _f === void 0 ? void 0 : _f.getFirstLetter()));
                return true;
            }
        }
        else if (sq.getFile === 'h') {
            if (((_h = (_g = this.getSquareById(sqId + 7)) === null || _g === void 0 ? void 0 : _g.getPiece) === null || _h === void 0 ? void 0 : _h.getFirstLetter()) === 'P') {
                console.log('King is in check from square ' +
                    ((_j = this.getSquareById(sqId + 7)) === null || _j === void 0 ? void 0 : _j.getSquareName) +
                    ' by ' +
                    ((_l = (_k = this.getSquareById(sqId + 7)) === null || _k === void 0 ? void 0 : _k.getPiece) === null || _l === void 0 ? void 0 : _l.getFirstLetter()));
                return true;
            }
        }
        else {
            if (((_o = (_m = this.getSquareById(sqId + 9)) === null || _m === void 0 ? void 0 : _m.getPiece) === null || _o === void 0 ? void 0 : _o.getFirstLetter()) === 'P') {
                console.log('King is in check from square ' +
                    ((_p = this.getSquareById(sqId + 9)) === null || _p === void 0 ? void 0 : _p.getSquareName) +
                    ' by ' +
                    ((_r = (_q = this.getSquareById(sqId + 9)) === null || _q === void 0 ? void 0 : _q.getPiece) === null || _r === void 0 ? void 0 : _r.getFirstLetter()));
                return true;
            }
            if (((_t = (_s = this.getSquareById(sqId + 7)) === null || _s === void 0 ? void 0 : _s.getPiece) === null || _t === void 0 ? void 0 : _t.getFirstLetter()) === 'P') {
                console.log('King is in check from square ' +
                    ((_u = this.getSquareById(sqId + 7)) === null || _u === void 0 ? void 0 : _u.getSquareName) +
                    ' by ' +
                    ((_w = (_v = this.getSquareById(sqId + 7)) === null || _v === void 0 ? void 0 : _v.getPiece) === null || _w === void 0 ? void 0 : _w.getFirstLetter()));
                return true;
            }
        }
        //if no checks found
        return false;
    }
    blackCheck() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
        const king = this.getBlackKing();
        if (!king) {
            console.log('No black king found');
            return false;
        }
        const sq = king.getSquare;
        if (!sq) {
            console.log('No square for black king found');
            return false;
        }
        const sqId = (_a = this.getSquareById(sq.getId)) === null || _a === void 0 ? void 0 : _a.getId;
        if (!sqId) {
            console.log('No square id for black king found');
            return false;
        }
        // upwards
        for (let i = 1; i < 8; i++) {
            const testSq = this.getSquareById(sqId + 8 * i);
            if (!testSq)
                break;
            const testSqPiece = testSq.getPiece;
            if (!testSqPiece && testSq.getRank === 8)
                break;
            if (!testSqPiece)
                continue;
            const testSqPieceName = testSqPiece.getFirstLetter();
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
        for (let i = 1; i < 8; i++) {
            const testSq = this.getSquareById(sqId - 8 * i);
            if (!testSq)
                break;
            const testSqPiece = testSq.getPiece;
            if (!testSqPiece && testSq.getRank === 1)
                break;
            if (!testSqPiece)
                continue;
            const testSqPieceName = testSqPiece.getFirstLetter();
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
        for (let i = 1; i < 8; i++) {
            const testSq = this.getSquareById(sqId + 9 * i);
            if (!testSq)
                break;
            const testSqPiece = testSq.getPiece;
            if (!testSqPiece && testSq.getFile === 'h')
                break;
            if (!testSqPiece)
                continue;
            const testSqPieceName = testSqPiece.getFirstLetter();
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
        for (let i = 1; i < 8; i++) {
            const testSq = this.getSquareById(sqId + 7 * i);
            if (!testSq)
                break;
            const testSqPiece = testSq.getPiece;
            if (!testSqPiece && testSq.getFile === 'a')
                break;
            if (!testSqPiece)
                continue;
            const testSqPieceName = testSqPiece.getFirstLetter();
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
        for (let i = 1; i < 8; i++) {
            const testSq = this.getSquareById(sqId - 9 * i);
            if (!testSq)
                break;
            const testSqPiece = testSq.getPiece;
            if ((!testSqPiece && testSq.getFile === 'a') || testSq.getId < 8)
                break;
            if (!testSqPiece)
                continue;
            const testSqPieceName = testSqPiece.getFirstLetter();
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
        for (let i = 1; i < 8; i++) {
            const testSq = this.getSquareById(sqId - 7 * i);
            if (!testSq)
                break;
            const testSqPiece = testSq.getPiece;
            if ((!testSqPiece && testSq.getId < 8) || testSq.getFile === 'h') {
                break;
            }
            if (!testSqPiece)
                continue;
            const testSqPieceName = testSqPiece.getFirstLetter();
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
        const knightSquares = (0, MoveHelpers_1.knightMoveHelper)(sq, this);
        knightSquares.forEach((k) => {
            const sq = this.getSquareById(k);
            if (sq && sq.getPiece && sq.getPiece.getFirstLetter() === 'n') {
                return true;
            }
        });
        //pawn things
        if (sq.getFile === 'a') {
            if (((_c = (_b = this.getSquareById(sqId - 7)) === null || _b === void 0 ? void 0 : _b.getPiece) === null || _c === void 0 ? void 0 : _c.getFirstLetter()) === 'p') {
                console.log('King is in check from square ' +
                    ((_d = this.getSquareById(sqId - 7)) === null || _d === void 0 ? void 0 : _d.getSquareName) +
                    ' by ' +
                    ((_f = (_e = this.getSquareById(sqId - 7)) === null || _e === void 0 ? void 0 : _e.getPiece) === null || _f === void 0 ? void 0 : _f.getFirstLetter()));
                return true;
            }
        }
        else if (sq.getFile === 'h') {
            if (((_h = (_g = this.getSquareById(sqId - 9)) === null || _g === void 0 ? void 0 : _g.getPiece) === null || _h === void 0 ? void 0 : _h.getFirstLetter()) === 'p') {
                console.log('King is in check from square ' +
                    ((_j = this.getSquareById(sqId - 9)) === null || _j === void 0 ? void 0 : _j.getSquareName) +
                    ' by ' +
                    ((_l = (_k = this.getSquareById(sqId - 9)) === null || _k === void 0 ? void 0 : _k.getPiece) === null || _l === void 0 ? void 0 : _l.getFirstLetter()));
                return true;
            }
        }
        else {
            if (((_o = (_m = this.getSquareById(sqId - 9)) === null || _m === void 0 ? void 0 : _m.getPiece) === null || _o === void 0 ? void 0 : _o.getFirstLetter()) === 'p') {
                console.log('King is in check from square ' +
                    ((_p = this.getSquareById(sqId - 9)) === null || _p === void 0 ? void 0 : _p.getSquareName) +
                    ' by ' +
                    ((_r = (_q = this.getSquareById(sqId - 9)) === null || _q === void 0 ? void 0 : _q.getPiece) === null || _r === void 0 ? void 0 : _r.getFirstLetter()));
                return true;
            }
            if (((_t = (_s = this.getSquareById(sqId - 7)) === null || _s === void 0 ? void 0 : _s.getPiece) === null || _t === void 0 ? void 0 : _t.getFirstLetter()) === 'p') {
                console.log('King is in check from square ' +
                    ((_u = this.getSquareById(sqId - 7)) === null || _u === void 0 ? void 0 : _u.getSquareName) +
                    ' by ' +
                    ((_w = (_v = this.getSquareById(sqId - 7)) === null || _v === void 0 ? void 0 : _v.getPiece) === null || _w === void 0 ? void 0 : _w.getFirstLetter()));
                return true;
            }
        }
        //if no checks found
        return false;
    }
    static findFileIndex(s) {
        return Board.files.findIndex((e) => e === s);
    }
}
exports.Board = Board;
Board.files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
