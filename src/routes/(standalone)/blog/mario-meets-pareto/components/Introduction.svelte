<script context="module">
    const data = {
        n_driver: {
            total: 52,
            unique: 17,
        },
        n_body: {
            total: 41,
            unique: 27,
        },
        n_tire: {
            total: 22,
            unique: 14,
        },
        n_glider: {
            total: 15,
            unique: 4,
        },
    };
</script>

<script lang="ts">
    import { tweened } from "svelte/motion";
    import { circOut } from "svelte/easing";
    import { slide } from "svelte/transition";
    import Scroller from "@sveltejs/svelte-scroller";
    import StepContent from "./StepContent.svelte";
    import X from "./SVG/X.svelte";
    import NGearImg from "./NGearImg.svelte";
    import { gears } from "../store";

    const tweenDuration = 1000;
    const tweenDelay = 0.25 * tweenDuration;

    let n_combinations: number;
    let progress: number;
    let index: number;
    let offset: number;
    let count: number;
    let showN: boolean = false;
    let showTimes: boolean = false;
    let showSum: boolean = false;
    let animateBlink: boolean = false;

    let drivers: string[];
    let bodies: string[];
    let gliders: string[];
    let tires: string[];

    // Tweened Stores
    let timesWidth = tweened(0, { duration: 500 });
    let n_driver = tweened(0, { duration: tweenDuration, easing: circOut });
    let n_body = tweened(0, { delay: tweenDelay, duration: tweenDuration, easing: circOut });
    let n_tire = tweened(0, { delay: tweenDelay * 2, duration: tweenDuration, easing: circOut });
    let n_glider = tweened(0, { delay: tweenDelay * 3, duration: tweenDuration, easing: circOut });
    let rotationAngle = tweened(0, { delay: tweenDelay, duration: tweenDuration, easing: circOut });

    $: n_combinations = $n_body * $n_driver * $n_tire * $n_glider;

    // Load images names on response
    $: if ($gears) {
        drivers = Object.values($gears)
            .filter((d) => d.type == "driver")
            .map((x) => x.image_name);
        bodies = Object.values($gears)
            .filter((d) => d.type == "body")
            .map((x) => x.image_name);
        gliders = Object.values($gears)
            .filter((d) => d.type == "glider")
            .map((x) => x.image_name);
        tires = Object.values($gears)
            .filter((d) => d.type == "tire")
            .map((x) => x.image_name);
    }

    const target2event: Record<number, () => void> = {
        0: () => {
            showN = false;
        },
        1: () => {
            n_driver.set(data.n_driver.total);
            n_body.set(data.n_body.total);
            n_tire.set(data.n_tire.total);
            n_glider.set(data.n_glider.total);
            showN = true;
            showTimes = false;
            timesWidth.set(0);
            showSum = false;
        },
        2: () => {
            n_driver.set(data.n_driver.total);
            n_body.set(data.n_body.total);
            n_tire.set(data.n_tire.total);
            n_glider.set(data.n_glider.total);
            showTimes = true;
            showSum = true;
            showN = true;
            timesWidth.set(10);
        },
        3: () => {
            n_driver.set(data.n_driver.unique);
            n_body.set(data.n_body.unique);
            n_tire.set(data.n_tire.unique);
            n_glider.set(data.n_glider.unique);
            showTimes = true;
            showSum = true;
            showN = true;
            timesWidth.set(10);
            animateBlink = false;
            rotationAngle.set(0);
        },
        4: () => {
            n_driver.set(data.n_driver.unique);
            n_body.set(data.n_body.unique);
            n_tire.set(data.n_tire.unique);
            n_glider.set(data.n_glider.unique);
            showN = false;
            showSum = false;
            setTimeout(() => {
                animateBlink = true;
            }, 1000);
            rotationAngle.set(45);
            timesWidth.set(10);
            showTimes = true;
        },
    };

    function fireEvent(target: number): void {
        if ($gears) {
            if (target in target2event) {
                target2event[target]();
            }
        }
    }

    $: fireEvent(index);
</script>

<div class="w-full">
    <Scroller top={0} bottom={0.8} threshold={0.5} bind:progress bind:index bind:offset bind:count>
        <div class="m-auto h-[100svh] min-h-36 w-full overflow-hidden" slot="background">
            <div class="m-auto flex h-[80svh] max-w-screen-sm flex-col justify-center">
                <div
                    class="m-0 self-center font-sans text-4xl"
                    style="--svg-rotate:{$rotationAngle}"
                >
                    <NGearImg
                        icon="64px-MK8_Mario_Icon.png"
                        alt_type="driver"
                        imgArray={drivers}
                        {animateBlink}
                        showText={showN}
                        overText={Math.round($n_driver).toString()}
                    />
                    {#if showTimes}
                        <svg width={$timesWidth} height={10} viewBox="0 0 50 50" class="inline">
                            <X />
                        </svg>
                    {/if}
                    <NGearImg
                        icon="100px-StandardKartBodyMK8.png"
                        alt_type="body"
                        imgArray={bodies}
                        {animateBlink}
                        showText={showN}
                        overText={Math.round($n_body).toString()}
                    />
                    {#if showTimes}
                        <svg width={$timesWidth} height={10} viewBox="0 0 50 50" class="inline">
                            <X />
                        </svg>
                    {/if}
                    <NGearImg
                        icon="100px-StandardTiresMK8.png"
                        alt_type="tire"
                        imgArray={tires}
                        {animateBlink}
                        showText={showN}
                        overText={Math.round($n_tire).toString()}
                    />
                    {#if showTimes}
                        <svg width={$timesWidth} height={10} viewBox="0 0 50 50" class="inline">
                            <X />
                        </svg>
                    {/if}
                    <NGearImg
                        icon="100px-SuperGliderMK8.png"
                        alt_type="glider"
                        imgArray={gliders}
                        {animateBlink}
                        showText={showN}
                        overText={Math.round($n_glider).toString()}
                    />
                    {#if animateBlink}
                        <span>?</span>
                    {/if}
                </div>
                {#if showSum}
                    <div
                        transition:slide
                        class="flex justify-center font-mono text-2xl text-[#e4000f]"
                    >
                        ={Math.round(n_combinations).toString()}
                    </div>
                {/if}
            </div>
        </div>
        <div slot="foreground" class="relative m-auto">
            <section>
                <StepContent>
                    In Mario Kart 8, choosing your driver, vehicle, tires, and glider isn't just
                    about style &mdash; it's as crucial as your racing skills. Speed, acceleration
                    and 4 other statistics are determined by this decision. Ever wondered how to
                    truly find the best ones?
                </StepContent>
            </section>
            <section>
                <StepContent>
                    There are dozens of choice for every component, each with their own statistics
                    affecting your performance.
                </StepContent>
            </section>
            <section>
                <StepContent
                    >This adds up to an unbelievable number of options to choose from.</StepContent
                >
            </section>
            <section>
                <StepContent>
                    Hopefully, many choices are just stylistic, but even after you remove the
                    duplicates, it remains a tough job to navigate thousands of options.
                </StepContent>
            </section>
            <section>
                <StepContent>
                    Is there any chance to find the <span class="italic">best</span> build or is it
                    just luck? Should you favor <i>Speed</i> to be the fastest, or
                    <i>acceleration</i>
                    to quickly recover after taking a hit? Let's dive into a solution proposed over a
                    century ago by economist Vilfredo Pareto.
                </StepContent>
            </section>
        </div>
    </Scroller>
</div>

<style lang="postcss">
    section {
        @apply pointer-events-none m-auto grid h-[100vh];
    }
    svg {
        transform: rotate(calc(var(--svg-rotate) * 1deg));
    }
</style>
