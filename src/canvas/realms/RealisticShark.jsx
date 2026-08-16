import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function RealisticShark({
  position = [0, 0, 0],
  scale = [1, 1, 1],
  speed = 0.4,
  radius = 16,
  phase = 0
}) {
  const groupRef = useRef();
  const tailRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime * speed + phase;

    if (groupRef.current) {
      const angle = t;
      const x = position[0] + Math.sin(angle) * radius;
      const z = position[2] + Math.cos(angle) * (radius * 0.6);
      const y = position[1] + Math.sin(t * 1.5) * 2;

      groupRef.current.position.set(x, y, z);
      groupRef.current.rotation.y = -angle + Math.PI / 2;
      groupRef.current.rotation.z = Math.sin(t * 2) * 0.1;
    }

    if (tailRef.current) {
      tailRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 4 + phase) * 0.35;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      {/* Hydrodynamic Organic Sculpted Shark Body with Bioluminescent Glow (Reference Image 5) */}
      <mesh castShadow position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.4, 1.3, 7, 32]} />
        <meshStandardMaterial
          color="#004488"
          emissive="#00f0ff"
          emissiveIntensity={1.8}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Bioluminescent Wireframe Contour Grid */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.42, 1.32, 7.05, 16]} />
        <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.65} />
      </mesh>

      {/* Tapered Shark Nose */}
      <mesh position={[0, 0, 4.2]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.8, 2.2, 32]} />
        <meshStandardMaterial color="#004488" emissive="#00f0ff" emissiveIntensity={1.8} />
      </mesh>

      {/* Dorsal Fin */}
      <mesh position={[0, 1.5, 0.4]} rotation={[-0.4, 0, 0]}>
        <coneGeometry args={[0.35, 2.4, 16]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2.2} />
      </mesh>

      {/* Pectoral Fins */}
      <mesh position={[-1.7, -0.4, 1.2]} rotation={[0.2, 0, -0.8]}>
        <boxGeometry args={[3.2, 0.25, 1.6]} />
        <meshStandardMaterial color="#0055aa" emissive="#00f0ff" emissiveIntensity={1.6} />
      </mesh>
      <mesh position={[1.7, -0.4, 1.2]} rotation={[0.2, 0, 0.8]}>
        <boxGeometry args={[3.2, 0.25, 1.6]} />
        <meshStandardMaterial color="#0055aa" emissive="#00f0ff" emissiveIntensity={1.6} />
      </mesh>

      {/* Swishing Tail Fin */}
      <group ref={tailRef} position={[0, 0, -3.5]}>
        <mesh position={[0, 0, -1.2]} rotation={[0.5, 0, 0]}>
          <coneGeometry args={[0.3, 3.4, 16]} />
          <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2.2} />
        </mesh>
      </group>

      <pointLight color="#00f0ff" intensity={5.0} distance={30} />
    </group>
  );
}
