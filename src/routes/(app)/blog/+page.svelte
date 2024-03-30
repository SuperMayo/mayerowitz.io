<script lang="ts">
    import { formatDate } from "$lib/utils";
    export let data;

    function groupByYear(list: any[]) {
        const groupedByYear = {};

        list.forEach((item) => {
            // Extract the year from the date string
            const year = item.date.split("-")[0];
            item.year = year;

            // Initialize an array for the year if it doesn't already exist
            if (!groupedByYear[year]) {
                groupedByYear[year] = [];
            }

            // Append the current object to the array for its year
            groupedByYear[year].push(item);
        });

        return groupedByYear;
    }

    const postsByYear = groupByYear(data.posts);
    const sortedYears = Object.keys(postsByYear).sort((a, b) => b - a);
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
                href={`blog/${post.slug}`}
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

