import React, { useEffect, useState } from 'react';
import { Sparkles, ArrowRight, Radio, Volume2 } from 'lucide-react';
import { soundscape } from '../canvas/AudioSystem';

export default function LoadingScreen({ onEnter, onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDiving, setIsDiving] = useState(false);

  useEffect(() => {
    // Smooth WebGL assets loading progress
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsLoaded(true);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 8;
      });
    }, 70);

    return () => clearInterval(timer);
  }, []);

  const handleEnterClick = (e) => {
    e.stopPropagation();
    setIsDiving(true);

    // Trigger ambient ocean soundscape
    try {
      if (soundscape && typeof soundscape.toggleSound === 'function') {
        soundscape.toggleSound();
      }
    } catch (err) {
      console.warn('Audio play error:', err);
    }

    // Play creative dolphin leap dive animation then reveal 3D Ocean
    setTimeout(() => {
      if (typeof onEnter === 'function') onEnter();
      if (typeof onComplete === 'function') onComplete();
    }, 600);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#02101a] overflow-hidden pointer-events-auto transition-all duration-700 ${
        isDiving ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Animated Background Water Caustics Glow Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.25)_0%,rgba(2,16,26,0.95)_75%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,240,255,0.08)_50%,transparent_100%)] pointer-events-none animate-pulse" />

      {/* Main Entrance Portal Slab */}
      <div className="relative max-w-2xl w-full p-8 sm:p-14 glass-panel-glow border-2 border-[#00f0ff] rounded-3xl backdrop-blur-2xl bg-[rgba(2,16,26,0.85)] shadow-[0_0_100px_rgba(0,240,255,0.6)] text-center space-y-6 animate-float z-10">

        {/* LARGE CREATIVE TRANSPARENT AQUASAGA LOGO */}
        <div className="relative inline-block mx-auto">
          <img
            src="/assets/aquasaga_logo.png"
            alt="AQUASAGA Official Logo"
            className={`h-32 sm:h-48 md:h-56 w-auto object-contain mx-auto drop-shadow-[0_0_55px_rgba(0,240,255,1)] filter transition-all duration-500 ${
              isDiving ? 'scale-125 opacity-0' : 'hover:scale-105'
            }`}
          />
          <div className="absolute -inset-8 bg-[radial-gradient(circle,rgba(0,240,255,0.35)_0%,transparent_75%)] blur-2xl pointer-events-none -z-10 animate-pulse" />
        </div>

        {/* Tagline */}
        <div className="flex items-center justify-center gap-3 text-xs sm:text-base font-mono text-[#00f0ff] tracking-[0.4em] font-bold">
          <Sparkles className="w-4 h-4 text-[#00f0ff] animate-spin" />
          <span>LEGENDS BENEATH THE SURFACE</span>
          <Sparkles className="w-4 h-4 text-[#00f0ff] animate-spin" />
        </div>

        <p className="font-body text-xs sm:text-sm text-[#e8f9ff] leading-relaxed max-w-lg mx-auto font-medium">
          National Institute of Technology • October 24-27, 2026
        </p>

        {/* Sonar Loading Progress Bar / Enter Button */}
        {!isLoaded ? (
          <div className="space-y-3 max-w-md mx-auto pt-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#00d9d0] font-bold">
              <span className="flex items-center gap-1.5">
                <Radio className="w-4 h-4 text-[#00f0ff] animate-pulse" />
                AWAKENING 3D OCEAN WORLD...
              </span>
              <span className="text-[#00f0ff]">{progress}%</span>
            </div>

            {/* Glowing Sonar Progress Bar */}
            <div className="w-full bg-[rgba(0,240,255,0.15)] h-2 rounded-full overflow-hidden border border-[rgba(0,240,255,0.3)] shadow-[0_0_15px_rgba(0,240,255,0.4)]">
              <div
                className="bg-gradient-to-r from-[#00f0ff] via-[#42fff3] to-[#00f0ff] h-full transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,1)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="pt-2 animate-fadeIn">
            <button
              onClick={handleEnterClick}
              className="btn-rune text-sm sm:text-base py-4 px-10 w-full sm:w-auto justify-center rounded-full shadow-[0_0_50px_rgba(0,240,255,0.8)] animate-pulse cursor-pointer relative z-20 pointer-events-auto group"
            >
              <Volume2 className="w-5 h-5 text-[#00f0ff] group-hover:animate-bounce" />
              <span>ENTER THE 3D OCEAN KINGDOM</span>
              <ArrowRight className="w-5 h-5 text-[#00f0ff] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
