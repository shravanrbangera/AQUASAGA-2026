import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import GLBModelLoader from './GLBModelLoader';

// 1. 3D SHARK (Loaded via GLB model asset)
export function True3DShark({ position = [0, 0, 0], scale = [2.2, 2.2, 2.2], speed = 0.35, radius = 16 }) {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    if (groupRef.current) {
      groupRef.current.position.x = position[0] + Math.sin(t) * radius;
      groupRef.current.position.z = position[2] + Math.cos(t) * (radius * 0.6);
      groupRef.current.position.y = position[1] + Math.sin(t * 1.5) * 2;
      groupRef.current.rotation.y = -t + Math.PI / 2;
    }
  });

  return (
    <group ref={groupRef}>
      <GLBModelLoader
        modelPath="/models/creatures/shark.glb"
        position={[0, 0, 0]}
        scale={scale}
        emissiveColor="#00f0ff"
        emissiveIntensity={0.8}
      />
    </group>
  );
}

// 2. 3D BOTTLENOSE DOLPHIN (Loaded via active GLB asset /assets/dolphin_anim.glb)
export function True3DDolphin({ position = [0, 0, 0], scale = [0.4, 0.4, 0.4], speed = 0.35 }) {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    if (groupRef.current) {
      groupRef.current.position.x = position[0] + Math.sin(t) * 16;
      groupRef.current.position.z = position[2] + Math.cos(t) * 10;
      groupRef.current.position.y = position[1] + Math.sin(t * 1.6) * 2;
      groupRef.current.rotation.y = -t + Math.PI / 2;
    }
  });

  return (
    <group ref={groupRef}>
      <GLBModelLoader
        modelPath="/assets/dolphin_anim.glb"
        position={[0, 0, 0]}
        scale={scale}
        emissiveColor="#00f0ff"
        emissiveIntensity={1.0}
      />
    </group>
  );
}

// 3. 3D SEAHORSE (Loaded via GLB model asset)
export function True3DSeahorse({ position = [0, 0, 0], scale = [1.2, 1.2, 1.2], speed = 0.2 }) {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.position.x = position[0] + Math.sin(t * speed) * 4;
      groupRef.current.position.y = position[1] + Math.sin(t * 0.8) * 1.2;
      groupRef.current.position.z = position[2] + Math.cos(t * speed) * 3;
    }
  });

  return (
    <group ref={groupRef}>
      <GLBModelLoader
        modelPath="/models/creatures/seahorse.glb"
        position={[0, 0, 0]}
        scale={scale}
        emissiveColor="#00f0ff"
        emissiveIntensity={1.5}
      />
    </group>
  );
}

// 4. 3D ANGLERFISH (Loaded via GLB model asset)
export function True3DAnglerfish({ position = [0, 0, 0], scale = [1.8, 1.8, 1.8], speed = 0.25 }) {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.position.x = position[0] + Math.sin(t * speed) * 8;
      groupRef.current.position.y = position[1] + Math.sin(t * 0.8) * 1.5;
      groupRef.current.position.z = position[2] + Math.cos(t * speed) * 6;
      groupRef.current.rotation.y = -t * speed + Math.PI / 2;
    }
  });

  return (
    <group ref={groupRef}>
      <GLBModelLoader
        modelPath="/models/deep-sea/anglerfish.glb"
        position={[0, 0, 0]}
        scale={scale}
        emissiveColor="#ffff00"
        emissiveIntensity={2.5}
      />
    </group>
  );
}

// 5. 3D SWORDFISH (Loaded via GLB model asset)
export function True3DSwordfish({ position = [0, 0, 0], scale = [1.8, 1.8, 1.8], speed = 0.4, radius = 18 }) {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    if (groupRef.current) {
      groupRef.current.position.x = position[0] + Math.sin(t) * radius;
      groupRef.current.position.z = position[2] + Math.cos(t) * (radius * 0.5);
      groupRef.current.position.y = position[1] + Math.sin(t * 1.8) * 1.8;
      groupRef.current.rotation.y = -t + Math.PI / 2;
    }
  });

  return (
    <group ref={groupRef}>
      <GLBModelLoader
        modelPath="/models/fish/swordfish.glb"
        position={[0, 0, 0]}
        scale={scale}
        emissiveColor="#00f0ff"
        emissiveIntensity={1.0}
      />
    </group>
  );
}

// 6. 3D SEA TURTLE (Loaded via GLB model asset)
export function True3DTurtle({ position = [0, 0, 0], scale = [1.5, 1.5, 1.5], speed = 0.25 }) {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    if (groupRef.current) {
      groupRef.current.position.x = position[0] + Math.sin(t) * 14;
      groupRef.current.position.z = position[2] + Math.cos(t) * 9;
      groupRef.current.position.y = position[1] + Math.sin(t * 1.4) * 1.5;
      groupRef.current.rotation.y = -t + Math.PI / 2;
    }
  });

  return (
    <group ref={groupRef}>
      <GLBModelLoader
        modelPath="/models/creatures/turtle.glb"
        position={[0, 0, 0]}
        scale={scale}
        emissiveColor="#00f0ff"
        emissiveIntensity={1.2}
      />
    </group>
  );
}

// 7. 3D JELLYFISH (Loaded via GLB model asset)
export function True3DJellyfish({ position = [0, 0, 0], scale = [1.6, 1.6, 1.6] }) {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(t * 1.2) * 1.5;
    }
  });

  return (
    <group ref={groupRef}>
      <GLBModelLoader
        modelPath="/models/creatures/jellyfish.glb"
        position={[0, 0, 0]}
        scale={scale}
        emissiveColor="#f72585"
        emissiveIntensity={2.0}
      />
    </group>
  );
}

// 8. 3D HUMPBACK WHALE (Loaded via GLB model asset)
export function True3DWhale({ position = [0, 0, 0], scale = [2.5, 2.5, 2.5] }) {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      const angle = t * 0.15;
      groupRef.current.position.x = position[0] + Math.sin(angle) * 35;
      groupRef.current.position.z = position[2] + Math.cos(angle) * 20;
      groupRef.current.position.y = position[1] + Math.sin(t * 0.4) * 2;
      groupRef.current.rotation.y = -angle + Math.PI / 2;
    }
  });

  return (
    <group ref={groupRef}>
      <GLBModelLoader
        modelPath="/models/creatures/whale.glb"
        position={[0, 0, 0]}
        scale={scale}
        emissiveColor="#00f0ff"
        emissiveIntensity={1.4}
      />
    </group>
  );
}
