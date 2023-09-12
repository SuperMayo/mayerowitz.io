<script>
    import { onMount } from "svelte";
    import {Clock, Vector2} from "three";
    import { Canvas, T } from "@threlte/core";

    import Blob from "./Blob.frag?raw";
    
    const uniforms = {
        time: { value: 1 },
        resolution: { value: new Vector2() },
        mouse: { value: new Vector2() },
        u_step: { value: 0.0 },
    }

    const vertexShader = `
     varying vec2 vUv;
     void main() {
            vUv = uv;
            gl_Position = vec4(position, 1. );
        }
    `

    // Start the clock
    let clock = new Clock();
    onMount(() => {
        clock.start();
        uniforms.resolution.value.x = window.innerWidth;
        uniforms.resolution.value.y = window.innerHeight;
        setInterval(() => {
            uniforms.time.value = clock.getElapsedTime();
        }, 1000/60);
    })

    function handleMouseMove(e) {
        var rect = e.target.getBoundingClientRect();
        uniforms.mouse.value.x = e.clientX;
        uniforms.mouse.value.y = e.clientY;
    }

    function handleTouchMove(e) {
        var rect = e.target.getBoundingClientRect();
        uniforms.mouse.value.x = e.touches[0].clientX;
        uniforms.mouse.value.y = e.touches[0].clientY;
    }
</script>


<svelte:body on:mousemove={handleMouseMove}/>
<div id = "blob">
    <Canvas size={{
            height: uniforms.resolution.value.y,
            width: uniforms.resolution.value.x}}>
        <T.Mesh >
            <T.PlaneGeometry args={[2, 2, 1, 1]} />
            <T.ShaderMaterial
                {uniforms}
                vertexShader={vertexShader}
                fragmentShader={Blob} />
        </T.Mesh>
    </Canvas>
</div>

<style>
    #blob {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
    }
</style>