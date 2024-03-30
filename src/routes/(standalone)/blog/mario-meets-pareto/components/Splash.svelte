<script lang="ts">
    import type * as Three from "three";
    import { Canvas } from "@threlte/core";
    import { useGltf } from "@threlte/extras";
    import { fade } from "svelte/transition";
    import Scroller from "@sveltejs/svelte-scroller";
    import { T } from "@threlte/core";
    import ChevronDown from "./SVG/chevron-down.svelte";
    import SVGSpinner from "./SVG/spinner.svelte";
    import CoolCard from "./CoolCard.svelte";
    import { onMount } from "svelte";
    import { bucket } from "../store";

    export let title: string;
    export let subtitle: string;
    export let loading: boolean = true;

    let kart: Three.Group;
    let progress: number = 0.1;
    let clampedProgress: number;
    let pageReady: boolean = false;
    let innerHeight: number;
    let mousePos: number[] | null = null;

    function animateGtlf(scene: Three.Group, progress: number): void {
        scene.position.setX(-0.5 + progress);
        scene.position.setY(progress * 2);
        scene.rotation.set(-0.9 - (Math.PI * progress) / 5, progress / 10, progress / 2);
    }

    $: if (kart) {
        animateGtlf(kart, progress);
    }

    $: clampedProgress = progress < 0 ? 0 : progress > 1 ? 1 : progress;

    onMount(() => {
        pageReady = true;
        innerHeight = window.innerHeight;
    });
</script>

<svelte:window on:scroll />

<div
    class="w-full bg-gradient-to-b from-[#e4000f] to-[#b40400]


        "
    on:mousemove={(e) => {
        mousePos = [e.x, e.y];
    }}
    on:touchmove={(e) => {
        mousePos = [e.touches[0].clientX, innerHeight / 2];
    }}
    role="presentation"
>
    <Scroller top={0} bottom={0.3} bind:progress>
        <div class="-z-50 float-right mt-three h-56 w-[50%] md:h-96" slot="background">
            <Canvas>
                <T.PerspectiveCamera
                    makeDefault
                    fov={20 - 10 * progress}
                    position={[0, 5, 0]}
                    on:create={({ ref }) => {
                        ref.lookAt(0, 0, 0);
                    }}
                />
                <T.AmbientLight intensity={7} />
                {#if pageReady}
                    {#await useGltf(`${$bucket}/kart_comp.glb`, { useDraco: true }) then gltf}
                        <T is={gltf.scene} bind:ref={kart} />
                    {/await}
                {/if}
            </Canvas>
        </div>
        <div class="m-auto h-[100svh] max-h-[88rem] md:min-h-[40rem]" slot="foreground">
            <div class="mx-3 border-b border-slate-200 p-2 text-center text-white">
                <a
                    href="/"
                    class="font-sans font-thin text-slate-200 hover:text-amber-400"
                    data-sveltekit-reload>Mayerowitz.io</a
                >
            </div>
            <section class="m-auto max-w-screen-md p-one">
                <h1
                    class="z-50 mb-0 text-3xl font-black text-slate-200 sm:text-4xl md:text-[5rem] md:[line-height:6rem]"
                >
                    {title}
                </h1>
                <div>
                    <CoolCard
                        src="/assets/pareto_mario_hat.png"
                        alt="A photograph of Pareto with Mario's hat"
                        {mousePos}
                    />
                </div>
                <h2
                    transition:fade={{ delay: 800, duration: 1000 }}
                    class="drop-shadow-thin z-50 my-one ml-auto mr-0
					w-[60%] max-w-md
                    py-1
					text-right font-sans text-lg font-bold text-slate-200 sm:my-four sm:py-3 sm:text-2xl"
                >
                    {subtitle}
                </h2>
                <p class="absolute bottom-three text-center font-sans text-sm text-red-400">
                    Written by <a
                        class="text-slate-200 hover:text-amber-400"
                        href="/"
                        data-sveltekit-reload>Antoine Mayerowitz</a
                    >
                </p>
                {#if loading}
                    <div class="absolute bottom-0 left-0 m-0 w-full">
                        <div class="flex flex-row justify-center">
                            <div class="flex flex-col p-1 text-white">
                                <svg
                                    class="ml-2 h-10 w-10 animate-spin text-gray-300"
                                    viewBox="0 0 64 64"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                >
                                    <SVGSpinner />
                                </svg>
                            </div>
                        </div>
                    </div>
                {:else}
                    <div class="absolute bottom-0 left-0 m-0 w-full">
                        <div class="flex flex-row justify-center">
                            <!-- Your splash screen content -->

                            <div class="w-10 flex-shrink-0 animate-bounce">
                                <ChevronDown />
                            </div>
                        </div>
                    </div>
                {/if}
            </section>
        </div>
    </Scroller>
</div>

<style lang="postcss">
    .drop-shadow-thin {
        text-shadow: 2px 2px firebrick;
    }
</style>
