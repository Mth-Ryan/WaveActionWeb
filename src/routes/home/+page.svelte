<script lang="ts">
	import { ArrowRight, Search } from "lucide-svelte";
    import SpotlightGradient from '$lib/assets/spotlight-gradient.svg';
	import type { ThreadShow } from "$lib/models/ThreadShow";
	import type { PostShow } from "$lib/models/PostShow";
	import PreviewWarning from "$lib/components/PreviewWarning.svelte";

    let dateFormatOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    };

    export let data: { featuredThread: ThreadShow, posts: PostShow[] };
</script>

<svelte:head>
    <title>Home - Wave Action</title>
</svelte:head>

<PreviewWarning />

<div class="flex flex-col gap-14">
    <section class="flex flex-col md:grid grid-cols-2 gap-14">
        <div class="flex flex-col justify-between">
            <div>
                <h1 class="font-light text-slate-100 text-4xl">Welcome</h1>
                <p class="mt-4">
                    Developer-Driven Content ahead, proceed with caution, or not. <br />
                </p>
            </div>

            <div class="mt-6">
                <p class="mb-2">Search what you want to read:</p>
                <form action="/search" method="get" class="group flex items-center gap-2 bg-slate-800 bg-opacity-30 p-2 rounded-lg border border-slate-700">
                    <label class="flex gap-4 w-full">
                        <Search class="text-slate-700" />
                        <input name="q" class="bg-transparent w-full border-none outline-none placeholder:text-slate-700" placeholder="Search" type="search">
                    </label>
                    <button type="submit" class="invisible group-hover:visible">
                        <ArrowRight class="text-slate-500" />
                    </button>
                </form>
            </div>
        </div>

        <a href="/threads/Wave-Compiler" class="featured-thread relative overflow-hidden flex p-4 text-slate-300 visited:text-slate-300 bg-slate-800 bg-opacity-50 border border-slate-700 rounded-xl">
            <div class="flex flex-col justify-between">
                <span class="text-slate-700 mb-4">Featured Thread</span>

                <div>
                    <h2 class="text-2xl text-slate-200 mb-3">{data.featuredThread.title}</h2>
                    <p class="text-sm">{data.featuredThread.description}</p>
                </div>

                <span class="text-slate-700 mt-6">Last update: {data.featuredThread.updatedAt.toLocaleString("en-US", dateFormatOptions)}</span>
            </div>

            <img class="absolute z-negative min-w-full right-0 bottom-0" src={SpotlightGradient} alt="">
        </a>
    </section>

    <section>
        <div class="flex flex-wrap gap-8">
            {#each data.posts as post}
            <a href={`/posts/${post.slugTitle}`} class="post bg-slate-800 bg-opacity-60 text-slate-300 visited:text-slate-300 rounded-xl border border-slate-700 overflow-hidden flex-[1_32ch] flex flex-col justify-between">
                <div>
                    <div class="w-full bg-slate-700 bg-opacity-50">
                        <div class="aspect-[21/9] bg-cover bg-center" style={`background-image: url('${post.thumbUrl}');`}>
                        </div>
                    </div>

                    <div class="p-4">
                        <div class="mb-3">
                            <span class="bg-slate-700 rounded-full px-2 py-1 text-xs">{post.thread.title}</span>
                        </div>
                        <h3 class="text-slate-100">
                            {post.title}
                        </h3>
                    </div>
                </div>

                <div class="px-4 pb-4">
                    <span class="text-slate-700">{post.createdAt.toLocaleDateString("en-US", dateFormatOptions)}</span>
                </div>
            </a>
            {/each}
        </div>

        <div class="flex items-center justify-center mt-14">
            <a href="/posts">
                <button class="elevated-button">
                    See all our posts
                </button>
            </a>
        </div>
    </section>
</div>

<style lang="postcss">
    .featured-thread:hover {
		box-shadow: 0 0 0.725rem theme(colors.slate.800);
    }

    .post:hover {
		box-shadow: 0 0 0.725rem theme(colors.slate.800);
    }
</style>