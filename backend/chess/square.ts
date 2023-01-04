import { Piece } from './Piece';
import { ColorType } from './types';

export class Square {
	private _file: string;
	private _rank: number;
	private _squareName: string;
	private _color: ColorType;
	private _id: number;
	private _piece?: Piece | null;

	constructor(
		file: string,
		rank: number,
		squareName: string,
		color: ColorType,
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

	setFile(file: string) {
		this._file = file;
	}

	setRank(rank: number) {
		this._rank = rank;
	}

	setSquareName(squareName: string) {
		this._squareName = squareName;
	}

	setColor(color: ColorType) {
		this._color = color;
	}

	setId(id: number) {
		this._id = id;
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

	removePiece() {
		this._piece = null;
	}
}
