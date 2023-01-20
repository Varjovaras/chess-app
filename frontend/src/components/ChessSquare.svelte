<script lang="ts">
	import type { Square } from '../../../backend/chess/square';

	export let sq: Square;
	// console.log(sq);
</script>

{#if sq.getPiece !== null}
	<div class="">
		{sq.getPiece?.getFirstLetter()}
	</div>
{:else}
	<div>
		{sq.getSquareName}
	</div>
{/if}
