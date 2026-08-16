import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import GLBModelLoader from './GLBModelLoader';

// 1. MANTA RAY (Loaded via GLB model asset)
export function MantaRay({ position = [0, 0, 0], scale = [1.4, 1.4, 1.4], speed = 0.35 }) {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    if (groupRef.current) {
      groupRef.current.position.x = position[0] + Math.sin(t) * 12;
      groupRef.current.position.z = position[2] + Math.cos(t) * 8;
      groupRef.current.position.y = position[1] + Math.sin(t * 1.5) * 1.2;
      groupRef.current.rotation.y = -t + Math.PI / 2;
    }
  });

  return (
    <group ref={groupRef}>
      <GLBModelLoader
        modelPath="/models/creatures/ray.glb"
        position={[0, 0, 0]}
        scale={scale}
        emissiveColor="#00f0ff"
        emissiveIntensity={1.2}
      />
    </group>
  );
}

// 2. HAMMERHEAD SHARK (Loaded via GLB model asset)
export function HammerheadShark({ position = [0, 0, 0], scale = [1.8, 1.8, 1.8], speed = 0.35 }) {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    if (groupRef.current) {
      groupRef.current.position.x = position[0] + Math.sin(t) * 15;
      groupRef.current.position.z = position[2] + Math.cos(t) * 9;
      groupRef.current.position.y = position[1] + Math.sin(t * 1.2) * 1.5;
      groupRef.current.rotation.y = -t + Math.PI / 2;
    }
  });

  return (
    <group ref={groupRef}>
      <GLBModelLoader
        modelPath="/models/creatures/hammerhead.glb"
        position={[0, 0, 0]}
        scale={scale}
        emissiveColor="#00f0ff"
        emissiveIntensity={1.0}
      />
    </group>
  );
}

// 3. ELECTRIC EEL (Loaded via GLB model asset)
export function ElectricEel({ position = [0, 0, 0], scale = [1.4, 1.4, 1.4], speed = 0.35 }) {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    if (groupRef.current) {
      groupRef.current.position.x = position[0] + Math.sin(t) * 10;
      groupRef.current.position.z = position[2] + Math.cos(t) * 6;
      groupRef.current.position.y = position[1] + Math.sin(t * 1.8) * 1.0;
    }
  });

  return (
    <group ref={groupRef}>
      <GLBModelLoader
        modelPath="/models/creatures/electric-eel.glb"
        position={[0, 0, 0]}
        scale={scale}
        emissiveColor="#42fff3"
        emissiveIntensity={2.5}
      />
    </group>
  );
}

// 4. COLOSSAL SQUID (Loaded via GLB model asset)
export function ColossalSquid({ position = [0, 0, 0], scale = [1.6, 1.6, 1.6] }) {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(t * 0.8) * 1.5;
    }
  });

  return (
    <group ref={groupRef}>
      <GLBModelLoader
        modelPath="/models/creatures/squid.glb"
        position={[0, 0, 0]}
        scale={scale}
        emissiveColor="#ff007f"
        emissiveIntensity={1.8}
      />
    </group>
  );
}

// 5. GIANT PACIFIC OCTOPUS (Loaded via GLB model asset)
export function GiantOctopus({ position = [0, 0, 0], scale = [1.2, 1.2, 1.2] }) {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <GLBModelLoader
        modelPath="/models/creatures/octopus.glb"
        position={[0, 0, 0]}
        scale={scale}
        emissiveColor="#00f0ff"
        emissiveIntensity={1.5}
      />
    </group>
  );
}
