import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function SubmergedCanyonWalls() {
  const kelpGroupRef = useRef();

  // Kelp Stalks & Leaves along canyon walls
  const kelpData = useMemo(() => {
    const items = [];
    for (let i = 0; i < 40; i++) {
      const isLeft = i % 2 === 0;
      items.push({
        x: isLeft ? -16 - Math.random() * 8 : 16 + Math.random() * 8,
        y: -i * 15,
        z: -Math.random() * 20,
        height: 25 + Math.random() * 15,
        phase: Math.random() * Math.PI * 2
      });
    }
    return items;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (kelpGroupRef.current) {
      kelpGroupRef.current.children.forEach((kelp, idx) => {
        kelp.rotation.z = Math.sin(t * 0.8 + idx) * 0.08;
      });
    }
  });

  return (
    <group>
      {/* LEFT & RIGHT TOWERING CANYON WALL ROCKS (Matching Reference Image 2) */}
      <mesh position={[-28, -300, -20]} rotation={[0, 0.4, 0]}>
        <boxGeometry args={[20, 650, 40]} />
        <meshStandardMaterial color="#082230" roughness={0.95} />
      </mesh>
      <mesh position={[28, -300, -20]} rotation={[0, -0.4, 0]}>
        <boxGeometry args={[20, 650, 40]} />
        <meshStandardMaterial color="#082230" roughness={0.95} />
      </mesh>

      {/* WHITE SANDY OCEAN FLOOR BED AT BOTTOM (1000m) */}
      <mesh position={[0, -620, -10]} rotation={[-Math.PI / 2 + 0.1, 0, 0]}>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial color="#b2d8d8" roughness={0.8} />
      </mesh>

      {/* TOWERING GREEN KELP FOREST STALKS */}
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

      {/* BIOLUMINESCENT MAGENTA & PURPLE MUSHROOM FLORA (Matching Reference Image 1) */}
      {[-100, -220, -340, -460, -580].map((yPos, idx) => (
        <group key={idx} position={[0, yPos, -12]}>
          {/* Left Bioluminescent Mushroom Cluster */}
          <group position={[-15, 0, 0]}>
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

          {/* Right Bioluminescent Mushroom Cluster */}
          <group position={[15, 0, 0]}>
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
