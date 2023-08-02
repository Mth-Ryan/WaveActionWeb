<script lang="ts">
    import SpotlightGradient from '$lib/assets/spotlight-gradient.svg'; 
	import { X } from "lucide-svelte";
	import { onMount } from 'svelte';

    export let open = false;
    export let showHeader = true;
    export let disableEscExit = false;
    export let disableOutClickExit = false;

    let enableScroll = () => {};
    let disableScroll = () => {};

    onMount(() => {
        if (!disableEscExit) {
            document.addEventListener("keydown", (e) => {
                if (open && e.key == "Escape")
                    open = false;
            });
        }

        disableScroll = () => { document.body.style.overflow = "hidden"; };
        enableScroll = () => { document.body.style.overflow = "auto"; };
    })

    $: {
        open ? disableScroll() : enableScroll();
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div 
    class="invisible fixed left-0 top-0 z-40 w-full h-full backdrop-blur-sm transition-opacity opacity-0"
    class:open
    on:click={() => { if (!disableOutClickExit) open = false; }}>
</div>

<div 
    id="dialog"
    class="invisible fixed top-1/2 left-1/2 z-50 transition-opacity opacity-0 max-w-md p-4 bg-slate-800 rounded-lg border border-slate-700 overflow-hidden"
    class:open
>
    <div class="hidden justify-between" class:showHeader>
        <slot name="header" />
        <button on:click={() => { open = false; }}>
            <X />
        </button>
    </div>

    <slot name="body" />


    <img class="absolute z-negative min-w-full right-0 bottom-0" src={SpotlightGradient} alt="">
</div>

<style lang="postcss">
	.open {
        @apply visible;
        @apply opacity-100;
	}

    .showHeader {
        @apply flex;
    }

    #dialog {
        width: 90%;
        transform: translate(-50%, -50%);
    }
</style>

