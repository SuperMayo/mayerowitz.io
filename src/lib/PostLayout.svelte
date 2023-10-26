<script>
    import Giscus from "@giscus/svelte"
    import metadata from "../data/metadata";

    export let title;
    export let date;
    export let readingTime;
    export let subtitle;
    export let slug;
    export let SEO_description ;
</script>

<svelte:head>
<title>{title}</title>
<meta name="author" content={metadata.author}/>
<meta name="description" content={SEO_description} />
<meta property="og:title" content={title}/>
<meta property="og:description" content={SEO_description} />
<meta property="og:url" content={metadata.url + "/blog/" + slug}/>
<meta property="og:image" content={metadata.url + "/SEO/" + slug + "_og.png"}/>
<meta property="og:type" content="article"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta property="twitter:domain" content={metadata.url}/>
<meta property="twitter:url" content={metadata.url + "/blog/" + slug}/>
<meta name="twitter:title" content={title}/>
<meta name="twitter:image" content={metadata.url + "/SEO/" + slug + "_twitter.png"}/>
<meta name="twitter:creator" content={metadata.twitterUsername}/>
<meta name="twitter:description" content={SEO_description}/>
</svelte:head>

<div class="max-w-2xl m-auto w-11/12">

    <h1 class = "text-4xl lg:-mx-four font-bold font-serif">{title}</h1>
    <h2 class = "text-xl mt-half font-bold text-right italic text-gray-500">{subtitle}</h2>
    <div class="text-gray-500 mt-one">
        <p class = "font-mono text-base">|> {date}</p>
        <p class="font-mono text-base mb-two mt-0">|> Reading time: {readingTime}mn</p>
    </div>
    <div class="markdown">
    <slot/>
    </div>

    <Giscus
    id="comments"
    repo="SuperMayo/mayerowitz.io"
    repoId="MDEwOlJlcG9zaXRvcnkyOTMxNzI5ODY="
    category="Announcements"
    categoryId="DIC_kwDOEXl2-s4CZTQQ"
    mapping="title"
    strict="0"
    reactionsEnabled="1"
    emitMetadata="0"
    inputPosition="bottom"
    theme="light"
    lang="en"
    loading="lazy"/>
</div>