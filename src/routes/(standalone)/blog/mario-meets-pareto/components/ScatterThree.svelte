<script lang="ts">
    import { T } from "@threlte/core";
    import { interactivity, Grid } from "@threlte/extras";
    import * as eases from "svelte/easing";
    import { tweened } from "svelte/motion";
    import * as Three from "three";
    import { HTML, OrbitControls } from "@threlte/extras";
    import { scatterThreeConfig, hoveredId, palette, clickedId, axisChoices } from "../store";

    import type { AxisName } from "../lib/types";

    export let bufferSize: number;
    export let state: Uint8Array;
    export let positions: Float32Array;
    export let ids: Uint16Array;
    export let axis: { x: AxisName; y: AxisName; z?: AxisName };
    export let userOrbitControls = false;
    export let zoomFactor = 1;
    export let mouseInteractivity = false;

    // Set up initial buffers and internal states
    const stateInit: Uint8Array = new Uint8Array(bufferSize * 3);
    const positionsInit: Float32Array = new Float32Array(bufferSize * 3);
    let geometry: Three.BufferGeometry;
    let sceneCamera: Three.PerspectiveCamera;
    let isHoveredArray = new Uint8Array(positions.length / 3).fill(0);
    let isGeometryInitialized = false;
    let isCameraFar: boolean = false;
    let labelDistance: number;
    let innerWidth: number;
    let clickedIndexAttribute: number = -1;

    // Set up interactivity
    const interactivityState = interactivity({
        filter: (hits) => {
            return hits.slice(0, 1);
        },
    });
    interactivityState.raycaster.params.Points.threshold = $scatterThreeConfig.raycaster.threshold;

    export const camera = {
        positions: { x: 10, y: 10, z: 10 },
        rotation: { x: 0, y: 0, z: 0 },
        lookAt: { x: 10, y: 10, z: 10 },
        zoom: 1,
        near: 1,
        far: 1600,
        fov: 45,
    };

    // Tweened stores
    const cameraPosition = tweened(
        { x: 10, y: 10, z: 50 },
        { duration: 500, easing: eases.cubicInOut },
    );
    export const lookAt = tweened(
        { x: 10, y: 10, z: 10 },
        { duration: 500, easing: eases.cubicInOut },
    );
    export const cameraZoom = tweened(1 * zoomFactor, { duration: 1, easing: eases.cubicInOut });

    // Shader uniforms
    export const uniforms = {
        hoveredPoint: { value: new Three.Vector3(0, 0, 0) },
        hoveredIndex: { value: new Number(9999999) },
        showFrontier: { value: new Number(1) },
        animationProgress: { value: new Number(0.5) },
        clickedView: { value: new Number(0) },
        focusFrontier: { value: new Number(0) },
    };

    // Update the given buffer and flag it for update
    export function updateBuffer(bufferName: string, buffer: ArrayBufferView) {
        let bufferAttribute = geometry.getAttribute(bufferName);
        if (bufferAttribute && bufferAttribute.array) {
            bufferAttribute.array.set(buffer);
            bufferAttribute.needsUpdate = true;
        }
    }

    function axisLabel(axis: string) {
        return $axisChoices.find((d) => d.value == axis).name;
    }

    // Component must be aware that geometry is ready
    $: if (geometry) {
        isGeometryInitialized = true;
    }

    // Update the state buffer on state change
    $: if (state && geometry) {
        updateBuffer("state", state);
    }

    // Update the positions buffer and the animation progress on change
    $: if (positions && isGeometryInitialized) {
        uniforms.animationProgress.value = 0;
        updateBuffer("position", positions);
        animate(() => {
            updateBuffer("initPosition", positions);
        }, 0.5);
    }

    // Tween the `animationProgress` shader uniform for vertex animation
    // (Can't use a svelte tweened store for a shader uniform)
    function animate(callback: () => void, duration: number = 1.5, startTime?: number) {
        const currentTime = performance.now();
        if (startTime === undefined) startTime = currentTime;
        const timeElapsed = (currentTime - startTime) / 1000; // Convert milliseconds to seconds

        const progress = eases.cubicInOut(timeElapsed / duration);
        uniforms.animationProgress.value = progress;

        if (timeElapsed >= duration) {
            uniforms.animationProgress.value = 1;
            callback();
        } else {
            requestAnimationFrame(() => animate(callback, duration, startTime));
        }
    }

    // Update the camera position to the target position
    export function moveCameraTo(
        targetPosition: Three.Vector3,
        duration: number,
        easingFunction: (t: number) => number = eases.cubicInOut,
    ) {
        cameraPosition.update(
            (_) => ({
                x: targetPosition.x,
                y: targetPosition.y,
                z: targetPosition.z,
            }),
            { duration: duration, easing: easingFunction },
        );
    }

    // Reactive camera lookAt on camera position change
    $: if ($cameraPosition && sceneCamera) {
        sceneCamera.position.set($cameraPosition.x, $cameraPosition.y, $cameraPosition.z);
        sceneCamera.lookAt($lookAt.x, $lookAt.y, $lookAt.z);
    }

    $: if ($cameraZoom && sceneCamera) {
        sceneCamera.zoom = $cameraZoom;
        sceneCamera.updateProjectionMatrix();
    }

    $: isCameraFar = $cameraPosition.z > 30;

    $: labelDistance = innerWidth < 640 ? 6 : 3;

    // Points shader material
    const vertexShader = `
    attribute lowp float isHovered;     // Point is hovered
    attribute lowp vec3 state;          // {x: frontier?, y: clicked?} 
    attribute vec3 initPosition;        // initial position (for transitions)
    uniform float animationProgress;    // percentage of animation progress
    uniform float clickedView;
    uniform float focusFrontier;
    varying vec3 vPosition;
    varying float vFrontier;
    varying float vHovered;
    varying float notFocused;
    void main() {
        // Points positions
        vec3 mixedPosition = mix(initPosition, position, animationProgress);
        vec4 modelPosition = modelMatrix * vec4(mixedPosition, 1.0);
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectedPosition = projectionMatrix * viewPosition;
        gl_Position = projectedPosition;

        // 1 if not on frontier and clickedView == false
        notFocused = (1. - state.y) * clickedView;

        // Control size if we focus on frontier
        notFocused = notFocused + (1.-state.x) * focusFrontier;
        
        gl_PointSize = 15. + isHovered * 15.0 + 3.0 * state.x + 20.0 * state.y - notFocused * 5.0;

        // Forward varyings to fragment shader
        vFrontier = state.x;
        vHovered = isHovered;
        vPosition = position.xyz;
    }
    `;
    const fragmentShader = `
    varying vec2 vUv;
    varying float vFrontier;
    varying vec3 vPosition;
    varying float vHovered;
    varying float notFocused;
    uniform float showFrontier;
    uniform float clickedView;
    void main() {
        float frontier = vFrontier * showFrontier;
        vec3 position = vPosition / vec3(21.);
        vec2 st = gl_PointCoord.xy;
        float d = distance(st, vec2(0.5));

        // Adjusted smoothstep for soft edges
        float edgeWidth = 0.01; // Width of the soft edge
        float alpha = 1.0 - smoothstep(0.45 - edgeWidth, 0.45, d);


        // outline setting
        float outlineWidth = 0.10; // Determines the width of the outline
        float border = smoothstep(0.45-outlineWidth,0.45, d);

        // Utility-based color
        lowp float utility = position.x*position.y*position.z;
        float tier = floor(utility*10.);
        vec3 pc = vec3(1., 0.3, 0.2+0.1*tier)*(2.+tier)/4.;
        vec3 c = mix(pc, vec3(0.97, 0.78, 0.04), frontier);
        c = mix(c, vec3(0.99,0.6,0.6), border);

        // Remove almost transparent pixels to improve perf
        if(alpha < 0.01) discard;

        // Set transparency
        float transparency = (1.- notFocused) * 0.7 + notFocused * (utility/2.);

        gl_FragColor = vec4(c, transparency);
    }
    `;

    // Mouse/touch interactions
    const handlePointerEnter = (e) => {
        if (!mouseInteractivity) return;
        const hoveredIndex = geometry.attributes.id.getComponent(e.index, 0);
        geometry.attributes.isHovered.setComponent(e.index, 0, 1);

        geometry.attributes.isHovered.needsUpdate = true;
        uniforms.hoveredIndex.value = hoveredIndex;
        $hoveredId = hoveredIndex;
    };
    const handlePointerLeave = (e) => {
        if (!mouseInteractivity) return;
        geometry.attributes.isHovered.setComponent(e.index, 0, 0);
        geometry.attributes.isHovered.needsUpdate = true;
        //$hoveredId = null;
    };
    const handlePointerClick = (e) => {
        if (!mouseInteractivity) return;
        const clickedIndex = geometry.attributes.id.getComponent(e.index, 0);
        const isFrontier = geometry.attributes.state.getComponent(e.index, 0);
        uniforms.clickedView.value = 1;
        geometry.attributes.isHovered.setComponent(e.index, 0, 1);
        geometry.attributes.isHovered.needsUpdate = true;
        $clickedId = clickedIndex;
        clickedIndexAttribute = e.index;
    };
    // Reset lookAt to default when clicking outside of a point
    const handlePointerMissed = (e) => {
        if (!mouseInteractivity) return;
        $clickedId = null;
        lookAt.set(camera.lookAt);
        uniforms.clickedView.value = 0;
    };
</script>

<svelte:window bind:innerWidth />

<T.PerspectiveCamera
    makeDefault
    near={camera.near}
    far={camera.far}
    fov={camera.fov}
    zoom={camera.zoom}
    on:create={({ ref }) => {
        sceneCamera = ref;
        ref.lookAt(camera.lookAt.x, camera.lookAt.y, camera.lookAt.z);
    }}
>
    {#if userOrbitControls}
        <OrbitControls target={[10, 10, 10]} autoRotate={false} />
    {/if}
</T.PerspectiveCamera>

<Grid
    renderOrder={0}
    plane="xz"
    fadeDistance={2000}
    fadeStrength={0}
    cellColor={$palette.yellow}
    sectionColor={$palette.grey}
    gridSize={[20, 20]}
    position={[10, 0, 10]}
    sectionThickness={1.5}
    cellSize={2.5}
/>
<Grid
    renderOrder={0}
    plane="zy"
    fadeDistance={2000}
    fadeStrength={0}
    cellColor={$palette.yellow}
    sectionColor={$palette.grey}
    gridSize={[20, 20]}
    position={[0, 10, 10]}
    sectionThickness={1.5}
    cellSize={2.5}
/>
<T.Points
    renderOrder={2}
    on:pointerenter={(e) => handlePointerEnter(e)}
    on:pointerleave={(e) => handlePointerLeave(e)}
    on:pointermissed={(e) => handlePointerMissed(e)}
    on:click={(e) => handlePointerClick(e)}
>
    <T.BufferGeometry bind:ref={geometry}>
        <T.BufferAttribute
            args={[positions, 3]}
            attach={(parent, self) => {
                parent.setAttribute("position", self);
            }}
        />
        <T.BufferAttribute
            args={[positionsInit, 3]}
            attach={(parent, self) => {
                parent.setAttribute("initPosition", self);
            }}
        />
        <T.BufferAttribute
            args={[ids, 1]}
            attach={(parent, self) => {
                parent.setAttribute("id", self);
            }}
        />
        <T.BufferAttribute
            args={[isHoveredArray, 1]}
            attach={(parent, self) => {
                parent.setAttribute("isHovered", self);
            }}
        />
        <T.BufferAttribute
            args={[stateInit, 3]}
            attach={(parent, self) => {
                parent.setAttribute("state", self);
            }}
        />
    </T.BufferGeometry>
    <T.ShaderMaterial
        depthWrite={false}
        vertexColors={false}
        transparent={true}
        {fragmentShader}
        {vertexShader}
        {uniforms}
    />
</T.Points>

<!-- ticks -->
{#each [5, 10, 15] as i}
    <HTML position.x={i} position.z={0} position.y={-labelDistance / 3}>
        <p class="tick">{i}</p>
    </HTML>
    <HTML position.x={-labelDistance / 2} position.z={0} position.y={i}>
        <p class="tick text-right">{i}</p>
    </HTML>
{/each}

{#if !isCameraFar}
    {#each [5, 10, 15] as i}
        <HTML position.x={21} position.z={i} position.y={0}>
            <p class="tick">{i}</p>
        </HTML>
    {/each}
{/if}

<!-- Axis label -->
<HTML position.x={10} position.z={-labelDistance} position.y={-labelDistance} center={true}>
    <p class="label md:text-md">{axisLabel(axis.x)}</p>
</HTML>
<HTML position.x={-labelDistance / 1.2} position.z={0} position.y={10} center={isCameraFar}>
    <p class="label overflow -rotate-90 md:text-md">{axisLabel(axis.y)}</p>
</HTML>
{#if !isCameraFar}
    <HTML position.x={20 + labelDistance} position.z={10} position.y={-1} center={true}>
        <p class="label md:text-md">{axisLabel(axis.z)}</p>
    </HTML>
{/if}

<style lang="postcss">
    .label {
        @apply text-slate-100;
    }
    .tick {
        @apply text-slate-400;
    }
</style>
