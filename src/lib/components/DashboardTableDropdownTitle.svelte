<script lang="ts">
	import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-svelte";
    import Dropdown from "./Dropdown.svelte";

    let open = false;

    export let order: "asc" | "desc" | "none";
    export let option: string;
    export let current: string;

    const handdleChange = (o: "asc" | "desc") => {
        order = o;
        current = option;
        open = false;
    }

    export let orderOption: { current: string, order: "asc" | "desc" | "none" };
    $: {
        if (option != current)
            order = "none";
        else
            orderOption = { current, order };
    }
</script>

<Dropdown bind:open>
    <div slot="button" class="flex gap-2 text-slate-500 items-center px-2 py-1 hover:bg-slate-800 rounded" class:open>
        <slot />
        {#if order == "asc"}
            <ArrowUp size=14 />
        {:else if order == "desc"}
            <ArrowDown size=16 />
        {:else}
            <ChevronsUpDown size=14 />
        {/if}
    </div>

    <div
        slot="body"
        class="flex flex-col gap-1 w-20"
    >
        <span class="w-full text-center border-b border-slate-700 text-slate-500">Order</span>
        <button
            id={order == "asc" ? "active" : "asc"}
            on:click={() => { handdleChange("asc") }}
        >
            <ArrowUp size=16 />
            Asc
        </button>

        <button 
            id={order == "desc" ? "active" : "desc"}
            on:click={() => { handdleChange("desc") }}
        >
            <ArrowDown size=16 />
            Desc
        </button>
    </div>
</Dropdown>

<style lang="postcss">
    .open {
        @apply bg-slate-800;
    }

    button {
        @apply flex;
        @apply gap-1;
        @apply items-center;
        @apply hover:text-slate-200;
        @apply rounded;
        @apply px-2;
    }

    #active {
        @apply bg-slate-700;
        @apply text-slate-200;
    }
</style>