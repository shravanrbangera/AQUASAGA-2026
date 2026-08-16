import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import CameraController from './CameraController';
import EnvironmentEffects from './EnvironmentEffects';
import MarineLife from './MarineLife';
import SubmergedCanyonWalls from './realms/SubmergedCanyonWalls';
import SubmarineBase from './realms/SubmarineBase';
import RealmFinal_Temple from './realms/RealmFinal_Temple';
import AnimatedDolphin from './realms/AnimatedDolphin';
import { True3DDolphin } from './realms/True3DFishModels';
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
          {/* INTERACTIVE GLB DOLPHIN COMPANION (Loaded via useGLTF from /assets/dolphin_anim.glb) */}
          <AnimatedDolphin scrollProgress={scrollProgress} scale={[0.35, 0.35, 0.35]} />

          {/* SCHOOLS OF COMPACT BOTTLENOSE DOLPHINS IN SUNLIGHT REEF ZONE */}
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

          {/* NATURAL UNDERWATER CANYON ROCK CLIFFS, CAVE ARCHES, SANDY BED & HYDROTHERMAL VENTS */}
          {/* Zero Artificial Rectangular Poles/Columns */}
          <SubmergedCanyonWalls />

          {/* 3D SUBMARINE RESEARCH BASE HABITAT POD */}
          <SubmarineBase position={[-12, -320, -15]} scale={[1.3, 1.3, 1.3]} />

          {/* DEPTH-BASED MARINE LIFE ECOSYSTEM (Surface -> Hadal Trench) */}
          <MarineLife scrollProgress={scrollProgress} />

          {/* Smooth Scroll Vertical Descent Camera Trajectory with Interactive Mouse Parallax */}
          <CameraController scrollProgress={scrollProgress} onUpdateDepth={onUpdateDepth} />

          {/* Final Registration Sanctuary & Scannable QR Pedestal (1000m) */}
          <group position={[0, -600, -20]}>
            <RealmFinal_Temple position={[0, 0, 0]} onOpenRegister={onOpenRegister} />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
