import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={2.8}>
        <MeshDistortMaterial
          color="#2563EB"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
};

const FloatingRing = ({ position, rotation }: {
  position: [number, number, number];
  rotation: [number, number, number];
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <torusGeometry args={[1, 0.05, 16, 100]} />
      <meshStandardMaterial
        color="#FFD600"
        metalness={0.9}
        roughness={0.1}
      />
    </mesh>
  );
};

const HeroBackground = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#FFD600" />

      <AnimatedSphere />
      <FloatingRing position={[3, 1, -2]} rotation={[0.5, 0, 0]} />
      <FloatingRing position={[-3, -1, -1]} rotation={[0, 0.5, 0.3]} />
    </Canvas>
  );
};

export default HeroBackground;