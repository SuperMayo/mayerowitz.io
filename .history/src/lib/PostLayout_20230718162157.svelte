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

<style lang="postcss">
    .markdown p {
        @apply text-lg font-mono my-0;
    }
</style>

<div class=" markdown max-w-2xl m-auto">

    <h1 class = "text-4xl lg:-mx-two font-bold">{title}</h1>
    <div class="text-gray-500">
        <p class = "font-mono">|> {date}</p>
        <p class="font-mono text-base mb-two mt-0">|> {readingTime}mn</p>
    </div>
    <slot class = "markdown"/>
</div>