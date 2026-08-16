import React from 'react';
import { X, Map, ChevronRight, Compass } from 'lucide-react';
import { EVENTS_DATA } from '../data/eventsData';
import { soundscape } from '../canvas/AudioSystem';

export default function RealmQuickNav({ isOpen, onClose, onScrollToDepth }) {
  if (!isOpen) return null;

  const realms = [
    { title: "00 — PRIMORDIAL MONOLITH (HERO)", depth: 0, meter: "000 M" },
    { title: "INTRO — LOST KINGDOM VALLEY", depth: 0.08, meter: "084 M" },
    ...EVENTS_DATA.map((e, idx) => ({
      title: `${e.number} — ${e.name}`,
      depth: 0.15 + (idx * 0.075),
      meter: e.depth
    })),
    { title: "FINAL TEMPLE — REGISTRATION CLIMAX", depth: 0.95, meter: "1000 M" }
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[rgba(3,21,33,0.8)] backdrop-blur-md pointer-events-auto transition-all">
      <div className="w-full max-w-md h-full glass-panel-glow p-6 sm:p-8 flex flex-col justify-between border-l border-[rgba(66,255,243,0.3)] animate-slideLeft">
        {/* Drawer Header */}
        <div>
          <div className="flex items-center justify-between border-b border-[rgba(66,255,243,0.15)] pb-4 mb-6">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#42fff3]" />
              <h2 className="font-subtitle text-sm text-[#42fff3] tracking-[0.2em]">
                LOST KINGDOM MAP
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full border border-[rgba(66,255,243,0.3)] text-[#8aa4b5] hover:text-[#42fff3] flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="font-mono text-xs text-[#8aa4b5] mb-6">
            Select an ancient realm to travel directly through the ocean depths:
          </p>

          {/* List of Realms */}
          <div className="space-y-2 max-h-[65vh] overflow-y-auto pr-2">
            {realms.map((r, idx) => (
              <button
                key={idx}
                onClick={() => {
                  soundscape.playRuneChime(440 + idx * 40);
                  onScrollToDepth(r.depth);
                  onClose();
                }}
                className="w-full text-left p-3.5 glass-panel hover:bg-[rgba(0,217,208,0.15)] hover:border-[#42fff3] flex items-center justify-between group transition-all cursor-pointer"
              >
                <div>
                  <div className="font-mono text-[10px] text-[#00d9d0]">
                    DEPTH {r.meter}
                  </div>
                  <div className="font-mono text-xs font-semibold text-[#e8f9ff] group-hover:text-[#42fff3]">
                    {r.title}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#8aa4b5] group-hover:text-[#42fff3] group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="border-t border-[rgba(66,255,243,0.15)] pt-4 text-center">
          <p className="font-mono text-[10px] text-[#8aa4b5]">
            AQUASAGA 2026 — LEGENDS BENEATH THE SURFACE
          </p>
        </div>
      </div>
    </div>
  );
}
