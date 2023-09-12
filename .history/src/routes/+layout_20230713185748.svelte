<script>
    import '../app.css';
    import Header from '$lib/Header.svelte';
    import Footer from '$lib/Footer.svelte';
    import metadata from '../data/metadata';

    import PageTransitions from '../lib/PageTransitions.svelte';

    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&family=Karla:wght@300;400;500&display=swap');
</script>

<div class="flex flex-col min-h-screen max-w-5xl mx-auto">
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