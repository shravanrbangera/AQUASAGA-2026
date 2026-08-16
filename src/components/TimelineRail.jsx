import React from 'react';
import { EVENTS_DATA } from '../data/eventsData';
import { soundscape } from '../canvas/AudioSystem';

export default function TimelineRail({ scrollProgress, onScrollToDepthProgress }) {
  const nodes = [
    { title: "000 M — Surface Hero", progress: 0 },
    { title: "084 M — Lost Kingdom", progress: 0.08 },
    ...EVENTS_DATA.map((e, idx) => ({
      title: `${e.depth} — Realm ${e.number}`,
      progress: 0.15 + (idx * 0.075)
    })),
    { title: "1000 M — Final Temple", progress: 0.96 }
  ];

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-3 pointer-events-auto">
      {/* Background Vertical Glow Line */}
      <div className="relative w-0.5 h-72 bg-[rgba(0,240,255,0.2)] rounded-full overflow-hidden">
        <div
          className="w-full bg-[#00f0ff] shadow-[0_0_12px_#00f0ff] transition-all duration-300"
          style={{ height: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Interactive Dots for each realm */}
      <div className="absolute inset-y-0 flex flex-col justify-between items-center">
        {nodes.map((node, idx) => {
          const isActive = Math.abs(scrollProgress - node.progress) < 0.04;

          return (
            <div
              key={idx}
              className="relative group cursor-pointer"
              onClick={() => {
                soundscape.playRuneChime(440 + idx * 30);
                onScrollToDepthProgress(node.progress);
              }}
            >
              {/* Dot */}
              <div
                className={`w-3 h-3 rounded-full border transition-all duration-300 ${
                  isActive
                    ? 'bg-[#00f0ff] border-[#ffffff] scale-125 shadow-[0_0_15px_#00f0ff]'
                    : 'bg-[#031521] border-[rgba(0,240,255,0.4)] group-hover:border-[#00f0ff] group-hover:scale-110'
                }`}
              />

              {/* Hover Tooltip - Positioned cleanly to the LEFT of the right-hand timeline rail */}
              <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                <div className="glass-panel px-2.5 py-1 font-mono text-[10px] text-[#00f0ff] border border-[rgba(0,240,255,0.4)] shadow-[0_0_100px_rgba(0,240,255,0.3)]">
                  {node.title}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
