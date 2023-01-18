<script lang="ts">
import Chess from '../../../backend/chess/chess';
import type { PageData } from './$types';
export let data: PageData;
export let board = data.board.printBoardWhite();
</script>

<h1>Welcome to SvelteKit</h1>
<div>
{#each board as sq}
    <div>{sq}</div>
{/each}
</div>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
 