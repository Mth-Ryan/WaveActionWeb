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

<header class="py-4 md:py-6 flex items-center justify-between ">
    <a href="/home">
        <img class="h-10" src={Logo} alt="Wave Action" />
    </a>


    <div class="flex gap-6 text-slate-200 text-xl">
        <button on:click={() => { searchMenu = true; }}>
            <Search />
        </button>
        <button on:click={() => { sidebar = true; }}>
            <Menu />
        </button>
    </div>
</header>