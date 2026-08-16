import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import GLBModelLoader from './GLBModelLoader';

// 1. OVERHEAD SUNLIGHT CAVERN GAP & VOLUMETRIC GOD RAYS
export function OverheadSunGap() {
  const lightRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (lightRef.current) {
      lightRef.current.intensity = 5.0 + Math.sin(t * 1.5) * 1.0;
    }
  });

  return (
    <group position={[0, 25, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0, 24, 64]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
      </mesh>

      <mesh position={[0, -25, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[35, 60, 32, 1, true]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      <spotLight
        ref={lightRef}
        position={[0, 24, 0]}
        target-position={[0, -200, 0]}
        color="#ffffff"
        intensity={6.0}
        angle={0.6}
        penumbra={0.8}
        distance={400}
      />
    </group>
  );
}

// 2. SWIRLING FISH VORTEX TORNADO (Loaded via GLB model asset)
export function SwirlingFishVortex({ count = 180 }) {
  const vortexRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.3;
    if (vortexRef.current) {
      vortexRef.current.rotation.y = t;
    }
  });

  return (
    <group ref={vortexRef} position={[0, -150, -10]}>
      <GLBModelLoader
        modelPath="/models/fish/tropical-fish.glb"
        position={[0, 0, 0]}
        scale={[0.8, 0.8, 0.8]}
        emissiveColor="#00f0ff"
        emissiveIntensity={1.5}
      />
    </group>
  );
}

// 3. OVERHEAD COLOSSAL HUMPBACK WHALE (Loaded via GLB model asset)
export function OverheadHumpbackWhale() {
  const whaleGroupRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.12;
    if (whaleGroupRef.current) {
      const x = Math.sin(t) * 30;
      const z = Math.cos(t) * 18;
      whaleGroupRef.current.position.set(x, 15, z);
      whaleGroupRef.current.rotation.y = -t + Math.PI / 2;
    }
  });

  return (
    <group ref={whaleGroupRef}>
      <GLBModelLoader
        modelPath="/models/creatures/whale.glb"
        position={[0, 0, 0]}
        scale={[3.5, 3.5, 3.5]}
        emissiveColor="#00f0ff"
        emissiveIntensity={1.5}
      />
    </group>
  );
}

// 4. SCUBA DIVER SILHOUETTE
export function DiverSilhouette({ scrollProgress = 0 }) {
  const diverRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = THREE.MathUtils.clamp(scrollProgress, 0, 1);

    if (diverRef.current) {
      const targetY = -p * 600 - 4;
      const targetZ = 32 + Math.cos(p * Math.PI * 4) * 5 - p * 20 - 8;
      const targetX = Math.sin(p * Math.PI * 5) * 6 + Math.sin(t * 0.8) * 2;

      diverRef.current.position.x = THREE.MathUtils.lerp(diverRef.current.position.x, targetX, 0.08);
      diverRef.current.position.y = THREE.MathUtils.lerp(diverRef.current.position.y, targetY, 0.08);
      diverRef.current.position.z = THREE.MathUtils.lerp(diverRef.current.position.z, targetZ, 0.08);

      diverRef.current.rotation.z = Math.sin(t * 1.5) * 0.15;
    }
  });

  return (
    <group ref={diverRef}>
      <GLBModelLoader
        modelPath="/models/creatures/diver.glb"
        position={[0, 0, 0]}
        scale={[0.8, 0.8, 0.8]}
        emissiveColor="#42fff3"
        emissiveIntensity={1.2}
      />
    </group>
  );
}
