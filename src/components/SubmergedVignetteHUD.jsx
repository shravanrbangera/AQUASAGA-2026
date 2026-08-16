import React from 'react';

export default function SubmergedVignetteHUD() {
  return (
    <div className="fixed inset-0 z-30 pointer-events-none overflow-hidden">
      {/* Real-World Underwater Radial Pressure Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(2,16,26,0.75)_95%)]" />

      {/* Underwater Refractive Glass Water Edge Shimmer */}
      <div className="absolute inset-0 border-[16px] border-[rgba(0,240,255,0.06)] rounded-3xl backdrop-blur-[1px]" />

      {/* Floating Ambient Caustics Light Flares in Corners */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[radial-gradient(circle,rgba(0,240,255,0.12)_0%,transparent_70%)] blur-2xl animate-pulse" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(66,255,243,0.12)_0%,transparent_70%)] blur-2xl animate-pulse" />
    </div>
  );
}
