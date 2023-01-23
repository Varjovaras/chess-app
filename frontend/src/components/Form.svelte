<script lang="ts">
	let startSq = '';
	let endSq = '';
	let lastMove: { startSq: string; endSq: string } = { startSq, endSq };
</script>

<div class="w-full">
	<form class="box-border flex flex-col w-80">
		<p>move</p>

		<input
			bind:value={startSq}
			placeholder="enter start square"
			class="flex justify-between top-1"
		/>
		<input bind:value={endSq} placeholder="enter end square" />
		<button type="submit">Submit</button>
	</form>
	<p>Last move: {lastMove.startSq} {lastMove.endSq}</p>
</div>
