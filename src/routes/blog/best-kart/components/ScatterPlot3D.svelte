<script lang="ts">
    import { onMount } from "svelte";
    import { Canvas, T } from "@threlte/core";
    import {Align, OrbitControls} from "@threlte/extras";
    import { TextureLoader, PointsMaterial, BufferGeometry, Float32BufferAttribute} from "three";
    import dataset from "../assets/dataset_flat.json";

  let data = dataset.filter((d) => d.type === "body");
  const size = data.length;
  const particleSize = 10;
  let pointsComponents = [];
  let materials = [];

  const positions = new Float32Array(size * 3)

  onMount(() => {
    const loader = new TextureLoader();

    data.forEach(item => {
      loader.load(item.img_url, (texture) => {
        const material = new PointsMaterial({
          size: particleSize,
          map: texture,
          alphaTest: 1,
          transparent: false,
        });
        const positions =  new Float32BufferAttribute([item.Acceleration, item.Speed, item.mini_turbo], 3);
        pointsComponents.push({ material, positions });
      });
    });

    for (let i = 0; i < size; i++) {
      positions[i * 3 + 0] = data[i].Acceleration;
      positions[i * 3 + 1] = data[i].Speed;
      positions[i * 3 + 2] = data[i].mini_turbo;
    }
  });
</script>

<div class="w-full h-screen">
<Canvas>
    <T.PerspectiveCamera
    makeDefault
    position={[0, 50, 100]}
    fov={15}
  >
    <OrbitControls autoRotate />
  </T.PerspectiveCamera>
  <T.DirectionalLight
    position.y={10}
    position.z={10}
  />

  <Align>
    <T.Points>
      <T.BufferGeometry>
        <T.BufferAttribute
          args={[positions, 3]}
          attach={(parent, self) => {
            parent.setAttribute('position', self)
            return () => {
              // cleanup function called when ref changes or the component unmounts
              // https://threlte.xyz/docs/reference/core/t#attach
            }
          }}
        />
      </T.BufferGeometry>
      <T.PointsMaterial size={particleSize} color="black" />
    </T.Points>
  </Align>
</Canvas>
</div>