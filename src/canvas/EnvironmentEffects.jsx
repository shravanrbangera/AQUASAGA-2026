import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function EnvironmentEffects({ scrollProgress = 0 }) {
  const fogRef = useRef();
  const godRaysRef = useRef();

  // Floating Water Bio Particles (300 Glowing Motes)
  const particleCount = 300;
  const particles = useMemo(() => {
    const p = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      p[i * 3] = (Math.random() - 0.5) * 80;
      p[i * 3 + 1] = -Math.random() * 650;
      p[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    return p;
  }, [particleCount]);

  useFrame((state) => {
    const p = THREE.MathUtils.clamp(scrollProgress, 0, 1);
    const t = state.clock.elapsedTime;

    // Dynamic Ocean Fog & Background Transition based on depth
    // 0m (Surface Sunlight): Vibrant Cyan (#005b82) -> 1000m (Abyssal Core): Deep Sapphire (#02111c)
    if (fogRef.current) {
      const surfaceColor = new THREE.Color('#005b82');
      const deepColor = new THREE.Color('#02111c');
      fogRef.current.color.lerpColors(surfaceColor, deepColor, p);
      fogRef.current.near = THREE.MathUtils.lerp(15, 5, p);
      fogRef.current.far = THREE.MathUtils.lerp(180, 90, p);
    }

    if (godRaysRef.current) {
      godRaysRef.current.rotation.y = t * 0.05;
      godRaysRef.current.position.y = -p * 600;
    }
  });

  return (
    <>
      {/* Underwater Dynamic Fog */}
      <fog ref={fogRef} attach="fog" args={['#005b82', 15, 180]} />

      {/* Surface Ambient & Hemisphere Ocean Lights */}
      <ambientLight intensity={2.5} />
      <hemisphereLight skyColor="#00f0ff" groundColor="#02111c" intensity={3.5} />

      {/* Volumetric Sunshaft Directional Light */}
      <directionalLight
        position={[10, 50, 20]}
        intensity={5.0}
        color="#00f0ff"
        castShadow
      />

      {/* Volumetric God Rays Cylinder Shaft */}
      <group ref={godRaysRef} position={[0, 0, 0]}>
        <mesh position={[0, -250, -10]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[45, 75, 700, 32, 1, true]} />
          <meshBasicMaterial
            color="#00f0ff"
            transparent
            opacity={0.15}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* 300 Floating Bio Particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particles, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.8}
          color="#00f0ff"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  );
}
