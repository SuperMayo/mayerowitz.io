<script context="module">
    import siteMetadata from "$lib/data/metadata";
    export const metadata = {
        ...siteMetadata,
        title: "Mario meets Pareto",
        slug: "mario-meets-pareto",
        description: "Nintendo don't want you to know that",
        subtitle: "Step on the Front Line and Beat your Friends",
        date: "2024-04-01",
        readingTime: 20,
        category: "misc",
        tags: ["interactive"],
        published: false,
        customArticleStyle: false,
        SEO_description:
            "What is the best build in Mario Kart 8 ? Explore multi-objective optimization with the Pareto frontier through a fun Mario Kart example. Understand trade-offs between speed, acceleration, handling, and more. Learn how the Pareto frontier helps make informed decisions by narrowing optimal choices.",
    };
</script>

<script lang="ts">
    import Splash from "./components/Splash.svelte";
    import Introduction from "./components/Introduction.svelte";
    import GearsScroll from "./components/GearsScroll.svelte";
    import { gears, innerHeight as height, innerWidth as width, combs, frontiers } from "./store";
    import ScatterThreeContainer from "./components/ScatterThreeContainer.svelte";
    import StepContent from "./components/StepContent.svelte";
    import "./app.css";
    import { PUBLIC_BUCKET_MK8_URL } from "$env/static/public";
    import { onDestroy, onMount } from "svelte";
    import KofiButton from "$lib/KofiButton.svelte";
    import Footer from "$lib/Footer.svelte";

    let innerWidth: number;
    let innerHeight: number;
    let dataLoaded: boolean = false;
    let scrollPosition = 0;
    let currentBgColorClass = "bg-beige";

    $: {
        width.set(innerWidth);
        height.set(innerHeight);
        dataLoading;
    }

    async function dataLoading() {
        await gears.fetch();
        await combs.fetch();
        await frontiers.fetch();
    }

    function updateBackgroundColor() {
        const threshold = 500;
        const sections = document.querySelectorAll("[data-color]");
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - threshold;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentBgColorClass = section.dataset.color;
            }
        });
    }

    onMount(async () => {
        await dataLoading().then(() => {
            dataLoaded = true;
        });
        updateBackgroundColor();
    });
</script>

<svelte:head>
    <title>{metadata.title}</title>
    <meta name="author" content={metadata.author} />
    <meta name="description" content={metadata.SEO_description} />
    <meta property="og:title" content={metadata.title} />
    <meta property="og:description" content={metadata.SEO_description} />
    <meta property="og:url" content={metadata.url + "/blog/" + metadata.slug} />
    <meta property="og:image" content={metadata.url + "/SEO/" + metadata.slug + ".png"} />
    <meta property="og:type" content="article" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta property="twitter:domain" content={metadata.url} />
    <meta property="twitter:url" content={metadata.url + "/blog/" + metadata.slug} />
    <meta name="twitter:title" content={metadata.title} />
    <meta name="twitter:image:src" content={metadata.url + "/SEO/" + metadata.slug + ".png"} />
    <meta name="twitter:creator" content={metadata.twitterUsername} />
    <meta name="twitter:site" content={metadata.twitterUsername} />
    <meta name="twitter:description" content={metadata.SEO_description} />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href={PUBLIC_BUCKET_MK8_URL} />
    <link
        href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;700&family=Source+Serif+4:wght@400;700&display=swap"
        rel="stylesheet"
    />
</svelte:head>

<svelte:window
    bind:innerWidth
    bind:innerHeight
    bind:scrollY={scrollPosition}
    on:scroll={updateBackgroundColor}
/>

<main class="transition-all duration-300 {currentBgColorClass} absolute w-full">
    <div data-color="bg-beige">
        <Splash title={metadata.title} subtitle={metadata.subtitle} loading={!dataLoaded} />
    </div>

    <div data-color="bg-beige">
        <Introduction />
    </div>

    <div data-color="bg-blue-800">
        <GearsScroll />
    </div>

    <div class="flex min-h-[100vh] align-middle" data-color="bg-beige">
        <StepContent>
            In practice, you not only choose a driver, but a full set of body, wheels, and glider.
            In the next section, I'll display every build as a distinct point. It will however make
            the number of choices explode. But Pareto's with us!
        </StepContent>
    </div>

    {#if dataLoaded}
        <div data-color="bg-blue-800">
            <ScatterThreeContainer />
        </div>
    {/if}
    <div
        class="m-auto flex min-h-[100vh] max-w-screen-sm flex-col justify-center p-one align-middle [&_a:hover]:text-[#b40400] [&_a]:text-blue-800"
        data-color="bg-beige"
    >
        <p>
            We've had a bit of fun here, but don't you see the pattern? We're often faced with
            similar trade-offs. You want a <a
                href="https://en.wikipedia.org/wiki/Noodle_soup"
                target="_blank">meal that's both cheap and delicious</a
            >? A material that's both flexible and strong? A job that's both well-paid and
            fulfilling?
            <a href="https://en.wikipedia.org/wiki/Modern_portfolio_theory" target="_blank">
                a portfolio with low risks and high returns</a
            >? In all these cases, you're facing a multi-objective optimization problem, and you
            have to make trade-offs. The Pareto criteria don't tell you what to choose, but they can
            help you make an informed decision by eliminating sub-optimal options.
        </p>
        <p>
            Of course, if you know the exact priorities you want to assign to each objective (your
            utility function), you don't need to draw the Pareto front at all. But you're often
            faced with situations where your preferences are unclear or uncertain. The Pareto Front
            provides an objective methodology for navigating such multi-objective trade-offs.
        </p>
    </div>

    <div
        class="m-auto max-w-screen-sm rounded-xl bg-blue-800 p-one text-stone-300 drop-shadow-md [&_a]:text-stone-100 [&_a]:underline [&_p]:text-stone-300"
        data-color="bg-beige"
    >
        <h3>Acknowledgement</h3>
        <p>
            I've made some simplifying assumptions in this article to keep it readable for a large
            audience. In truth, the statistics that I presented are translated into derived in-game
            stats that are not always linear with the base statistics. Additionally, their is 4
            speed stats and 4 handling stats for all gears (except driver), but I decided to simply
            average those. I've also completely hidden the functional form of the utility function.
            If you want to read more details behind this article or if you just like my work and
            want to see more in the future, please consider
            <a href="https://ko-fi.com/antoinemayerowitz">donating some coins</a>.
        </p>
        <h3>Credits</h3>
        <p>
            Super Mario Wiki
            <a
                href="https://www.mariowiki.com/Mario_Kart_8_Deluxe_in-game_statistics"
                target="_blank"
                class="italic"
            >
                Mario Kart 8 Deluxe in-game statistics</a
            >
        </p>
        <p>
            Henry H.
            <a
                href="https://hinnefe2.github.io/python/tools/2015/09/21/mario-kart.html"
                target="_blank"
                class="italic"
            >
                Mario Kart and the Pareto Frontier</a
            >, 2015
        </p>
    </div>
    <Footer />
</main>

<KofiButton backgroundColor="#e40400" textColor="#fff" />
