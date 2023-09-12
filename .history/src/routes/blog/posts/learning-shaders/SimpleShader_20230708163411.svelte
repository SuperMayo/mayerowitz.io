<script lang="ts">
    import { T } from '@threlte/core';
    export let uniforms : any;
    export let vertexShader : string;
    export let fragmentShader : string;
</script>

<T.Mesh 
    position.x = {1.0}>
    <T.PlaneGeometry args={[1, 1, 5, 5]} />
    <T.ShaderMaterial
        {uniforms}
        wireframe={true}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader} />
</T.Mesh>