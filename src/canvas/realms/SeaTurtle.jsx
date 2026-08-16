import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function SeaTurtle({ position = [0, 0, 0], scale = [1.5, 1.5, 1.5], speed = 0.25 }) {
  const groupRef = useRef();
  const leftFlipperRef = useRef();
  const rightFlipperRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    if (groupRef.current) {
      groupRef.current.position.x = position[0] + Math.sin(t) * 14;
      groupRef.current.position.z = position[2] + Math.cos(t) * 9;
      groupRef.current.position.y = position[1] + Math.sin(t * 1.4) * 1.5;
      groupRef.current.rotation.y = -t + Math.PI / 2;
    }
    const flipperStroke = Math.sin(state.clock.elapsedTime * 2.0) * 0.35;
    if (leftFlipperRef.current) leftFlipperRef.current.rotation.z = flipperStroke;
    if (rightFlipperRef.current) rightFlipperRef.current.rotation.z = -flipperStroke;
  });

  return (
    <group ref={groupRef} scale={scale}>
      {/* Oval Turtle Shell with Bioluminescent Cyan Glow (Matching Reference Image 2) */}
      <mesh castShadow position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <sphereGeometry args={[2.0, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <meshStandardMaterial
          color="#0066cc"
          emissive="#00f0ff"
          emissiveIntensity={1.8}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Bioluminescent Shell Pattern Grid */}
      <mesh position={[0, 0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <sphereGeometry args={[2.05, 12, 12, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <meshBasicMaterial
          color="#00f0ff"
          wireframe
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Underbelly */}
      <mesh position={[0, -0.4, 0]}>
        <sphereGeometry args={[1.8, 16, 16]} scale={[1, 0.3, 1.3]} />
        <meshStandardMaterial color="#004488" emissive="#00d9d0" emissiveIntensity={0.8} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 0.3, 2.4]}>
        <sphereGeometry args={[0.8, 12, 12]} />
        <meshStandardMaterial color="#0088cc" emissive="#00f0ff" emissiveIntensity={1.2} />
      </mesh>

      {/* Front Left Flipper */}
      <group ref={leftFlipperRef} position={[-1.5, -0.2, 1.2]}>
        <mesh position={[-1.8, 0, 0]} rotation={[0.2, 0, 0.2]}>
          <boxGeometry args={[3.2, 0.2, 1.4]} />
          <meshStandardMaterial color="#0066cc" emissive="#00f0ff" emissiveIntensity={1.5} />
        </mesh>
      </group>

      {/* Front Right Flipper */}
      <group ref={rightFlipperRef} position={[1.5, -0.2, 1.2]}>
        <mesh position={[1.8, 0, 0]} rotation={[0.2, 0, -0.2]}>
          <boxGeometry args={[3.2, 0.2, 1.4]} />
          <meshStandardMaterial color="#0066cc" emissive="#00f0ff" emissiveIntensity={1.5} />
        </mesh>
      </group>

      <pointLight color="#00f0ff" intensity={4.5} distance={25} />
    </group>
  );
}
