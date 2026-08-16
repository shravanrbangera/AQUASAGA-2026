import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function AnimatedDolphin({
  scrollProgress = 0,
  scale = [0.35, 0.35, 0.35]
}) {
  const group = useRef();
  const { scene, animations } = useGLTF('/assets/dolphin_anim.glb');
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const firstAction = Object.values(actions)[0];
      if (firstAction) {
        firstAction.reset().fadeIn(0.5).play();
      }
    }

    // High contrast glowing aquatic material on dolphin
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshPhysicalMaterial({
          color: '#00a8e8',
          emissive: '#00f0ff',
          emissiveIntensity: 1.2,
          roughness: 0.15,
          metalness: 0.7,
          clearcoat: 1.0
        });
      }
    });
  }, [actions, scene]);

  // ULTRA-COMPACT SLEEK 3D DOLPHIN COMPANION SWIMMING ELEGANTLY
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = THREE.MathUtils.clamp(scrollProgress, 0, 1);

    if (group.current) {
      // Depth position matching vertical camera descent (0m -> 1000m)
      const targetY = -p * 600 - 2 + Math.sin(t * 1.5) * 0.6;
      const targetZ = 32 + Math.cos(p * Math.PI * 4) * 4 - p * 20 - 12; // Swims 12 units in front of camera
      const targetX = Math.sin(p * Math.PI * 5) * 6 + Math.sin(t * 1.0) * 2.5;

      // Smooth lerp dolphin position to follow scroll down
      group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, targetX, 0.08);
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetY, 0.08);
      group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, targetZ, 0.08);

      // Orient dolphin facing downwards/forward in swim direction
      group.current.rotation.y = Math.sin(t * 0.8) * 0.25 + Math.PI;
      group.current.rotation.z = Math.sin(t * 1.5) * 0.15;
      group.current.rotation.x = Math.cos(t * 1.2) * 0.1 - 0.1;
    }
  });

  return (
    <group ref={group} scale={scale}>
      <primitive object={scene} />
      {/* Bioluminescent Cyan Point Light Following Dolphin */}
      <pointLight color="#00f0ff" intensity={2.5} distance={15} />
    </group>
  );
}

useGLTF.preload('/assets/dolphin_anim.glb');
