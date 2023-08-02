<script lang="ts">
	import Logo from '$lib/assets/wave-action-logo.svg';
	import { IndentityContext } from '$lib/contexts/identityContext';
	import { Image, LayoutDashboard, Library, ListMinus, LogOut, PanelLeftClose, PanelLeftOpen, User } from 'lucide-svelte';
	import Dialog from './Dialog.svelte';
	import LogoutDialog from './LogoutDialog.svelte';

    let userData = IndentityContext.getUserPublicDataClient();

    export let mainLink = "dashboard";
    export let dialog = false;

    export let open = true;
    let showButton  = false;
    $: showButton = !open;
</script>

<LogoutDialog bind:open={dialog} />

<button class="hidden fixed top-2 left-2 p-2 bg-slate-800 opacity-30 hover:opacity-100 rounded-md z-50" class:showButton on:click={() => { open = true; }}>
    <PanelLeftOpen />
</button>

<div class="hidden flex-col justify-between w-80 bg-slate-800 bg-opacity-30 p-4" class:open>
    <div class="flex justify-between items-center">
        <img class="h-10" src={Logo} alt="Wave Action" />
        <button class="text-slate-700 p-2 rounded-md hover:bg-slate-800 hover:text-slate-300" on:click={() => { open = false; }}>
            <PanelLeftClose />
        </button>
    </div>

    <nav class="flex flex-col gap-3 mt-10 mb-auto">
        <a
            id={mainLink == "dashboard" ? "active-link" : "dashboard"}
            href="/dashboard"
            class="nav-link"
        >
            <LayoutDashboard size=20 />
            Dashboard
        </a>
        <a
            id={mainLink == "posts" ? "active-link" : "posts"}
            href="/dashboard/posts"
            class="nav-link"
        >
            <ListMinus size=20 />
            Posts
        </a>
        <a
            id={mainLink == "threads" ? "active-link" : "threads"}
            href="/dashboard/threads"
            class="nav-link"
        >
            <Library size=20 />
            Threads
        </a>
        <a
            id={mainLink == "images" ? "active-link" : "images"}
            href="/dashboard/images"
            class="nav-link"
        >
            <Image size=20 />
            Images
        </a>
        <a
            id={mainLink == "profile" ? "active-link" : "profile"}
            href="/dashboard/profile"
            class="nav-link"
        >
            <User size=20 />
            Your Profile
        </a>
    </nav>

    <div>
        <div class="w-full bg-slate-800 bg-opacity-30 rounded-md p-2 flex justify-between items-center">
            <div class="flex gap-2 items-center">
                <div class="w-10 h-10 overflow-hidden rounded-full bg-slate-800">
                    <div class="w-full h-full bg-center bg-cover aspect-square" style={`background-image: url('${userData ? userData.avatarUrl : ""}');`}>
                    </div>
                </div>
                <span class="max-w-[12ch] overflow-hidden whitespace-nowrap text-ellipsis">
                    {userData ? userData.fullName : ""}
                </span>
            </div>

            <div class="flex gap-1">
                <button on:click={() => { dialog = true; }} class="text-slate-400 p-2 rounded-md hover:text-slate-200 hover:bg-slate-700 hover:bg-opacity-30">
                    <LogOut size=16 />
                </button>
            </div>
        </div>
    </div>
</div>

<style lang="postcss">
    .open {
        @apply flex;
    }

    .showButton {
        @apply block;
    }

    .nav-link {
        @apply flex;
        @apply gap-2;
        @apply items-center;
        @apply text-slate-400;
        @apply rounded-md;
        @apply w-full;
        @apply py-2;
        @apply px-3;
        @apply hover:text-slate-300;
        @apply hover:bg-slate-800;
        @apply hover:bg-opacity-20;
    }

    #active-link {
        @apply text-slate-200;
        @apply bg-slate-800;
        @apply bg-opacity-30;
    }
</style>