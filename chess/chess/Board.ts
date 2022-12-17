import King from './King';
import Square from './Square';
import { Color } from './types';

export default class Board {
	private _board: Square[];
	static files: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

	constructor(board: Square[]) {
		this._board = board;
	}

	get getBoard() {
		return this._board;
	}

	getSquare(name: string): Square | null {
		let sq = this._board.find((s: Square) => s.getSquareName === name);
		return sq ? sq.getSquare : null;
	}

	getSquareById(id: number): Square | null {
		let sq = this._board.find((s: Square) => s.getId === id);
		return sq ? sq.getSquare : null;
	}

	getSquareAndName(name?: string, id?: number): string {
		if (id) {
			let sq = this.getSquareById(id);
			if (sq) return sq.getSquareName;
		}
		if (name) {
			let sq = this.getSquare(name);
			if (sq) return sq.getSquareName;
		}
		throw new Error('No square found by id or name');
	}

	findKing(color: Color) {
		return this._board.find((sq) => sq.getPiece instanceof King);
	}

	static findFileIndex(s: string): number {
		return Board.files.findIndex((e) => e === s);
	}
}
