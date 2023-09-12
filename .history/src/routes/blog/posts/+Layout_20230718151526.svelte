<script>
    import "../../../app.css";
</script>

<style lang="postcss">
    .post-container > h1 {
        font-size: 10rem;
    }
</style>

<div class="post-container max-w-2xl m-auto
    [&>p]:text-md">
<slot/>
</div>