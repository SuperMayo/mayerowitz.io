<script context="module">
    import siteMetadata from "../../../data/metadata";
    export const metadata = {
        title: "The 'best' pick in Mario Kart 8 Deluxe",
        slug: "best-kart",
        subtitle: "Mario meets Pareto",
        date: "2023-12-15",
        readingTime: 20,
        category: "computer graphics",
        tags: ["CG", "interactive"],
        published: false,
        customArticleStyle: false,
        SEO_description: "A look at the best kart in Mario Kart 8 Deluxe, and how to find it.",
        ...siteMetadata
    };
</script>

<script>
    import ScrollyTest from "./components/ScrollyTest.svelte";
    import ScrollyThreeD from "./components/scrollyThreeD.svelte";
</script>

<svelte:head>
<title>{metadata.title}</title>
<meta name="author" content={metadata.author}/>
<meta name="description" content={metadata.SEO_description} />
<meta property="og:title" content={metadata.title}/>
<meta property="og:description" content={metadata.SEO_description} />
<meta property="og:url" content={metadata.url + "/blog/" + metadata.slug}/>
<meta property="og:image" content={metadata.url + "/SEO/" + metadata.slug + ".png"}/>
<meta property="og:type" content="article"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta property="twitter:domain" content={metadata.url}/>
<meta property="twitter:url" content={metadata.url + "/blog/" + metadata.slug}/>
<meta name="twitter:title" content={metadata.title}/>
<meta name="twitter:image:src" content={metadata.url + "/SEO/" + metadata.slug + ".png"}/>
<meta name="twitter:creator" content={metadata.twitterUsername}/>
<meta name="twitter:site" content={metadata.twitterUsername}/>
<meta name="twitter:description" content={metadata.SEO_description}/>
</svelte:head>


<ScrollyTest />

In practice, you not only choose a driver, but a full set of body, wheels, and glider. Each of these components has a set of stats, which are combined to give the kart's overall stats. We can then look at all the possible combinations of components, and search for the pareto front in the same way as before.

<!-- <ScrollyThreeD /> -->