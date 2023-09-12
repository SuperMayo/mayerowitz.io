<script lang="ts">
    import { T, Canvas } from '@threlte/core';
    import {Vector2} from 'three';
    import CodeMirror from "svelte-codemirror-editor";
    import {cpp} from "@codemirror/lang-cpp";
    import {oneDark} from "@codemirror/theme-one-dark";

    import Slider from './Slider.svelte';
    import IntersectionObserver from './IntersectionObserver.svelte';
    import ImageWrapper from './ImageWrapper.svelte';

    // Shader properties
    export let u_time : number = 0;
    export let width : number = 300;
    export let height : number = 300;
    export let vertexShader : string;
    export let fragmentShader : string;
    export let u_mouse : Vector2 = [0, 0];

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

    // If the slider is enabled, set the default value
    if (slider){
        value = sliderDefaultValue;
    }

    // Editor parameters
    export let editor : boolean = false;

    // Misc
    export let legend : string = "";

    // Define shader uniforms
    const uniforms = {
        u_time: { value: 1 },
        u_resolution: { value: new Vector2() },
        u_mouse: { value: new Vector2() },
        u_slider: { value: 0.0 },
    };

    // Reactive uniforms
    $: uniforms.u_time.value = u_time;
    $: uniforms.u_slider.value = value;
    $: frag = fragmentShader;
    $: uniforms.u_mouse.value = u_mouse;

    $: console.log(uniforms.u_mouse.value)

    const head = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
#else
    precision mediump float;
#endif
    `;

    // Intersection observer
    let shaderIntersection : boolean = false;
    const handleShaderIntersection = (event) => {
        shaderIntersection = event.detail;
    }
</script>

{#if editor}
    <div class="my-one w-full m-auto">
        <CodeMirror bind:value={frag} lang={cpp()} extensions={[oneDark]} 
        styles={{
            "&": {
                padding: "5px",
                borderRadius: "10px",
                filter: "drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08))",
                fontSize: "0.8rem",
            },
            ".cm-content": {
                fontFamily: "'IBM Plex Mono'",
            },
            ".cm-gutters": {
                borderRadius: "10px",
            },
        }}>
        </CodeMirror>
    </div>
{/if}

<IntersectionObserver on:intersection={handleShaderIntersection}>
    <div class="flex justify-center my-one drop-shadow-md italic text-gray-500">
        <ImageWrapper right_label={legend} maxWidth={String(width)}>
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
        </ImageWrapper>
    </div>
</IntersectionObserver>

{#if slider}
    <Slider min={sliderMin} max={sliderMax} step={sliderStep} markers={sliderMarkers} title={sliderTitle} bind:value={value} />
{/if}