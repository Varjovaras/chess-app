import express from 'express';
import Chess from '../../chess/chess';

const router = express.Router();
const chess = new Chess();

router.get('/', (_req, res) => {
	console.log('trolled');
	res.send('problem ?');
});

router.get('/moves', (_req, res) => {
	const chess = new Chess();
	// const moves: string = _req.body;
	res.send(chess);
});

router.post('/', (_req, res) => {
	res.send('Saving a diary!');
});

export default router;
