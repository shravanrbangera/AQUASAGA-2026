import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import CameraController from './CameraController';
import EnvironmentEffects from './EnvironmentEffects';
import MarineLife from './MarineLife';
import SubmergedCanyonWalls from './realms/SubmergedCanyonWalls';
import SubmarineBase from './realms/SubmarineBase';
import RealmFinal_Temple from './realms/RealmFinal_Temple';
import ProceduralMonolith from './realms/ProceduralMonolith';
import AnimatedDolphin from './realms/AnimatedDolphin';
import { True3DDolphin } from './realms/True3DFishModels';
import { OverheadSunGap, SwirlingFishVortex, OverheadHumpbackWhale, DiverSilhouette } from './realms/OceanAtmospherics';
import { EVENTS_DATA } from '../data/eventsData';

export default function Scene({ scrollProgress, onUpdateDepth, onOpenRegister }) {
  const monolithTypes = ['gate', 'obelisk', 'gate', 'crystal', 'runestone', 'gate', 'obelisk', 'crystal', 'gate', 'runestone'];

  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 35], fov: 65, near: 0.1, far: 850 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.setClearColor('#003554');
        }}
      >
        <Suspense fallback={null}>
          {/* INTERACTIVE 3D DOLPHIN COMPANION (ULTRA-COMPACT SMALL SCALE) */}
          <AnimatedDolphin scrollProgress={scrollProgress} scale={[0.35, 0.35, 0.35]} />

          {/* SCHOOLS OF COMPACT 3D BOTTLENOSE DOLPHINS IN SUNLIGHT ZONE */}
          <True3DDolphin position={[-14, -25, -12]} scale={[0.4, 0.4, 0.4]} speed={0.4} />
          <True3DDolphin position={[12, -75, -10]} scale={[0.35, 0.35, 0.35]} speed={0.35} />
          <True3DDolphin position={[-8, -140, -14]} scale={[0.45, 0.45, 0.45]} speed={0.45} />

          {/* OVERHEAD CAVERN SUNLIGHT GAP & VOLUMETRIC GOD RAYS */}
          <OverheadSunGap />

          {/* OVERHEAD COLOSSAL HUMPBACK WHALE SWIMMING IN SUNSHAFTS */}
          <OverheadHumpbackWhale />

          {/* MASSIVE SWIRLING FISH VORTEX TORNADO (800 Fishes) */}
          <SwirlingFishVortex count={800} />

          {/* SCUBA DIVER SILHOUETTE SWIMMING DOWN */}
          <DiverSilhouette scrollProgress={scrollProgress} />

          {/* Vibrant Deep Ocean Lighting, Volumetric Cyan Rays, Fog & Particles */}
          <EnvironmentEffects scrollProgress={scrollProgress} />

          {/* Towering Underwater Canyon Walls, Temple Columns, Sandy Floor Bed & Bioluminescent Mushrooms */}
          <SubmergedCanyonWalls />

          {/* 3D SUBMARINE RESEARCH BASE HABITAT POD */}
          <SubmarineBase position={[-12, -320, -15]} scale={[1.3, 1.3, 1.3]} />

          {/* REAL 3D MARINE FISH SPECIES ENCOUNTERED LAYER-BY-LAYER */}
          <MarineLife scrollProgress={scrollProgress} />

          {/* Smooth Scroll Vertical Descent Camera Trajectory with Interactive Mouse Parallax */}
          <CameraController scrollProgress={scrollProgress} onUpdateDepth={onUpdateDepth} />

          {/* Hero Realm (0m): 3D Ancient Floating Stone Portal Ring */}
          <group position={[0, -5, -8]}>
            <ProceduralMonolith type="gate" scale={[1.3, 1.3, 1.3]} runeText="ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ" />
          </group>

          {/* Introduction Gate (84m): 3D Ancient Stone Obelisk */}
          <group position={[0, -50, -10]}>
            <ProceduralMonolith type="obelisk" scale={[1.2, 1.2, 1.2]} runeText="ᛗ ᛋ ᚾ ᛞ ᚱ" />
          </group>

          {/* 10 Event Realms: 3D Floating Stone Portal Rings & Submerged Kingdom Monuments */}
          {EVENTS_DATA.map((event, idx) => {
            const posY = -105 - (idx * 48);
            const posZ = -15 - (idx * 2);
            const posX = (idx % 2 === 0 ? 5 : -5);
            const monolithType = monolithTypes[idx % monolithTypes.length];

            return (
              <group key={event.id} position={[posX, posY, posZ]}>
                <ProceduralMonolith
                  type={monolithType}
                  scale={[1.2, 1.2, 1.2]}
                  runeText={event.rune || "ᚱ ᛗ ᛋ ᚾ ᛞ"}
                />
              </group>
            );
          })}

          {/* Final Registration Temple & Scannable QR Pedestal (1000m) */}
          <group position={[0, -600, -20]}>
            <ProceduralMonolith type="gate" scale={[1.5, 1.5, 1.5]} runeText="A Q U A S A G A" />
            <RealmFinal_Temple position={[0, 0, 0]} onOpenRegister={onOpenRegister} />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
