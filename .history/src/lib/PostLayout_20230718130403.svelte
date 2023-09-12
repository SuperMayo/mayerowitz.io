<script>
    import '../app.css';
    import Layout from '../routes/+layout.svelte';
</script>

<style lang="postcss">
    .post-container {
        @apply text-md;
    }
</style>

<div class="post-container max-w-2xl m-auto text-md">
<slot/>
</div>