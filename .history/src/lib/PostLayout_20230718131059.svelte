<script>
    import '../app.css';
    import Layout from '../routes/+layout.svelte';
</script>

<style lang="postcss">
    .post-container+h1 {
        @apply text-4xl font-bold mb-2;
    }
</style>

<div class="post-container max-w-2xl m-auto">
<slot/>
</div>