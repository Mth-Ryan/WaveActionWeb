<script lang="ts">
    import SpotlightGradient from '$lib/assets/spotlight-gradient.svg'; 
    import { X, BookOpen, Info } from 'lucide-svelte';
	import { onMount } from 'svelte';

    export let open = false;

    let enableScroll = () => {};
    let disableScroll = () => {};

    onMount(() => {
        document.addEventListener("keydown", (e) => {
            if (open && e.key == "Escape")
                open = false;
        });

        disableScroll = () => { document.body.style.overflow = "hidden"; };
        enableScroll = () => { document.body.style.overflow = "auto"; };
    })

    $: {
        open ? disableScroll() : enableScroll();
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div 
    class="invisible fixed left-0 top-0 z-30 w-screen h-screen backdrop-blur-sm transition-opacity opacity-0"
    class:open
    on:click={() => { open = false; }}>
</div>

<aside class="invisible fixed z-40 right-0 w-72 h-full pe-4 ps-6 bg-slate-900 border-s border-slate-800 transition-opacity opacity-0 overflow-hidden" class:open>
    <div class="py-6 flex justify-end">
        <button on:click={() => { open = false; }}>
            <X />
        </button>
    </div>

    <nav class="flex flex-col gap-6">
        <div>
            <span class="list-label">
                <BookOpen /> Contents
            </span>
            <ul >
                <li><a href="/posts">Posts</a></li>
                <li><a href="/threads">Threads</a></li>
            </ul>
        </div>


        <div>
            <span class="list-label">
                <Info /> About
            </span>
            <ul>
                <li><a href="/about/site">About this Site</a></li>
                <li><a href="/about/authors">About the Authors</a></li>
                <li><a href="/about/project">About the Project</a></li>
                <li><a href="/about/licence">About the Licence</a></li>
            </ul>
        </div>
    </nav>

    <img class="absolute z-negative min-w-full right-0 bottom-0" src={SpotlightGradient} alt="">
</aside>

<style lang="postcss">
	.open {
        @apply visible;
        @apply opacity-100;
	}

    .list-label {
        @apply flex;
        @apply gap-2;
        @apply mb-2;
        @apply text-slate-200;
        @apply font-bold;
    }

    ul {
        @apply ms-3;
    }

    li {
        @apply px-4;
        @apply py-1;
        @apply border-s-2;
        @apply border-slate-800;
    }

    a {
        @apply text-slate-300;
    }

    a:visited {
        @apply text-slate-300;
    }
</style>