import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

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

// 2. MASSIVE SWIRLING FISH VORTEX TORNADO (800 Fishes Spanning 600m Depth)
export function SwirlingFishVortex({ count = 800 }) {
  const vortexRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const vortexData = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const heightPercent = i / count;
      return {
        y: -heightPercent * 600, // Spans down 600m
        radius: 7 + Math.sin(heightPercent * Math.PI * 6) * 9,
        angleSpeed: 0.35 + Math.random() * 0.45,
        phase: Math.random() * Math.PI * 2,
        scale: 0.28 + Math.random() * 0.35
      };
    });
  }, [count]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (vortexRef.current) {
      vortexData.forEach((fish, i) => {
        const angle = t * fish.angleSpeed + fish.phase;
        const x = Math.sin(angle) * fish.radius;
        const z = Math.cos(angle) * fish.radius;
        const y = fish.y + Math.sin(t * 1.2 + fish.phase) * 1.5;

        dummy.position.set(x, y, z);
        dummy.rotation.set(0, -angle + Math.PI / 2, Math.sin(t * 2 + fish.phase) * 0.2);
        dummy.scale.setScalar(fish.scale);
        dummy.updateMatrix();

        vortexRef.current.setMatrixAt(i, dummy.matrix);
      });
      vortexRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={vortexRef} args={[null, null, count]}>
      <coneGeometry args={[0.35, 1.4, 6]} />
      <meshStandardMaterial
        color="#00d9d0"
        emissive="#00f0ff"
        emissiveIntensity={0.9}
        roughness={0.2}
      />
    </instancedMesh>
  );
}

// 3. OVERHEAD COLOSSAL HUMPBACK WHALE
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
      <mesh scale={[3.2, 2.2, 16.0]} rotation={[0.1, 0, 0]}>
        <capsuleGeometry args={[2, 6, 16, 32]} />
        <meshStandardMaterial color="#082938" emissive="#00f0ff" emissiveIntensity={1.2} roughness={0.4} />
      </mesh>
      <mesh position={[-4.5, -0.6, 2.0]} rotation={[0, 0, -0.6]}>
        <boxGeometry args={[6.5, 0.4, 2.4]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={1.5} />
      </mesh>
      <mesh position={[4.5, -0.6, 2.0]} rotation={[0, 0, 0.6]}>
        <boxGeometry args={[6.5, 0.4, 2.4]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={1.5} />
      </mesh>
      <mesh position={[0, 0.8, -15]} rotation={[0.4, 0, 0]}>
        <boxGeometry args={[9.0, 0.4, 3.2]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={1.8} />
      </mesh>
      <pointLight color="#00f0ff" intensity={6.0} distance={50} />
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
      <mesh>
        <capsuleGeometry args={[0.45, 2.0, 4, 12]} />
        <meshBasicMaterial color="#020810" />
      </mesh>
      <mesh position={[0, -1.8, -0.6]} rotation={[0.6, 0, 0]}>
        <boxGeometry args={[1.2, 0.1, 1.8]} />
        <meshBasicMaterial color="#020810" />
      </mesh>
    </group>
  );
}
