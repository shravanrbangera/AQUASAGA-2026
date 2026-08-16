import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

// Custom GLSL Shader for Water Caustics & Glowing Rune Emissive Highlights
const WaterArtShaderMaterial = {
  uniforms: {
    uTexture: { value: null },
    uTime: { value: 0 },
    uGlowColor: { value: new THREE.Color('#00f0ff') }
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    uniform float uTime;
    void main() {
      vUv = uv;
      vNormal = normal;
      vec3 pos = position;
      // Gentle 3D vertex wave animation
      pos.z += sin(pos.x * 0.5 + uTime * 1.2) * 0.3;
      pos.z += cos(pos.y * 0.5 + uTime * 1.2) * 0.3;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D uTexture;
    uniform float uTime;
    uniform vec3 uGlowColor;
    varying vec2 vUv;
    void main() {
      // Water caustics UV distortion
      vec2 uv = vUv;
      uv.x += sin(uv.y * 12.0 + uTime * 1.8) * 0.005;
      uv.y += cos(uv.x * 12.0 + uTime * 1.8) * 0.005;

      vec4 texColor = texture2D(uTexture, uv);

      // Emissive Cyan Highlights on bright rune pixels
      vec3 finalColor = texColor.rgb;
      if (texColor.g > 0.5 && texColor.b > 0.5) {
        finalColor += uGlowColor * (sin(uTime * 2.5) * 0.25 + 0.35);
      }

      gl_FragColor = vec4(finalColor, texColor.a * 0.95);
    }
  `
};

export default function CinematicArtRealm({
  position = [0, 0, 0],
  scale = [28, 48, 1],
  texturePath = '/assets/realm_portal.jpg',
  runeGlowColor = '#00f0ff'
}) {
  const meshRef = useRef();
  const ringRef = useRef();
  const lightRef = useRef();
  const shaderMatRef = useRef();

  const texture = useLoader(THREE.TextureLoader, texturePath);

  const shaderArgs = useMemo(() => {
    return {
      uniforms: {
        uTexture: { value: texture },
        uTime: { value: 0 },
        uGlowColor: { value: new THREE.Color(runeGlowColor) }
      },
      vertexShader: WaterArtShaderMaterial.vertexShader,
      fragmentShader: WaterArtShaderMaterial.fragmentShader,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide
    };
  }, [texture, runeGlowColor]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (shaderMatRef.current) {
      shaderMatRef.current.uniforms.uTime.value = t;
    }
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(t * 0.6) * 0.4;
      meshRef.current.rotation.y = Math.sin(t * 0.4) * 0.04;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.25;
    }
    if (lightRef.current) {
      lightRef.current.intensity = 4.0 + Math.sin(t * 2) * 1.0;
    }
  });

  return (
    <group position={position}>
      {/* 3D Realm Artwork Mesh with Water Caustics */}
      <mesh ref={meshRef} position={[0, 0, 0]} scale={scale}>
        <planeGeometry args={[1, 1, 32, 32]} />
        <shaderMaterial ref={shaderMatRef} args={[shaderArgs]} />
      </mesh>

      {/* 3D Physical Geometry Enhancements Overlaid (Floating Rings & Crystals) */}
      <group position={[0, 0, 2]}>
        {/* Rotating 3D Cyan Rune Seal Ring */}
        <mesh ref={ringRef} position={[0, 2, 1]}>
          <ringGeometry args={[6, 7.2, 32]} />
          <meshBasicMaterial
            color="#00f0ff"
            transparent
            opacity={0.75}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* 3D Physical Glowing Octahedron Crystal */}
        <mesh position={[0, -12, 3]} rotation={[0.4, 0.4, 0]}>
          <octahedronGeometry args={[3.5, 0]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00d9d0"
            emissiveIntensity={1.8}
            roughness={0.1}
            metalness={0.9}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Emissive Point Light */}
        <pointLight
          ref={lightRef}
          position={[0, 2, 5]}
          color={runeGlowColor}
          intensity={4.5}
          distance={55}
        />
      </group>
    </group>
  );
}
