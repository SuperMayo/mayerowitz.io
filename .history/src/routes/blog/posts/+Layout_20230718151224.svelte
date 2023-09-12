<script>
    import "@src/app.css";
</script>

<style lang="postcss">
    .post-container {
        & h1{
        @apply text-4xl -mx-10;
        }
    }
</style>

<div class="post-container max-w-2xl m-auto
    [&>p]:text-md">
<slot/>
</div>