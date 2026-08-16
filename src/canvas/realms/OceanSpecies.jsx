import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 1. 3D MANTA RAY (Gliding Wing Flaps)
export function MantaRay({ position = [0, 0, 0], scale = [1.4, 1.4, 1.4], speed = 0.3 }) {
  const groupRef = useRef();
  const leftWingRef = useRef();
  const rightWingRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    if (groupRef.current) {
      groupRef.current.position.x = position[0] + Math.sin(t) * 15;
      groupRef.current.position.z = position[2] + Math.cos(t) * 10;
      groupRef.current.position.y = position[1] + Math.sin(t * 1.5) * 1.5;
      groupRef.current.rotation.y = -t + Math.PI / 2;
    }
    const wingFlap = Math.sin(state.clock.elapsedTime * 2.5) * 0.25;
    if (leftWingRef.current) leftWingRef.current.rotation.z = wingFlap;
    if (rightWingRef.current) rightWingRef.current.rotation.z = -wingFlap;
  });

  return (
    <group ref={groupRef} scale={scale}>
      <mesh>
        <coneGeometry args={[1.5, 4.5, 8]} />
        <meshStandardMaterial color="#004488" emissive="#00f0ff" emissiveIntensity={1.2} roughness={0.3} />
      </mesh>
      <group ref={leftWingRef} position={[-0.8, 0, 0]}>
        <mesh position={[-2.2, 0, 0]} rotation={[0, 0, 0.1]}>
          <boxGeometry args={[4.2, 0.25, 3.2]} />
          <meshStandardMaterial color="#0055aa" emissive="#00f0ff" emissiveIntensity={1.4} />
        </mesh>
      </group>
      <group ref={rightWingRef} position={[0.8, 0, 0]}>
        <mesh position={[2.2, 0, 0]} rotation={[0, 0, -0.1]}>
          <boxGeometry args={[4.2, 0.25, 3.2]} />
          <meshStandardMaterial color="#0055aa" emissive="#00f0ff" emissiveIntensity={1.4} />
        </mesh>
      </group>
      <mesh position={[0, 0, -3.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.02, 5]} />
        <meshStandardMaterial color="#00f0ff" />
      </mesh>
    </group>
  );
}

// 2. 3D HAMMERHEAD SHARK (Bioluminescent Glow Contour)
export function HammerheadShark({ position = [0, 0, 0], scale = [1, 1, 1], speed = 0.35 }) {
  const groupRef = useRef();
  const tailRef = useRef();

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
        <boxGeometry args={[4.2, 0.7, 1.2]} />
        <meshStandardMaterial color="#003366" emissive="#00f0ff" emissiveIntensity={1.5} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[1.1, 6.5, 12]} />
        <meshStandardMaterial color="#003366" emissive="#00f0ff" emissiveIntensity={1.5} roughness={0.4} />
      </mesh>
      <mesh position={[0, 1.3, 0]} rotation={[-0.3, 0, 0]}>
        <coneGeometry args={[0.3, 2.4, 4]} />
        <meshStandardMaterial color="#00f0ff" />
      </mesh>
      <group ref={tailRef} position={[0, 0, -3.2]}>
        <mesh position={[0, 0, -1.2]} rotation={[0.5, 0, 0]}>
          <coneGeometry args={[0.25, 3.0, 4]} />
          <meshStandardMaterial color="#00f0ff" />
        </mesh>
      </group>
      <pointLight color="#00f0ff" intensity={4.0} distance={22} />
    </group>
  );
}

// 3. 3D DEEP SEA ANGLERFISH (Matching Reference Image 1)
export function DeepSeaAnglerfish({ position = [0, 0, 0], scale = [1.8, 1.8, 1.8], speed = 0.25 }) {
  const groupRef = useRef();
  const lureLightRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.position.x = position[0] + Math.sin(t * speed) * 8;
      groupRef.current.position.y = position[1] + Math.sin(t * 0.8) * 1.5;
      groupRef.current.position.z = position[2] + Math.cos(t * speed) * 6;
      groupRef.current.rotation.y = -t * speed + Math.PI / 2;
    }
    if (lureLightRef.current) {
      lureLightRef.current.intensity = 5.0 + Math.sin(t * 5.0) * 2.0;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      {/* Abyssal Textured Body */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2.2, 24, 24]} />
        <meshStandardMaterial color="#0a121a" roughness={0.95} />
      </mesh>

      {/* Massive Open Jaws */}
      <mesh position={[0, -0.6, 1.6]} rotation={[0.4, 0, 0]}>
        <boxGeometry args={[2.4, 1.4, 2.0]} />
        <meshStandardMaterial color="#05080c" roughness={0.95} />
      </mesh>

      {/* Sharp Needle Teeth (Matching Image 1) */}
      {[-0.8, -0.4, 0, 0.4, 0.8].map((xPos, idx) => (
        <React.Fragment key={idx}>
          <mesh position={[xPos, -0.1, 2.4]} rotation={[-0.3, 0, 0]}>
            <coneGeometry args={[0.08, 0.9, 8]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} />
          </mesh>
          <mesh position={[xPos, -1.1, 2.4]} rotation={[0.3, 0, 0]}>
            <coneGeometry args={[0.08, 0.9, 8]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} />
          </mesh>
        </React.Fragment>
      ))}

      {/* Bioluminescent Lure Stalk Antenna */}
      <mesh position={[0, 2.4, 1.0]} rotation={[0.6, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 3.4, 12]} />
        <meshStandardMaterial color="#0d1b2a" />
      </mesh>

      {/* Glowing Bioluminescent Orb Lure Light */}
      <mesh position={[0, 3.6, 2.5]}>
        <sphereGeometry args={[0.55, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#00f0ff" emissiveIntensity={4.0} />
      </mesh>
      <pointLight ref={lureLightRef} position={[0, 3.6, 2.5]} color="#00f0ff" intensity={6.0} distance={30} />

      {/* Glowing Eyes */}
      <mesh position={[-1.2, 0.8, 1.5]}>
        <sphereGeometry args={[0.35, 12, 12]} />
        <meshBasicMaterial color="#42fff3" />
      </mesh>
      <mesh position={[1.2, 0.8, 1.5]}>
        <sphereGeometry args={[0.35, 12, 12]} />
        <meshBasicMaterial color="#42fff3" />
      </mesh>
    </group>
  );
}

// 4. 3D ELECTRIC EEL (Twilight Shock Field)
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
      groupRef.current.rotation.z = Math.sin(t * 2) * 0.2;
    }
    if (shockRingRef.current) {
      shockRingRef.current.scale.setScalar(1.0 + Math.sin(t * 6) * 0.3);
      shockRingRef.current.material.opacity = 0.4 + Math.sin(t * 8) * 0.3;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.3, 12, 12]} />
        <meshStandardMaterial
          color="#0066cc"
          emissive="#00f0ff"
          emissiveIntensity={1.8}
          roughness={0.2}
        />
      </mesh>
      <mesh ref={shockRingRef} position={[0, 0, 0]}>
        <torusGeometry args={[2.5, 0.15, 16, 32]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.6} blending={THREE.AdditiveBlending} />
      </mesh>
      <pointLight color="#00f0ff" intensity={4.0} distance={20} />
    </group>
  );
}

// 5. 3D COLOSSAL SQUID
export function ColossalSquid({ position = [0, 0, 0], scale = [1.5, 1.5, 1.5] }) {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(t * 0.8) * 2;
      groupRef.current.rotation.z = Math.sin(t * 0.6) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh position={[0, 3, 0]}>
        <coneGeometry args={[1.8, 7, 16]} />
        <meshStandardMaterial
          color="#8b1e2e"
          emissive="#ff2d4b"
          emissiveIntensity={0.8}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[0, 0.2, 1.6]}>
        <sphereGeometry args={[0.7, 16, 16]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2.0} />
      </mesh>
      {Array.from({ length: 8 }).map((_, idx) => {
        const angle = (idx / 8) * Math.PI * 2;
        const tx = Math.sin(angle) * 1.2;
        const tz = Math.cos(angle) * 1.2;
        return (
          <mesh key={idx} position={[tx, -3.5, tz]} rotation={[0.2 * Math.sin(angle), 0, 0.2 * Math.cos(angle)]}>
            <cylinderGeometry args={[0.25, 0.05, 7, 8]} />
            <meshStandardMaterial color="#6a1522" emissive="#ff2d4b" emissiveIntensity={0.5} />
          </mesh>
        );
      })}
      <pointLight color="#ff2d4b" intensity={4.0} distance={25} />
    </group>
  );
}

// 6. 3D GIANT PACIFIC OCTOPUS
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
        <sphereGeometry args={[2.4, 16, 16]} />
        <meshStandardMaterial color="#942b1d" emissive="#f72585" emissiveIntensity={0.8} roughness={0.6} />
      </mesh>
      {Array.from({ length: 8 }).map((_, idx) => {
        const angle = (idx / 8) * Math.PI * 2;
        const tx = Math.sin(angle) * 3.5;
        const tz = Math.cos(angle) * 3.5;
        return (
          <mesh key={idx} position={[tx, -0.5, tz]} rotation={[0.4, angle, 0.2]}>
            <cylinderGeometry args={[0.4, 0.1, 8, 8]} />
            <meshStandardMaterial color="#7a2116" emissive="#f72585" emissiveIntensity={0.5} roughness={0.7} />
          </mesh>
        );
      })}
    </group>
  );
}
