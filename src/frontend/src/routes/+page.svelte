<script lang="ts">
	import ChessSquare from '../components/ChessSquare.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	export let board = data.board.getBoardWhite();
	let startSq = '';
	let endSq = '';
	let lastMove = { startSq: startSq, endSq: endSq };
	let moves: string[] = [];
	const handleChess = () => {
		data.chess.move(startSq, endSq);
		board = data.chess.getBoard.getBoardWhite();
		lastMove.startSq = startSq;
		lastMove.endSq = endSq;
		moves = data.chess.getMovesAsString();
		startSq = '';
		endSq = '';
		console.log(moves);
	};
	const resetChess = () => {
		data.chess.startingPosition();
		board = data.chess.getBoard.getBoardWhite();
		startSq = '';
		endSq = '';
		console.log('Chess resetted');
	};
</script>

<div class="grid h-full place-items-center">
	<h1 class="font-bold text-2xl ">Chess</h1>
	<div class="grid grid-cols-8 w-80 align-start">
		{#each board as row}
			{#each row as sq}
				<ChessSquare {sq} />
			{/each}
		{/each}
		<div>
			<form class="box-border flex flex-col w-80" on:submit|preventDefault={handleChess}>
				<p class="my-1">move</p>

				<input
					bind:value={startSq}
					placeholder="enter start square"
					class="flex justify-between my-1"
				/>
				<input bind:value={endSq} placeholder="enter end square" class="my-2 w-full" />
				<button type="submit" class="my-1 border-4 border-slate-800">Submit</button>
				<button type="button" on:click={resetChess} class="my-1 border-4 border-slate-800 w-full"
					>Reset game</button
				>
				<p class="my-1">
					Moves of the game:

					{#each moves as move}
						{' '}{move}
					{/each}
				</p>
				<p class="my-1">
					Last move: {lastMove.startSq}
					{lastMove.endSq}
				</p>
			</form>
		</div>
	</div>
</div>

<style lang="postcss">
	:global(html) {
		background-color: gray;
	}
</style>
