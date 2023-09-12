<script>
    import '../app.css';
    import Header from '$lib/Header.svelte';
    import Footer from '$lib/Footer.svelte';
    import metadata from '../data/metadata';
    
</script>

<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Anonymous+Pro:wght@400;800&family=Source+Sans+3:wght@400;700&family=Source+Serif+4&display=swap" rel="stylesheet">
</svelte:head>

<div class="flex flex-col min-h-screen max-w-5xl mx-auto">
    <Header
        siteTitle="{metadata.siteTitle}"
        menuLinks="{metadata.menuLinks}"
    />
        <!--<div class="mx-auto my-one w-full flex-auto px-one">
        <slot/>
        </div> -->
        <slot/>
    <Footer />
</div>