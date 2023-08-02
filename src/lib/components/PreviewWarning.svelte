<script lang="ts">
	import { onMount } from "svelte";
	import Dialog from "./Dialog.svelte";
	import { AlertCircle } from "lucide-svelte";
	import Checkbox from "./Checkbox.svelte";

    const supressOpt = "supressPreviewWarn";
    export let open = false;

    let checked = false;

    const getSupressOption = () => {
        return window.localStorage.getItem(supressOpt) == "true";
    };

    const setSupressOption = () => {
        window.localStorage.setItem(supressOpt, "true");
    };

    const handleContinue = () => {
        if (checked)
            setSupressOption();

        open = false;
    };

    onMount(() => {
        open = !getSupressOption();
    });
</script>

<Dialog bind:open disableEscExit={true} disableOutClickExit={true}>
    <div slot="header" class="flex gap-3 text-slate-100">
        <AlertCircle />
        <h3 class="text-md font-bold">Warning</h3>
    </div>

    <div slot="body" class="mt-6">
        <p>
            This site is in preview stage. This means that most pages and features
            are not finished or created yet. If you want to see the progress of this project,
            check the <a href="https://github.com/Mth-Ryan/WaveAction">Github Repo</a>.
        </p>

        <div class="mt-6 flex justify-between items-center">
            <div class="text-sm flex gap-2 items-center">
                <Checkbox bind:checked />
                <span class="text-slate-500">I don't want to see this again</span>
            </div>
            <button class="elevated-button" on:click={handleContinue}>
                Continue
            </button>
        </div>
    </div>
</Dialog>