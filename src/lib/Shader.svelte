<script lang="ts">
    import { T, Canvas } from '@threlte/core';
    import {Vector2} from 'three';
    import {cpp} from "@codemirror/lang-cpp";

    import CodeBlock from "$lib/CodeBlock.svelte";

    import Slider from './Slider.svelte';
    import IntersectionObserver from './IntersectionObserver.svelte';
    import ImageWrapper from './ImageWrapper.svelte';

    // Shader properties
    export let u_time : number = 0;
    export let width : number = 300;
    export let height : number = 300;
    export let vertexShader : string;
    export let fragmentShader : string;
    //export let u_mouse : Vector2 = new Vector2(0, 0);
    export let mouseCapture : boolean = false;

    // Slider parameters
    export let slider : boolean = false;
    export let sliderMin : number = 0;
    export let sliderMax : number = 100;
    export let sliderStep : number = 1;
    export let sliderMarkers : string[] = [];
    export let sliderTitle : string = "";
    export let sliderDefaultValue : number = 0;

    // Initialize slider value
    let value : number = 0;

    // Mouse capture div
    let mouseCaptureDiv : HTMLDivElement;

    // If the slider is enabled, set the default value
    if (slider){
        value = sliderDefaultValue;
    }

    // Editor parameters
    export let editor : boolean = false;
    export let folded : boolean = false;

    // Misc
    export let legend : string = "";

    // Define shader uniforms
    const uniforms = {
        u_time: { value: 1 },
        u_resolution: { value: new Vector2(width, height)},
        u_mouse: { value: new Vector2(-1, 1)},
        u_slider: { value: 0.0 },
    };

    // Reactive uniforms
    $: uniforms.u_time.value = u_time;
    $: uniforms.u_slider.value = value;
    $: frag = fragmentShader;

    const head = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
#else
    precision mediump float;
#endif
    `;

    // Intersection observer
    let shaderIntersection : boolean = false;
    const handleShaderIntersection = (event: any) => {
        shaderIntersection = event.detail;
    }

    // Mouse observer and normalizer
    // The event listener is added if mouseCapture is true
    function handleMouseMove(e) {
        var rect = e.target.getBoundingClientRect();
        uniforms.u_mouse.value.x = (e.clientX - rect.left) / rect.width;
        uniforms.u_mouse.value.y = (e.clientY - rect.top) / rect.height;
    }

    // Hande touch events
    function handleTouchMove(e) {
        var rect = e.target.getBoundingClientRect();
        uniforms.u_mouse.value.x = (e.touches[0].clientX - rect.left) / rect.width;
        uniforms.u_mouse.value.y = (e.touches[0].clientY - rect.top) / rect.height;
    }

    $: if (mouseCaptureDiv){
        if (mouseCapture){
            mouseCaptureDiv.addEventListener('mousemove', handleMouseMove);
            mouseCaptureDiv.addEventListener('touchmove', (e) => {
                e.preventDefault(); // Prevent scrolling
            handleTouchMove(e);
        });
        } else {
            mouseCaptureDiv.removeEventListener('mousemove', handleMouseMove);
            mouseCaptureDiv.removeEventListener('touchmove', handleTouchMove);
        }
    }
</script>

<div class="py-one">
<IntersectionObserver on:intersection={handleShaderIntersection}>
    {#if editor}
        <CodeBlock
        bind:value={frag}
        folded={folded}
        lang={cpp()}/>
    {/if}   
    <div class="flex justify-center">
        <ImageWrapper right_label={legend} maxWidth={String(width)}>
        <div bind:this={mouseCaptureDiv} class="drop-shadow-md">
            <Canvas size={{width: width, height: height}}>
                {#if shaderIntersection}
                    <T.Mesh >
                        <T.PlaneGeometry args={[2, 2, 1, 1]} />
                        {#key frag}
                        <T.ShaderMaterial
                            {uniforms}
                            vertexShader={vertexShader}
                            fragmentShader={head + frag} />
                        {/key}
                    </T.Mesh>
                {/if}
            </Canvas>
        </div>
        </ImageWrapper>
    </div>
</IntersectionObserver>
{#if slider}
    <Slider min={sliderMin} max={sliderMax} step={sliderStep} markers={sliderMarkers} title={sliderTitle} bind:value={value} />
{/if}
</div>