<script lang="ts">
	import Chess from '../../../backend/chess/chess';
	import ChessSquare from '../components/ChessSquare.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	export let board = data.board.getBoardWhite();
	let startSq = "";
	let endSq = "";
	let lastMove = {startSq: startSq, endSq: endSq};
	const handleChess = () => {
		console.log("123")
		data.chess.move(startSq,endSq);
		board = data.chess.getBoard.getBoardWhite();
		 startSq = "";
		 endSq = "";	
		 }
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
				<button type="submit">Submit</button>
			</form>
			<p class="">Last move: {lastMove.startSq} {lastMove.endSq}</p>
		</div>
		</div>
</div>

<style lang="postcss">
	:global(html) {
		background-color: gray;
	}
  </style>