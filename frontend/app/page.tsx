import Chess from '/Users/kristjan/Documents/Github/chess/chess/Chess';

const chess = new Chess();
chess.startingPosition();

const Board = () => {
	return (
		<div>
			{chess.printBoardWhite().map((i) => (
				<p>{i}</p>
			))}
		</div>
	);
};
const page = () => {
	return (
		<div>
			<h1>Chessing</h1>
			<Board />
		</div>
	);
};

export default page;

//#252525
