<script lang="ts">
	import type { Square } from '../../../backend/chess/square';

	export let sq: Square;
	// console.log(sq);
</script>

<div class="text-blue-200">
	{#if sq.getPiece !== null}
		<p class="my-1">
			{sq.getPiece?.getFirstLetter()}
		</p>
	{:else}
		<p class="my-1">
			{sq.getSquareName}
		</p>
	{/if}
</div>
