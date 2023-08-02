<script lang="ts">
    export let errors: string[];
</script>


{#if errors}
    <ul class="mb-2 text-red-900 text-sm">
        {#each errors as error }
            <li>{error}</li>
        {/each}
    </ul>
{/if}