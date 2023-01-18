import Chess from '../../../backend/chess/chess';
import type { PageLoad } from './$types';

export const load = (({ params }) => {
	const chess = new Chess();
	return { chess: chess, board: chess.getBoard };
}) satisfies PageLoad;
