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
     void main() {
            gl_Position = vec4(position, 1. );
        }
    `

    // Start the clock
    let clock = new Clock();
    onMount(() => {
        clock.start();
        uniforms.resolution.value.x = window.innerWidth/2;
        uniforms.resolution.value.y = window.innerHeight/2;
        var canvas = document.getElementById("mainCanvas");
        setInterval(() => {
            uniforms.time.value = clock.getElapsedTime();
        }, 1000/60);
    })
</script>

<div id = "blob">
    <Canvas size={{
            height: uniforms.resolution.value.y*2,
            width: uniforms.resolution.value.x*2}}>
        <T.Mesh >
            <T.PlaneGeometry args={[2, 2, 5, 5]} />
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
        z-index: -1;
    }
</style>