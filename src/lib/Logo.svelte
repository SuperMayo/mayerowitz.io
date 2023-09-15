<div class="m-auto flex justify-center align-center logo-container">
    <h1 class="text-4xl font-mono font-bold logo-text transition-all duration-200
        mt-half
        text-teal-400
        text-stroke before:transition-all ease-in-out hover:drop-shadow-xl">
        /AM
    </h1>
</div>

<style>
.logo-container{
    perspective: 1000px;
    perspective-origin: 0% 0%;
}

.logo-text{
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;
    text-align: center;
    transform-origin: 50% 50%;
    transform:
        rotateX(-25deg)
        rotateY(27deg)
        rotateZ(1deg);
}

.logo-text::before{
    content: "/AM";
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: rgb(0, 200, 200);
    position: absolute;
    right: 0.05em;
    top: -0.05em;
    z-index: -1;
    color: #aad5d500;
}

.logo-text:hover{
    -webkit-text-stroke-width: 1px;
    filter: contrast(1.3);
    transform:
        translateX(-0.05em)
        translateY(-0.05em)
        rotateX(-25deg)
        rotateY(27deg)
        rotateZ(1deg);
}

.logo-text:hover::before{
    filter: contrast(1.3) hue-rotate(180deg);
    top: -0.07em;
    right: 0.07em;
}

.logo-text:active{
    filter: contrast(1.3) hue-rotate(20deg);
    transform:
        translateX(-0.1em)
        translateY(-0.1em)
        rotateX(-25deg)
        rotateY(27deg)
        rotateZ(1deg);
}

.logo-text:active::before{
    right: 0em;
    top: 0em;
}
</style>

