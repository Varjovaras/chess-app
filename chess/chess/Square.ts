import Piece from './Piece';
import { Color } from './types';

export default class Square {
	private _file: string;
	private _rank: number;
	private _squareName: string;
	private _color: Color;
	private _piece?: Piece | null;
	private _id: number;

	constructor(
		file: string,
		rank: number,
		squareName: string,
		color: Color,
		id: number,
		piece?: Piece | null
	) {
		this._file = file;
		this._rank = rank;
		this._squareName = squareName;
		this._color = color;
		this._piece = piece;
		this._id = id;
	}

	get getSquare() {
		return this;
	}

	get getFile() {
		return this._file;
	}

	get getRank() {
		return this._rank;
	}

	get getSquareName() {
		return this._squareName;
	}

	get getId() {
		return this._id;
	}

	get getColor() {
		return this._color;
	}

	get getPiece() {
		return this._piece;
	}

	setPiece(piece: Piece | null) {
		this._piece = piece;
	}

	setSquareForPiece(sq: Square) {
		this._piece?.setSquare(sq);
	}

	static omitPiece(s: Square) {
		let sq = s;
		sq._piece = null;
		return sq;
	}

	isSquareOccupied(): boolean {
		return this._piece === null;
	}
}
