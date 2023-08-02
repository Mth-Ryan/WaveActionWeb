<script lang="ts">
  import SpotlightGradient from '$lib/assets/spotlight-gradient.svg'; 
	import type { PaginatedData } from "$lib/models/PaginatedData";
	import type { ThreadShow } from "$lib/models/ThreadShow";
	import formatDate from "$lib/utils/formatDate";
	import { Edit, Trash2 } from "lucide-svelte";
	import DashboardTablePaginator from './DashboardTablePaginator.svelte';
	import DashboardTableActionsHeader from './DashboardTableActionsHeader.svelte';
	import DashboardTableDropdownTitle from './DashboardTableDropdownTitle.svelte';

    export let pageData: PaginatedData<ThreadShow>;

    export let nextPage: number;
    export let nextPageSize: number;
    export let filter: string;
    export let orderOption: { current: string, order: "asc" | "desc" | "none" };
</script>

<div>
    <div class="mb-3">
        <DashboardTableActionsHeader
            bind:filterValue={filter}
            objectTitle={"Thread"}
            createHref={"/dashboard/threads/create"}
        />
    </div>

    <div class="relative border bg-slate-800 bg-opacity-30 overflow-hidden border-slate-700 rounded-md">
        <div class="w-full">
            <div class="table-grid border-b border-slate-700 text-left px-6 py-1 text-slate-500">
                <DashboardTableDropdownTitle 
                    option="title"
                    order={orderOption.order}
                    current={orderOption.current}
                    bind:orderOption
                >
                    Title
                </DashboardTableDropdownTitle>
                <DashboardTableDropdownTitle
                    option="updatedAt"
                    order={orderOption.order}
                    current={orderOption.current}
                    bind:orderOption
                >
                    Last Update
                </DashboardTableDropdownTitle>
                <span>Actions</span>
            </div>

            <div>
                {#each pageData.data as thread}
                    <div class="table-grid border-t first:border-t-0 border-slate-700 px-6 py-2">
                        <div class="w-full overflow-hidden text-ellipsis whitespace-nowrap">
                            <a href={`/dashboard/threads/${thread.slugTitle}`} class="text-slate-300 visited:text-slate-300">{thread.title}</a>
                        </div>

                        <div>
                            <span>{formatDate(thread.updatedAt)}</span>
                        </div>

                        <div class="flex gap-2">
                            <a href={`/dashboard/threads/edit/${thread.slugTitle}`} class="actions-link">
                                <Edit size=18 />
                            </a>
                            <a href={`/dashboard/threads/delete/${thread.slugTitle}`} class="actions-link">
                                <Trash2 size=18 />
                            </a>
                        </div>
                    </div>
                {/each}
            </div>
        </div>


        <img class="absolute z-negative min-w-full right-0 bottom-0" src={SpotlightGradient} alt="">
    </div>

    <div class="mt-3 flex justify-end">
        <DashboardTablePaginator
            page={pageData.page}
            pageCount={pageData.pagesTotalCount}
            pageSize={pageData.pageSize}
            bind:nextPage
            bind:nextPageSize
        />
    </div>
</div>

<style lang="postcss">
    .table-grid {
        @apply grid;
        @apply gap-x-4;
        @apply grid-cols-[minmax(30ch,_auto)_16ch_4rem]
    }

    .actions-link {
        @apply text-slate-400;
        @apply visited:text-slate-400;
        @apply hover:bg-slate-800;
        @apply hover:text-slate-200;
        @apply p-1;
        @apply rounded-md;
    }
</style>