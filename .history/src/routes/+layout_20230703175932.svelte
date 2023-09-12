<script>
    import '../app.css';
    import Header from '$lib/Header.svelte';
    import Footer from '$lib/Footer.svelte';
    import metadata from '../data/metadata';

    import PageTransitions from '../lib/PageTransitions.svelte';
</script>

<div class="">
    <Header
        siteTitle="{metadata.siteTitle}"
        menuLinks="{metadata.menuLinks}"
    />
    <PageTransitions>
        <div class="mx-auto my-one w-full flex-auto px-one">
        <slot/>
        </div>
    </PageTransitions>
    <Footer />
</div>