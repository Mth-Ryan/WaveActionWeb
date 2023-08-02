<script lang="ts">
	import { Info } from "lucide-svelte";
	import Dropdown from "./Dropdown.svelte";

    export let align: "left" | "right" = "left";
    export let iconSize: number = 24;

    export let title: string;
</script>

<Dropdown right={align == "right"}>
    <div slot="button">
        <Info size={iconSize} />
    </div>

    <div slot="body" class="relative w-[40ch] p-2 overflow-hidden">
        <h3 class="text-slate-200 text-md font-bold mb-3">Info - {title}</h3>
        <p class="text-slate-400 text-sm text-justify">
            <slot />
        </p>
    </div>
</Dropdown>
