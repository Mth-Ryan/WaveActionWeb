<script lang="ts">
    export let open = false;
    export let right = false;

    function handleMenuToggle() {
        if (!open) {
            open = true
            document.body.addEventListener("click", handleMenuClose);
        } else {
            handleMenuClose();
        }
	}

	function handleMenuClose() {
		open = false
		document.body.removeEventListener("click", handleMenuClose);
	}
</script>

<div class="relative inline-block">
    <button on:click|stopPropagation={handleMenuToggle}>
        <slot name="button" />
    </button>

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="hidden opacity-0 transition-opacity absolute p-1 border rounded border-slate-700 bg-slate-800 z-40" class:right class:open on:click|stopPropagation={()=>{}}>
        <slot name="body" />
    </div>
</div>

<style lang="postcss">
    .open {
        @apply block;
        @apply opacity-100;
    }

    .right {
        @apply right-0;
    }
</style>