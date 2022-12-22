"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChessPieces = exports.Color = void 0;
var Color;
(function (Color) {
    Color["black"] = "BLACK";
    Color["white"] = "WHITE";
})(Color = exports.Color || (exports.Color = {}));
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
})(ChessPieces = exports.ChessPieces || (exports.ChessPieces = {}));
