<script>
    import "../../../app.css";

    export {h1: <h1 class="text-5xl font-bold mb-5" />}
</script>

<style lang="postcss">

    .postcontainer h1 {
        font-size: 10rem;
    }

</style>

<div class="postcontainer max-w-2xl m-auto
    [&>p]:text-md">
<slot/>
</div>