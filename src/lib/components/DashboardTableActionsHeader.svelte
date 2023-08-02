<script lang="ts">
	import { ArrowRight, Plus } from "lucide-svelte";
	import type { FormEventHandler } from "svelte/elements";

    export let objectTitle: string;
    export let createHref: string;
    export let filterValue: string | null;


    const handleFilterSubmit = (e: SubmitEvent) => {
        const data = new FormData(e.target as HTMLFormElement);
        filterValue = data.get("q") as string | null;
    };
</script>

<div class="flex justify-between items-center">
    <form on:submit|preventDefault={handleFilterSubmit} class="group">
        <input type="search" name="q" placeholder={`Filter ${objectTitle}s...`}>
        <button type="submit" class="invisible text-slate-700 group-hover:visible">
            <ArrowRight size=16 />
        </button>
    </form>

    <a href={createHref}>
        <button class="create-button">
            <Plus size=16 />
            Create {objectTitle}
        </button>
    </a>
</div>


<style lang="postcss">
    form {
        @apply flex;
        @apply gap-2;
        @apply items-center;
        @apply h-8;
        @apply px-2;
        @apply bg-slate-800;
        @apply bg-opacity-30;
        @apply border;
        @apply border-slate-700;
        @apply rounded-md;
    }

    input {
        @apply bg-transparent;
        @apply outline-none;
        @apply border-none;
        @apply placeholder:text-slate-700;
    }

    .create-button {
        @apply flex;
        @apply gap-1;
        @apply items-center;
        @apply border;
        @apply border-slate-700;
        @apply px-2;
        @apply h-8;
        @apply rounded-md;
        @apply bg-slate-800;
        @apply bg-opacity-30;
        @apply text-slate-400;
    }
</style>