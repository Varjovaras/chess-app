import Chess from '../../../backend/chess/chess';
import type { PageLoad } from './$types';

export const load = (() => {
	const chess = new Chess();
	chess.startingPosition();
	return { chess: chess, board: chess.getBoard };
}) satisfies PageLoad;
