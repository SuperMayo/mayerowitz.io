<script>
    import Layout from '../routes/+layout.svelte';
</script>

<style lang="postcss">

@layer base {
    p {
        @apply text-3xl;
    }
</style>

<div class="post-container max-w-xl m-auto">
<slot/>
</div>