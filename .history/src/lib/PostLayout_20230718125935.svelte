<script>
    import '../app.css';
    import Layout from '../routes/+layout.svelte';
</script>

<style lang="postcss">
    p {
        @apply text-3xl;
    }
</style>

<div class="post-container max-w-2xl m-auto">
<slot/>
</div>