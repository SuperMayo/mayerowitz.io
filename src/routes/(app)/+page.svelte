<script lang="ts">
    import Blob from "$lib/Blob/Blob.svelte";
    import metadata from "$lib/data/metadata";
    import type { Post, ExternalPost } from "$lib/Types";
    const links = metadata.externalLinks;

    export let data: { posts: Post[] };

    const posts: Post[] = data.posts;

    function isExternal(post: Post): post is ExternalPost {
        return post.external === true;
    }
</script>

<main class="mx-auto mt-one max-w-xl md:mt-five">
    <Blob />
    <div class="px-5 font-mono [&_p]:font-mono">
        <p class="text-left">
            Hi, I’m <span
                class="bg-gradient-to-br from-teal-500 via-teal-600
      to-red-400 bg-[length:200%_200%] bg-clip-text bg-[position:0%_0%] text-lg
    font-bold text-transparent transition-all duration-1000 ease-in-out
      hover:bg-[position:100%_100%]">Antoine Mayerowitz</span
            >.
        </p>
        <p>
            I'm an economist and data scientist, currently living in Paris, France. My interests
            lie at the crossroads of data, interactivity, and art.
        </p>
        <p>
            You can also find me here (although not very actively):
            <br />
            {#each Object.entries(links) as [key, value], index (key)}
                <a href={value} target="_blank">{key}</a
                >{#if index < Object.entries(links).length - 1}<span>&thinsp;/&thinsp;</span>{/if}
            {/each}
        </p>
        <p>
            I'm available for freelance at <a href="mailto:antoine@mayerowitz.io">
                antoine@mayerowitz.io</a
            >
        </p>
        <div class="border-1 mt-one border border-stone-200 border-l-beige border-t-beige p-one">
            <h4 class="m-0">Latest articles</h4>
            {#each posts as post}
                <div>
                    {#if isExternal(post)}
                        - <a href={post.externalUrl} target="_blank" rel="noopener noreferrer">{post.title}</a>
                    {:else if post.standalone}
                        - <a data-sveltekit-reload href="/blog/{post.slug}">{post.title}</a>
                    {:else}
                        - <a href="/blog/{post.slug}">{post.title}</a>
                    {/if}
                </div>
            {/each}
        </div>
    </div>
</main>
