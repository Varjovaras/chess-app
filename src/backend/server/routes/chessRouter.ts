import express from 'express';
import Chess from '../../chess/chess';
import { Square } from '../../chess/board/square';
// import { stringify } from 'flatted';

const router = express.Router();
const chess = new Chess();

router.get('/', (_req, res) => {
	chess.startingPosition();
	let squares = chess.getBoard.getBoard;
	squares = removeSquareFromPiece(squares);
	console.log(squares);
	res.send(squares);
});

router.post('/', (_req, res) => {
	res.send('Saving a diary!');
});

export default router;

const removeSquareFromPiece = (squares: Square[]) => {
	squares.forEach((sq) => {
		if (sq.getPiece) {
			delete sq.getPiece['square'];
		}
	});
	return squares;
};
