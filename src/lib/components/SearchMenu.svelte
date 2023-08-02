<script lang="ts">
	import { Search, ArrowRight } from "lucide-svelte";
    import Dialog from "./Dialog.svelte";

    export let open = false;
</script>

<Dialog bind:open={open} showHeader={false}>
    <span slot="header">
        Search
    </span>

    <div slot="body">
        <form action="/search" method="get" class="group flex items-center gap-2">
            <label class="flex gap-4 w-full">
                <Search class="text-slate-700" />
                <input name="q" class="bg-transparent w-full border-none outline-none placeholder:text-slate-700" placeholder="Search" type="search">
            </label>
            <button type="submit" class="invisible group-hover:visible">
                <ArrowRight class="text-slate-500" />
            </button>
        </form>
    </div>
</Dialog>