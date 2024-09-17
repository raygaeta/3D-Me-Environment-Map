'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { GroundedSkybox } from 'three/examples/jsm/objects/GroundedSkybox.js';

const ThreeScene = () => {
  const canvasRef = useRef(null);
  const mixerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const canvas = canvasRef.current;

    // Scene setup
    const scene = new THREE.Scene();

    // Load environment map (HDR)
    const rgbeLoader = new RGBELoader();
    rgbeLoader.load(
      '/sanctuary4k.hdr',
      (environmentMap) => {
        environmentMap.mapping = THREE.EquirectangularReflectionMapping;
        scene.background = environmentMap;
        scene.environment = environmentMap;
        const skybox = new GroundedSkybox(environmentMap, 15, 70);
        skybox.position.y = 15;
        scene.add(skybox);
      },
      undefined,
      (error) => {
        console.error('Error loading HDR image:', error);
      }
    );

    // Load 3D model
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      '/digiDouble.glb',
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(3, 3, 3);
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        scene.add(model);

        const mixer = new THREE.AnimationMixer(model);
        mixerRef.current = mixer;

        const animations = gltf.animations;
        if (animations.length > 0) {
          const clip = animations[1];
          const action = mixer.clipAction(clip);
          action.timeScale = 0.75; // Adjust animation speed
          
          action.setLoop(THREE.LoopRepeat, Infinity);
          action.play();
        }
      },
      undefined,
      (error) => {
        console.error('Error loading GLTF model:', error);
      }
    );

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(4, 5, 4);
    scene.add(camera);

    // Controls setup
    const controls = new OrbitControls(camera, canvas);
    controls.target.y = 3.5;
    controls.enableDamping = true;
    controls.enableZoom = false;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Resize handling with debounce
    const debounce = (func, wait) => {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    };
    const updateSize = debounce(() => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }, 0);
    window.addEventListener('resize', updateSize);

    // Animation loop
    const clock = new THREE.Clock();
    const tick = () => {
      const delta = clock.getDelta();
      if (mixerRef.current) {
        mixerRef.current.update(delta);
      }
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };
    tick();

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', updateSize);
      renderer.dispose();
      controls.dispose();
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="webgl"
        style={{
          position: 'relative',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
        }}
      />
    </>
  );
};

export default ThreeScene;
