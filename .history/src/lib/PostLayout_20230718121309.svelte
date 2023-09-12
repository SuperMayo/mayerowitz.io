<script>
    import '../app.css';
    import Layout from '../routes/+layout.svelte';
</script>

<style lang="postcss">
    .post-container.p {
        @apply px-5;
    }
</style>

<div class="post-container max-w-xl m-auto">
<slot/>
</div>