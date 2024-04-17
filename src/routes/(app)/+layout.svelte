<script>
    import "./app.css";
    import Header from "$lib/Header.svelte";
    import Footer from "$lib/Footer.svelte";
    import metadata from "$lib/data/metadata";
</script>

<svelte:head>
    <link
        rel="alternate"
        type="application/rss+xml"
        title="RSS Feed for mayerowitz.io"
        href="/feed"
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;700&family=Source+Sans+3:wght@400;700&family=Source+Serif+4:wght@400;700&display=swap"
        rel="stylesheet"
    />
    <link rel="icon" type="image/png" href="/favicon.png" />
    <script
        data-goatcounter="https://supermayo.goatcounter.com/count"
        async
        src="//gc.zgo.at/count.js"
    ></script>
</svelte:head>

<div class="mx-auto flex min-h-screen w-11/12 max-w-5xl flex-col">
    <Header menuLinks={metadata.menuLinks} />
    <slot />
    <Footer />
</div>
