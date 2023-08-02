<script lang="ts">
	import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-svelte";

    let options = [10, 20, 30, 40, 50];

    export let page: number;
    export let pageCount: number;
    export let pageSize: number;

    export let nextPage: number;
    export let nextPageSize: number;

    $: {
        nextPage = page;
        nextPageSize = pageSize;
    };
</script>

<div class="flex gap-8 items-center">
    <div class="flex items-center gap-2">
        <span class="text-slate-500">Rows per page</span>
        <select bind:value={nextPageSize}>
            {#each options as option}
                <option value={option}>
                    {option}
                </option>
            {/each}
        </select>
    </div>

    <span class="text-slate-500">
        Page {page + 1} of {pageCount}
    </span>

    <div class="flex gap-2">
        <button disabled={page < 10} on:click={() => { nextPage - 10; }}>
            <ChevronsLeft size=16 />
        </button>
        <button disabled={page == 0} on:click={() => { nextPage - 1; }}>
            <ChevronLeft size=16 />
        </button>
        <button disabled={pageCount < page + 2} on:click={() => { nextPage + 1; }}>
            <ChevronRight size=16 />
        </button>
        <button disabled={pageCount < page + 11} on:click={() => { nextPage + 10; }}>
            <ChevronsRight size=16 />
        </button>
    </div>
</div>


<style lang="postcss">
    button {
        @apply flex;
        @apply items-center;
        @apply justify-center;
        @apply w-8;
        @apply h-8;
        @apply bg-slate-800;
        @apply border-slate-700;
        @apply text-slate-400;
        @apply bg-opacity-30;
        @apply border;
        @apply rounded-md;
        @apply hover:text-slate-200;
        @apply hover:bg-opacity-100;
        @apply disabled:text-slate-800;
        @apply disabled:hover:bg-opacity-30;
    }

    select {
        @apply px-2;
        @apply h-8;
        @apply bg-transparent;
        @apply border;
        @apply rounded-md;
        @apply border-slate-700;
        @apply bg-slate-800;
        @apply bg-opacity-30;
        @apply text-slate-400;
        @apply hover:text-slate-200;
        @apply hover:bg-opacity-100;
    }
</style>