import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import CameraController from './CameraController';
import EnvironmentEffects from './EnvironmentEffects';
import MarineLife from './MarineLife';
import SubmergedCanyonWalls from './realms/SubmergedCanyonWalls';
import SubmarineBase from './realms/SubmarineBase';
import RealmFinal_Temple from './realms/RealmFinal_Temple';
import { OverheadSunGap, SwirlingFishVortex, OverheadHumpbackWhale, DiverSilhouette } from './realms/OceanAtmospherics';

export default function Scene({ scrollProgress, onUpdateDepth, onOpenRegister }) {
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
          {/* OVERHEAD CAVERN SUNLIGHT GAP & VOLUMETRIC GOD RAYS */}
          <OverheadSunGap />

          {/* OVERHEAD COLOSSAL HUMPBACK WHALE SWIMMING IN SUNSHAFTS */}
          <OverheadHumpbackWhale />

          {/* MASSIVE SWIRLING FISH VORTEX TORNADO (300 Fishes) */}
          <SwirlingFishVortex count={300} />

          {/* SCUBA DIVER SILHOUETTE SWIMMING DOWN */}
          <DiverSilhouette scrollProgress={scrollProgress} />

          {/* Vibrant Deep Ocean Lighting, Volumetric Cyan Rays, Fog & Particles */}
          <EnvironmentEffects scrollProgress={scrollProgress} />

          {/* Towering Underwater Canyon Walls, Sandy Floor Bed & Bioluminescent Mushrooms */}
          <SubmergedCanyonWalls />

          {/* 3D SUBMARINE RESEARCH BASE HABITAT POD */}
          <SubmarineBase position={[-12, -320, -15]} scale={[1.3, 1.3, 1.3]} />

          {/* REAL 3D MARINE FISH SPECIES ENCOUNTERED LAYER-BY-LAYER */}
          <MarineLife scrollProgress={scrollProgress} />

          {/* Smooth Scroll Vertical Descent Camera Trajectory with Interactive Mouse Parallax */}
          <CameraController scrollProgress={scrollProgress} onUpdateDepth={onUpdateDepth} />

          {/* Final Registration Temple & Scannable QR Pedestal (1000m) */}
          <group position={[0, -600, -22]}>
            <RealmFinal_Temple position={[0, 0, 0]} onOpenRegister={onOpenRegister} />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
