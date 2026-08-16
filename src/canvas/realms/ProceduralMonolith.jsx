import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Procedural high-detail ancient stone & rune texture generator
const createDetailedStoneRuneTexture = (runeText = 'ᚱ ᛗ ᛋ ᚾ ᛞ ᚱ ᛟ') => {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d');

  // Weathered Submerged Stone Base Texture
  const grad = ctx.createLinearGradient(0, 0, 1024, 2048);
  grad.addColorStop(0, '#0a1622');
  grad.addColorStop(0.5, '#05101a');
  grad.addColorStop(1, '#081a28');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 2048);

  // Stone Granular Noise & Sea Moss Pattern
  for (let i = 0; i < 25000; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 2048;
    const alpha = Math.random() * 0.2;
    ctx.fillStyle = Math.random() > 0.6 ? `rgba(0, 240, 255, ${alpha})` : `rgba(2, 45, 55, ${alpha})`;
    ctx.fillRect(x, y, Math.random() * 3 + 1, Math.random() * 3 + 1);
  }

  // Carved Metallic Rune Channels with Electric Cyan Glow
  const runes = runeText.split(' ');
  ctx.font = 'bold 180px serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  runes.forEach((r, idx) => {
    const ry = 220 + idx * 240;

    // Glowing cyan bloom outer shadow
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 60;
    ctx.fillStyle = '#00f0ff';
    ctx.fillText(r, 512, ry);

    // Inner bright core
    ctx.fillStyle = '#ffffff';
    ctx.shadowBlur = 15;
    ctx.fillText(r, 512, ry);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;
  return texture;
};

export default function ProceduralMonolith({
  position = [0, 0, 0],
  scale = [1, 1, 1],
  rotation = [0, 0, 0],
  type = 'gate',
  runeText = 'ᚱ ᛗ ᛋ ᚾ ᛞ ᚱ ᛟ'
}) {
  const groupRef = useRef();
  const ringRef = useRef();
  const vortexRef = useRef();

  const texture = useMemo(() => createDetailedStoneRuneTexture(runeText), [runeText]);

  const stoneMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      map: texture,
      roughness: 0.35,
      metalness: 0.4,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2,
      color: '#0d2232'
    });
  }, [texture]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.25;
    }
    if (vortexRef.current) {
      vortexRef.current.rotation.z -= delta * 0.4;
      vortexRef.current.material.opacity = 0.75 + Math.sin(t * 3.0) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale} rotation={rotation}>
      {/* 1. FULLY BUILT ANCIENT CIRCULAR STONE PORTAL RING (Matching User Image Perfectly) */}
      {type === 'gate' && (
        <group position={[0, 0, 0]}>
          {/* Main Carved Stone Ring Torus */}
          <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
            <torusGeometry args={[12, 2.5, 32, 64]} />
            <primitive object={stoneMaterial} attach="material" />
          </mesh>

          {/* Glowing Inner Rune Energy Swirl Ring */}
          <mesh ref={ringRef} position={[0, 0, 0.1]}>
            <ringGeometry args={[8.8, 11.2, 64]} />
            <meshBasicMaterial
              map={texture}
              color="#00f0ff"
              transparent
              opacity={0.92}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>

          {/* Central Blue Energy Vortex Swirl */}
          <mesh ref={vortexRef} position={[0, 0, -0.2]}>
            <ringGeometry args={[0, 8.5, 48]} />
            <meshBasicMaterial
              color="#00f0ff"
              transparent
              opacity={0.82}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>

          {/* 8 Stone Arch Keystone Blocks around the Ring Perimeter */}
          {Array.from({ length: 8 }).map((_, idx) => {
            const angle = (idx / 8) * Math.PI * 2;
            const x = Math.sin(angle) * 12;
            const y = Math.cos(angle) * 12;
            return (
              <group key={idx} position={[x, y, 0]} rotation={[0, 0, -angle]}>
                <mesh castShadow>
                  <boxGeometry args={[3.5, 2.2, 3.0]} />
                  <primitive object={stoneMaterial} attach="material" />
                </mesh>
                <mesh position={[0, 0, 1.6]}>
                  <boxGeometry args={[2.8, 1.6, 0.2]} />
                  <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2.5} />
                </mesh>
              </group>
            );
          })}

          <pointLight color="#00f0ff" intensity={6.0} distance={70} />
        </group>
      )}

      {/* 2. FULLY BUILT ANCIENT OBELISK MONUMENT */}
      {type === 'obelisk' && (
        <group position={[0, 0, 0]}>
          <mesh castShadow receiveShadow position={[0, 0, 0]}>
            <boxGeometry args={[8, 38, 8, 8, 32, 8]} />
            <primitive object={stoneMaterial} attach="material" />
          </mesh>
          <mesh position={[0, 0, 4.02]}>
            <planeGeometry args={[7, 36]} />
            <meshStandardMaterial
              map={texture}
              emissive="#00f0ff"
              emissiveIntensity={2.0}
              transparent
              opacity={0.95}
            />
          </mesh>
          <mesh position={[0, 21, 0]} rotation={[0, Math.PI / 4, 0]}>
            <coneGeometry args={[5.8, 8, 4]} />
            <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2.5} />
          </mesh>
          <pointLight position={[0, 0, 6]} color="#00f0ff" intensity={4.5} distance={55} />
        </group>
      )}

      {/* 3. OVERGROWN RUNE SLAB */}
      {type === 'runestone' && (
        <group position={[0, 0, 0]}>
          <mesh castShadow position={[0, 0, 0]}>
            <cylinderGeometry args={[5.5, 6.5, 18, 32]} />
            <primitive object={stoneMaterial} attach="material" />
          </mesh>
          <mesh position={[0, 0, 5.6]}>
            <planeGeometry args={[9, 16]} />
            <meshBasicMaterial map={texture} color="#00f0ff" transparent opacity={0.95} />
          </mesh>
          <pointLight position={[0, 0, 6]} color="#00f0ff" intensity={4.0} distance={40} />
        </group>
      )}

      {/* 4. GLOWING QUARTZ CRYSTALS */}
      {type === 'crystal' && (
        <group position={[0, 0, 0]}>
          {[-3, 0, 3].map((xOffset, idx) => (
            <mesh key={idx} position={[xOffset * 2.5, idx * 2.5, idx]} rotation={[0.2 * idx, 0.5 * idx, 0.3]}>
              <octahedronGeometry args={[4 + idx, 0]} />
              <meshPhysicalMaterial
                color="#00f0ff"
                emissive="#00d9d0"
                emissiveIntensity={2.5}
                roughness={0.1}
                metalness={0.9}
                clearcoat={1.0}
                transparent
                opacity={0.9}
              />
            </mesh>
          ))}
          <pointLight position={[0, 5, 5]} color="#00f0ff" intensity={4.5} distance={40} />
        </group>
      )}
    </group>
  );
}
