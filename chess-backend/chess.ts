enum Color {
    black = 'BLACK',
    white = 'WHITE',
    none = 'NONE', //for no piece squares
}

interface square {
    rank: number;
    file: string;
    square: string;
    color: Color;
    piece: piece;
    id: number;
};

interface piece {
    name: Pieces;
    color: Color;
}


class Chess {
    private _board: square[] = new Array(64);

    static DEFAULT_POSITION =
        'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

    constructor() {
        let files: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        let firstSquare = Color.black;
        let secondSquare = Color.white;
        let rank = 1;

        for (
            let i = 0, currentFile = 0;
            i < this._board.length;
            i++, currentFile++
        ) {
            if (currentFile === 8) {
                currentFile = 0;
                rank++;
                let temp: Color = firstSquare;
                firstSquare = secondSquare;
                secondSquare = temp;
            }

            if (i % 2 === 0) {
                this._board[i] = {
                    file: files[currentFile],
                    rank: rank,
                    color: firstSquare,
                    square: `${files[currentFile]}${rank}`,
                    piece: {name: Pieces.empty, color: Color.none},
                    id: i,
                };
            } else {
                this._board[i] = {
                    file: files[currentFile],
                    rank: rank,
                    color: secondSquare,
                    square: `${files[currentFile]}${rank}`,
                    piece: {name: Pieces.empty, color: Color.none},
                    id: i,
                };
            }
        }
    }

    get(){
        return this._board;
    }


    printBoardWhite() {
        let rows = ['', '', '', '', '', '', '', ''];

        for (const i of this._board) {
            if (i.piece.name !== "EMPTY") {
                rows[i.rank - 1] +=  i.piece.name[0] + '  ';
            }
            else {
                rows[i.rank - 1] += i.file + i.rank + ' ';
            }
        }
        return rows.reverse();
    }

    printBoardBlack() {
        let rows = ['', '', '', '', '', '', '', ''];

        for (const i of this._board) {
            if (i.piece.name !== "EMPTY") {
                rows[i.rank - 1] =" "  + i.piece.name[0] + " " + rows[i.rank - 1];
            } else {
                rows[i.rank - 1] = i.file + i.rank + ' ' + rows[i.rank - 1];
            }
        }

        return rows.reverse();
    }

    startingPosition() {
        const fen = Chess.DEFAULT_POSITION;
        let tokens = fen.split(/\s+/);
        let pieces = tokens[0].split('/');
        return pieces;
    }

    movePiece(square: square): piece | null {
        /**
         *
         */
        return null;
    }

    putPiece(square: string, piece: Pieces) {
        let sq = this._board.find((s: square) => s.square === square);
        if (sq) {
            sq.piece.name = piece;
            console.log(`${piece} put on ${square}`);
        } else {
            console.log('No square found');
        }
    }

    fen(fen: string) {
        let tokens = fen.split(/\s+/);
        let pieces = tokens[0].split('/');
        return pieces;
    }
}

enum Pieces {
    pawn = 'PAWN',
    knight = 'KNIGHT',
    bishop = 'BISHOP',
    rook = 'ROOK',
    queen = 'QUEEN',
    king = 'KING',
    empty = 'EMPTY',
}

class Piece {
    position: string = "2";

}

class Pawn extends Piece {

}

class Knight extends Piece {

}

class Bishop extends Piece {

}

class Rook extends Piece {

}

class Queen extends Piece {

}

class King extends Piece {

}

const chess = new Chess();
// console.log(chess._board);
chess.putPiece('f7', Pieces.queen);
chess.putPiece('e4', Pieces.pawn);

console.log(chess.printBoardWhite());
console.log(chess.printBoardBlack());

console.log(chess.get())
// console.log(chess.startingPosition());
