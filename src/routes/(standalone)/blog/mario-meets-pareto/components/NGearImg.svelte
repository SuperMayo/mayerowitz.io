<script lang="ts">
    import { bucket } from "../store";

    export let icon: string;
    export let alt_type: string;
    export let overText: string = "00";
    export let showText: boolean = false;
    export let animateBlink: boolean = false;
    export let imgArray: string[];
    export const animationDuration = 3000;
    let hueAngle: number;
    let nLoops: number = 0;
    let rndImg: string = icon;
    let interval: number = 0;
    const img_bucket = $bucket + "/images/";

    $: hueAngle = Math.round(Math.random() * 360) + (nLoops % 360);

    $: animateBlink && runInterval();

    function runInterval() {
        interval = setInterval(() => {
            nLoops = nLoops + 1;
            rndImg = imgArray[Math.floor(Math.random() * imgArray.length)];
        }, animationDuration);
    }

    $: if (!animateBlink && interval) clearInterval(interval);
</script>

<div class="relative inline-flex text-center align-middle">
    {#if animateBlink == false || imgArray.length == 0}
        <img
            class="h-[32px] w-auto contrast-0 md:h-[50px]"
            src={img_bucket + icon}
            alt={`Shape of a ${alt_type}`}
        />
    {:else}
        <img
            class="animateBlink h-[32px] w-auto md:h-[50px]"
            style="--angle:{hueAngle};--animation-duration:{animationDuration}"
            src={img_bucket + rndImg}
            loading="lazy"
            alt={`Shape of a ${alt_type}`}
        />
    {/if}
    <div
        class={`text-shadow-thin absolute left-1/2 top-3/4 -translate-x-1/2
    -translate-y-1/2 font-mono text-2xl
    text-beige transition-opacity duration-500 ${showText ? "opacity-100" : "opacity-0"}`}
    >
        {overText}
    </div>
</div>

<style lang="postcss">
    .text-shadow-thin {
        text-shadow: 1px 1px rgba(0, 0, 0, 0.3);
    }

    .animateBlink {
        animation-name: hueRotation, blinker, tourniBouli;
        animation-duration: calc(var(--animation-duration) * 1ms);
        animation-delay: 0s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }

    @keyframes tourniBouli {
        0% {
            transform: rotate(0deg);
        }
        10% {
            transform: rotate(360deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes hueRotation {
        0% {
            filter: contrast(0%) sepia(100%) hue-rotate(0deg) contrast(200%);
        }
        15% {
            filter: contrast(0%) sepia(100%) hue-rotate(360deg) contrast(200%);
        }
        30% {
            filter: contrast(0%) sepia(100%) hue-rotate(calc(var(--angle) * 1deg)) contrast(200%);
        }
        30%,
        100% {
            filter: hue-rotate(0);
        }
    }

    @keyframes blinker {
        0%,
        30% {
            opacity: 1;
        }
        35%,
        37% {
            opacity: 0;
        }
        40%,
        43% {
            opacity: 1;
        }
        43%,
        46% {
            opacity: 0;
        }
        46%,
        100% {
            opacity: 1;
        }
    }
</style>
