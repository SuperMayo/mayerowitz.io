<div class="align-center logo-container m-auto flex justify-center">
    <h1
        class="logo-text text-stroke mt-half whitespace-nowrap font-mono text-4xl
        font-bold
        text-teal-400
        transition-all duration-200 ease-in-out before:transition-all hover:drop-shadow-xl"
    >
        &#47;AM
    </h1>
</div>

<style>
    .logo-container {
        perspective: 1000px;
        perspective-origin: 0% 0%;
    }

    .logo-text {
        -webkit-text-stroke-width: 1px;
        -webkit-text-stroke-color: black;
        text-align: center;
        transform-origin: 50% 50%;
        transform: rotateX(-25deg) rotateY(27deg) rotateZ(1deg);
    }

    .logo-text::before {
        content: "/AM";
        -webkit-text-stroke-width: 2px;
        -webkit-text-stroke-color: rgb(0, 200, 200);
        position: absolute;
        right: 0.05em;
        top: -0.05em;
        z-index: -1;
        color: #aad5d500;
        white-space: nowrap;
        width: auto;
    }

    .logo-text:hover {
        -webkit-text-stroke-width: 1px;
        filter: contrast(1.3);
        transform: translateX(-0.05em) translateY(-0.05em) rotateX(-25deg) rotateY(27deg)
            rotateZ(1deg);
    }

    .logo-text:hover::before {
        filter: contrast(1.3) hue-rotate(180deg);
        top: -0.07em;
        right: 0.07em;
    }

    .logo-text:active {
        filter: contrast(1.3) hue-rotate(20deg);
        transform: translateX(-0.1em) translateY(-0.1em) rotateX(-25deg) rotateY(27deg)
            rotateZ(1deg);
    }

    .logo-text:active::before {
        right: 0em;
        top: 0em;
    }
</style>
