<script lang="ts">
    import { T } from '@threlte/core';
    export let uniforms : any;
    export let vertexShader : string;
    export let fragmentShader : string;
</script>

<T.PerspectiveCamera
position={[2.5, 2, 4]}>
<T.Mesh>
    <T.PlaneGeometry args={[2, 2]} />
    <T.ShaderMaterial
        {uniforms}
        {vertexShader}
        fragmentShader={fragmentShader} />
</T.Mesh>
</T.PerspectiveCamera>