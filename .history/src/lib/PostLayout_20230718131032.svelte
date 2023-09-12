<script>
    import '../app.css';
    import Layout from '../routes/+layout.svelte';
</script>

<style lang="postcss">
    .post-container {
        @apply mx-auto text-justify max-w-xl md:mt-five mt-one;
    }
</style>

<div class="post-container max-w-2xl m-auto">
<slot/>
</div>