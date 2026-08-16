import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function CyberRuneRing({ position = [0, 0, 0], scale = [1, 1, 1] }) {
  const outerRingRef = useRef();
  const innerRingRef = useRef();
  const hudRingRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = t * 0.2;
      outerRingRef.current.rotation.y = Math.sin(t * 0.3) * 0.1;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = -t * 0.35;
    }
    if (hudRingRef.current) {
      hudRingRef.current.rotation.x = Math.sin(t * 0.5) * 0.15;
    }
  });

  return (
    <group position={position} scale={scale}>
      {/* Outer Holographic Cyber Ring */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[8.5, 0.12, 16, 64]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.7}
          wireframe
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Inner Glowing Sci-Fi Telemetry Ring */}
      <mesh ref={innerRingRef}>
        <torusGeometry args={[7.2, 0.08, 16, 48]} />
        <meshBasicMaterial
          color="#42fff3"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Radial Sci-Fi HUD Radar Reticle */}
      <mesh ref={hudRingRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[5.5, 5.65, 32]} />
        <meshBasicMaterial
          color="#00d9d0"
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <pointLight color="#00f0ff" intensity={4.0} distance={20} />
    </group>
  );
}
