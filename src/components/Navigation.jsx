import React from 'react';
import { Volume2, VolumeX, Compass, Sparkles } from 'lucide-react';
import { soundscape } from '../canvas/AudioSystem';

export default function Navigation({ isMuted, setIsMuted, onOpenQuickNav, onOpenRegister }) {
  const handleToggleAudio = () => {
    const newState = soundscape.toggleSound();
    setIsMuted(!newState);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-3 sm:px-6 py-3 sm:py-5 flex items-center justify-between pointer-events-none">
      {/* Brand Logo */}
      <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[rgba(66,255,243,0.4)] bg-[rgba(3,21,33,0.8)] flex items-center justify-center shadow-[0_0_15px_rgba(0,217,208,0.3)]">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#42fff3] animate-pulse" />
        </div>
        <div>
          <h1 className="font-title text-sm sm:text-lg font-bold tracking-[0.2em] sm:tracking-[0.25em] text-gradient-cyan leading-none">
            AQUASAGA
          </h1>
          <p className="font-mono text-[8px] sm:text-[9px] tracking-[0.2em] sm:tracking-[0.3em] text-[#8aa4b5] mt-0.5 sm:mt-1">
            LEGENDS BENEATH 2026
          </p>
        </div>
      </div>

      {/* Nav Actions */}
      <div className="flex items-center gap-1.5 sm:gap-3 pointer-events-auto">
        {/* Audio Toggle */}
        <button
          onClick={handleToggleAudio}
          className="glass-panel px-2.5 sm:px-4 py-2 sm:py-2.5 flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono text-[#8aa4b5] hover:text-[#42fff3] hover:border-[rgba(66,255,243,0.5)] transition-all cursor-pointer"
          title={isMuted ? "Enable Ambient Sea Audio" : "Mute Soundscape"}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8aa4b5]" />
              <span className="hidden sm:inline">AUDIO: OFF</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#42fff3] animate-pulse" />
              <span className="hidden sm:inline text-[#42fff3]">AUDIO: ON</span>
            </>
          )}
        </button>

        {/* Realms Map Quick Jump */}
        <button
          onClick={onOpenQuickNav}
          className="glass-panel px-2.5 sm:px-4 py-2 sm:py-2.5 flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono text-[#e8f9ff] hover:text-[#42fff3] hover:border-[rgba(66,255,243,0.5)] transition-all cursor-pointer"
        >
          <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00d9d0]" />
          <span className="hidden sm:inline">REALMS MAP</span>
        </button>

        {/* Register CTA */}
        <button
          onClick={onOpenRegister}
          className="btn-rune text-[11px] sm:text-xs py-2 sm:py-2.5 px-3.5 sm:px-5"
        >
          <span>REGISTER</span>
        </button>
      </div>
    </header>
  );
}
