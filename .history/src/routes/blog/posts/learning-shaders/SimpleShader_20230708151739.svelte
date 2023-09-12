<script lang="ts">
    import { T } from '@threlte/core';
    export let uniforms : any;
    export let vertexShader : string;
    export let fragmentShader : string;
</script>

<T.Mesh>
    <T.ShaderMaterial
        {uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader} />
</T.Mesh>