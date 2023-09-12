<style lang="postcss">
    blockquote {
        @apply text-xl;
    }
</style>

<div class="post-container max-w-2xl m-auto
    [&>p]:text-md
    [&>h1]:text-4xl [&>h1]:lg:-mx-two [&>h1]:font-bold">
    <slot/>
</div>