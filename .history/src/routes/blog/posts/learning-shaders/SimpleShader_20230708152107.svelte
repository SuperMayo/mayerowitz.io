<script lang="ts">
    import { T } from '@threlte/core';
    export let uniforms : any;
    export let vertexShader : string;
    export let fragmentShader : string;
</script>

<T.Mesh>
    <T.PlaneGeometry args={[1, 1, 32, 32]} />
    <T.ShaderMaterial
        {uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader} />
</T.Mesh>