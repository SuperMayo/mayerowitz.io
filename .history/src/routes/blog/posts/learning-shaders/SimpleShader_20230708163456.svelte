<script lang="ts">
    import { T } from '@threlte/core';
    export let uniforms : any;
    export let vertexShader : string;
    export let fragmentShader : string;
</script>

<T.Mesh 
    position.y = {-0.5}
    position.x = {-0.5}>
    <T.PlaneGeometry args={[1, 1, 5, 5]} />
    <T.ShaderMaterial
        {uniforms}
        wireframe={true}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader} />
</T.Mesh>