<script>
    import '../app.css';
    import Header from '$lib/Header.svelte';
    import Footer from '$lib/Footer.svelte';
    import metadata from '../data/metadata';

    import PageTransitions from '../lib/PageTransitions.svelte';
    
</script>

<head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@100;300;400;500&family=Karla:wght@300;400;500&display=swap" rel="stylesheet">
</head>

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