import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Procedural vertical rune texture generator for 3D monolith stone faces
const createVerticalRuneTexture = (runes = ['ᚱ', 'ᛗ', 'ᛋ', 'ᚾ', 'ᛞ', 'ᚱ', 'ᛟ']) => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d');

  // Dark stone base
  ctx.fillStyle = '#0a141d';
  ctx.fillRect(0, 0, 512, 2048);

  // Stone noise & moss texture
  for (let i = 0; i < 10000; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 2048;
    const alpha = Math.random() * 0.15;
    ctx.fillStyle = Math.random() > 0.5 ? `rgba(2, 40, 48, ${alpha})` : `rgba(180, 240, 255, ${alpha})`;
    ctx.fillRect(x, y, Math.random() * 4 + 1, Math.random() * 4 + 1);
  }

  // Vertical Stacked Glowing Cyan Runes
  ctx.font = 'bold 150px serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  runes.forEach((r, idx) => {
    const ry = 220 + idx * 240;

    // Glowing cyan bloom
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 50;
    ctx.fillStyle = '#00f0ff';
    ctx.fillText(r, 256, ry);

    // Bright core
    ctx.fillStyle = '#ffffff';
    ctx.shadowBlur = 10;
    ctx.fillText(r, 256, ry);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
};

export default function ProceduralMonolith({
  position = [0, 0, 0],
  scale = [1, 1, 1],
  rotation = [0, 0, 0],
  type = 'obelisk', // 'obelisk' | 'gate' | 'runestone' | 'crystal'
  runeText = 'ᚱ ᛗ ᛋ ᚾ ᛞ ᚱ ᛟ'
}) {
  const groupRef = useRef();
  const ringRef = useRef();

  const runesArray = useMemo(() => runeText.split(' '), [runeText]);
  const texture = useMemo(() => createVerticalRuneTexture(runesArray), [runesArray]);

  useFrame((state, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale} rotation={rotation}>
      {/* 1. GIANT ANCIENT OBELISK MONUMENT WITH VERTICAL RUNES */}
      {type === 'obelisk' && (
        <group>
          {/* Main Giant Monolith Shaft */}
          <mesh castShadow receiveShadow position={[0, 18, 0]}>
            <boxGeometry args={[8, 44, 8]} />
            <meshStandardMaterial
              map={texture}
              roughness={0.75}
              metalness={0.2}
              color="#0d1822"
            />
          </mesh>

          {/* Emissive Vertical Rune Face */}
          <mesh position={[0, 18, 4.02]}>
            <planeGeometry args={[7, 42]} />
            <meshStandardMaterial
              map={texture}
              emissive="#00f0ff"
              emissiveIntensity={1.8}
              transparent
              opacity={0.92}
            />
          </mesh>

          {/* Flanking Secondary Pillars */}
          <mesh position={[-11, 14, -3]} castShadow>
            <boxGeometry args={[6, 34, 6]} />
            <meshStandardMaterial map={texture} color="#081018" roughness={0.85} />
          </mesh>

          <pointLight position={[0, 18, 6]} color="#00f0ff" intensity={3.5} distance={50} />
        </group>
      )}

      {/* 2. SUNKEN ANCIENT GATEWAY */}
      {type === 'gate' && (
        <group position={[0, 10, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[12, 2.2, 16, 48]} />
            <meshStandardMaterial map={texture} color="#121b24" roughness={0.8} />
          </mesh>
          <mesh ref={ringRef} position={[0, 0, 0]}>
            <ringGeometry args={[8.5, 11, 32]} />
            <meshBasicMaterial
              map={texture}
              color="#00f0ff"
              transparent
              opacity={0.85}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          <pointLight color="#00f0ff" intensity={4.0} distance={55} />
        </group>
      )}

      {/* 3. OVERGROWN RUNE SLAB */}
      {type === 'runestone' && (
        <group>
          <mesh castShadow position={[0, 9, 0]}>
            <cylinderGeometry args={[5.5, 6.5, 18, 12]} />
            <meshStandardMaterial map={texture} color="#141e27" roughness={0.85} />
          </mesh>
          <mesh position={[0, 9, 5.6]}>
            <planeGeometry args={[9, 16]} />
            <meshBasicMaterial map={texture} color="#00f0ff" transparent opacity={0.95} />
          </mesh>
          <pointLight position={[0, 9, 6]} color="#00f0ff" intensity={3.5} distance={35} />
        </group>
      )}

      {/* 4. GLOWING QUARTZ CRYSTALS */}
      {type === 'crystal' && (
        <group>
          {[-3, 0, 3].map((xOffset, idx) => (
            <mesh key={idx} position={[xOffset * 2.5, idx * 2.5, idx]} rotation={[0.2 * idx, 0.5 * idx, 0.3]}>
              <octahedronGeometry args={[4 + idx, 0]} />
              <meshStandardMaterial
                color="#00f0ff"
                emissive="#00d9d0"
                emissiveIntensity={2.2}
                roughness={0.1}
                metalness={0.9}
                transparent
                opacity={0.9}
              />
            </mesh>
          ))}
          <pointLight position={[0, 5, 5]} color="#00f0ff" intensity={4.0} distance={35} />
        </group>
      )}
    </group>
  );
}
