<script lang="ts">
	import { X } from "lucide-svelte";

    export let message = "Error";
    export let open = true;
</script>

<div class="hidden p-3 bg-red-800 bg-opacity-10 rounded-md border border-red-900 text-red-900 text-center" class:open>
    <div class="flex justify-end">
        <button class="text-red-900" on:click={() => { open = false; }}>
            <X size=16 />
        </button>
    </div>
    {message}
</div>

<style lang="postcss">
    .open {
        @apply block;
    }
</style>