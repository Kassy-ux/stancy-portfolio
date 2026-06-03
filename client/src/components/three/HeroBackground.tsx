import { useEffect, useRef } from 'react';
import {
  AmbientLight,
  Clock,
  Color,
  DirectionalLight,
  Group,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  SphereGeometry,
  TorusGeometry,
  WebGLRenderer,
} from 'three';

const HeroBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new Scene();
    const camera = new PerspectiveCamera(45, 1, 0.1, 100);
    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    const clock = new Clock();
    const group = new Group();

    camera.position.set(0, 0, 6);
    renderer.setClearColor(new Color(0x000000), 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    container.appendChild(renderer.domElement);

    scene.add(new AmbientLight(0xffffff, 0.5));
    const keyLight = new DirectionalLight(0xffffff, 1);
    keyLight.position.set(10, 10, 5);
    scene.add(keyLight);

    const goldLight = new PointLight(0xffd600, 0.6);
    goldLight.position.set(-10, -10, -5);
    scene.add(goldLight);

    const sphereGeometry = new SphereGeometry(1, 48, 48);
    const sphereMaterial = new MeshStandardMaterial({
      color: 0x2563eb,
      metalness: 0.82,
      roughness: 0.16,
    });
    const sphere = new Mesh(sphereGeometry, sphereMaterial);
    sphere.scale.set(2.55, 2.55, 2.55);
    group.add(sphere);

    const ringGeometry = new TorusGeometry(1, 0.05, 16, 96);
    const ringMaterial = new MeshStandardMaterial({
      color: 0xffd600,
      metalness: 0.9,
      roughness: 0.12,
    });

    const ringA = new Mesh(ringGeometry, ringMaterial);
    ringA.position.set(3, 1, -2);
    ringA.rotation.set(0.5, 0, 0);
    group.add(ringA);

    const ringB = new Mesh(ringGeometry, ringMaterial);
    ringB.position.set(-3, -1, -1);
    ringB.rotation.set(0, 0.5, 0.3);
    group.add(ringB);

    scene.add(group);

    const resize = () => {
      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    let frameId = 0;
    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const pulse = Math.sin(elapsed * 1.45) * 0.08;

      group.position.y = Math.sin(elapsed * 0.65) * 0.12;
      sphere.rotation.x = elapsed * 0.1;
      sphere.rotation.y = elapsed * 0.15;
      sphere.scale.set(2.55 + pulse, 2.48 - pulse * 0.45, 2.55 + pulse * 0.35);
      ringA.rotation.x = 0.5 + elapsed * 0.2;
      ringA.rotation.y = elapsed * 0.1;
      ringB.rotation.x = elapsed * 0.2;
      ringB.rotation.y = 0.5 + elapsed * 0.1;

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener('resize', resize);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      container.removeChild(renderer.domElement);
      sphereGeometry.dispose();
      ringGeometry.dispose();
      sphereMaterial.dispose();
      ringMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0" aria-hidden="true" />;
};

export default HeroBackground;
