<script context="module">
    import blockquote from "$lib/PostQuote.svelte";
    import h1 from "$lib/PostHeadline.svelte";

    export {h1, blockquote};
</script>

<script>
    export let title;
    export let date;
    export let readingTime;
</script>

<style>
    .markdown>p {
        @apply text-md;
    }
</style>

<div class="markdown max-w-2xl m-auto">

    <h1 class = "text-4xl lg:-mx-two font-bold">{title}</h1>
    <div class="text-gray-500">
        <p class = "font-mono">|> {date}</p>
        <p class="font-mono text-base mb-two mt-0">|> {readingTime}mn</p>
    </div>
    <div class="">
    <slot/>
    </div>
</div>