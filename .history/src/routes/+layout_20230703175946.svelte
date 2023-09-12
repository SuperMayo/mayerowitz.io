<script>
    import '../app.css';
    import Header from '$lib/Header.svelte';
    import Footer from '$lib/Footer.svelte';
    import metadata from '../data/metadata';

    import PageTransitions from '../lib/PageTransitions.svelte';
</script>

<div class="flex flex-col min-h-screen max-w-5xl mx-auto">
    <Header
        siteTitle="{metadata.siteTitle}"
        menuLinks="{metadata.menuLinks}"
    />
    <PageTransitions>
        <div class="">
        <slot/>
        </div>
    </PageTransitions>
    <Footer />
</div>