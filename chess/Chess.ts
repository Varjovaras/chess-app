enum Color {
    black = 'BLACK',
    white = 'WHITE',
}


enum ChessPieces {
    Pawn = 'PAWN',
    Knight = 'KNIGHT',
    Bishop = 'BISHOP',
    Rook = 'ROOK',
    Queen = 'QUEEN',
    King = 'KING',
}


class Square {
    file: string;
    rank: number;
    square: string;
    color: Color;
    piece: Piece | null;
    id: number;

    constructor(
        file: string,
        rank: number,
        square: string,
        color: Color,
        id: number,
        piece: Piece | null
    ) {
        this.file = file;
        this.rank = rank;
        this.square = square;
        this.color = color;
        this.piece = piece;
        this.id = id;
    }

    get getSquare() {
        return this;
    }
}

class Chess {
    private _board: Square[] = new Array(64);

    static files: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    static DEFAULT_POSITION =
        'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

    constructor() {
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
                this._board[i] = new Square(
                    Chess.files[currentFile],
                    rank,

                    `${Chess.files[currentFile]}${rank}`,
                    firstSquare,
                    i,
                    null
                );
            } else {
                this._board[i] = new Square(
                    Chess.files[currentFile],
                    rank,
                    `${Chess.files[currentFile]}${rank}`,
                    secondSquare,
                    i,
                    null
                );
            }
        }
    }

    get getBoard() {
        return this._board;
    }

    printBoardWhite() {
        let rows = ['', '', '', '', '', '', '', ''];

        for (const i of this._board) {
            if (i.piece) {
                rows[i.rank - 1] += i.piece.getFirstLetter + '  ';
            } else {
                rows[i.rank - 1] += i.file + i.rank + ' ';
            }
        }
        return rows.reverse();
    }

    printBoardBlack() {
        let rows = ['', '', '', '', '', '', '', ''];

        for (const i of this._board) {
            if (i.piece) {
                rows[i.rank - 1] =
                    ' ' + i.piece.getFirstLetter + ' ' + rows[i.rank - 1];
            } else {
                rows[i.rank - 1] = i.file + i.rank + ' ' + rows[i.rank - 1];
            }
        }

        return rows.reverse();
    }


    getSquare(name: string): Square | null {
        let sq = this._board.find((s: Square) => s.square === name);
        return sq ? sq.getSquare : null;
    }

    /**
     * siirrä piece, ehkä kaappaa
     *tyhjennä ruutu
     */
    movePiece(startSquare: string, endSquare: string): void {
        if (startSquare === endSquare) {
            console.log('Same starting and ending square');
            return;
        }
        let startSq = this.getSquare(startSquare);
        let endSq = this.getSquare(endSquare);

        if (startSq && startSq.piece !== null && endSq !== null) {
            switch (startSq.piece.getName) {
                case ChessPieces.Pawn:
                    console.log('Pawn');
                    break;
                case ChessPieces.Knight:
                    console.log('Knight');
                    break;
                case ChessPieces.Bishop:
                    console.log('Bishop');
                    break;
                case ChessPieces.Rook:
                    console.log('Rook');
                    break;
                case ChessPieces.Queen:
                    console.log('Queen');
                    break;
                case ChessPieces.King:
                    console.log('King');
                    break;
                default:
                    console.log('Error');
                    return;
            }
            if (startSq.piece.move(startSq, endSq)) {
                console.log("Moved and trolled");
            } else {
                console.log("Moving failed");
            }

        }
    }

    capturePiece()
        :
        void {
        /**
         *
         *
         */
    }

    //initialization or promoting
    putPiece(square
                 :
                 string, piece
                 :
                 Piece
    ) {
        let sq = this.getSquare(square);
        if (sq) {
            sq.piece = piece;
            console.log(sq.piece);
            console.log(`${piece.getName} put on ${square}`);
        } else {
            console.log('No square found');
        }
    }

//     static fen(fen: string): string[] {
//         let tokens = fen.split(/\s+/);
//         let pieces = tokens[0].split('/');
//         return pieces;
//     }

    startingPosition() {
//         let tokens = Chess.fen(Chess.DEFAULT_POSITION);
//         return tokens;
    }
}

class Piece {
    protected name: string;
    protected color: Color | undefined

    constructor(color?: Color) {
        this.name = '';
        this.color = color;

    }

    move(startSq: Square, endSquare: Square): boolean {
        return false;
    }

    get getFirstLetter() {
        return this.name[0];
    }

    get getName() {
        return this.name;
    }


}

class Pawn extends Piece {
    readonly color: Color;

    constructor(color: Color) {
        super();
        this.name = ChessPieces.Pawn;
        this.color = color;
    }

    move(startSq: Square, endSquare: Square): boolean {
        if (this.color === Color.white) {
            this.moveWhite()
        } else if (this.color === Color.black) {
            this.moveBlack()

        } else {
            throw new Error("Incorrect color")
        }

        return true;

    }

    moveWhite() {
        console.log("Move white");
    }

    moveBlack() {
        console.log("Move black");

    }
}

class Knight extends Piece {
    readonly color: Color;

    constructor(color: Color) {
        super();
        this.name = ChessPieces.Knight;
        this.color = color;
    }

    move(startSq: Square, endSquare: Square): boolean {
        return true;
    }

    moveWhite() {
        console.log("Move white");
    }

    moveBlack() {
        console.log("Move black");

    }
}

class Bishop extends Piece {
    readonly color: Color;

    constructor(color: Color) {
        super();
        this.name = ChessPieces.Bishop;
        this.color = color;
    }

    move(): boolean {
        return true;
    }

    moveWhite() {
        console.log("Move white");
    }

    moveBlack() {
        console.log("Move black");

    }
}

class Rook extends Piece {
    readonly color: Color;

    constructor(color: Color) {
        super();
        this.name = ChessPieces.Rook;
        this.color = color;
    }

    move(startSq: Square, endSquare: Square): boolean {
        return true;
    }
}

class Queen extends Piece {
    readonly color: Color;

    constructor(color: Color) {
        super();
        this.name = ChessPieces.Queen;
        this.color = color;
    }

    move(startSq: Square, endSquare: Square): boolean {
        return true;
    }
}

class King extends Piece {
    readonly color: Color;

    constructor(color: Color) {
        super();
        this.name = ChessPieces.King;
        this.color = color;
    }

    move(startSq: Square, endSquare: Square): boolean {
        return true;
    }
}

const chess = new Chess();
// console.log(chess.getBoard);
// chess.putPiece('f7', new Queen());
// console.log(chess.getSquare('f4'));
// console.log(chess.getSquare('e5'));

// console.log(chess.getSquare('e5')?.trolled());
chess.putPiece('e4', new Pawn(Color.white));
// chess.putPiece('e5', new Piece(Color.white));


chess.movePiece("e4", "e5");
// console.log(chess.getSquare('e5'));

// chess.movePiece('e4', 'f7');

// console.log(chess.printBoardWhite());
// console.log(chess.printBoardBlack());

// console.log(chess.get())
// console.log(chess.startingPosition());
