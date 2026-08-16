import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 1. PHOTOREALISTIC SHARK MESH (Smooth Shading, PBR Clearcoat Skin)
export function True3DShark({ position = [0, 0, 0], scale = [2.2, 2.2, 2.2], speed = 0.35, radius = 16 }) {
  const groupRef = useRef();
  const bodyRef = useRef();
  const tailRef = useRef();

  const sharkMat = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: '#005b82',
      emissive: '#00f0ff',
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.8,
      clearcoat: 0.85,
      clearcoatRoughness: 0.1
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    if (groupRef.current) {
      const angle = t;
      groupRef.current.position.x = position[0] + Math.sin(angle) * radius;
      groupRef.current.position.z = position[2] + Math.cos(angle) * (radius * 0.6);
      groupRef.current.position.y = position[1] + Math.sin(t * 1.5) * 2;
      groupRef.current.rotation.y = -angle + Math.PI / 2;

      if (bodyRef.current) {
        bodyRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 3) * 0.12;
      }
      if (tailRef.current) {
        tailRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 3.5 - 0.5) * 0.35;
      }
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      <group ref={bodyRef}>
        {/* Torso */}
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.5, 1.4, 7, 48]} />
          <primitive object={sharkMat} attach="material" />
        </mesh>
        {/* Snout */}
        <mesh position={[0, 0, 4.2]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.9, 2.2, 48]} />
          <primitive object={sharkMat} attach="material" />
        </mesh>
        {/* Dorsal Fin */}
        <mesh position={[0, 1.6, 0.4]} rotation={[-0.4, 0, 0]}>
          <coneGeometry args={[0.35, 2.5, 24]} />
          <primitive object={sharkMat} attach="material" />
        </mesh>
        {/* Pectoral Fins */}
        <mesh position={[-1.7, -0.4, 1.2]} rotation={[0.2, 0, -0.8]}>
          <boxGeometry args={[3.2, 0.25, 1.6]} />
          <primitive object={sharkMat} attach="material" />
        </mesh>
        <mesh position={[1.7, -0.4, 1.2]} rotation={[0.2, 0, 0.8]}>
          <boxGeometry args={[3.2, 0.25, 1.6]} />
          <primitive object={sharkMat} attach="material" />
        </mesh>
      </group>

      {/* Swishing Tail */}
      <group ref={tailRef} position={[0, 0, -3.5]}>
        <mesh position={[0, 0, -1.2]} rotation={[0.5, 0, 0]}>
          <coneGeometry args={[0.3, 3.4, 24]} />
          <primitive object={sharkMat} attach="material" />
        </mesh>
      </group>

      <pointLight color="#00f0ff" intensity={4.5} distance={30} />
    </group>
  );
}

// 2. PHOTOREALISTIC BOTTLENOSE DOLPHIN
export function True3DDolphin({ position = [0, 0, 0], scale = [0.4, 0.4, 0.4], speed = 0.35 }) {
  const groupRef = useRef();
  const tailRef = useRef();

  const dolphinMat = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: '#00a8e8',
      emissive: '#00f0ff',
      emissiveIntensity: 1.2,
      roughness: 0.15,
      metalness: 0.7,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    if (groupRef.current) {
      groupRef.current.position.x = position[0] + Math.sin(t) * 16;
      groupRef.current.position.z = position[2] + Math.cos(t) * 10;
      groupRef.current.position.y = position[1] + Math.sin(t * 1.6) * 2;
      groupRef.current.rotation.y = -t + Math.PI / 2;
      groupRef.current.rotation.z = Math.sin(t * 2) * 0.18;
    }
    if (tailRef.current) {
      tailRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 4) * 0.35;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <capsuleGeometry args={[0.9, 5.5, 24, 48]} />
        <primitive object={dolphinMat} attach="material" />
      </mesh>
      <mesh position={[0, -0.2, 3.8]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.45, 1.8, 32]} />
        <primitive object={dolphinMat} attach="material" />
      </mesh>
      <mesh position={[0, 1.3, -0.2]} rotation={[-0.5, 0, 0]}>
        <coneGeometry args={[0.25, 2.2, 24]} />
        <primitive object={dolphinMat} attach="material" />
      </mesh>
      <mesh position={[-1.5, -0.4, 1.0]} rotation={[0.2, 0, -0.7]}>
        <boxGeometry args={[2.5, 0.2, 1.2]} />
        <primitive object={dolphinMat} attach="material" />
      </mesh>
      <mesh position={[1.5, -0.4, 1.0]} rotation={[0.2, 0, 0.7]}>
        <boxGeometry args={[2.5, 0.2, 1.2]} />
        <primitive object={dolphinMat} attach="material" />
      </mesh>
      <group ref={tailRef} position={[0, 0, -3.2]}>
        <mesh position={[0, 0, -0.8]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[0.2, 0.2, 3.8]} />
          <primitive object={dolphinMat} attach="material" />
        </mesh>
      </group>
      <pointLight color="#00f0ff" intensity={3.0} distance={20} />
    </group>
  );
}

// 3. PHOTOREALISTIC SEAHORSE (Curved Body, Tubular Snout, Curled Tail, Dorsal Fin)
export function True3DSeahorse({ position = [0, 0, 0], scale = [1.2, 1.2, 1.2], speed = 0.2 }) {
  const groupRef = useRef();
  const finRef = useRef();

  const seahorseMat = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: '#00d9d0',
      emissive: '#00f0ff',
      emissiveIntensity: 1.8,
      roughness: 0.2,
      metalness: 0.5,
      clearcoat: 0.9
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.position.x = position[0] + Math.sin(t * speed) * 4;
      groupRef.current.position.y = position[1] + Math.sin(t * 0.8) * 1.2;
      groupRef.current.position.z = position[2] + Math.cos(t * speed) * 3;
      groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.4;
      groupRef.current.rotation.z = Math.sin(t * 1.2) * 0.15;
    }
    if (finRef.current) {
      finRef.current.rotation.z = Math.sin(t * 12.0) * 0.4; // High frequency fin flutter
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Curved S-Body Segments */}
      <mesh position={[0, 1.8, 0]}>
        <sphereGeometry args={[0.9, 24, 24]} />
        <primitive object={seahorseMat} attach="material" />
      </mesh>
      <mesh position={[0, 0.6, -0.3]}>
        <cylinderGeometry args={[0.7, 0.9, 2.2, 24]} />
        <primitive object={seahorseMat} attach="material" />
      </mesh>

      {/* Tubular Snout & Head Crest */}
      <mesh position={[0, 2.2, 0.8]} rotation={[0.4, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.35, 1.6, 20]} />
        <primitive object={seahorseMat} attach="material" />
      </mesh>
      <mesh position={[0, 2.7, -0.2]} rotation={[-0.4, 0, 0]}>
        <coneGeometry args={[0.4, 1.2, 16]} />
        <primitive object={seahorseMat} attach="material" />
      </mesh>

      {/* Curled Tail Coil */}
      <mesh position={[0, -1.2, -0.8]} rotation={[-0.6, 0, 0]}>
        <torusGeometry args={[0.9, 0.35, 16, 32, Math.PI * 1.4]} />
        <primitive object={seahorseMat} attach="material" />
      </mesh>

      {/* Fluttering Dorsal Fin */}
      <group ref={finRef} position={[0, 0.8, -1.1]}>
        <mesh rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.08, 1.8, 1.2]} />
          <meshStandardMaterial color="#00f0ff" emissive="#42fff3" emissiveIntensity={2.5} />
        </mesh>
      </group>

      <pointLight color="#00f0ff" intensity={4.0} distance={20} />
    </group>
  );
}

// 4. PHOTOREALISTIC DEEP SEA ANGLERFISH MESH
export function True3DAnglerfish({ position = [0, 0, 0], scale = [1.8, 1.8, 1.8], speed = 0.25 }) {
  const groupRef = useRef();
  const lureLightRef = useRef();

  const anglerMat = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: '#0a1520',
      roughness: 0.9,
      clearcoat: 0.4
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.position.x = position[0] + Math.sin(t * speed) * 8;
      groupRef.current.position.y = position[1] + Math.sin(t * 0.8) * 1.5;
      groupRef.current.position.z = position[2] + Math.cos(t * speed) * 6;
      groupRef.current.rotation.y = -t * speed + Math.PI / 2;
    }
    if (lureLightRef.current) {
      lureLightRef.current.intensity = 6.0 + Math.sin(t * 5.0) * 2.0;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2.2, 48, 48]} />
        <primitive object={anglerMat} attach="material" />
      </mesh>
      <mesh position={[0, -0.6, 1.6]} rotation={[0.4, 0, 0]}>
        <boxGeometry args={[2.4, 1.4, 2.0]} />
        <primitive object={anglerMat} attach="material" />
      </mesh>
      {/* Teeth */}
      {[-0.8, -0.4, 0, 0.4, 0.8].map((xPos, idx) => (
        <React.Fragment key={idx}>
          <mesh position={[xPos, -0.1, 2.4]} rotation={[-0.3, 0, 0]}>
            <coneGeometry args={[0.08, 0.9, 16]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.2} />
          </mesh>
          <mesh position={[xPos, -1.1, 2.4]} rotation={[0.3, 0, 0]}>
            <coneGeometry args={[0.08, 0.9, 16]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.2} />
          </mesh>
        </React.Fragment>
      ))}
      {/* Lure Stalk */}
      <mesh position={[0, 2.4, 1.0]} rotation={[0.6, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 3.4, 24]} />
        <meshStandardMaterial color="#0d1b2a" />
      </mesh>
      {/* Glowing Orb */}
      <mesh position={[0, 3.6, 2.5]}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffff00" emissiveIntensity={4.0} />
      </mesh>
      <pointLight ref={lureLightRef} position={[0, 3.6, 2.5]} color="#ffff00" intensity={6.0} distance={30} />
    </group>
  );
}

// 5. PHOTOREALISTIC SWORDFISH
export function True3DSwordfish({ position = [0, 0, 0], scale = [1.8, 1.8, 1.8], speed = 0.4, radius = 18 }) {
  const groupRef = useRef();

  const fishMat = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: '#0066aa',
      emissive: '#00f0ff',
      emissiveIntensity: 1.0,
      roughness: 0.2,
      clearcoat: 0.8
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    if (groupRef.current) {
      const angle = t;
      groupRef.current.position.x = position[0] + Math.sin(angle) * radius;
      groupRef.current.position.z = position[2] + Math.cos(angle) * (radius * 0.5);
      groupRef.current.position.y = position[1] + Math.sin(t * 1.8) * 1.8;
      groupRef.current.rotation.y = -angle + Math.PI / 2;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.3, 1.1, 6.5, 32]} />
        <primitive object={fishMat} attach="material" />
      </mesh>
      <mesh position={[0, 0, 5.5]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.12, 4.5, 16]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2.0} />
      </mesh>
      <mesh position={[0, 1.4, 0.5]} rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[0.15, 2.2, 3.2]} />
        <primitive object={fishMat} attach="material" />
      </mesh>
      <mesh position={[0, 0, -3.8]} rotation={[0.4, 0, 0]}>
        <coneGeometry args={[0.25, 3.0, 16]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={1.8} />
      </mesh>
      <pointLight color="#00f0ff" intensity={4.0} distance={25} />
    </group>
  );
}

// 6. SEA TURTLE
export function True3DTurtle({ position = [0, 0, 0], scale = [1.5, 1.5, 1.5], speed = 0.25 }) {
  const groupRef = useRef();
  const leftFlipperRef = useRef();
  const rightFlipperRef = useRef();

  const turtleMat = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: '#0055aa',
      emissive: '#00f0ff',
      emissiveIntensity: 1.5,
      roughness: 0.2,
      clearcoat: 0.8
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    if (groupRef.current) {
      groupRef.current.position.x = position[0] + Math.sin(t) * 14;
      groupRef.current.position.z = position[2] + Math.cos(t) * 9;
      groupRef.current.position.y = position[1] + Math.sin(t * 1.4) * 1.5;
      groupRef.current.rotation.y = -t + Math.PI / 2;
    }
    const flipperStroke = Math.sin(state.clock.elapsedTime * 2.0) * 0.35;
    if (leftFlipperRef.current) leftFlipperRef.current.rotation.z = flipperStroke;
    if (rightFlipperRef.current) rightFlipperRef.current.rotation.z = -flipperStroke;
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh castShadow position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <sphereGeometry args={[2.0, 48, 48, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <primitive object={turtleMat} attach="material" />
      </mesh>
      <mesh position={[0, -0.4, 0]}>
        <sphereGeometry args={[1.8, 24, 24]} scale={[1, 0.3, 1.3]} />
        <meshStandardMaterial color="#004488" emissive="#00d9d0" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[0, 0.3, 2.4]}>
        <sphereGeometry args={[0.8, 24, 24]} />
        <meshStandardMaterial color="#0088cc" emissive="#00f0ff" emissiveIntensity={1.2} />
      </mesh>
      <group ref={leftFlipperRef} position={[-1.5, -0.2, 1.2]}>
        <mesh position={[-1.8, 0, 0]} rotation={[0.2, 0, 0.2]}>
          <boxGeometry args={[3.2, 0.2, 1.4]} />
          <primitive object={turtleMat} attach="material" />
        </mesh>
      </group>
      <group ref={rightFlipperRef} position={[1.5, -0.2, 1.2]}>
        <mesh position={[1.8, 0, 0]} rotation={[0.2, 0, -0.2]}>
          <boxGeometry args={[3.2, 0.2, 1.4]} />
          <primitive object={turtleMat} attach="material" />
        </mesh>
      </group>
      <pointLight color="#00f0ff" intensity={4.5} distance={25} />
    </group>
  );
}

// 7. JELLYFISH (Translucent Biological Tissue, Soft Internal Glow)
export function True3DJellyfish({ position = [0, 0, 0], scale = [1.6, 1.6, 1.6] }) {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(t * 1.2) * 1.5;
      groupRef.current.scale.y = scale[1] * (1 + Math.sin(t * 2.5) * 0.12);
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh>
        <sphereGeometry args={[2.0, 48, 48, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <meshPhysicalMaterial
          color="#b5179e"
          emissive="#7209b7"
          emissiveIntensity={1.8}
          transparent
          opacity={0.75}
          transmission={0.85}
          roughness={0.1}
          clearcoat={1.0}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0, -0.6, 0]}>
        <sphereGeometry args={[0.9, 24, 24]} />
        <meshBasicMaterial color="#4cc9f0" transparent opacity={0.9} />
      </mesh>
      {[-0.8, -0.3, 0.3, 0.8].map((tx, tIdx) => (
        <mesh key={tIdx} position={[tx, -4.0, 0]}>
          <cylinderGeometry args={[0.08, 0.02, 7, 16]} />
          <meshBasicMaterial color="#f72585" transparent opacity={0.7} />
        </mesh>
      ))}
      <pointLight color="#7209b7" intensity={4.5} distance={25} />
    </group>
  );
}

// 8. HUMPBACK WHALE
export function True3DWhale({ position = [0, 0, 0], scale = [2.5, 2.5, 2.5] }) {
  const groupRef = useRef();

  const whaleMat = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: '#073a43',
      emissive: '#00f0ff',
      emissiveIntensity: 1.4,
      roughness: 0.3,
      clearcoat: 0.9
    });
  }, []);

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
    <group ref={groupRef} scale={scale}>
      <mesh scale={[1.8, 1.4, 6.0]}>
        <capsuleGeometry args={[1.5, 5, 24, 48]} />
        <primitive object={whaleMat} attach="material" />
      </mesh>
      <mesh position={[-3.2, -0.5, 2.0]} rotation={[0, 0, -0.6]}>
        <boxGeometry args={[4.5, 0.3, 1.8]} />
        <primitive object={whaleMat} attach="material" />
      </mesh>
      <mesh position={[3.2, -0.5, 2.0]} rotation={[0, 0, 0.6]}>
        <boxGeometry args={[4.5, 0.3, 1.8]} />
        <primitive object={whaleMat} attach="material" />
      </mesh>
      <mesh position={[0, 0, -14]} rotation={[0.4, 0, 0]}>
        <boxGeometry args={[7.0, 0.3, 2.5]} />
        <primitive object={whaleMat} attach="material" />
      </mesh>
      <pointLight color="#00f0ff" intensity={5.0} distance={40} />
    </group>
  );
}
