import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function SubmarineBase({ position = [0, 0, 0], scale = [1, 1, 1] }) {
  const baseRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (baseRef.current) {
      baseRef.current.position.y = position[1] + Math.sin(t * 0.5) * 0.4;
    }
  });

  return (
    <group ref={baseRef} position={position} scale={scale}>
      {/* Main Dome Habitat Pod */}
      <mesh position={[0, 4, 0]}>
        <capsuleGeometry args={[4.5, 3.5, 16, 32]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#d4e8f0" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Illuminated Glass Observation Window Ring */}
      <mesh position={[0, 4, 2.4]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[4.6, 4.6, 2.2, 32]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={2.5}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Structural Base Legs */}
      {[-3.2, 3.2].map((xPos, idx) => (
        <mesh key={idx} position={[xPos, -2.5, 0]}>
          <cylinderGeometry args={[0.5, 0.8, 8, 8]} />
          <meshStandardMaterial color="#1a2e3b" roughness={0.7} metalness={0.9} />
        </mesh>
      ))}

      {/* Connecting Glass Tunnel Tube */}
      <mesh position={[-7.5, 4, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[1.6, 1.6, 7, 16]} />
        <meshStandardMaterial
          color="#00d9d0"
          emissive="#00f0ff"
          emissiveIntensity={1.5}
          transparent
          opacity={0.7}
        />
      </mesh>

      <pointLight position={[0, 4, 5]} color="#00f0ff" intensity={5.0} distance={40} />
    </group>
  );
}
