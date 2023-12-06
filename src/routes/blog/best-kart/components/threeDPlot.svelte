<script>
  import * as THREE from 'three';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
  import { onMount } from 'svelte';
  import jsonData from '../assets/dataset_flat.json';

  let container;
  let camera, controls, scene, renderer;
  const particleSize = 10;

  onMount(() => {
    init();
    animate();
  });

  function init() {
    // Create scene
    scene = new THREE.Scene();

    // Create camera
    camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 1, 1000);
    camera.position.set(0, 0, 100);

    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Create controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Create particles
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];

    jsonData.forEach((data) => {
      const position = new THREE.Vector3(data.Acceleration, data.Speed, data.mini_turbo);
      positions.push(position.x, position.y, position.z);

      const color = new THREE.Color();
      color.setRGB(Math.random(), Math.random(), Math.random());
      colors.push(color.r, color.g, color.b);
      
      const loader = new THREE.TextureLoader();
      loader.load(
        data.img,
        (texture) => {
          const material = new THREE.PointsMaterial({
            size: particleSize,
            map: texture,
            alphaTest: 0.5,
            transparent: true,
          });
          const points = new THREE.Points(geometry, material);
          scene.add(points);
        }
      );
    });

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    camera.add(pointLight);
    scene.add(camera);

    // Resize
    window.addEventListener('resize', onWindowResize);
  }

  function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
</script>

<div class="three" bind:this={container}></div>

<style>
  .three {
    display: block;
    margin: auto;
    width: 50vw;
    height: 50vw;
  }
</style>