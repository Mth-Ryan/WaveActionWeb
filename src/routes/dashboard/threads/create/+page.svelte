<script lang="ts">
	import InfoBox from "$lib/components/InfoBox.svelte";
</script>

<svelte:head>
    <title>Threads - Dashboard</title>
</svelte:head>

<div>
    <div class="mb-10 flex justify-between items-center">
        <div>
            <h1 class="text-2xl text-slate-100">Threads</h1>
            <p class="mt-2 text-slate-400">
                Create a new thread for your posts
            </p>
        </div>

        <div class="text-slate-500">
            <InfoBox title="Threads" align="right">
                A Thread is a collection of posts sorted by their publication date.
                Its purpose is to organize a series of posts on a single subject,
                so that it can be addressed multiple times over time.
                You can create a thread and associate it with a post when creating it.
                Every post needs a Thread, if you think that a post will not have a logical continuation,
                create generic threads to contain these dicidents.
            </InfoBox>
        </div>
    </div>
</div>
