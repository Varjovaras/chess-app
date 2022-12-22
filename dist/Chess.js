"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bishop_1 = require("./chess/Bishop");
const Board_1 = require("./chess/Board");
const King_1 = require("./chess/King");
const Knight_1 = require("./chess/Knight");
const MoveHelpers_1 = require("./chess/MoveHelpers");
const Pawn_1 = require("./chess/Pawn");
const Queen_1 = require("./chess/Queen");
const Rook_1 = require("./chess/Rook");
const Square_1 = require("./chess/Square");
const types_1 = require("./chess/types");
class Chess {
    constructor(moves, pieces) {
        this._moves = moves ? moves : [];
        this._pieces = pieces ? pieces : [];
        this._turnNumber = 0;
        this._board = new Board_1.Board();
    }
    get getBoard() {
        return this._board;
    }
    get getMoves() {
        return this._moves;
    }
    get getPieces() {
        return this._pieces;
    }
    get getTurnNumber() {
        return this._turnNumber;
    }
    incrementMoveNumber() {
        this._turnNumber++;
    }
    checkTurn() {
        return this.getTurnNumber % 2 === 0 ? types_1.Color.white : types_1.Color.black;
    }
    latestMove() {
        if (this._moves.length > 0) {
            return this._moves[this._moves.length - 1];
        }
        return undefined;
    }
    whoseTurn() {
        return this.checkTurn() === types_1.Color.white ? 'White' : 'Black';
    }
    isGameOver(n) {
        return n;
    }
    whiteCheck(startSq, endSq, pieceName) {
        console.log('Checking if move removes white king from check');
        const tempBoard = [];
        for (let i = 0; i < 64; i++) {
            const sq = this._board.getSquareById(i);
            if (!sq) {
                throw new Error('No 64 squares');
            }
            const tempSq = new Square_1.Square(sq.getFile, sq.getRank, sq.getSquareName, sq.getColor, sq.getId, sq.getPiece);
            tempBoard.push(tempSq);
        }
        const newBoard = new Board_1.Board();
        newBoard.setBoard(tempBoard);
        const startSqTempBoard = newBoard.getSquare(startSq.getSquareName);
        const endSqTempBoard = newBoard.getSquare(endSq.getSquareName);
        if (!startSqTempBoard || !endSqTempBoard)
            return;
        this.fakeMovePiece(startSqTempBoard, endSqTempBoard, newBoard, pieceName);
        if (newBoard.whiteCheck())
            return;
        console.log('White king not in check anymore. Move legal');
        this.movePiece(startSq, endSq, pieceName);
    }
    blackCheck(startSq, endSq, pieceName) {
        console.log('Checking if move removes black king from check');
        const tempBoard = [];
        for (let i = 0; i < 64; i++) {
            const sq = this._board.getSquareById(i);
            if (!sq) {
                throw new Error('No 64 squares');
            }
            const tempSq = new Square_1.Square(sq.getFile, sq.getRank, sq.getSquareName, sq.getColor, sq.getId, sq.getPiece);
            tempBoard.push(tempSq);
        }
        const newBoard = new Board_1.Board();
        newBoard.setBoard(tempBoard);
        const startSqTempBoard = newBoard.getSquare(startSq.getSquareName);
        const endSqTempBoard = newBoard.getSquare(endSq.getSquareName);
        if (!startSqTempBoard || !endSqTempBoard)
            return;
        this.fakeMovePiece(startSqTempBoard, endSqTempBoard, newBoard, pieceName);
        if (newBoard.whiteCheck())
            return;
        console.log('White king not in check anymore. Move legal');
        // console.log(startSq);
        // console.log(endSq);
        this.movePiece(startSq, endSq, pieceName);
    }
    move(startSquare, endSquare, pieceName) {
        var _a;
        if (startSquare === endSquare) {
            console.log('Same starting and ending square');
            throw new Error("Didn't move the piece");
        }
        const startSq = this._board.getSquare(startSquare);
        const endSq = this._board.getSquare(endSquare);
        if (!startSq || !endSq)
            return;
        const startSqPieceColor = (_a = startSq.getPiece) === null || _a === void 0 ? void 0 : _a.getColor;
        if (startSqPieceColor === types_1.Color.white) {
            if (!this.getBoard.whiteCheck()) {
                console.log('White king not in check');
                this.movePiece(startSq, endSq, pieceName);
            }
            else
                this.whiteCheck(startSq, endSq, pieceName);
        }
        if (startSqPieceColor === types_1.Color.black) {
            if (!this.getBoard.blackCheck()) {
                console.log('black king not in check');
                this.movePiece(startSq, endSq, pieceName);
            }
            else
                this.blackCheck(startSq, endSq);
        }
    }
    movePiece(startSq, endSq, pieceName) {
        var _a, _b, _c;
        //returns piece if promoting a pawn
        let isLegalMoveOrPiece;
        if (((_a = startSq.getPiece) === null || _a === void 0 ? void 0 : _a.getColor) !== this.checkTurn()) {
            console.log('Wrong players turn');
            return;
            // throw new Error();
        }
        if (startSq.getPiece !== null && endSq !== null) {
            //check if pawn is about to promote
            if ((startSq === null || startSq === void 0 ? void 0 : startSq.getRank) === 7 &&
                (endSq === null || endSq === void 0 ? void 0 : endSq.getRank) === 8 &&
                ((_b = startSq.getPiece) === null || _b === void 0 ? void 0 : _b.getName.toUpperCase()) === types_1.ChessPieces.PAWN_BLACK) {
                isLegalMoveOrPiece = startSq.getPiece.move(startSq, endSq, this._board, pieceName);
            }
            else {
                const move = this.latestMove();
                if (move && startSq.getPiece.getFirstLetter().toUpperCase() === 'P')
                    isLegalMoveOrPiece = startSq.getPiece.move(startSq, endSq, this._board, undefined, move);
                else
                    isLegalMoveOrPiece = startSq.getPiece.move(startSq, endSq, this._board);
            }
            const move = this.latestMove();
            //is only an object if promoting a pawn, if not object this runs
            if (move && (0, MoveHelpers_1.enPassantHelper)(startSq, endSq, move)) {
                (_c = this._board.getSquareById(move.endSq.getSquare.getId)) === null || _c === void 0 ? void 0 : _c.setPiece(null);
                this._pieces = this._pieces.filter((p) => p.square !== (move === null || move === void 0 ? void 0 : move.endSq.getSquareName));
            }
            if (typeof isLegalMoveOrPiece !== 'object' && isLegalMoveOrPiece) {
                this.handleMove(startSq, endSq);
                return;
            }
            //promotion logic
            else if (isLegalMoveOrPiece) {
                endSq.setPiece(isLegalMoveOrPiece);
                endSq.setSquareForPiece(endSq);
                this.handleMove(startSq, endSq);
                startSq.setPiece(null);
                return;
            }
        }
        console.log('Starting square is invalid, no piece to be found or ending square is invalid, inputted invalid move or a piece is on the way');
        throw new Error();
    }
    handleMove(startSq, endSq) {
        this.addMove(startSq, endSq);
        this.handlePieces(startSq, endSq);
        this.incrementMoveNumber();
    }
    addMove(startSq, endSq) {
        console.log('Adding move: ' + startSq.getSquareName + ' ' + endSq.getSquareName);
        if (startSq.getPiece) {
            this._moves.push({
                startSq: startSq,
                endSq: endSq,
                startSquarePiece: startSq.getPiece,
            });
        }
    }
    handlePieces(startSq, endSq, enPassantSquare) {
        const startSqPiece = startSq.getPiece;
        const endSqPiece = endSq.getPiece;
        if (enPassantSquare) {
            this._pieces = this._pieces.filter((p) => p.square !== enPassantSquare.getSquareName);
        }
        if (endSqPiece) {
            this._pieces = this._pieces.filter((p) => p.square !== endSq.getSquareName);
        }
        if (startSqPiece) {
            this._pieces = this._pieces.filter((p) => p.square !== startSq.getSquareName);
            endSq.setPiece(startSqPiece);
            const endSquareToPiece = endSq;
            endSq.setSquareForPiece(endSquareToPiece);
            startSq.setPiece(null);
            if (endSq.getPiece) {
                this._pieces.push({
                    square: endSq.getSquareName,
                    piece: endSq.getPiece,
                });
            }
        }
    }
    handleTempPieces(startSq, endSq, _enPassantSquare) {
        const startSqPiece = startSq.getPiece;
        // const endSqPiece = endSq.getPiece;
        // if (enPassantSquare) {
        // 	this._pieces = this._pieces.filter(
        // 		(p: PieceSquare) => p.square !== enPassantSquare.getSquareName
        // 	);
        // }
        // if (endSqPiece) {
        // 	this._pieces = this._pieces.filter(
        // 		(p: PieceSquare) => p.square !== endSq.getSquareName
        // 	);
        // }
        // if (startSqPiece) {§
        // 	this._pieces = this._pieces.filter(
        // 		(p: PieceSquare) => p.square !== startSq.getSquareName
        // 	);
        if (!startSqPiece)
            return;
        endSq.setPiece(startSqPiece);
        endSq.setSquareForPiece(endSq);
        startSq.setPiece(null);
    }
    fakeMovePiece(startSq, endSq, board, pieceName) {
        var _a, _b, _c;
        //returns piece if promoting a pawn
        let isLegalMoveOrPiece;
        if (((_a = startSq.getPiece) === null || _a === void 0 ? void 0 : _a.getColor) !== this.checkTurn()) {
            console.log('Wrong players turn');
            throw new Error();
        }
        if (startSq.getPiece !== null && endSq !== null) {
            //check if pawn is about to promote
            if ((startSq === null || startSq === void 0 ? void 0 : startSq.getRank) === 7 &&
                (endSq === null || endSq === void 0 ? void 0 : endSq.getRank) === 8 &&
                ((_b = startSq.getPiece) === null || _b === void 0 ? void 0 : _b.getName.toUpperCase()) === types_1.ChessPieces.PAWN_BLACK) {
                isLegalMoveOrPiece = startSq.getPiece.move(startSq, endSq, board, pieceName);
            }
            else {
                const move = this.latestMove();
                if (move && startSq.getPiece.getFirstLetter().toUpperCase() === 'P')
                    isLegalMoveOrPiece = startSq.getPiece.move(startSq, endSq, board, undefined, move);
                else
                    isLegalMoveOrPiece = startSq.getPiece.move(startSq, endSq, board);
            }
            const move = this.latestMove();
            //is only an object if promoting a pawn, if not object this runs
            if (move && (0, MoveHelpers_1.enPassantHelper)(startSq, endSq, move)) {
                (_c = board.getSquareById(move.endSq.getSquare.getId)) === null || _c === void 0 ? void 0 : _c.setPiece(null);
                // this._pieces = this._pieces.filter(
                // 	(p: PieceSquare) => p.square !== move?.endSq.getSquareName
                // );
            }
            //
            if (typeof isLegalMoveOrPiece !== 'object' && isLegalMoveOrPiece) {
                // this.handleMove(startSq, endSq);
                this.handleTempPieces(startSq, endSq);
                return;
            }
            //promotion logic
            else if (isLegalMoveOrPiece) {
                endSq.setPiece(isLegalMoveOrPiece);
                endSq.setSquareForPiece(endSq);
                this.handleTempPieces(startSq, endSq);
                startSq.setPiece(null);
                return;
            }
        }
        console.log('Starting square is invalid, no piece to be found or ending square is invalid, inputted invalid move or a piece is on the way');
        throw new Error();
    }
    //initialization or promoting
    putPieceOnBoard(square, piece) {
        var _a;
        const sq = this._board.getSquare(square);
        if (sq && !((_a = this.getBoard.getSquare(sq.getSquareName)) === null || _a === void 0 ? void 0 : _a.isSquareOccupied())) {
            this.removePiece(square);
        }
        if (sq) {
            sq.setPiece(piece);
            this.addPiece(piece, square);
            console.log(`${piece.getName} put on ${square}`);
        }
        else {
            console.log('No square found');
            throw new Error();
        }
    }
    addPiece(piece, square) {
        this._pieces.push({ square: square, piece: piece });
    }
    removePiece(square) {
        this._pieces = this._pieces.filter((p) => p.square !== square);
    }
    algebraicNotation() {
        let returnArray = [];
        let s = '';
        for (const move of this.getMoves) {
            const startSqPiece = move.startSq.getPiece &&
                move.startSq.getPiece.getFirstLetter().toLowerCase() !== 'p'
                ? move.startSq.getPiece.getFirstLetter()
                : '';
            const piece = move.endSq.getPiece
                ? move.endSq.getPiece.getFirstLetter()
                : '';
            s =
                s +
                    `${startSqPiece}${move.startSq.getSquareName} ${move.endSq.getSquareName}${piece.toUpperCase()}`;
            returnArray = returnArray.concat(s);
            s = '';
        }
        return returnArray;
    }
    fen(fen) {
        const tokens = fen.split(/\s+/);
        const pieces = tokens[0].split('/');
        //initialize
        this._moves = [];
        this._pieces = [];
        this._turnNumber = 0;
        this._board.getBoard.forEach((s) => {
            s.setPiece(null);
        });
        this.analyzeFen(pieces);
    }
    //what the hell
    analyzeFen(pieces) {
        for (let i = 0; i < 8; i++) {
            const str = pieces[i];
            if (str.length !== 8) {
                //todo non starting position
            }
            else if (str !== '8') {
                //if str is 8 it's an empty row
                this.fenHelper(i, str);
            }
        }
    }
    fenHelper(i, str) {
        //i is row
        //j is row times 8
        //k iterates files
        for (let j = i * 8, k = 0; j < i * 8 + 8; j++, k++) {
            const sq = this._board.getSquareById(j);
            if (sq) {
                const piece = Chess.fenPieces(str[k], sq);
                if (piece !== null) {
                    this.putPieceOnBoard(sq.getSquareName, piece);
                }
            }
        }
    }
    static fenPieces(s, sq) {
        switch (s) {
            case 'p':
                return new Pawn_1.Pawn(sq, types_1.Color.white);
            case 'P':
                return new Pawn_1.Pawn(sq, types_1.Color.black);
            case 'n':
                return new Knight_1.Knight(sq, types_1.Color.white);
            case 'N':
                return new Knight_1.Knight(sq, types_1.Color.black);
            case 'b':
                return new Bishop_1.Bishop(sq, types_1.Color.white);
            case 'B':
                return new Bishop_1.Bishop(sq, types_1.Color.black);
            case 'r':
                return new Rook_1.Rook(sq, types_1.Color.white);
            case 'R':
                return new Rook_1.Rook(sq, types_1.Color.black);
            case 'q':
                return new Queen_1.Queen(sq, types_1.Color.white);
            case 'Q':
                return new Queen_1.Queen(sq, types_1.Color.black);
            case 'k':
                return new King_1.King(sq, types_1.Color.white);
            case 'K':
                return new King_1.King(sq, types_1.Color.black);
            default:
                return null;
        }
    }
    emptyBoard() {
        this._moves = [];
        this._pieces = [];
        this._turnNumber = 0;
        this._board.getBoard.forEach((s) => {
            s.setPiece(null);
        });
    }
    startingPosition() {
        this.fen(Chess.STARTING_POSITION);
    }
}
exports.default = Chess;
Chess.STARTING_POSITION = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
