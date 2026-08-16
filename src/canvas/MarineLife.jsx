import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { True3DShark, True3DAnglerfish, True3DSwordfish, True3DTurtle, True3DJellyfish, True3DWhale, True3DSeahorse } from './realms/True3DFishModels';
import { MantaRay, HammerheadShark, ElectricEel, ColossalSquid, GiantOctopus } from './realms/OceanSpecies';

export default function MarineLife({ scrollProgress = 0 }) {
  const smallFishRef = useRef();
  const diversGroupRef = useRef();

  // Multi-colored Tropical Fish School (600 Fishes Spanning 0m - 600m)
  const smallFishCount = 600;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const smallFishData = useMemo(() => {
    const colors = ['#ff9f1c', '#2ec4b6', '#e71d36', '#ff9f1c', '#00f0ff', '#ff007f', '#ffbf69', '#42fff3'];
    return Array.from({ length: smallFishCount }, (_, i) => ({
      x: (Math.random() - 0.5) * 80,
      y: -Math.random() * 600,
      z: (Math.random() - 0.5) * 55,
      speed: 0.35 + Math.random() * 0.55,
      radius: 5 + Math.random() * 14,
      phase: Math.random() * Math.PI * 2,
      scale: 0.25 + Math.random() * 0.35,
      color: colors[i % colors.length]
    }));
  }, [smallFishCount]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // 1. 600 Tropical Fishes Swirling Orbits
    if (smallFishRef.current) {
      smallFishData.forEach((fish, i) => {
        const angle = t * fish.speed + fish.phase;
        const x = fish.x + Math.sin(angle) * fish.radius;
        const z = fish.z + Math.cos(angle) * fish.radius;
        const y = fish.y + Math.sin(t * 0.6 + fish.phase) * 2;

        dummy.position.set(x, y, z);
        dummy.rotation.set(0, -angle + Math.PI / 2, Math.sin(t * 2 + fish.phase) * 0.15);
        dummy.scale.setScalar(fish.scale);
        dummy.updateMatrix();

        smallFishRef.current.setMatrixAt(i, dummy.matrix);
      });
      smallFishRef.current.instanceMatrix.needsUpdate = true;
    }

    // 2. Divers Exploring Shipwreck
    if (diversGroupRef.current) {
      diversGroupRef.current.children.forEach((diver, idx) => {
        const swayAngle = t * 0.5 + idx * 2;
        diver.position.x += Math.sin(swayAngle) * 0.05;
        diver.position.y += Math.cos(swayAngle * 0.7) * 0.03;
        diver.rotation.z = Math.sin(swayAngle * 0.5) * 0.1;
      });
    }
  });

  return (
    <>
      {/* 600 MULTI-COLORED TROPICAL FISHES */}
      <instancedMesh ref={smallFishRef} args={[null, null, smallFishCount]}>
        <coneGeometry args={[0.38, 1.4, 6]} />
        <meshStandardMaterial
          color="#ff9f1c"
          emissive="#ffbf69"
          emissiveIntensity={0.8}
          roughness={0.2}
        />
      </instancedMesh>

      {/* DEPTH ZONE 1 (0m - 180m): HUMPBACK WHALES, SWORDFISH, SEA TURTLES, MANTA RAYS & SEAHORSES */}
      <True3DWhale position={[0, -60, -10]} scale={[2.2, 2.2, 2.2]} />

      <True3DSwordfish position={[-12, -40, -12]} scale={[1.8, 1.8, 1.8]} speed={0.4} />
      <True3DSwordfish position={[14, -100, -10]} scale={[1.6, 1.6, 1.6]} speed={0.35} />
      <True3DSwordfish position={[-8, -160, -14]} scale={[1.9, 1.9, 1.9]} speed={0.45} />

      <True3DTurtle position={[-10, -50, -12]} scale={[1.5, 1.5, 1.5]} speed={0.25} />
      <True3DTurtle position={[12, -120, -14]} scale={[1.4, 1.4, 1.4]} speed={0.3} />
      <True3DTurtle position={[-6, -170, -10]} scale={[1.6, 1.6, 1.6]} speed={0.2} />

      {/* 3D Bioluminescent Seahorses Drifting near Vegetation */}
      <True3DSeahorse position={[-12, -70, -10]} scale={[1.2, 1.2, 1.2]} speed={0.2} />
      <True3DSeahorse position={[10, -160, -12]} scale={[1.3, 1.3, 1.3]} speed={0.25} />
      <True3DSeahorse position={[-6, -230, -14]} scale={[1.1, 1.1, 1.1]} speed={0.18} />

      <MantaRay position={[10, -30, -15]} scale={[1.4, 1.4, 1.4]} speed={0.35} />
      <MantaRay position={[-14, -90, -12]} scale={[1.5, 1.5, 1.5]} speed={0.3} />
      <MantaRay position={[8, -150, -16]} scale={[1.6, 1.6, 1.6]} speed={0.4} />

      {/* DEPTH ZONE 2 (180m - 400m): GREAT WHITE SHARKS, HAMMERHEAD SHARKS, ELECTRIC EELS & JELLYFISH */}
      <True3DShark position={[8, -200, -10]} scale={[2.0, 2.0, 2.0]} speed={0.3} radius={15} />
      <True3DShark position={[-10, -280, -12]} scale={[2.2, 2.2, 2.2]} speed={0.35} radius={18} />
      <True3DShark position={[12, -360, -14]} scale={[1.9, 1.9, 1.9]} speed={0.25} radius={14} />

      <HammerheadShark position={[-12, -220, -15]} scale={[1.9, 1.9, 1.9]} speed={0.35} />
      <HammerheadShark position={[14, -290, -12]} scale={[2.0, 2.0, 2.0]} speed={0.3} />
      <HammerheadShark position={[-8, -350, -16]} scale={[1.8, 1.8, 1.8]} speed={0.4} />

      <ElectricEel position={[8, -240, -12]} scale={[1.3, 1.3, 1.3]} speed={0.35} />
      <ElectricEel position={[-12, -310, -10]} scale={[1.4, 1.4, 1.4]} speed={0.3} />
      <ElectricEel position={[10, -380, -15]} scale={[1.5, 1.5, 1.5]} speed={0.4} />

      {/* 8 Bioluminescent Jellyfish Floating in Depth Clusters */}
      <True3DJellyfish position={[-12, -210, -14]} scale={[1.6, 1.6, 1.6]} />
      <True3DJellyfish position={[10, -260, -12]} scale={[1.4, 1.4, 1.4]} />
      <True3DJellyfish position={[-8, -320, -16]} scale={[1.7, 1.7, 1.7]} />
      <True3DJellyfish position={[14, -390, -10]} scale={[1.5, 1.5, 1.5]} />

      {/* DEPTH ZONE 3 (400m - 700m): DEEP SEA ANGLERFISH & COLOSSAL SQUID */}
      <True3DAnglerfish position={[-6, -430, -10]} scale={[1.8, 1.8, 1.8]} speed={0.25} />
      <True3DAnglerfish position={[8, -500, -12]} scale={[2.0, 2.0, 2.0]} speed={0.3} />
      <True3DAnglerfish position={[-10, -580, -14]} scale={[1.7, 1.7, 1.7]} speed={0.2} />

      <ColossalSquid position={[10, -470, -18]} scale={[1.5, 1.5, 1.5]} />
      <ColossalSquid position={[-12, -540, -16]} scale={[1.7, 1.7, 1.7]} />

      {/* DEPTH ZONE 4 (700m - 1000m): Sunken Shipwreck, Giant Octopus & Scuba Divers */}
      <group position={[0, -580, -30]}>
        <group position={[-8, 0, -10]} rotation={[0.2, 0.4, -0.15]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[14, 16, 38]} />
            <meshStandardMaterial color="#08131c" roughness={0.9} />
          </mesh>
          <mesh position={[0, 16, 4]} rotation={[0.3, 0, 0.2]}>
            <cylinderGeometry args={[0.7, 0.9, 24]} />
            <meshStandardMaterial color="#040a10" roughness={0.95} />
          </mesh>
          <mesh position={[0, 8.5, 0]}>
            <boxGeometry args={[15, 0.8, 39]} />
            <meshStandardMaterial color="#00f0ff" emissive="#00d9d0" emissiveIntensity={0.3} wireframe />
          </mesh>

          {/* 3D Giant Pacific Octopus Perched on Ship Hull */}
          <GiantOctopus position={[0, 10, -5]} scale={[1.2, 1.2, 1.2]} />
        </group>

        {/* Scuba Diver Silhouettes with Underwater Flashlight Beams */}
        <group ref={diversGroupRef}>
          <group position={[-14, 10, 5]} rotation={[0.4, 0.6, 0.2]}>
            <mesh>
              <capsuleGeometry args={[0.4, 1.8, 4, 8]} />
              <meshBasicMaterial color="#020810" />
            </mesh>
            <mesh position={[0, 0, -0.4]}>
              <cylinderGeometry args={[0.25, 0.25, 1.4]} />
              <meshBasicMaterial color="#1a2e3b" />
            </mesh>
            <mesh position={[0.6, -0.2, 3]} rotation={[Math.PI / 2, 0, 0]}>
              <coneGeometry args={[1.5, 8, 16, 1, true]} />
              <meshBasicMaterial color="#00f0ff" transparent opacity={0.4} blending={THREE.AdditiveBlending} />
            </mesh>
            <pointLight position={[0.6, -0.2, 1]} color="#00f0ff" intensity={4.0} distance={22} />
          </group>

          <group position={[12, 14, 8]} rotation={[0.2, -0.8, -0.2]}>
            <mesh>
              <capsuleGeometry args={[0.4, 1.8, 4, 8]} />
              <meshBasicMaterial color="#020810" />
            </mesh>
            <mesh position={[0, 0, -0.4]}>
              <cylinderGeometry args={[0.25, 0.25, 1.4]} />
              <meshBasicMaterial color="#1a2e3b" />
            </mesh>
            <mesh position={[-0.6, -0.2, 3]} rotation={[Math.PI / 2, 0, 0]}>
              <coneGeometry args={[1.5, 8, 16, 1, true]} />
              <meshBasicMaterial color="#42fff3" transparent opacity={0.4} blending={THREE.AdditiveBlending} />
            </mesh>
            <pointLight position={[-0.6, -0.2, 1]} color="#42fff3" intensity={4.0} distance={22} />
          </group>
        </group>
      </group>
    </>
  );
}
