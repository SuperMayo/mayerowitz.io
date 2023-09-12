<script lang="ts">
    import { T } from '@threlte/core';
    export let uniforms : any;
    export let vertexShader : string;
    export let fragmentShader : string;
</script>

<T.Mesh>
    <T.PlaneGeometry args={[2, 2, 1, 1]} />
    <T.ShaderMaterial
        {uniforms}
        wireframe={true}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader} />
</T.Mesh>