<script lang="ts">
    import { formatDate } from "$lib/utils";
    import type { Post, ExternalPost } from "$lib/Types";
    export let data: { posts: Post[] };

    function groupByYear(list: Post[]): Record<string, Post[]> {
        const groupedByYear: Record<string, Post[]> = {};

        list.forEach((item) => {
            const year = item.date.split("-")[0];
            if (!groupedByYear[year]) {
                groupedByYear[year] = [];
            }
            groupedByYear[year].push(item);
        });

        return groupedByYear;
    }

    const postsByYear: Record<string, Post[]> = groupByYear(data.posts);
    const sortedYears = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a));

    function isExternal(post: Post): post is ExternalPost {
        return (post as any).external === true;
    }

    function getHref(post: Post): string {
        return isExternal(post) ? post.externalUrl : `blog/${post.slug}`;
    }
</script>

<svelte:head>
    <title>Writings</title>
</svelte:head>

<!-- Posts -->
<main>
    {#each sortedYears as year}
        <h2 class="font-mono text-md md:text-xl">{year}</h2>
        {#each postsByYear[year] as post}
            <a
                href={getHref(post)}
                target={isExternal(post) ? "_blank" : undefined}
                rel={isExternal(post) ? "noopener noreferrer" : undefined}
                data-sveltekit-reload={post.standalone}
                class="
    text-black transition-all duration-300 ease-in-out hover:opacity-80"
            >
                <article class="grid grid-cols-12 grid-rows-2">
                    <div
                        class="col-span-2 row-start-1 flex items-center font-mono text-sm text-stone-300 md:text-md"
                    >
                        {formatDate(post.date)}
                    </div>
                    <div class="col-span-11 row-start-1 flex items-center">
                        <h2 class="m-0 inline-block text-md font-bold md:text-xl">
                            {post.title}
                        </h2>
                    </div>
                    <p class="col-span-11 col-start-3 row-start-2">
                        {post.description}
                    </p>
                </article>
            </a>
        {/each}
    {/each}
</main>

