import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

export default function GLBModelLoader({
  modelPath = '/assets/dolphin_anim.glb',
  position = [0, 0, 0],
  scale = [1, 1, 1],
  rotation = [0, 0, 0],
  emissiveColor = '#00f0ff',
  emissiveIntensity = 1.0
}) {
  const groupRef = useRef();

  try {
    const { scene, animations } = useGLTF(modelPath);
    const { actions } = useAnimations(animations, groupRef);

    useEffect(() => {
      console.log(`[GLBModelLoader] Model loaded successfully: ${modelPath}`);
      console.log(`[GLBModelLoader] Animation clips found:`, animations ? animations.map(a => a.name) : []);

      if (actions && Object.keys(actions).length > 0) {
        const firstAction = Object.values(actions)[0];
        if (firstAction) {
          firstAction.reset().fadeIn(0.5).play();
        }
      }

      scene.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshPhysicalMaterial({
            color: '#00a8e8',
            emissive: emissiveColor,
            emissiveIntensity: emissiveIntensity,
            roughness: 0.2,
            metalness: 0.7,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1
          });
        }
      });
    }, [actions, animations, modelPath, scene, emissiveColor, emissiveIntensity]);

    return (
      <group ref={groupRef} position={position} scale={scale} rotation={rotation}>
        <primitive object={scene} />
      </group>
    );
  } catch (err) {
    console.warn(`[GLBModelLoader] Failed to load GLB model at ${modelPath}:`, err);
    return null;
  }
}
