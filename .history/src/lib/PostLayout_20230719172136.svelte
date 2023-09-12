<script>
    export let title;
    export let date;
    export let readingTime;
</script>

<div class="max-w-2xl m-auto">

    <h1 class = "text-4xl lg:-mx-two font-bold">{title}</h1>
    <div class="text-gray-500">
        <p class = "font-mono text-base">|> {date}</p>
        <p class="font-mono text-base mb-two mt-0">|> {readingTime}mn</p>
    </div>
    <div class="markdown">
    <slot/>
    </div>
</div>