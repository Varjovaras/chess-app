<script lang="ts">
	import type { Square } from '../../../backend/chess/square';

	export let sq: Square;
	// console.log(sq);
</script>
<div class="text-sky-200">
	{#if sq.getPiece !== null && sq.getColor === "WHITE"}
		<p class=" text-center bg-amber-600">
			{sq.getPiece?.getFirstLetter()}
		</p>
	{:else if sq.getPiece !== null && sq.getColor === "BLACK"}
		<p class=" text-center bg-slate-600">
			{sq.getPiece?.getFirstLetter()}
		</p>
	{:else if sq.getPiece === null && sq.getColor === "WHITE"}
	<p class=" text-center bg-amber-600">
		{sq.getSquareName}

	</p>
	{:else} 
	<p class=" text-center bg-slate-600">
		{sq.getSquareName}

	</p>
	{/if}


</div>
