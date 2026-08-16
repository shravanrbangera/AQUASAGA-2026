import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { True3DShark, True3DAnglerfish, True3DSwordfish, True3DTurtle, True3DJellyfish, True3DWhale, True3DSeahorse } from './realms/True3DFishModels';
import { MantaRay, HammerheadShark, ElectricEel, ColossalSquid, GiantOctopus } from './realms/OceanSpecies';
import GLBModelLoader from './realms/GLBModelLoader';

export default function MarineLife({ scrollProgress = 0 }) {
  const fishSchoolRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (fishSchoolRef.current) {
      fishSchoolRef.current.position.x = Math.sin(t * 0.3) * 12;
      fishSchoolRef.current.position.z = Math.cos(t * 0.3) * 8;
    }
  });

  return (
    <>
      {/* 3D TROPICAL FISH SCHOOL (Loaded via GLB Model Asset /models/fish/tropical-fish.glb) */}
      <group ref={fishSchoolRef} position={[0, -20, -10]}>
        <GLBModelLoader
          modelPath="/models/fish/tropical-fish.glb"
          position={[-6, 0, 0]}
          scale={[0.6, 0.6, 0.6]}
          emissiveColor="#ff9f1c"
          emissiveIntensity={1.2}
        />
        <GLBModelLoader
          modelPath="/models/fish/clownfish.glb"
          position={[6, 2, -2]}
          scale={[0.5, 0.5, 0.5]}
          emissiveColor="#00f0ff"
          emissiveIntensity={1.2}
        />
      </group>

      {/* DEPTH ZONE 1 (0m - 180m): HUMPBACK WHALES, SWORDFISH, SEA TURTLES, MANTA RAYS & SEAHORSES */}
      <True3DWhale position={[0, -60, -10]} scale={[2.2, 2.2, 2.2]} />

      <True3DSwordfish position={[-12, -40, -12]} scale={[1.8, 1.8, 1.8]} speed={0.4} />
      <True3DSwordfish position={[14, -100, -10]} scale={[1.6, 1.6, 1.6]} speed={0.35} />

      <True3DTurtle position={[-10, -50, -12]} scale={[1.5, 1.5, 1.5]} speed={0.25} />
      <True3DTurtle position={[12, -120, -14]} scale={[1.4, 1.4, 1.4]} speed={0.3} />

      {/* 3D Bioluminescent Seahorses */}
      <True3DSeahorse position={[-12, -70, -10]} scale={[1.2, 1.2, 1.2]} speed={0.2} />
      <True3DSeahorse position={[10, -160, -12]} scale={[1.3, 1.3, 1.3]} speed={0.25} />

      <MantaRay position={[10, -30, -15]} scale={[1.4, 1.4, 1.4]} speed={0.35} />
      <MantaRay position={[-14, -90, -12]} scale={[1.5, 1.5, 1.5]} speed={0.3} />

      {/* DEPTH ZONE 2 (180m - 400m): GREAT WHITE SHARKS, HAMMERHEAD SHARKS, ELECTRIC EELS & JELLYFISH */}
      <True3DShark position={[8, -200, -10]} scale={[2.0, 2.0, 2.0]} speed={0.3} radius={15} />
      <True3DShark position={[-10, -280, -12]} scale={[2.2, 2.2, 2.2]} speed={0.35} radius={18} />

      <HammerheadShark position={[-12, -220, -15]} scale={[1.9, 1.9, 1.9]} speed={0.35} />
      <HammerheadShark position={[14, -290, -12]} scale={[2.0, 2.0, 2.0]} speed={0.3} />

      <ElectricEel position={[8, -240, -12]} scale={[1.3, 1.3, 1.3]} speed={0.35} />
      <ElectricEel position={[-12, -310, -10]} scale={[1.4, 1.4, 1.4]} speed={0.3} />

      {/* Bioluminescent Jellyfish */}
      <True3DJellyfish position={[-12, -210, -14]} scale={[1.6, 1.6, 1.6]} />
      <True3DJellyfish position={[10, -260, -12]} scale={[1.4, 1.4, 1.4]} />

      {/* DEPTH ZONE 3 (400m - 700m): DEEP SEA ANGLERFISH & COLOSSAL SQUID */}
      <True3DAnglerfish position={[-6, -430, -10]} scale={[1.8, 1.8, 1.8]} speed={0.25} />
      <True3DAnglerfish position={[8, -500, -12]} scale={[2.0, 2.0, 2.0]} speed={0.3} />

      <ColossalSquid position={[10, -470, -18]} scale={[1.5, 1.5, 1.5]} />

      {/* DEPTH ZONE 4 (700m - 1000m): Giant Pacific Octopus */}
      <group position={[0, -580, -30]}>
        <GiantOctopus position={[0, 10, -5]} scale={[1.2, 1.2, 1.2]} />
      </group>
    </>
  );
}
