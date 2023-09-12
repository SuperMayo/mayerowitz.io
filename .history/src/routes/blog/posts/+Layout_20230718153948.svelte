<script type="module">
    import blockquote from "$lib/PostQuote.svelte";

    export {blockquote};
</script>

<div class="post-container max-w-2xl m-auto
    [&>p]:text-md
    [&>h1]:text-4xl [&>h1]:lg:-mx-two [&>h1]:font-bold">
    <slot/>
</div>