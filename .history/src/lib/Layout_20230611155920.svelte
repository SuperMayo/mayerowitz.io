<script>
    import '../app.css';
    import Header from '../lib/Header.svelte';
    import metadata from '../data/metadata';
</script>

<div class="flex flex-col min-h-screen">
    <Header
        siteTitle="{metadata.title}"
        menuLinks="{metadata.menuLinks}"
    />
    <div class="mx-auto my-one max-w-5xl w-full flex-auto">
        <slot></slot>
    </div>
</div>