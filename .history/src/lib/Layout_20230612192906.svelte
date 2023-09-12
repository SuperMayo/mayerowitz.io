<script>
    import '../app.css';
    import Header from '../lib/Header.svelte';
    import Footer from '../lib/Footer.svelte';
    import metadata from '../data/metadata';

    import PageTransitions from './PageTransitions.svelte';
</script>

<div>
    <Header
        siteTitle="{metadata.siteTitle}"
        menuLinks="{metadata.menuLinks}"
    />
    <PageTransitions>
        <div class="mx-auto my-one w-full flex-auto">
        <slot/>
        </div>
    </PageTransitions>
    <Footer />
</div>