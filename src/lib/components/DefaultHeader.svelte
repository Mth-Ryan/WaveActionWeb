<script>
	import { Menu, Search } from "lucide-svelte";
	import SearchMenu from "./SearchMenu.svelte";
    import Sidebar from "./Sidebar.svelte";
	import Logo from '$lib/assets/wave-action-logo.svg';


	export let sidebar = false;
	export let searchMenu = false;
</script>

<SearchMenu bind:open={searchMenu} />
<Sidebar bind:open={sidebar} />

<header class="py-4 md:py-6 flex md:grid grid-cols-[9rem,auto,9rem] items-center justify-between ">
    <a href="/home">
        <img class="h-10" src={Logo} alt="Wave Action" />
    </a>

    <nav class="hidden md:flex gap-4 text-xl font-light justify-center">
        <a class="text-slate-200 visited:text-slate-200 px-3 py-1 rounded-md hover:bg-slate-900" href="/home">
            Home
        </a>
        <a class="text-slate-200 visited:text-slate-200 px-3 py-1 rounded-md hover:bg-slate-900" href="/home/posts">
            Posts
        </a>
        <a class="text-slate-200 visited:text-slate-200 px-3 py-1 rounded-md hover:bg-slate-900" href="/home/threads">
            Threads
        </a>
        <a class="text-slate-200 visited:text-slate-200 px-3 py-1 rounded-md hover:bg-slate-900" href="/home/about">
            About
        </a>
    </nav>

    <div class="flex gap-6 text-slate-200 justify-end text-xl">
        <button on:click={() => { searchMenu = true; }}>
            <Search />
        </button>
        <button class="md:hidden" on:click={() => { sidebar = true; }}>
            <Menu />
        </button>
    </div>
</header>