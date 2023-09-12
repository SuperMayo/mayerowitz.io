<script>
    export let title;
    export let date;
    export let readingTime;
    export let subtitle
</script>

<div class="max-w-2xl m-auto px-5">

    <h1 class = "text-4xl lg:-mx-three font-bold">{title}</h1>
    <h2 class = "text-xl mt-half font-bold text-right italic text-gray-500">{subtitle}</h2>
    <div class="text-gray-500">
        <p class = "font-mono text-base">|> {date}</p>
        <p class="font-mono text-base mb-two mt-0">|> Reading time: {readingTime}mn</p>
    </div>
    <div class="markdown">
    <slot/>
    </div>
</div>