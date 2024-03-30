<script lang="ts">
    import { onMount } from "svelte";

    export let src: string;
    export let alt: string;
    export let mousePos: number[] | null = null;

    let innerWidth: number;
    let innerHeight: number;
    let midX: number;
    let midY: number;
    let offsetX: number = 0;
    let offsetY: number = 0;

    const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

    function computeRotation(event: number[]): void {
        const x = event[0];
        const y = event[1];

        offsetX = clamp((x - midX) / midX, -1, 1) * 45;
        offsetY = clamp((y - midY) / midY, -1, 1) * 45;
    }

    $: if (mousePos) computeRotation(mousePos);

    onMount(() => {
        innerWidth = window.innerWidth;
        innerHeight = window.innerHeight;
        midX = innerWidth / 2;
        midY = innerHeight / 2;
    });
</script>

<div
    id="cool-card"
    class="absolute -z-10 ml-[5%] w-44 sm:w-80"
    style="--rotateX:{-offsetY + 'deg'}; --rotateY:{offsetX +
        'deg'}; --offsetX:{offsetX}; --offsetY:{offsetY}"
>
    <img {alt} {src} class="w-full rounded-xl border border-amber-500" />
    <div class="light rounded-xl"></div>
</div>

<style lang="postcss">
    #cool-card {
        transform-style: preserve-3d;
        transform: perspective(1000px) rotateX(var(--rotateX)) rotateY(var(--rotateY));
        filter: drop-shadow(calc(var(--offsetX) * -1px) calc(var(--offsetY) * -1px) 10px #b40400);
    }

    .light {
        position: absolute;
        inset: 0;
        content: "";
        transition: all 0.5s linear;
        background: radial-gradient(
            circle at calc(var(--offsetY) * 1%) calc(var(--offsetX) * 1%),
            rgba(255, 255, 255, 0.7) 0%,
            rgba(255, 225, 225, 0.7) 10%,
            rgba(255, 200, 200, 0.2) 60%,
            transparent,
            transparent
        );
    }
</style>
