import React, { useState } from 'react';
import { X, CheckCircle, Sparkles, Send, ShieldCheck } from 'lucide-react';
import { EVENTS_DATA } from '../data/eventsData';
import { soundscape } from '../canvas/AudioSystem';

export default function RegistrationModal({ isOpen, onClose, selectedEvent }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    teamName: '',
    selectedEventId: selectedEvent ? selectedEvent.id : EVENTS_DATA[0].id
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    soundscape.playRuneChime(880); // High A5 chime
    setIsSubmitted(true);
  };

  const currentEvent = EVENTS_DATA.find(e => e.id === formData.selectedEventId) || EVENTS_DATA[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[rgba(3,21,33,0.85)] backdrop-blur-xl pointer-events-auto animate-fadeIn">
      <div className="relative w-full max-w-xl glass-panel-glow p-6 sm:p-8 max-h-[90vh] overflow-y-auto border border-[rgba(66,255,243,0.4)]">
        {/* Header Close Bar */}
        <div className="flex items-center justify-between border-b border-[rgba(66,255,243,0.15)] pb-4 mb-6">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#42fff3]" />
            <div>
              <h2 className="font-title text-xl font-bold tracking-wider text-gradient-cyan">
                ENTER THE LEGEND
              </h2>
              <p className="font-mono text-[10px] text-[#8aa4b5] tracking-widest">
                AQUASAGA 2026 OFFICIAL REGISTRATION
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsSubmitted(false);
              onClose();
            }}
            className="w-8 h-8 rounded-full border border-[rgba(66,255,243,0.3)] text-[#8aa4b5] hover:text-[#42fff3] flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-5 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[rgba(66,255,243,0.15)] border-2 border-[#42fff3] text-[#42fff3] flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(66,255,243,0.5)]">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div>
              <span className="font-mono text-xs text-[#00d9d0] tracking-widest block mb-1">
                REGISTRATION ENGRAVED
              </span>
              <h3 className="font-title text-2xl font-bold text-[#e8f9ff]">
                WELCOME TO {currentEvent.name}
              </h3>
              <p className="font-body text-xs text-[#8aa4b5] mt-2 max-w-md mx-auto">
                Your entry seal has been forged. A confirmation scroll with schedule passes has been dispatched to <span className="text-[#42fff3]">{formData.email}</span>.
              </p>
            </div>

            <div className="glass-panel p-4 text-left max-w-sm mx-auto space-y-1.5 border border-[rgba(66,255,243,0.2)]">
              <div className="flex justify-between font-mono text-[10px] text-[#8aa4b5]">
                <span>NAME</span>
                <span className="text-[#e8f9ff] font-semibold">{formData.fullName}</span>
              </div>
              <div className="flex justify-between font-mono text-[10px] text-[#8aa4b5]">
                <span>TEAM</span>
                <span className="text-[#e8f9ff] font-semibold">{formData.teamName || 'Solo'}</span>
              </div>
              <div className="flex justify-between font-mono text-[10px] text-[#8aa4b5]">
                <span>REALM</span>
                <span className="text-[#42fff3] font-semibold">{currentEvent.name}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsSubmitted(false);
                onClose();
              }}
              className="btn-rune text-xs py-3 px-8 mx-auto"
            >
              <span>RETURN TO THE DEPTHS</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Event Selector */}
            <div>
              <label className="block font-mono text-xs text-[#00d9d0] tracking-wider mb-1.5">
                SELECT EVENT REALM
              </label>
              <select
                value={formData.selectedEventId}
                onChange={(e) => setFormData({ ...formData, selectedEventId: e.target.value })}
                className="w-full glass-panel px-4 py-2.5 font-mono text-xs text-[#e8f9ff] bg-[rgba(3,21,33,0.9)] border border-[rgba(66,255,243,0.3)] focus:border-[#42fff3] focus:outline-none rounded cursor-pointer"
              >
                {EVENTS_DATA.map(e => (
                  <option key={e.id} value={e.id} className="bg-[#031521] text-[#e8f9ff]">
                    {e.number} — {e.name} ({e.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Name */}
            <div>
              <label className="block font-mono text-xs text-[#8aa4b5] tracking-wider mb-1.5">
                FULL NAME *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Marcus Vance"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full glass-panel px-4 py-2.5 font-body text-xs text-[#e8f9ff] border border-[rgba(66,255,243,0.2)] focus:border-[#42fff3] focus:outline-none rounded"
              />
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-xs text-[#8aa4b5] tracking-wider mb-1.5">
                  EMAIL ADDRESS *
                </label>
                <input
                  type="email"
                  required
                  placeholder="marcus@college.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full glass-panel px-4 py-2.5 font-body text-xs text-[#e8f9ff] border border-[rgba(66,255,243,0.2)] focus:border-[#42fff3] focus:outline-none rounded"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-[#8aa4b5] tracking-wider mb-1.5">
                  PHONE NUMBER *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full glass-panel px-4 py-2.5 font-body text-xs text-[#e8f9ff] border border-[rgba(66,255,243,0.2)] focus:border-[#42fff3] focus:outline-none rounded"
                />
              </div>
            </div>

            {/* College & Team Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-xs text-[#8aa4b5] tracking-wider mb-1.5">
                  COLLEGE / INSTITUTION *
                </label>
                <input
                  type="text"
                  required
                  placeholder="National Institute of Tech"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  className="w-full glass-panel px-4 py-2.5 font-body text-xs text-[#e8f9ff] border border-[rgba(66,255,243,0.2)] focus:border-[#42fff3] focus:outline-none rounded"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-[#8aa4b5] tracking-wider mb-1.5">
                  TEAM NAME (OPTIONAL)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Abyssal Coders"
                  value={formData.teamName}
                  onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                  className="w-full glass-panel px-4 py-2.5 font-body text-xs text-[#e8f9ff] border border-[rgba(66,255,243,0.2)] focus:border-[#42fff3] focus:outline-none rounded"
                />
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-4 border-t border-[rgba(66,255,243,0.15)] flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#8aa4b5]">
                <ShieldCheck className="w-4 h-4 text-[#00d9d0]" />
                <span>OFFICIAL AQUASAGA SEAL</span>
              </div>
              <button type="submit" className="btn-rune text-xs py-3 px-6">
                <span>CONFIRM REGISTRATION</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
