(() => {
  'use strict';

  const initThreeArena = () => {
    const container = document.getElementById('threeContainer');
    if (!container || !window.THREE) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);

    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    container.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x25c2ff, metalness: 0.4, roughness: 0.5 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const light = new THREE.DirectionalLight(0xffffff, 1.2);
    light.position.set(2, 2, 4);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.25));

    const resize = () => {
      const { clientWidth, clientHeight } = container;
      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / Math.max(clientHeight, 1);
      camera.updateProjectionMatrix();
    };

    let animationId = 0;
    const render = () => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.015;
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener('resize', resize);

    window.addEventListener('beforeunload', () => {
      cancelAnimationFrame(animationId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    });
  };

  document.addEventListener('DOMContentLoaded', initThreeArena);
})();
