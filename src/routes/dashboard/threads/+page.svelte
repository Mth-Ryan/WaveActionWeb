<script lang="ts">
	import Dropdown from "$lib/components/Dropdown.svelte";
	import InfoBox from "$lib/components/InfoBox.svelte";
	import ThreadsTable from "$lib/components/ThreadsTable.svelte";
	import type { PaginatedData } from "$lib/models/PaginatedData";
	import type { ThreadShow } from "$lib/models/ThreadShow";

    let page: PaginatedData<ThreadShow> = {
        page: 0,
        pageSize: 20,
        itemsTotalCount: 2,
        pagesTotalCount: 1,
        data: [
            {
                title: "First Thread",
                description: "",
                slugTitle: "first-thread",
                updatedAt: new Date(2023, 3, 5),
            },
            {
                title: "First Thread",
                description: "",
                slugTitle: "first-thread",
                updatedAt: new Date(2023, 3, 4),
            }
        ]
    };

    let nextPage: number;
    let nextPageSize: number;
    let filterValue: string;
    let orderOption: { current: string, order: "asc" | "desc" } = {
        order: "desc",
        current: "updatedAt"
    };
</script>

<svelte:head>
    <title>Threads - Dashboard</title>
</svelte:head>

<div>
    <div class="mb-10 flex justify-between items-center">
        <div>
            <h1 class="text-2xl text-slate-100">Threads</h1>
            <p class="mt-2 text-slate-400">
                Here a list of all your published threads.

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

    <ThreadsTable 
        bind:pageData={page} 
        bind:filter={filterValue}
        bind:nextPage
        bind:nextPageSize
        bind:orderOption
    />
</div>
