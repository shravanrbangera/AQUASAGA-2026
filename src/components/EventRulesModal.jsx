import React from 'react';
import { X, Shield, Calendar, Clock, Users, Award, ExternalLink, MapPin, Sparkles } from 'lucide-react';
import { soundscape } from '../canvas/AudioSystem';

export default function EventRulesModal({ event, onClose, onRegister }) {
  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[rgba(2,12,20,0.92)] backdrop-blur-2xl pointer-events-auto transition-all animate-fadeIn">
      {/* Ancient Submerged Codex Tablet Card */}
      <div className="relative w-full max-w-xl bg-[rgba(3,21,33,0.95)] p-6 sm:p-9 max-h-[88vh] overflow-y-auto border-t-2 border-t-[#00f0ff] border-b-2 border-b-[#42fff3] shadow-[0_0_60px_rgba(0,240,255,0.4)] rounded-3xl space-y-5">
        {/* Header Close Bar */}
        <div className="flex items-start justify-between border-b border-[rgba(0,240,255,0.2)] pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs text-[#00f0ff] font-bold px-3 py-1 rounded-full bg-[rgba(0,240,255,0.15)] border border-[rgba(0,240,255,0.3)]">
                REALM {event.number} • {event.depth}
              </span>
              <span className="font-mono text-xs text-[#8aa4b5] font-semibold">
                {event.category}
              </span>
            </div>
            <h2 className="font-title text-3xl sm:text-4xl font-bold tracking-wider text-gradient-cyan mt-1">
              {event.name}
            </h2>
            <p className="font-body text-xs sm:text-sm text-[#42fff3] italic mt-1">
              "{event.tagline}"
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-[rgba(0,240,255,0.4)] bg-[#031521] text-[#ffffff] hover:text-[#00f0ff] hover:border-[#00f0ff] flex items-center justify-center transition-all cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.3)] flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Specs Grid (4 Floating Crystal Badges) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="glass-panel p-3 text-center border border-[rgba(0,240,255,0.2)] rounded-xl">
            <div className="flex items-center justify-center gap-1 text-[11px] font-mono text-[#00d9d0] mb-0.5 font-bold">
              <Calendar className="w-3.5 h-3.5 text-[#00f0ff]" /> DATE
            </div>
            <div className="font-mono text-xs font-bold text-[#ffffff]">
              {event.date}
            </div>
          </div>

          <div className="glass-panel p-3 text-center border border-[rgba(0,240,255,0.2)] rounded-xl">
            <div className="flex items-center justify-center gap-1 text-[11px] font-mono text-[#00d9d0] mb-0.5 font-bold">
              <Clock className="w-3.5 h-3.5 text-[#00f0ff]" /> TIME
            </div>
            <div className="font-mono text-xs font-bold text-[#ffffff]">
              {event.time}
            </div>
          </div>

          <div className="glass-panel p-3 text-center border border-[rgba(0,240,255,0.2)] rounded-xl">
            <div className="flex items-center justify-center gap-1 text-[11px] font-mono text-[#00d9d0] mb-0.5 font-bold">
              <Users className="w-3.5 h-3.5 text-[#00f0ff]" /> TEAM
            </div>
            <div className="font-mono text-xs font-bold text-[#ffffff]">
              {event.teamSize}
            </div>
          </div>

          <div className="glass-panel p-3 text-center border border-[rgba(0,240,255,0.2)] rounded-xl">
            <div className="flex items-center justify-center gap-1 text-[11px] font-mono text-[#42fff3] mb-0.5 font-bold">
              <Award className="w-3.5 h-3.5 text-[#42fff3]" /> PRIZE
            </div>
            <div className="font-mono text-xs font-bold text-[#42fff3]">
              {event.prizePool}
            </div>
          </div>
        </div>

        {/* Overview */}
        <div>
          <h3 className="font-subtitle text-xs text-[#00f0ff] tracking-[0.25em] mb-1.5 flex items-center gap-1.5 font-bold">
            <Shield className="w-4 h-4 text-[#00f0ff]" /> REALM OVERVIEW
          </h3>
          <p className="font-body text-xs sm:text-sm text-[#e8f9ff] leading-relaxed font-medium">
            {event.description}
          </p>
        </div>

        {/* Illuminated Glowing Crystal Rules List */}
        <div>
          <h3 className="font-subtitle text-xs text-[#00f0ff] tracking-[0.25em] mb-3 flex items-center gap-1.5 font-bold">
            <Sparkles className="w-4 h-4 text-[#42fff3]" /> RULES OF THE REALM
          </h3>
          <div className="space-y-2.5">
            {event.rules.map((rule, idx) => (
              <div key={idx} className="p-3.5 bg-[rgba(5,33,50,0.85)] border-l-4 border-l-[#00f0ff] rounded-xl flex items-start gap-3.5 shadow-[0_0_15px_rgba(0,240,255,0.1)]">
                <span className="font-mono text-xs sm:text-sm text-[#00f0ff] font-bold px-2 py-0.5 rounded bg-[rgba(0,240,255,0.15)] flex-shrink-0">
                  0{idx + 1}
                </span>
                <p className="font-body text-xs sm:text-sm text-[#ffffff] font-medium leading-relaxed">
                  {rule}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[rgba(0,240,255,0.2)]">
          <div className="flex items-center gap-1.5 text-xs font-mono text-[#8aa4b5]">
            <MapPin className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span>VENUE: {event.venue}</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="btn-secondary flex-1 sm:flex-none justify-center text-xs py-2.5 px-5 rounded-full"
            >
              CLOSE
            </button>
            <button
              onClick={() => {
                soundscape.playRuneChime(783.99);
                onClose();
                onRegister(event);
              }}
              className="btn-rune flex-1 sm:flex-none justify-center text-xs py-2.5 px-6 rounded-full"
            >
              <span>REGISTER NOW</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
