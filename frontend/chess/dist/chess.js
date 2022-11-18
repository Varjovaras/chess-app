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
var Color;
(function (Color) {
    Color["black"] = "BLACK";
    Color["white"] = "WHITE";
})(Color || (Color = {}));
var ChessPieces;
(function (ChessPieces) {
    ChessPieces["PAWN_WHITE"] = "pawn";
    ChessPieces["PAWN_BLACK"] = "PAWN";
    ChessPieces["KNIGHT_WHITE"] = "night";
    ChessPieces["KNIGHT_BLACK"] = "NIGHT";
    ChessPieces["BISHOP_WHITE"] = "bishop";
    ChessPieces["BISHOP_BLACK"] = "BISHOP";
    ChessPieces["ROOK_WHITE"] = "rook";
    ChessPieces["ROOK_BLACK"] = "ROOK";
    ChessPieces["QUEEN_WHITE"] = "queen";
    ChessPieces["QUEEN_BLACK"] = "QUEEN";
    ChessPieces["KING_WHITE"] = "king";
    ChessPieces["KING_BLACK"] = "KING";
})(ChessPieces || (ChessPieces = {}));
var Square = /** @class */ (function () {
    function Square(file, rank, squareName, color, id, piece) {
        this.file = file;
        this.rank = rank;
        this.squareName = squareName;
        this.color = color;
        this.piece = piece;
        this.id = id;
    }
    Object.defineProperty(Square.prototype, "getSquare", {
        get: function () {
            return this;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Square.prototype, "getSquareName", {
        get: function () {
            return this.squareName;
        },
        enumerable: false,
        configurable: true
    });
    return Square;
}());
var Chess = /** @class */ (function () {
    function Chess(moves, pieces) {
        this._board = new Array(64);
        this._moves = moves ? moves : [];
        this._pieces = pieces ? pieces : [];
        this._turnNumber = 0;
        var firstSquare = Color.black;
        var secondSquare = Color.white;
        var rank = 1;
        for (var i = 0, file = 0; i < this._board.length; i++, file++) {
            if (file === 8) {
                file = 0;
                rank++;
                var temp = firstSquare;
                firstSquare = secondSquare;
                secondSquare = temp;
            }
            if (i % 2 === 0) {
                this._board[i] = new Square(Chess.files[file], rank, "".concat(Chess.files[file]).concat(rank), firstSquare, i, null);
            }
            else {
                this._board[i] = new Square(Chess.files[file], rank, "".concat(Chess.files[file]).concat(rank), secondSquare, i, null);
            }
        }
    }
    Object.defineProperty(Chess.prototype, "getBoard", {
        get: function () {
            return this._board;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Chess.prototype, "getMoves", {
        get: function () {
            return this._moves;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Chess.prototype, "setMoves", {
        set: function (moves) {
            this._moves = moves;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Chess.prototype, "getTurnNumber", {
        get: function () {
            return this._turnNumber;
        },
        enumerable: false,
        configurable: true
    });
    Chess.prototype.incrementMoveNumber = function () {
        this._turnNumber++;
    };
    Chess.prototype.checkTurn = function () {
        return this.getTurnNumber % 2 === 0 ? Color.white : Color.black;
    };
    Chess.prototype.latestMove = function () {
        if (this._moves.length > 0) {
            return this._moves[this._moves.length - 1];
        }
        return null;
    };
    Chess.prototype.printBoardWhite = function () {
        var rows = ['', '', '', '', '', '', '', ''];
        for (var _i = 0, _a = this._board; _i < _a.length; _i++) {
            var i = _a[_i];
            if (i.piece) {
                rows[i.rank - 1] += i.piece.getFirstLetter() + '  ';
            }
            else {
                rows[i.rank - 1] += i.file + i.rank + ' ';
            }
        }
        return rows.reverse();
    };
    Chess.prototype.printBoardBlack = function () {
        var rows = ['', '', '', '', '', '', '', ''];
        for (var _i = 0, _a = this._board; _i < _a.length; _i++) {
            var i = _a[_i];
            if (i.piece) {
                rows[i.rank - 1] =
                    ' ' + i.piece.getFirstLetter() + ' ' + rows[i.rank - 1];
            }
            else {
                rows[i.rank - 1] = i.file + i.rank + ' ' + rows[i.rank - 1];
            }
        }
        return rows.reverse();
    };
    Chess.prototype.getSquare = function (name) {
        var sq = this._board.find(function (s) { return s.squareName === name; });
        return sq ? sq.getSquare : null;
    };
    Chess.prototype.getSquareById = function (id) {
        var sq = this._board.find(function (s) { return s.id === id; });
        return sq ? sq.getSquare : null;
    };
    Chess.prototype.movePiece = function (startSquare, endSquare, pieceName) {
        var _a, _b, _c;
        if (startSquare === endSquare) {
            console.log('Same starting and ending square');
            console.log("Didn't move the piece");
            return;
        }
        var startSq = this.getSquare(startSquare);
        var endSq = this.getSquare(endSquare);
        var isLegalMoveOrPiece;
        if (((_a = startSq === null || startSq === void 0 ? void 0 : startSq.piece) === null || _a === void 0 ? void 0 : _a.getColor) !== chess.checkTurn()) {
            console.log('Wrong players turn');
            return;
        }
        if (startSq !== null && startSq.piece !== null && endSq !== null) {
            //check if pawn is about to promote
            if (((startSq === null || startSq === void 0 ? void 0 : startSq.rank) === 7 &&
                (endSq === null || endSq === void 0 ? void 0 : endSq.rank) === 8 &&
                ((_b = startSq.piece) === null || _b === void 0 ? void 0 : _b.getName) === ChessPieces.PAWN_WHITE) ||
                ((startSq === null || startSq === void 0 ? void 0 : startSq.rank) === 2 &&
                    (endSq === null || endSq === void 0 ? void 0 : endSq.rank) === 1 &&
                    ((_c = startSq.piece) === null || _c === void 0 ? void 0 : _c.getName) === ChessPieces.PAWN_BLACK)) {
                isLegalMoveOrPiece = startSq.piece.move(startSq, endSq, pieceName);
            }
            else {
                isLegalMoveOrPiece = startSq.piece.move(startSq, endSq);
            }
            //is only an object if promoting a pawn, if not object this runs
            if (typeof isLegalMoveOrPiece !== 'object' && isLegalMoveOrPiece) {
                endSq.piece = startSq.piece;
                this.addMove(startSq, endSq);
                startSq.piece = null;
                return;
            }
            //promotion logic
            else if (isLegalMoveOrPiece) {
                endSq.piece = isLegalMoveOrPiece;
                this.addMove(startSq, endSq);
                startSq.piece = null;
                return;
            }
        }
        console.log('Starting square is invalid, no piece to be found or ending square is invalid, inputted invalid move or a piece is on the way');
    };
    Chess.prototype.addMove = function (startSq, endSq) {
        if (startSq.piece) {
            this._moves.push({
                startSquare: startSq,
                endSquare: endSq,
                startSquarePiece: startSq.piece,
            });
        }
        this.incrementMoveNumber();
    };
    Chess.prototype.algebraicNotation = function () {
        var returnArray = [];
        var s = '';
        for (var _i = 0, _a = this.getMoves; _i < _a.length; _i++) {
            var move = _a[_i];
            var startSqPiece = move.startSquare.piece &&
                move.startSquare.piece.getFirstLetter().toLowerCase() !== 'p'
                ? move.startSquare.piece.getFirstLetter()
                : '';
            var piece = move.endSquare.piece
                ? move.endSquare.piece.getFirstLetter()
                : '';
            s =
                s +
                    "".concat(startSqPiece).concat(move.startSquare.getSquareName, " ").concat(move.endSquare.getSquareName).concat(piece.toUpperCase());
            returnArray = returnArray.concat(s);
            s = '';
        }
        return returnArray;
    };
    //initialization or promoting
    Chess.prototype.putPiece = function (square, piece) {
        var sq = this.getSquare(square);
        if (sq) {
            sq.piece = piece;
            console.log("".concat(piece.getName, " put on ").concat(square));
        }
        else {
            console.log('No square found');
        }
    };
    Chess.prototype.fen = function (fen) {
        var _a;
        var tokens = fen.split(/\s+/);
        var pieces = tokens[0].split('/');
        for (var i = 0; i < 8; i++) {
            var str = pieces[i];
            if (str.length !== 8) {
                //todo non-starting position
            }
            else if (str !== '8') {
                for (var j = i * 8, k = 0; j < i * 8 + 8; j++, k++) {
                    var piece = Chess.fenPieces(str[k]);
                    var sq = (_a = this.getSquareById(j)) === null || _a === void 0 ? void 0 : _a.squareName;
                    if (sq && piece !== null) {
                        this.putPiece(sq, piece);
                    }
                }
            }
        }
    };
    Chess.fenPieces = function (s) {
        switch (s) {
            case 'p':
                return new Pawn(Color.white);
            case 'P':
                return new Pawn(Color.black);
            case 'n':
                return new Knight(Color.white);
            case 'N':
                return new Knight(Color.black);
            case 'b':
                return new Bishop(Color.white);
            case 'B':
                return new Bishop(Color.black);
            case 'r':
                return new Rook(Color.white);
            case 'R':
                return new Rook(Color.black);
            case 'q':
                return new Queen(Color.white);
            case 'Q':
                return new Queen(Color.black);
            case 'k':
                return new King(Color.white);
            case 'K':
                return new King(Color.black);
            default:
                return null;
        }
    };
    Chess.prototype.startingPosition = function () {
        this.fen(Chess.STARTING_POSITION);
    };
    Chess.findFileIndex = function (s) {
        return Chess.files.findIndex(function (e) { return e === s; });
    };
    Chess.files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    Chess.STARTING_POSITION = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    return Chess;
}());
var Piece = /** @class */ (function () {
    function Piece(color) {
        this.name = '';
        this.color = color;
    }
    Piece.prototype.move = function (startSq, endSq, piece) {
        return false;
    };
    Piece.prototype.getFirstLetter = function () {
        return this.name[0];
    };
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
    Piece.capturable = function (startSq, endSq) {
        var _a, _b;
        if (((_a = startSq.piece) === null || _a === void 0 ? void 0 : _a.color) === ((_b = endSq.piece) === null || _b === void 0 ? void 0 : _b.color) && endSq.piece !== null) {
            console.log('Cannot capture own piece or capture on an empty square');
            return false;
        }
        console.log('capturable');
        return true;
    };
    //for bishop and queen
    Piece.isDiagonal = function (startSq, endSq) {
        var fileDiff = Math.abs(Chess.findFileIndex(startSq.file) - Chess.findFileIndex(endSq.file));
        var rankDiff = Math.abs(startSq.rank - endSq.rank);
        if (fileDiff === rankDiff && fileDiff === 1) {
            return true;
        }
        if (fileDiff === rankDiff) {
            return Piece.diagonalPiecesOnTheWay(startSq, endSq, rankDiff);
        }
        return false;
    };
    Piece.diagonalPiecesOnTheWay = function (startSq, endSq, rankDiff) {
        var index = 0;
        var startFileIndex = Chess.findFileIndex(startSq.file);
        var endFileIndex = Chess.findFileIndex(endSq.file);
        //find index of the next square to test
        if (startSq.rank < endSq.rank && startFileIndex > endFileIndex) {
            index = 7;
        }
        else if (startSq.rank < endSq.rank && startFileIndex < endFileIndex) {
            index = 9;
        }
        else if (startSq.rank > endSq.rank && startFileIndex > endFileIndex) {
            index = -9;
        }
        else
            index = -7;
        var startSqIndex = startSq.id + index;
        for (var i = 0; i < rankDiff; i++, startSqIndex += index) {
            var sq = chess.getSquareById(startSqIndex);
            if (sq === endSq)
                break;
            else if (!sq)
                return false;
            else if (sq.piece !== null) {
                console.log('Piece on the way');
                return false;
            }
        }
        console.log('No diagonal pieces on the way');
        return true;
    };
    return Piece;
}());
var Pawn = /** @class */ (function (_super) {
    __extends(Pawn, _super);
    function Pawn(color) {
        var _this = _super.call(this) || this;
        _this.color = color;
        if (color === Color.white) {
            _this.name = ChessPieces.PAWN_WHITE;
        }
        else {
            _this.name = ChessPieces.PAWN_BLACK;
        }
        return _this;
    }
    Pawn.prototype.move = function (startSq, endSq, piece) {
        if (this.color === Color.white) {
            return Pawn.moveWhite(startSq, endSq, piece);
        }
        else if (this.color === Color.black) {
            return Pawn.moveBlack(startSq, endSq, piece);
        }
        else {
            console.log('Piece not found');
            return false;
        }
    };
    Pawn.moveWhite = function (startSq, endSq, pieceToPromote) {
        if (startSq.rank === 8) {
            console.log('How is white pawn on rank 8???');
            return false;
        }
        else if (endSq.rank < startSq.rank) {
            console.log("Pawns can't go backwards!");
            return false;
        }
        //Moving diagonally logic
        else if (startSq.file !== endSq.file) {
            return Pawn.capture(startSq, endSq, pieceToPromote);
        }
        //startSquare logic
        else if (startSq.rank === 2) {
            return Pawn.startingSquareMove(startSq, endSq);
        }
        //lastrow promote and possibly capture
        else if (startSq.rank === 7 && endSq.rank === 8 && endSq.piece === null) {
            {
                if (pieceToPromote) {
                    return Pawn.promotion(pieceToPromote, Color.white);
                }
                else {
                    console.log('No piece to promote to');
                    return false;
                }
            }
        }
        //move one square forwards
        else if (endSq.rank - startSq.rank === 1 && endSq.piece === null) {
            console.log('Moved pawn one square forward');
            return true;
        }
        //no valid moves
        return false;
    };
    Pawn.moveBlack = function (startSq, endSq, pieceToPromote) {
        if (startSq.rank === 1) {
            console.log('How is black pawn on rank 8???');
            return false;
        }
        else if (endSq.rank > startSq.rank) {
            console.log("Pawns can't go backwards!");
            return false;
        }
        //Moving diagonally logic
        else if (startSq.file !== endSq.file) {
            return Pawn.capture(startSq, endSq, pieceToPromote);
        }
        //startSquare logic
        else if (startSq.rank === 7) {
            return Pawn.startingSquareMove(startSq, endSq);
        }
        //lastrow promote and possibly capture
        else if (startSq.rank === 2 && endSq.rank === 1 && endSq.piece === null) {
            {
                if (pieceToPromote) {
                    return Pawn.promotion(pieceToPromote, Color.white);
                }
                else {
                    console.log('No piece to promote to');
                    return false;
                }
            }
        }
        //move one square forwards
        else if (startSq.rank - endSq.rank === 1 && endSq.piece === null) {
            console.log('Moved pawn one square forward');
            return true;
        }
        //no valid moves
        return false;
    };
    Pawn.capture = function (startSq, endSq, pieceToPromote) {
        var _a, _b, _c, _d, _e;
        var secondToLastRank = ((_a = startSq.piece) === null || _a === void 0 ? void 0 : _a.getColor) === Color.white ? 7 : 2;
        var promotionRank = ((_b = startSq.piece) === null || _b === void 0 ? void 0 : _b.getColor) === Color.white ? 8 : 1;
        var EpStartSqRank = ((_c = startSq.piece) === null || _c === void 0 ? void 0 : _c.getColor) === Color.white ? 5 : 4;
        var EpEndSqRank = ((_d = startSq.piece) === null || _d === void 0 ? void 0 : _d.getColor) === Color.white ? 6 : 3;
        var color = ((_e = startSq.piece) === null || _e === void 0 ? void 0 : _e.getColor) === Color.white ? Color.black : null;
        //check if it's your own piece
        if (Piece.capturable(startSq, endSq)) {
            //check if it's en passant
            if (startSq.rank === EpStartSqRank &&
                endSq.rank === EpEndSqRank &&
                Pawn.compareFiles(startSq.file, endSq.file)) {
                return this.enPassant(EpStartSqRank);
            }
            //check if it's a promotion
            //enpassant is checked before this cause endSq.piece is null on enpassant
            else if (endSq.piece === null) {
                console.log("Pawns can't go diagonally without capturing a piece");
                return false;
            }
            //check if it's a promotion
            else if (startSq.rank === secondToLastRank &&
                endSq.rank === promotionRank &&
                Pawn.compareFiles(startSq.file, endSq.file) &&
                pieceToPromote &&
                color) {
                return Pawn.promotion(pieceToPromote, color);
            }
            //normal capture logic
            else if (Math.abs(startSq.rank - endSq.rank) === 1 &&
                Pawn.compareFiles(startSq.file, endSq.file)) {
                console.log('Captured a piece with pawn on ' + endSq.squareName);
                return true;
            }
        }
        console.log('Error capturing with pawn');
        return false;
    };
    Pawn.startingSquareMove = function (startSq, endSq) {
        var _a, _b;
        if (Math.abs(startSq.rank - endSq.rank) === 1 && endSq.piece === null) {
            console.log('Moved pawn one square forward');
            return true;
        }
        else if (endSq.rank - startSq.rank === 2 &&
            endSq.piece === null &&
            ((_a = chess.getSquare("".concat(startSq.file).concat(startSq.rank + 1))) === null || _a === void 0 ? void 0 : _a.piece) === null) {
            console.log('Moved and sniped white pawn');
            return true;
        }
        else if (startSq.rank - endSq.rank === 2 &&
            endSq.piece === null &&
            ((_b = chess.getSquare("".concat(startSq.file).concat(startSq.rank - 1))) === null || _b === void 0 ? void 0 : _b.piece) === null) {
            console.log('Moved and sniped black pawn');
            return true;
        }
        else {
            console.log('Error moving the pawn from starting square');
            return false;
        }
    };
    Pawn.promotion = function (piece, color) {
        switch (piece) {
            case 'PAWN':
                console.log('Promote to pawn');
                return new Pawn(color);
            case 'KNIGHT':
                console.log('Promote to knight');
                return new Knight(color);
            case 'BISHOP':
                console.log('Promote to bishop');
                return new Bishop(color);
            case 'ROOK':
                console.log('Promote to rook');
                return new Rook(color);
            case 'QUEEN':
                console.log('Promote to queen');
                return new Queen(color);
            case 'KING':
                console.log("Can't promote to king!");
                throw new Error();
            default:
                console.log('Error');
                throw new Error();
        }
    };
    Pawn.enPassant = function (EpStartSqRank) {
        var latestMove = chess.latestMove();
        if ((EpStartSqRank === 5 &&
            (latestMove === null || latestMove === void 0 ? void 0 : latestMove.startSquare.rank) === 7 &&
            latestMove.endSquare.rank === 5) ||
            (EpStartSqRank === 4 &&
                (latestMove === null || latestMove === void 0 ? void 0 : latestMove.startSquare.rank) === 2 &&
                latestMove.endSquare.rank === 4)) {
            console.log('En passant successful');
            latestMove.endSquare.piece = null;
            return true;
        }
        else {
            console.log('En passant unsuccessful');
            return false;
        }
    };
    Pawn.compareFiles = function (startSqFile, endSqFile) {
        return (Math.abs(Chess.findFileIndex(startSqFile) - Chess.findFileIndex(endSqFile)) === 1);
    };
    return Pawn;
}(Piece));
var Knight = /** @class */ (function (_super) {
    __extends(Knight, _super);
    function Knight(color) {
        var _this = _super.call(this) || this;
        _this.color = color;
        if (color === Color.white) {
            _this.name = ChessPieces.KNIGHT_WHITE;
        }
        else
            _this.name = ChessPieces.KNIGHT_BLACK;
        return _this;
    }
    Knight.prototype.move = function (startSq, endSq) {
        if (startSq.color === endSq.color) {
            console.log('Knight cannot move to same color square');
            return false;
        }
        else if (startSq.piece &&
            Knight.compareFilesAndRanks(startSq, endSq) &&
            endSq.piece === null) {
            return true;
        }
        else if (startSq.piece &&
            Knight.compareFilesAndRanks(startSq, endSq) &&
            endSq.piece !== null) {
            return Knight.capture(startSq, endSq);
        }
        else
            return false;
    };
    Knight.capture = function (startSq, endSq) {
        if (Piece.capturable(startSq, endSq)) {
            return true;
        }
        else {
            console.log('knight capture failed');
            return false;
        }
    };
    Knight.compareFilesAndRanks = function (startSq, endSq) {
        return ((Math.abs(Chess.findFileIndex(startSq.file) - Chess.findFileIndex(endSq.file)) === 1 &&
            Math.abs(startSq.rank - endSq.rank) === 2) ||
            (Math.abs(Chess.findFileIndex(startSq.file) - Chess.findFileIndex(endSq.file)) === 2 &&
                Math.abs(startSq.rank - endSq.rank) === 1));
    };
    return Knight;
}(Piece));
var Bishop = /** @class */ (function (_super) {
    __extends(Bishop, _super);
    function Bishop(color) {
        var _this = _super.call(this) || this;
        _this.color = color;
        if (color === Color.white) {
            _this.name = ChessPieces.BISHOP_WHITE;
        }
        else {
            _this.name = ChessPieces.BISHOP_BLACK;
        }
        return _this;
    }
    Bishop.prototype.move = function (startSq, endSq) {
        if (startSq.color !== endSq.color) {
            console.log('Bishop cannot move to a different color square');
            return false;
        }
        if (startSq.piece && endSq.piece !== null) {
            if (Piece.capturable(startSq, endSq)) {
                return Piece.isDiagonal(startSq, endSq);
            }
            else {
                console.log('bishop capture failed');
                return false;
            }
        }
        return Piece.isDiagonal(startSq, endSq);
    };
    return Bishop;
}(Piece));
var Rook = /** @class */ (function (_super) {
    __extends(Rook, _super);
    function Rook(color) {
        var _this = _super.call(this) || this;
        _this.color = color;
        if (color === Color.white) {
            _this.name = ChessPieces.ROOK_WHITE;
        }
        else {
            _this.name = ChessPieces.ROOK_BLACK;
        }
        return _this;
    }
    Rook.prototype.move = function (startSq, endSq) {
        if (startSq.color !== endSq.color) {
            console.log('rooks cannot move to a different color square');
            return false;
        }
        if (startSq.piece && endSq.piece !== null) {
            if (Piece.capturable(startSq, endSq)) {
                return Piece.isDiagonal(startSq, endSq);
            }
            else {
                console.log('bishop capture failed');
                return false;
            }
        }
        return true;
    };
    return Rook;
}(Piece));
var Queen = /** @class */ (function (_super) {
    __extends(Queen, _super);
    function Queen(color) {
        var _this = _super.call(this) || this;
        _this.color = color;
        if (color === Color.white) {
            _this.name = ChessPieces.QUEEN_WHITE;
        }
        else {
            _this.name = ChessPieces.QUEEN_BLACK;
        }
        return _this;
    }
    Queen.prototype.move = function (startSq, endSq) {
        return true;
    };
    return Queen;
}(Piece));
var King = /** @class */ (function (_super) {
    __extends(King, _super);
    function King(color) {
        var _this = _super.call(this) || this;
        _this.color = color;
        if (color === Color.white) {
            _this.name = ChessPieces.KING_WHITE;
        }
        else {
            _this.name = ChessPieces.KING_BLACK;
        }
        return _this;
    }
    King.prototype.move = function (startSq, endSq) {
        return true;
    };
    King.moveWhite = function () {
        console.log('Move white');
        return false;
    };
    King.moveBlack = function () {
        console.log('Move black');
        return false;
    };
    return King;
}(Piece));
var chess = new Chess();
chess.putPiece('e7', new Pawn(Color.white));
chess.putPiece('e8', new King(Color.black));
chess.putPiece('d8', new King(Color.black));
console.log(chess.printBoardWhite());
chess.fen(Chess.STARTING_POSITION);
// enpassant test
chess.movePiece('e2', 'e4');
chess.movePiece('d7', 'd5');
chess.movePiece('e4', 'd5');
chess.movePiece('g8', 'f6');
chess.movePiece('g1', 'e2');
chess.movePiece('c7', 'c5');
chess.movePiece('d5', 'c6');
// knights test
chess.movePiece('b1', 'c3');
chess.movePiece('b8', 'c6');
chess.movePiece('c3', 'd5');
chess.movePiece('c6', 'e5');
chess.movePiece('d5', 'f6');
chess.movePiece('e5', 'f3');
chess.movePiece('f3', 'd2');
// bishop test
chess.movePiece('e2', 'e4');
chess.movePiece('e7', 'e5');
chess.movePiece('f1', 'c4');
chess.movePiece('a7', 'a5');
chess.movePiece('d2', 'd3');
chess.movePiece('a5', 'a4');
chess.movePiece('a5', 'a4');
chess.movePiece('c4', 'd5');
chess.movePiece('h7', 'h6');
chess.movePiece('d5', 'c6');
chess.movePiece('h6', 'h5');
chess.movePiece('c6', 'a4');
console.log(chess.printBoardWhite());
console.log(chess.getMoves);
console.log(chess.getTurnNumber);
console.log(chess.algebraicNotation());
console.log(chess.latestMove());
console.log(chess.printBoardWhite());
console.log(chess.getBoard);
console.log(chess.startingPosition());
console.log(chess.printBoardWhite());
