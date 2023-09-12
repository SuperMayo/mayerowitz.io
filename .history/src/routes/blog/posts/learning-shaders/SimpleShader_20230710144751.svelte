<script lang="ts">
    import { T } from '@threlte/core';
    import { OrbitControls, Grid } from '@threlte/extras';
    export let uniforms : any;
    export let vertexShader : string;
    export let fragmentShader : string;
</script>

<T.PerspectiveCamera
makeDefault
position={[-10, 10, 10]}
fov={15}
>
<OrbitControls
  autoRotate
  enableZoom={false}
  enableDamping
  autoRotateSpeed={0.5}
  target.y={0.}
/>
</T.PerspectiveCamera>
<Grid
position.y={0.0}
cellColor="#ffffff"
sectionColor="#ffffff"
sectionThickness={0}
fadeDistance={25}
cellSize={1}
/>
<T.Mesh >
    <T.PlaneGeometry args={[2, 2, 5, 5]} />
    <T.ShaderMaterial
        {uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader} />
</T.Mesh>