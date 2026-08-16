import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Shield, Sparkles, ExternalLink, Calendar, Clock, Users, Award, QrCode, ArrowRight, Anchor, Layers, Trophy, MapPin } from 'lucide-react';
import { EVENTS_DATA } from '../data/eventsData';
import { soundscape } from '../canvas/AudioSystem';

export default function ScrollOverlays({ scrollProgress, onOpenRules, onOpenRegister }) {
  return (
    <div className="scroll-content">
      {/* 01. HERO FIRST PAGE (Depth 0m) — Full-Scale High-Impact Fantasy Hero Portal */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 py-12 text-center">
        <div className="glass-panel-glow p-8 sm:p-14 max-w-4xl w-full border-2 border-[#00f0ff] pointer-events-auto animate-float mx-auto backdrop-blur-2xl bg-[rgba(2,16,26,0.85)] shadow-[0_0_90px_rgba(0,240,255,0.6)] rounded-3xl space-y-6">

          {/* LARGE CREATIVE TRANSPARENT AQUASAGA LOGO */}
          <div className="relative inline-block mx-auto">
            <img
              src="/assets/aquasaga_logo.png"
              alt="AQUASAGA Official Logo"
              className="h-36 sm:h-52 md:h-64 w-auto object-contain mx-auto drop-shadow-[0_0_50px_rgba(0,240,255,1)] filter hover:scale-105 transition-all duration-500"
            />
            <div className="absolute -inset-8 bg-[radial-gradient(circle,rgba(0,240,255,0.35)_0%,transparent_75%)] blur-2xl pointer-events-none -z-10 animate-pulse" />
          </div>

          {/* Subtitle Badge */}
          <div className="flex items-center justify-center gap-3 text-xs sm:text-base font-mono text-[#00f0ff] tracking-[0.4em] font-bold">
            <Sparkles className="w-5 h-5 text-[#00f0ff] animate-spin" />
            <span>LEGENDS BENEATH THE SURFACE</span>
            <Sparkles className="w-5 h-5 text-[#00f0ff] animate-spin" />
          </div>

          {/* Tagline */}
          <p className="font-body text-sm sm:text-lg text-[#e8f9ff] leading-relaxed max-w-2xl mx-auto font-medium">
            Dive 1000 meters down into an ancient 3D ocean kingdom. Meet 3D sharks, giant whales, glowing anglerfish, and abyssal shipwrecks layer-by-layer.
          </p>

          {/* 4 Feature Badges Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs max-w-2xl mx-auto pt-2">
            <div className="glass-panel p-3 text-center border border-[rgba(0,240,255,0.3)] rounded-2xl bg-[rgba(0,240,255,0.08)]">
              <div className="flex items-center justify-center gap-1 text-[11px] text-[#42fff3] mb-1 font-bold">
                <Trophy className="w-4 h-4 text-[#42fff3]" /> PRIZES
              </div>
              <span className="font-bold text-[#42fff3] block text-xs sm:text-sm">₹10,00,000+</span>
            </div>

            <div className="glass-panel p-3 text-center border border-[rgba(0,240,255,0.3)] rounded-2xl bg-[rgba(0,240,255,0.08)]">
              <div className="flex items-center justify-center gap-1 text-[11px] text-[#00d9d0] mb-1 font-bold">
                <Layers className="w-4 h-4 text-[#00f0ff]" /> REALMS
              </div>
              <span className="font-bold text-[#ffffff] block text-xs sm:text-sm">10 DEPTH ZONES</span>
            </div>

            <div className="glass-panel p-3 text-center border border-[rgba(0,240,255,0.3)] rounded-2xl bg-[rgba(0,240,255,0.08)]">
              <div className="flex items-center justify-center gap-1 text-[11px] text-[#00d9d0] mb-1 font-bold">
                <Calendar className="w-4 h-4 text-[#00f0ff]" /> DATES
              </div>
              <span className="font-bold text-[#ffffff] block text-xs sm:text-sm">OCT 24-27, 2026</span>
            </div>

            <div className="glass-panel p-3 text-center border border-[rgba(0,240,255,0.3)] rounded-2xl bg-[rgba(0,240,255,0.08)]">
              <div className="flex items-center justify-center gap-1 text-[11px] text-[#00d9d0] mb-1 font-bold">
                <MapPin className="w-4 h-4 text-[#00f0ff]" /> VENUE
              </div>
              <span className="font-bold text-[#ffffff] block text-xs sm:text-sm">NIT CAMPUS</span>
            </div>
          </div>

          {/* Large Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => {
                soundscape.playRuneChime(587.33);
                window.scrollTo({ top: window.innerHeight * 0.85, behavior: 'smooth' });
              }}
              className="btn-rune text-sm sm:text-base py-4 px-10 w-full sm:w-auto justify-center rounded-full shadow-[0_0_40px_rgba(0,240,255,0.7)]"
            >
              <span>DESCEND INTO THE KINGDOM</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => onOpenRegister(null)}
              className="btn-secondary text-sm sm:text-base py-3.5 px-9 w-full sm:w-auto justify-center rounded-full"
            >
              <span>REGISTER FOR FEST</span>
            </button>
          </div>
        </div>
      </section>

      {/* 02. INTRODUCTION REALM (Depth 84m) */}
      <section className="min-h-screen flex flex-col justify-end pb-20 items-center px-6 text-center">
        <div className="glass-panel-glow p-8 sm:p-10 max-w-xl w-full border-t-2 border-t-[#00f0ff] border-b-2 border-b-[#42fff3] pointer-events-auto mx-auto backdrop-blur-xl bg-[rgba(3,19,30,0.7)] shadow-[0_0_50px_rgba(0,240,255,0.3)] rounded-3xl">
          <span className="font-mono text-xs text-[#00f0ff] tracking-[0.3em] block mb-2 font-bold">
            DEPTH 084 M — SUNLIGHT OCEAN ZONE
          </span>
          <h2 className="font-title text-3xl sm:text-4xl font-bold text-gradient-cyan mb-3">
            THE LEGEND BEGINS
          </h2>
          <p className="font-body text-xs sm:text-sm text-[#e8f9ff] leading-relaxed mb-5">
            As you scroll down, meet 3D sea turtles, giant whales, electric eels, anglerfish, colossal squids, and sunken shipwrecks layer-by-layer.
          </p>
          <div className="pt-4 border-t border-[rgba(0,240,255,0.2)] flex items-center justify-center gap-2 text-xs font-mono text-[#00f0ff] font-bold">
            <Sparkles className="w-4 h-4" />
            <span>10 ANCIENT REALMS AWAIT DOWNWARD</span>
          </div>
        </div>
      </section>

      {/* 03. 10 ANCIENT EVENT REALMS — Floating Ancient Rune Pedestal Design */}
      {EVENTS_DATA.map((event) => {
        return (
          <section
            key={event.id}
            className="min-h-screen flex flex-col justify-end pb-20 items-center px-6 text-center"
          >
            <div className="glass-panel-glow p-7 sm:p-9 max-w-xl w-full border-t-2 border-t-[#00f0ff] border-b-2 border-b-[#42fff3] pointer-events-auto mx-auto backdrop-blur-xl bg-[rgba(3,19,30,0.72)] shadow-[0_0_50px_rgba(0,240,255,0.3)] rounded-3xl space-y-4">
              {/* Event Floating Capsule Header */}
              <div className="flex items-center justify-between border-b border-[rgba(0,240,255,0.2)] pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs text-[#00f0ff] px-3 py-1 rounded-full bg-[rgba(0,240,255,0.15)] border border-[rgba(0,240,255,0.3)] font-bold">
                    REALM {event.number}
                  </span>
                  <span className="font-mono text-xs text-[#8aa4b5]">
                    • {event.depth}
                  </span>
                </div>
                <span className="font-mono text-[11px] text-[#42fff3] px-3 py-1 rounded-full bg-[rgba(66,255,243,0.12)] border border-[rgba(66,255,243,0.25)] font-bold">
                  {event.category}
                </span>
              </div>

              {/* Event Title & Tagline */}
              <h3 className="font-title text-3xl sm:text-4xl font-bold text-gradient-cyan tracking-wide">
                {event.name}
              </h3>
              <p className="font-body text-xs sm:text-sm text-[#42fff3] italic">
                "{event.tagline}"
              </p>

              {/* Description */}
              <p className="font-body text-xs sm:text-sm text-[#e8f9ff] leading-relaxed max-w-lg mx-auto">
                {event.description}
              </p>

              {/* 4 Floating Crystal Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs">
                <div className="glass-panel p-2.5 text-center border border-[rgba(0,240,255,0.2)] rounded-xl">
                  <div className="flex items-center justify-center gap-1 text-[10px] text-[#00d9d0] mb-0.5 font-bold">
                    <Calendar className="w-3.5 h-3.5 text-[#00f0ff]" /> DATE
                  </div>
                  <span className="font-bold text-[#ffffff] block text-xs">{event.date}</span>
                </div>

                <div className="glass-panel p-2.5 text-center border border-[rgba(0,240,255,0.2)] rounded-xl">
                  <div className="flex items-center justify-center gap-1 text-[10px] text-[#00d9d0] mb-0.5 font-bold">
                    <Clock className="w-3.5 h-3.5 text-[#00f0ff]" /> TIME
                  </div>
                  <span className="font-bold text-[#ffffff] block text-xs">{event.time}</span>
                </div>

                <div className="glass-panel p-2.5 text-center border border-[rgba(0,240,255,0.2)] rounded-xl">
                  <div className="flex items-center justify-center gap-1 text-[10px] text-[#00d9d0] mb-0.5 font-bold">
                    <Users className="w-3.5 h-3.5 text-[#00f0ff]" /> TEAM
                  </div>
                  <span className="font-bold text-[#ffffff] block text-xs">{event.teamSize}</span>
                </div>

                <div className="glass-panel p-2.5 text-center border border-[rgba(0,240,255,0.2)] rounded-xl">
                  <div className="flex items-center justify-center gap-1 text-[10px] text-[#42fff3] mb-0.5 font-bold">
                    <Award className="w-3.5 h-3.5 text-[#42fff3]" /> PRIZE
                  </div>
                  <span className="font-bold text-[#42fff3] block text-xs">{event.prizePool}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    soundscape.playRuneChime(659.25);
                    onOpenRules(event);
                  }}
                  className="btn-secondary text-xs py-3 px-6 w-full sm:w-auto justify-center rounded-full"
                >
                  <Shield className="w-4 h-4 text-[#00d9d0]" />
                  <span>VIEW DETAILED RULES</span>
                </button>
                <button
                  onClick={() => {
                    soundscape.playRuneChime(783.99);
                    onOpenRegister(event);
                  }}
                  className="btn-rune text-xs py-3 px-7 w-full sm:w-auto justify-center rounded-full"
                >
                  <span>REGISTER NOW</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </section>
        );
      })}

      {/* 04. FINAL TEMPLE & REGISTRATION PEDESTAL (Depth 1000m) */}
      <section className="min-h-screen flex flex-col justify-end pb-20 items-center px-6 text-center">
        <div className="glass-panel-glow p-8 sm:p-10 max-w-xl w-full border-t-2 border-t-[#00f0ff] border-b-2 border-b-[#42fff3] pointer-events-auto space-y-4 mx-auto backdrop-blur-xl bg-[rgba(3,19,30,0.75)] shadow-[0_0_50px_rgba(0,240,255,0.3)] rounded-3xl">
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#00d9d0] tracking-widest font-bold">
            <Sparkles className="w-4 h-4 text-[#00f0ff] animate-pulse" />
            <span>FINAL REALM CLIMAX (1000 M)</span>
          </div>

          <h2 className="font-title text-3xl sm:text-4xl font-bold tracking-wider text-gradient-cyan">
            ENTER THE LEGEND
          </h2>

          <div className="relative p-4 bg-[#ffffff] rounded-2xl mx-auto inline-block border-2 border-[#00f0ff] shadow-[0_0_30px_rgba(0,240,255,0.6)]">
            <QRCodeSVG
              value="https://aquasaga2026.edu/register"
              size={150}
              bgColor="#ffffff"
              fgColor="#031521"
              level="H"
            />
          </div>

          <div className="space-y-1">
            <p className="font-mono text-xs text-[#00f0ff] font-bold flex items-center justify-center gap-1.5">
              <QrCode className="w-4 h-4" /> SCAN TO REGISTER INSTANTLY
            </p>
            <p className="font-mono text-[11px] text-[#8aa4b5]">
              OFFICIAL AQUASAGA 2026 ENTRY SEAL
            </p>
          </div>

          <button
            onClick={() => {
              soundscape.playRuneChime(987.77);
              onOpenRegister(null);
            }}
            className="btn-rune w-full justify-center text-xs py-3.5 rounded-full"
          >
            <span>REGISTER FOR AQUASAGA 2026</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Epilogue Footer */}
        <div className="mt-8 text-center space-y-1 pointer-events-auto">
          <img
            src="/assets/aquasaga_logo.png"
            alt="AQUASAGA Footer Logo"
            className="h-10 w-auto object-contain mx-auto drop-shadow-[0_0_15px_rgba(0,240,255,0.7)]"
          />
          <p className="font-subtitle text-xs text-[#8aa4b5] tracking-[0.25em]">
            LEGENDS BENEATH THE SURFACE
          </p>
          <p className="font-mono text-xs text-[#00d9d0]">
            NATIONAL INSTITUTE OF TECHNOLOGY • OCTOBER 24-27, 2026
          </p>
        </div>
      </section>
    </div>
  );
}
