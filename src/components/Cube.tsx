import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export const Cube = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas });

    const camera = new THREE.PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();
  }, []);

  let sizes = {
    width: 0,
    height:0,
  };

  useEffect(() => {
    sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }, []);

  return <canvas ref={canvasRef} width={sizes.width} height={sizes.height} />;
};
