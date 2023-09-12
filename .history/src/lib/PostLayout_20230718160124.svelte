<script context="module">
    import blockquote from "$lib/PostQuote.svelte";
    import h1 from "$lib/PostHeadline.svelte";

    export {h1, blockquote};
    export let title: string;
</script>

<div class="max-w-2xl m-auto
    [&>p]:text-md
    [&>h1]:text-4xl [&>h1]:lg:-mx-two [&>h1]:font-bold">
    <h1>{title}</h1>
    <slot/>
</div>