import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function CameraController({ scrollProgress = 0, onUpdateDepth }) {
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    const p = THREE.MathUtils.clamp(scrollProgress, 0, 1);
    const depthMeters = Math.round(p * 1000);

    if (onUpdateDepth) {
      onUpdateDepth(depthMeters);
    }

    // Vertical Descent Camera Trajectory from 0m to 1000m depth
    const targetY = -p * 600;
    const targetZ = 22 + Math.cos(p * Math.PI * 4) * 6 - p * 15;
    const targetX = Math.sin(p * Math.PI * 5) * 7;

    // Interactive 3D Mouse Parallax Shift
    const mouseX = mouseRef.current.x * 2.5;
    const mouseY = mouseRef.current.y * 2.0;

    // Gentle camera sway
    const t = state.clock.elapsedTime;
    const swayX = Math.sin(t * 0.5) * 0.4;
    const swayY = Math.cos(t * 0.7) * 0.3;

    // Exponential Smooth Damping (Silky 60 FPS Camera Float Physics)
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, targetX + swayX + mouseX, 4, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, targetY + swayY - mouseY, 4, delta);
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, targetZ, 4, delta);

    // Smooth Roll & Banking Rotation as Camera Descends
    const bankRoll = Math.sin(p * Math.PI * 6) * 0.08 + mouseX * 0.02;
    state.camera.rotation.z = THREE.MathUtils.damp(state.camera.rotation.z, bankRoll, 4, delta);

    // Look at trajectory focus point ahead
    state.camera.lookAt(
      targetX * 0.5 + mouseX * 0.5,
      targetY - 10 - mouseY,
      targetZ - 20
    );
  });

  return null;
}
