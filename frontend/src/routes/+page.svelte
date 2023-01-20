<script lang="ts">
	import ChessSquare from '../components/ChessSquare.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	export let board = data.board.getBoardWhite();
	console.log(board);
	let startSq = '';
	let endSq = '';
	let lastMove: { startSq: string; endSq: string } = { startSq, endSq };
</script>

<div class="">
	<h1 class="">chessing</h1>
	<div class="grid grid-cols-8">
		{#each board as row}
			{#each row as sq}
				<ChessSquare {sq} />
			{/each}
		{/each}
	</div>
	<!-- <form class="box-border flex flex-col w-80">
		<div>move</div>

		<input
			bind:value={startSq}
			placeholder="enter start square"
			class="flex justify-between top-1"
		/>
		<input bind:value={endSq} placeholder="enter end square" />
		<button type="submit">Submit</button>
	</form> -->
	<p>Last move: {lastMove.startSq} {lastMove.endSq}</p>
</div>

<style lang="postcss">
	:global(html) {
		background-color: #8c92ac;
	}
</style>
