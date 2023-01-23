<script lang="ts">
	import Form from '../components/Form.svelte';
	import ChessSquare from '../components/ChessSquare.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	export let board = data.board.getBoardWhite();
	console.log(board);
</script>

<div class="flex flex-wrap ">
	<h1 class="w-full font-bold text-2xl">chessing</h1>
	<div class="grid grid-cols-8 w-80">
		{#each board as row}
			{#each row as sq}
				<ChessSquare {sq} />
			{/each}
		{/each}
	</div>
	<Form />
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.500);
	}
</style>
