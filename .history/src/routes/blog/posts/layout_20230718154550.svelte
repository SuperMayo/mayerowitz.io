<script type="module">
    import blockquote from "$lib/PostQuote.svelte";
    import h1 from "$lib/PostHeadline.svelte";

    export {h1};
</script>

<div class="post-container max-w-2xl m-auto
    [&>p]:text-md
    [&>h1]:text-4xl [&>h1]:lg:-mx-two [&>h1]:font-bold">
    <slot/>
</div>