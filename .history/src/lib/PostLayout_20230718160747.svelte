<script context="module">
    import blockquote from "$lib/PostQuote.svelte";
    import h1 from "$lib/PostHeadline.svelte";

    export {h1, blockquote};
</script>

<script>
    export let title;
    export let date;
</script>

<div class="max-w-2xl m-auto
    [&>p]:text-md">

    <h1 class = "text-4xl lg:-mx-two font-bold mb-two">{title}</h1>
    <div class="text-left text-gray-500">
    <span class="absolute -mt-two text-right">{date}</span>
    </div>
    <slot/>
</div>