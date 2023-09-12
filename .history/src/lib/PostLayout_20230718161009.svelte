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

<div class="max-w-2xl m-auto
    [&>p]:text-md">

    <h1 class = "text-4xl lg:-mx-two font-bold">{title}</h1>
    <div class="text-left text-gray-500">
    <span class="text-right font-mono">{date}</span>
    <span class="text-right font-mono">{readingTime}</span>
    </div>
    <slot/>
</div>