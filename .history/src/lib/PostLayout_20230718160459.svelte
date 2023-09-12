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
    <span class="-mt-one">{date}</span>
    <slot/>
</div>