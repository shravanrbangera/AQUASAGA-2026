import React, { useEffect, useState } from 'react';
import { Anchor, Compass, Radio, Activity } from 'lucide-react';

export default function DepthIndicator({ depth = 0 }) {
  const [sonarPing, setSonarPing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSonarPing(true);
      setTimeout(() => setSonarPing(false), 800);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Determine current Ocean Depth Zone
  const getZoneLabel = (d) => {
    if (d < 150) return 'EPIPELAGIC SUNLIGHT ZONE';
    if (d < 400) return 'MESOPELAGIC TWILIGHT ZONE';
    if (d < 700) return 'BATHYPELAGIC MIDNIGHT ZONE';
    return 'HADAL ABYSSAL CORE';
  };

  const zoneLabel = getZoneLabel(depth);
  const depthPercent = Math.min(100, Math.round((depth / 1000) * 100));

  return (
    <div className="fixed bottom-6 left-6 z-40 pointer-events-auto">
      {/* Futuristic Sci-Fi HUD Telemetry Card */}
      <div className="glass-panel p-4 border border-[rgba(0,240,255,0.4)] rounded-2xl bg-[rgba(2,16,26,0.85)] backdrop-blur-xl shadow-[0_0_25px_rgba(0,240,255,0.3)] space-y-2.5 min-w-[240px]">
        {/* Top Header with Sonar Radar Ping */}
        <div className="flex items-center justify-between border-b border-[rgba(0,240,255,0.2)] pb-2">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Radio className="w-4 h-4 text-[#00f0ff]" />
              {sonarPing && (
                <span className="absolute -inset-1 rounded-full border border-[#00f0ff] animate-ping" />
              )}
            </div>
            <span className="font-mono text-[10px] text-[#00d9d0] tracking-widest font-bold">
              SONAR TELEMETRY
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#42fff3] font-bold">
            {depthPercent}%
          </span>
        </div>

        {/* Live Submerged Depth readout */}
        <div className="flex items-baseline gap-2">
          <Anchor className="w-5 h-5 text-[#00f0ff] animate-bounce" />
          <span className="font-title text-2xl sm:text-3xl font-bold text-gradient-cyan tracking-wider">
            {depth} M
          </span>
          <span className="font-mono text-[10px] text-[#8aa4b5]">
            SUBMERGED
          </span>
        </div>

        {/* Zone Label */}
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#00f0ff] font-bold">
          <Activity className="w-3.5 h-3.5 text-[#00f0ff]" />
          <span>{zoneLabel}</span>
        </div>

        {/* Progress Velocity Bar */}
        <div className="w-full bg-[rgba(0,240,255,0.15)] h-1.5 rounded-full overflow-hidden border border-[rgba(0,240,255,0.25)]">
          <div
            className="bg-gradient-to-r from-[#00f0ff] to-[#42fff3] h-full transition-all duration-300 shadow-[0_0_10px_rgba(0,240,255,0.8)]"
            style={{ width: `${depthPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
