import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function SubmergedCanyonWalls() {
  const kelpGroupRef = useRef();
  const ventsRef = useRef();

  // Kelp Stalks along upper canyon walls
  const kelpData = useMemo(() => {
    const items = [];
    for (let i = 0; i < 35; i++) {
      const isLeft = i % 2 === 0;
      items.push({
        x: isLeft ? -18 - Math.random() * 8 : 18 + Math.random() * 8,
        y: -i * 14,
        z: -Math.random() * 20,
        height: 22 + Math.random() * 14
      });
    }
    return items;
  }, []);

  // 100 Hydrothermal Vent Smoke Particles at Hadal Trench (850m - 1000m)
  const particleCount = 100;
  const ventParticles = useMemo(() => {
    const p = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      p[i * 3] = (Math.random() - 0.5) * 16;
      p[i * 3 + 1] = -550 - Math.random() * 80;
      p[i * 3 + 2] = -15 + (Math.random() - 0.5) * 12;
    }
    return p;
  }, [particleCount]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // Kelp Swaying in Ocean Current
    if (kelpGroupRef.current) {
      kelpGroupRef.current.children.forEach((kelp, idx) => {
        kelp.rotation.z = Math.sin(t * 0.8 + idx) * 0.08;
      });
    }

    // Hydrothermal Smoke Plumes Rising
    if (ventsRef.current) {
      const positions = ventsRef.current.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += delta * 4.0; // Smoke rises upward
        if (positions[i * 3 + 1] > -500) {
          positions[i * 3 + 1] = -600; // Loop smoke plume back to vents
        }
      }
      ventsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* 1. NATURAL UNDERWATER CANYON CLIFF WALLS (Zero Artificial Poles) */}
      <mesh position={[-32, -300, -20]} rotation={[0, 0.4, 0]}>
        <boxGeometry args={[26, 680, 45]} />
        <meshStandardMaterial color="#061824" roughness={0.95} />
      </mesh>
      <mesh position={[32, -300, -20]} rotation={[0, -0.4, 0]}>
        <boxGeometry args={[26, 680, 45]} />
        <meshStandardMaterial color="#061824" roughness={0.95} />
      </mesh>

      {/* 2. NATURAL ROCK ARCHES & CAVE REEF SHELVES */}
      {[-80, -200, -320, -440, -560].map((yPos, idx) => (
        <group key={idx} position={[0, yPos, -18]}>
          {/* Left Rock Cliff Outcropping */}
          <mesh position={[-18, 0, 0]} rotation={[0.2, 0.5, 0.1]} castShadow receiveShadow>
            <dodecahedronGeometry args={[8, 1]} />
            <meshStandardMaterial color="#081e2b" roughness={0.9} />
          </mesh>

          {/* Right Rock Cliff Outcropping */}
          <mesh position={[18, 0, 0]} rotation={[-0.2, -0.5, -0.1]} castShadow receiveShadow>
            <dodecahedronGeometry args={[8, 1]} />
            <meshStandardMaterial color="#081e2b" roughness={0.9} />
          </mesh>
        </group>
      ))}

      {/* 3. HADAL TRENCH HYDROTHERMAL VENT SMOKER CHIMNEYS (850m - 1000m) */}
      <group position={[0, -590, -20]}>
        <mesh position={[-8, 0, 0]}>
          <cylinderGeometry args={[1.2, 2.8, 18, 16]} />
          <meshStandardMaterial color="#030a10" roughness={0.95} />
        </mesh>
        <pointLight position={[-8, 9, 0]} color="#00f0ff" intensity={5.0} distance={25} />

        <mesh position={[8, 0, 0]}>
          <cylinderGeometry args={[1.2, 2.8, 18, 16]} />
          <meshStandardMaterial color="#030a10" roughness={0.95} />
        </mesh>
        <pointLight position={[8, 9, 0]} color="#42fff3" intensity={5.0} distance={25} />
      </group>

      {/* Hydrothermal Smoke Plume Particles */}
      <points ref={ventsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[ventParticles, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={1.2}
          color="#00f0ff"
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* 4. BLACK SAND TRENCH SEABED AT HADAL CORE (1000m) */}
      <mesh position={[0, -620, -10]} rotation={[-Math.PI / 2 + 0.1, 0, 0]}>
        <planeGeometry args={[130, 130]} />
        <meshStandardMaterial color="#040e17" roughness={0.95} />
      </mesh>

      {/* 5. TOWERING GREEN KELP FOREST STALKS (Surface & Shallow Zones) */}
      <group ref={kelpGroupRef}>
        {kelpData.map((item, idx) => (
          <group key={idx} position={[item.x, item.y, item.z]}>
            <mesh>
              <cylinderGeometry args={[0.15, 0.25, item.height, 8]} />
              <meshStandardMaterial color="#2d7d46" roughness={0.6} />
            </mesh>
            {[-6, 0, 6].map((leafY, lIdx) => (
              <mesh key={lIdx} position={[0.6, leafY, 0]} rotation={[0, 0, 0.4]}>
                <boxGeometry args={[1.8, 0.1, 0.8]} />
                <meshStandardMaterial color="#3aa85d" roughness={0.5} />
              </mesh>
            ))}
          </group>
        ))}
      </group>

      {/* 6. BIOLUMINESCENT MAGENTA & PURPLE MUSHROOM FLORA */}
      {[-120, -240, -360, -480].map((yPos, idx) => (
        <group key={idx} position={[0, yPos, -14]}>
          <group position={[-16, 0, 0]}>
            <mesh position={[0, 2, 0]}>
              <cylinderGeometry args={[1.8, 0.4, 3, 16]} />
              <meshStandardMaterial
                color="#b5179e"
                emissive="#f72585"
                emissiveIntensity={1.5}
                transparent
                opacity={0.85}
              />
            </mesh>
            <pointLight color="#f72585" intensity={3.0} distance={20} />
          </group>

          <group position={[16, 0, 0]}>
            <mesh position={[0, 2, 0]}>
              <cylinderGeometry args={[1.8, 0.4, 3, 16]} />
              <meshStandardMaterial
                color="#7209b7"
                emissive="#4cc9f0"
                emissiveIntensity={1.5}
                transparent
                opacity={0.85}
              />
            </mesh>
            <pointLight color="#4cc9f0" intensity={3.0} distance={20} />
          </group>
        </group>
      ))}
    </group>
  );
}
