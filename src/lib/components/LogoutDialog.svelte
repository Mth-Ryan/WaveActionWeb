<script lang="ts">
	import Dialog from "./Dialog.svelte";

    export let open = false;
</script>

<Dialog bind:open={open}>
    <div slot="header">
        <h3 class="text-md text-slate-200 font-bold">Log-out</h3>
    </div>

    <div slot="body">
        <p class="my-6">
            You really want to logout?
            <strong>All your local backups will be lost</strong>,
            verify if you finish all your work.
        </p>
        <div class="w-full flex justify-end gap-4">
            <button on:click={() => { open = false; }} class="outlined-button">
                Cancel
            </button>

            <a href="/access/logout">
                <button class="elevated-button">
                    Continue
                </button>
            </a>
        </div>
    </div>
</Dialog>