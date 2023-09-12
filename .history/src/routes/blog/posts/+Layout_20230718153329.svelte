<style lang="postcss">

    @tailwind base;
    
    @layer base {
        blockquote {
            @apply p-1
        }
    }
</style>

<div class="post-container max-w-2xl m-auto
    [&>p]:text-md
    [&>h1]:text-4xl [&>h1]:lg:-mx-two [&>h1]:font-bold">
    <slot/>
</div>