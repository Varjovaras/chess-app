import { ChessPieces, ColorType, Move } from '../../types/types';
import { Board } from './board/board';
import { Square } from './board/square';
import { enPassantHelper } from './moveHelpers';
import { Pawn } from './pieces/pawn';
import { Piece } from './pieces/piece';

export default class Check {
    private _board: Board;
    private _turnColor: ColorType;
    private _latestMove?: Move;

    constructor(turn: ColorType, board: Board, move?: Move) {
        this._turnColor = turn;
        this._board = board;
        this._latestMove = move;
    }

    get getTurnColor() {
        return this._turnColor;
    }

    get getLatestMove() {
        return this._latestMove;
    }



    isPositionCheck(startSq: Square, endSq: Square, pieceName?: string): boolean {


        let tempBoard: Board = this.makeTemporaryBoard();
        let startSqTempBoard = tempBoard.getSquare(startSq.getSquareName);
        let endSqTempBoard = tempBoard.getSquare(endSq.getSquareName);
        if (!startSqTempBoard || !endSqTempBoard) return false;
        this.movePieceOnTemporaryBoard(startSqTempBoard, endSqTempBoard, tempBoard, pieceName);
        // if (newBoard.whiteCheck()) return false;
        return startSq.getPiece?.getColor === "WHITE" ? !tempBoard.isWhiteInCheck() : !tempBoard.isBlackInCheck()
    }


    private movePieceOnTemporaryBoard(
        startSq: Square,
        endSq: Square,
        board: Board,
        pieceName?: string
    ): void {
        let isLegalMove: boolean = false;
        let promotedPiece: Piece | boolean = false;
        let startSqPiece = startSq.getPiece;
        if (!startSqPiece || !endSq) return;
        if (startSqPiece.getColor !== this.getTurnColor) {
            console.log('Wrong players turn');
            return;
        }
        let move = this.getLatestMove;

        if (startSqPiece instanceof Pawn) {
            if (
                (pieceName &&
                    startSq?.getRank === 7 &&
                    endSq?.getRank === 8 &&
                    startSqPiece.getName === ChessPieces.PAWN_WHITE) ||
                (pieceName &&
                    startSq?.getRank === 2 &&
                    endSq?.getRank === 1 &&
                    startSqPiece.getName === ChessPieces.PAWN_BLACK)
            ) {
                promotedPiece = startSqPiece.promote(startSq, endSq, board, pieceName);
            } else if (move && enPassantHelper(startSq, endSq, move)) {
                isLegalMove = startSqPiece.move(startSq, endSq, board, move);
                board.getSquareById(move.endSq.getSquare.getId)?.setPiece(null);
            } else isLegalMove = startSqPiece.move(startSq, endSq, board);
        } else isLegalMove = startSqPiece.move(startSq, endSq, board);

        if (promotedPiece instanceof Piece) {
            endSq.setPiece(promotedPiece);
            endSq.setSquareForPiece(endSq);
            this.handleTempPieces(startSq, endSq);
            startSq.setPiece(null);
            return;
        }

        if (isLegalMove) {
            this.handleTempPieces(startSq, endSq);
            return;
        }

        throw new Error(
            'Starting square is invalid, no piece to be found or ending square is invalid, inputted invalid move or a piece is on the way'
        );
    }

    private handleTempPieces(startSq: Square, endSq: Square): void {
        let startSqPiece = startSq.getPiece;
        endSq.setPiece(startSqPiece!);
        let endSquareToPiece = endSq;
        endSq.setSquareForPiece(endSquareToPiece);
        startSq.setPiece(null);
    }

    private makeTemporaryBoard(): Board {
        let tempBoard: Square[] = [];

        for (let i = 0; i < 64; i++) {
            let sq = this._board.getSquareById(i);
            if (!sq) {
                throw new Error('No 64 squares');
            }
            let tempSq = new Square(
                sq.getFile,
                sq.getRank,
                sq.getSquareName,
                sq.getColor,
                sq.getId,
                sq.getPiece
            );
            tempBoard.push(tempSq);
        }

        let newBoard = new Board();
        newBoard.setBoard(tempBoard);
        return newBoard;
    }
}
