import React from 'react';
import { Compass, Volume2, VolumeX, Menu } from 'lucide-react';
import { soundscape } from '../canvas/AudioSystem';

export default function Navbar({ currentDepth, onOpenRegister, isMuted, onToggleMute }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex items-center justify-between pointer-events-none">
      {/* Top Left Brand Logo */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <img
          src="/assets/aquasaga_logo.png"
          alt="AQUASAGA Logo"
          className="h-10 sm:h-12 w-auto object-contain drop-shadow-[0_0_20px_rgba(0,240,255,0.8)] filter hover:scale-105 transition-transform"
        />
        <div className="hidden sm:block text-left">
          <span className="font-title text-sm font-bold tracking-widest text-[#00f0ff] block leading-none">
            AQUASAGA
          </span>
          <span className="font-mono text-[9px] text-[#00d9d0] tracking-[0.25em] block mt-0.5">
            2026 NATIONAL TECH FEST
          </span>
        </div>
      </div>

      {/* Top Right Controls */}
      <div className="flex items-center gap-3 pointer-events-auto">
        {/* Audio Toggle */}
        <button
          onClick={onToggleMute}
          className="glass-panel px-3.5 py-2 flex items-center gap-2 text-xs font-mono text-[#00f0ff] hover:text-[#ffffff] border border-[rgba(0,240,255,0.4)] rounded-full transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)]"
        >
          {isMuted ? (
            <>
              <VolumeX className="w-4 h-4 text-[#ff2d4b]" />
              <span className="hidden sm:inline">AUDIO: OFF</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-[#00f0ff] animate-pulse" />
              <span className="hidden sm:inline">AUDIO: ON</span>
            </>
          )}
        </button>

        {/* Realms Map Button */}
        <button
          onClick={() => {
            soundscape.playRuneChime(659.25);
            window.scrollTo({ top: window.innerHeight * 0.85, behavior: 'smooth' });
          }}
          className="glass-panel px-4 py-2 flex items-center gap-2 text-xs font-mono text-[#00f0ff] hover:text-[#ffffff] border border-[rgba(0,240,255,0.4)] rounded-full transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)]"
        >
          <Compass className="w-4 h-4 text-[#00f0ff]" />
          <span>REALMS MAP</span>
        </button>

        {/* Register Now Primary Button */}
        <button
          onClick={() => {
            soundscape.playRuneChime(783.99);
            onOpenRegister(null);
          }}
          className="btn-rune text-xs py-2 px-5 rounded-full"
        >
          <span>REGISTER</span>
        </button>
      </div>
    </nav>
  );
}
