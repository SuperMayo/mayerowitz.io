<script lang="ts">
    import {formatDate} from "$lib/utils"
	export let data
</script>

<svelte:head>
	<title>Blog</title>
</svelte:head>

<!-- Posts -->
<main>
{#each data.posts as post}
<a href={`blog/${post.slug}`} class="text-black
    hover:opacity-80 transition-all duration-300 ease-in-out">
    <article>
        <div class="flex items-top">
            <span class="text-right pr-one md:pr-two
            font-serif font-bold text-md md:text-xl 
            text-gray-600">{formatDate(post.date)}</span>
            <div>
            <h2 class="font-bold my-0 text-md md:text-xl">{post.title}</h2>
            <p>{post.subtitle}</p>
            </div>
        </div>
    </article>
</a>
{/each}
</main>