<script>
</script>

<style lang="postcss">
    .post-container{
        @apply text-4xl -mx-10;
    }
</style>

<div class="post-container max-w-2xl m-auto
    [&>p]:text-md
    [&>h1]:text-4xl [&>h1]:-mx-10 [&>h1]">
<slot/>
</div>