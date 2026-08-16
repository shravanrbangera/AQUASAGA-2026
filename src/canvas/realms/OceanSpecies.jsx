import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 1. HIGH-POLY 3D MANTA RAY (Gliding Smooth Wings)
export function MantaRay({ position = [0, 0, 0], scale = [1.4, 1.4, 1.4], speed = 0.3 }) {
  const groupRef = useRef();
  const leftWingRef = useRef();
  const rightWingRef = useRef();

  const rayMat = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: '#004488',
      emissive: '#00f0ff',
      emissiveIntensity: 1.2,
      roughness: 0.25,
      metalness: 0.6,
      clearcoat: 0.8
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    if (groupRef.current) {
      groupRef.current.position.x = position[0] + Math.sin(t) * 15;
      groupRef.current.position.z = position[2] + Math.cos(t) * 10;
      groupRef.current.position.y = position[1] + Math.sin(t * 1.5) * 1.5;
      groupRef.current.rotation.y = -t + Math.PI / 2;
    }
    const wingFlap = Math.sin(state.clock.elapsedTime * 2.5) * 0.28;
    if (leftWingRef.current) leftWingRef.current.rotation.z = wingFlap;
    if (rightWingRef.current) rightWingRef.current.rotation.z = -wingFlap;
  });

  return (
    <group ref={groupRef} scale={scale}>
      <mesh>
        <capsuleGeometry args={[1.2, 3.2, 24, 48]} />
        <primitive object={rayMat} attach="material" />
      </mesh>
      <group ref={leftWingRef} position={[-0.8, 0, 0]}>
        <mesh position={[-2.4, 0, 0]} rotation={[0, 0, 0.1]}>
          <boxGeometry args={[4.8, 0.25, 3.8]} />
          <primitive object={rayMat} attach="material" />
        </mesh>
      </group>
      <group ref={rightWingRef} position={[0.8, 0, 0]}>
        <mesh position={[2.4, 0, 0]} rotation={[0, 0, -0.1]}>
          <boxGeometry args={[4.8, 0.25, 3.8]} />
          <primitive object={rayMat} attach="material" />
        </mesh>
      </group>
      <mesh position={[0, 0, -3.8]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.02, 6, 16]} />
        <meshStandardMaterial color="#00f0ff" />
      </mesh>
    </group>
  );
}

// 2. HIGH-POLY 3D HAMMERHEAD SHARK (Smooth Organic Body)
export function HammerheadShark({ position = [0, 0, 0], scale = [1, 1, 1], speed = 0.35 }) {
  const groupRef = useRef();
  const tailRef = useRef();

  const sharkMat = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: '#003366',
      emissive: '#00f0ff',
      emissiveIntensity: 1.5,
      roughness: 0.2,
      metalness: 0.7,
      clearcoat: 0.85
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    if (groupRef.current) {
      groupRef.current.position.x = position[0] + Math.sin(t) * 18;
      groupRef.current.position.z = position[2] + Math.cos(t) * 12;
      groupRef.current.position.y = position[1] + Math.sin(t * 1.2) * 2;
      groupRef.current.rotation.y = -t + Math.PI / 2;
    }
    if (tailRef.current) {
      tailRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 4) * 0.35;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      <mesh position={[0, 0, 3.2]}>
        <boxGeometry args={[4.5, 0.8, 1.4]} />
        <primitive object={sharkMat} attach="material" />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.6, 1.3, 7.0, 48]} />
        <primitive object={sharkMat} attach="material" />
      </mesh>
      <mesh position={[0, 1.5, 0.2]} rotation={[-0.3, 0, 0]}>
        <coneGeometry args={[0.35, 2.6, 24]} />
        <primitive object={sharkMat} attach="material" />
      </mesh>
      <group ref={tailRef} position={[0, 0, -3.5]}>
        <mesh position={[0, 0, -1.2]} rotation={[0.5, 0, 0]}>
          <coneGeometry args={[0.28, 3.4, 24]} />
          <primitive object={sharkMat} attach="material" />
        </mesh>
      </group>
      <pointLight color="#00f0ff" intensity={4.5} distance={25} />
    </group>
  );
}

// 3. HIGH-POLY 3D ELECTRIC EEL (Smooth Serpentine Body)
export function ElectricEel({ position = [0, 0, 0], scale = [1.2, 1.2, 1.2], speed = 0.3 }) {
  const groupRef = useRef();
  const shockRingRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.position.x = position[0] + Math.sin(t * speed) * 12;
      groupRef.current.position.y = position[1] + Math.sin(t * 0.7) * 2;
      groupRef.current.position.z = position[2] + Math.cos(t * speed) * 8;
      groupRef.current.rotation.y = -t * speed + Math.PI / 2;
      groupRef.current.rotation.z = Math.sin(t * 2.5) * 0.25;
    }
    if (shockRingRef.current) {
      shockRingRef.current.scale.setScalar(1.0 + Math.sin(t * 6) * 0.3);
      shockRingRef.current.material.opacity = 0.5 + Math.sin(t * 8) * 0.35;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <capsuleGeometry args={[0.5, 12, 16, 48]} />
        <meshPhysicalMaterial
          color="#0066cc"
          emissive="#00f0ff"
          emissiveIntensity={2.0}
          roughness={0.2}
          clearcoat={0.9}
        />
      </mesh>
      <mesh ref={shockRingRef} position={[0, 0, 0]}>
        <torusGeometry args={[2.8, 0.18, 16, 32]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.65} blending={THREE.AdditiveBlending} />
      </mesh>
      <pointLight color="#00f0ff" intensity={4.5} distance={25} />
    </group>
  );
}

// 4. HIGH-POLY 3D COLOSSAL SQUID
export function ColossalSquid({ position = [0, 0, 0], scale = [1.5, 1.5, 1.5] }) {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(t * 0.8) * 2;
      groupRef.current.rotation.z = Math.sin(t * 0.6) * 0.12;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh position={[0, 3, 0]}>
        <coneGeometry args={[2.0, 7.5, 32]} />
        <meshPhysicalMaterial
          color="#8b1e2e"
          emissive="#ff2d4b"
          emissiveIntensity={0.9}
          roughness={0.3}
          clearcoat={0.7}
        />
      </mesh>
      <mesh position={[0, 0.2, 1.8]}>
        <sphereGeometry args={[0.8, 24, 24]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2.2} />
      </mesh>
      {Array.from({ length: 8 }).map((_, idx) => {
        const angle = (idx / 8) * Math.PI * 2;
        const tx = Math.sin(angle) * 1.3;
        const tz = Math.cos(angle) * 1.3;
        return (
          <mesh key={idx} position={[tx, -3.8, tz]} rotation={[0.2 * Math.sin(angle), 0, 0.2 * Math.cos(angle)]}>
            <cylinderGeometry args={[0.28, 0.06, 7.5, 16]} />
            <meshStandardMaterial color="#6a1522" emissive="#ff2d4b" emissiveIntensity={0.6} />
          </mesh>
        );
      })}
      <pointLight color="#ff2d4b" intensity={4.5} distance={28} />
    </group>
  );
}

// 5. HIGH-POLY 3D GIANT PACIFIC OCTOPUS
export function GiantOctopus({ position = [0, 0, 0], scale = [1.2, 1.2, 1.2] }) {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh position={[0, 2, 0]}>
        <sphereGeometry args={[2.6, 32, 32]} />
        <meshPhysicalMaterial
          color="#942b1d"
          emissive="#f72585"
          emissiveIntensity={0.9}
          roughness={0.4}
          clearcoat={0.8}
        />
      </mesh>
      {Array.from({ length: 8 }).map((_, idx) => {
        const angle = (idx / 8) * Math.PI * 2;
        const tx = Math.sin(angle) * 3.8;
        const tz = Math.cos(angle) * 3.8;
        return (
          <mesh key={idx} position={[tx, -0.5, tz]} rotation={[0.4, angle, 0.2]}>
            <cylinderGeometry args={[0.45, 0.12, 8.5, 16]} />
            <meshStandardMaterial color="#7a2116" emissive="#f72585" emissiveIntensity={0.6} roughness={0.6} />
          </mesh>
        );
      })}
    </group>
  );
}
