import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

// Custom GLSL Shader for Photorealistic Species Rendering with Edge Fade & Caustics
const PhotorealisticSpeciesShader = {
  uniforms: {
    uTexture: { value: null },
    uTime: { value: 0 },
    uGlowColor: { value: new THREE.Color('#00f0ff') }
  },
  vertexShader: `
    varying vec2 vUv;
    uniform float uTime;
    void main() {
      vUv = uv;
      vec3 pos = position;
      // Gentle 3D swimming wave movement
      pos.z += sin(pos.x * 0.4 + uTime * 1.5) * 0.3;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D uTexture;
    uniform float uTime;
    uniform vec3 uGlowColor;
    varying vec2 vUv;
    void main() {
      vec2 uv = vUv;
      // Water caustics UV ripple
      uv.x += sin(uv.y * 10.0 + uTime * 1.8) * 0.005;
      uv.y += cos(uv.x * 10.0 + uTime * 1.8) * 0.005;

      vec4 texColor = texture2D(uTexture, uv);

      // Radial Alpha Fade (Melts box edges into dark 3D ocean fog!)
      vec2 center = vUv - vec2(0.5);
      float dist = length(center * vec2(1.1, 1.2));
      float alpha = smoothstep(0.48, 0.22, dist);

      // Bioluminescent Glow Enhancement on bright pixels
      vec3 finalColor = texColor.rgb;
      if (texColor.r > 0.4 || texColor.g > 0.4 || texColor.b > 0.4) {
        finalColor += uGlowColor * (sin(uTime * 2.0) * 0.25 + 0.35);
      }

      gl_FragColor = vec4(finalColor, texColor.a * alpha);
    }
  `
};

export default function PhotorealisticSpeciesPlane({
  position = [0, 0, 0],
  scale = [18, 18, 1],
  texturePath = '/assets/species_shark.jpg',
  speed = 0.3,
  radius = 12,
  glowColor = '#00f0ff'
}) {
  const meshRef = useRef();
  const shaderMatRef = useRef();

  const texture = useLoader(THREE.TextureLoader, texturePath);

  const shaderArgs = useMemo(() => {
    return {
      uniforms: {
        uTexture: { value: texture },
        uTime: { value: 0 },
        uGlowColor: { value: new THREE.Color(glowColor) }
      },
      vertexShader: PhotorealisticSpeciesShader.vertexShader,
      fragmentShader: PhotorealisticSpeciesShader.fragmentShader,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide
    };
  }, [texture, glowColor]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (shaderMatRef.current) {
      shaderMatRef.current.uniforms.uTime.value = t;
    }
    if (meshRef.current) {
      // Natural swimming orbit around canyon
      const angle = t * speed;
      meshRef.current.position.x = position[0] + Math.sin(angle) * radius;
      meshRef.current.position.y = position[1] + Math.sin(t * 0.8) * 1.5;
      meshRef.current.position.z = position[2] + Math.cos(angle) * (radius * 0.5);
      meshRef.current.rotation.y = -angle + Math.PI / 2;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <planeGeometry args={[1, 1, 32, 32]} />
        <shaderMaterial ref={shaderMatRef} args={[shaderArgs]} />
      </mesh>
      <pointLight position={position} color={glowColor} intensity={3.5} distance={30} />
    </group>
  );
}
