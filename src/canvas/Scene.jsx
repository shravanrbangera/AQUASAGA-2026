import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import CameraController from './CameraController';
import EnvironmentEffects from './EnvironmentEffects';
import MarineLife from './MarineLife';
import SubmergedCanyonWalls from './realms/SubmergedCanyonWalls';
import SubmarineBase from './realms/SubmarineBase';
import RealmFinal_Temple from './realms/RealmFinal_Temple';
import ProceduralMonolith from './realms/ProceduralMonolith';
import CinematicArtRealm from './realms/CinematicArtRealm';
import { OverheadSunGap, SwirlingFishVortex, OverheadHumpbackWhale, DiverSilhouette } from './realms/OceanAtmospherics';
import { EVENTS_DATA } from '../data/eventsData';

export default function Scene({ scrollProgress, onUpdateDepth, onOpenRegister }) {
  const realmTextures = [
    '/assets/realm_portal.jpg',  // Realm 01: 3D Floating Stone Portal Ring
    '/assets/realm_obelisk.jpg', // Realm 02: Obelisk & Priestesses
    '/assets/realm_sword.jpg',   // Realm 03: Submerged Colossal Greatsword
    '/assets/realm_crystal.jpg', // Realm 04: Submerged Crystal Cavern
    '/assets/realm_temple.jpg',  // Realm 05: Abyssal City Temple
    '/assets/realm_portal.jpg',  // Realm 06: 3D Floating Stone Portal Ring
    '/assets/realm_crystal.jpg', // Realm 07: Crystal Chamber
    '/assets/realm_sword.jpg',   // Realm 08: Submerged Greatsword & Library
    '/assets/realm_portal.jpg',  // Realm 09: Floating Celestial Portal
    '/assets/realm_temple.jpg'   // Realm 10: Abyssal Core Final Sanctuary
  ];

  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 35], fov: 65, near: 0.1, far: 850 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance', precision: 'mediump' }}
        onCreated={({ gl }) => {
          gl.setClearColor('#003554');
        }}
      >
        <Suspense fallback={null}>
          {/* OVERHEAD CAVERN SUNLIGHT GAP & VOLUMETRIC GOD RAYS */}
          <OverheadSunGap />

          {/* OVERHEAD COLOSSAL HUMPBACK WHALE SWIMMING IN SUNSHAFTS */}
          <OverheadHumpbackWhale />

          {/* MASSIVE SWIRLING FISH VORTEX TORNADO (180 Fishes) */}
          <SwirlingFishVortex count={180} />

          {/* SCUBA DIVER SILHOUETTE SWIMMING DOWN */}
          <DiverSilhouette scrollProgress={scrollProgress} />

          {/* Vibrant Deep Ocean Lighting, Volumetric Cyan Rays, Fog & Particles */}
          <EnvironmentEffects scrollProgress={scrollProgress} />

          {/* NATURAL UNDERWATER CANYON ROCK CLIFFS, CAVE ARCHES & HYDROTHERMAL VENTS */}
          <SubmergedCanyonWalls />

          {/* 3D SUBMARINE RESEARCH BASE HABITAT POD */}
          <SubmarineBase position={[-12, -320, -15]} scale={[1.3, 1.3, 1.3]} />

          {/* DEPTH-BASED MARINE LIFE ECOSYSTEM */}
          <MarineLife scrollProgress={scrollProgress} />

          {/* Smooth Scroll Vertical Descent Camera Trajectory with Interactive Mouse Parallax */}
          <CameraController scrollProgress={scrollProgress} onUpdateDepth={onUpdateDepth} />

          {/* Hero Realm (0m): 3D Floating Stone Portal Ring */}
          <group position={[0, -5, -8]}>
            <ProceduralMonolith type="gate" scale={[1.3, 1.3, 1.3]} runeText="ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ" />
          </group>

          {/* Introduction Gate (84m): 3D Floating Stone Portal Ring Artwork */}
          <group position={[0, -50, -10]}>
            <CinematicArtRealm
              position={[0, 0, 0]}
              scale={[32, 52, 1]}
              texturePath="/assets/realm_portal.jpg"
            />
          </group>

          {/* 10 Event Realms: 3D Floating Stone Portal Ring Artwork & Monoliths */}
          {EVENTS_DATA.map((event, idx) => {
            const posY = -105 - (idx * 48);
            const posZ = -15 - (idx * 2);
            const posX = (idx % 2 === 0 ? 4 : -4);
            const texturePath = realmTextures[idx % realmTextures.length];

            return (
              <group key={event.id} position={[posX, posY, posZ]}>
                <CinematicArtRealm
                  position={[0, 0, 0]}
                  scale={[30, 50, 1]}
                  texturePath={texturePath}
                />
              </group>
            );
          })}

          {/* Final Registration Sanctuary & Scannable QR Pedestal (1000m) */}
          <group position={[0, -600, -20]}>
            <ProceduralMonolith type="gate" scale={[1.5, 1.5, 1.5]} runeText="A Q U A S A G A" />
            <RealmFinal_Temple position={[0, 0, 0]} onOpenRegister={onOpenRegister} />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
