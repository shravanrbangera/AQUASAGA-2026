import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import ProceduralMonolith from './ProceduralMonolith';

export default function RealmFinal_Temple({ position = [0, -600, -480] }) {
  const portalRingRef = useRef();

  useFrame((state, delta) => {
    if (portalRingRef.current) {
      portalRingRef.current.rotation.z += delta * 0.4;
    }
  });

  return (
    <group position={position}>
      {/* Ancient Celestial Temple Portal (Background 3D Structure) */}
      <ProceduralMonolith position={[0, -10, 0]} scale={[2.5, 2.5, 2.5]} type="gate" runeText="ᚨ ᚲ ᚢ ᚨ ᛋ" />

      {/* Floating 3D Altar Pedestal Structure */}
      <mesh position={[0, -2, 10]} castShadow>
        <cylinderGeometry args={[5, 6, 6, 16]} />
        <meshStandardMaterial color="#141d24" roughness={0.8} />
      </mesh>

      {/* Rotating Rune Rings around Altar Base */}
      <group position={[0, 2, 10]}>
        <mesh ref={portalRingRef} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[5.5, 6.4, 32]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.8} />
        </mesh>
        <pointLight color="#00f0ff" intensity={3.0} distance={30} />
      </group>
    </group>
  );
}
