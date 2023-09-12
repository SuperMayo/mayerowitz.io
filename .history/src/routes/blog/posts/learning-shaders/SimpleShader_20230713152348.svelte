<script lang="ts">
    import { T } from '@threlte/core';
    import { OrbitControls, Grid } from '@threlte/extras';
    export let uniforms : any;
    export let vertexShader : string;
    export let fragmentShader : string;
</script>

<T.Mesh >
    <T.PlaneGeometry args={[1, 1, 1, 1]} />
    <T.ShaderMaterial
        {uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader} />
</T.Mesh>