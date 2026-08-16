import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import ErrorBoundary from '../../components/ErrorBoundary';

function SafeGLBModel({
  modelPath,
  position = [0, 0, 0],
  scale = [1, 1, 1],
  rotation = [0, 0, 0],
  emissiveColor = '#00f0ff',
  emissiveIntensity = 1.0
}) {
  const groupRef = useRef();

  const gltf = useGLTF(modelPath);
  const { scene, animations } = gltf || {};
  const { actions } = useAnimations(animations || [], groupRef);

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.emissive = new THREE.Color(emissiveColor);
          child.material.emissiveIntensity = emissiveIntensity;
        }
      });
    }

    if (actions && Object.keys(actions).length > 0) {
      const firstAction = Object.values(actions)[0];
      if (firstAction) {
        firstAction.reset().fadeIn(0.5).play();
      }
    }
  }, [actions, animations, scene, emissiveColor, emissiveIntensity]);

  if (!scene) return null;

  return (
    <group ref={groupRef} position={position} scale={scale} rotation={rotation}>
      <primitive object={scene.clone()} />
    </group>
  );
}

export default function GLBModelLoader(props) {
  return (
    <ErrorBoundary fallback={null}>
      <SafeGLBModel {...props} />
    </ErrorBoundary>
  );
}
