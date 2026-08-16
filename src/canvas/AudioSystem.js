// Web Audio API Ambient Soundscape & Rune SFX Generator

class SoundscapeSystem {
  constructor() {
    this.ctx = null;
    this.isMuted = true;
    this.isPlaying = false;
    this.ambientGain = null;
    this.filterNode = null;
    this.noiseNode = null;
    this.osc1 = null;
    this.osc2 = null;
  }

  init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    this.ctx = new AudioCtx();

    // Main ambient gain
    this.ambientGain = this.ctx.createGain();
    this.ambientGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.ambientGain.connect(this.ctx.destination);

    // Deep ocean filter (low pass)
    this.filterNode = this.ctx.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.setValueAtTime(180, this.ctx.currentTime);
    this.filterNode.Q.setValueAtTime(4, this.ctx.currentTime);
    this.filterNode.connect(this.ambientGain);

    // Sub-bass drone 1 (55Hz - A1)
    this.osc1 = this.ctx.createOscillator();
    this.osc1.type = 'sine';
    this.osc1.frequency.setValueAtTime(55, this.ctx.currentTime);
    const osc1Gain = this.ctx.createGain();
    osc1Gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
    this.osc1.connect(osc1Gain);
    osc1Gain.connect(this.filterNode);
    this.osc1.start();

    // Sub-bass drone 2 (82.4Hz - E2)
    this.osc2 = this.ctx.createOscillator();
    this.osc2.type = 'triangle';
    this.osc2.frequency.setValueAtTime(82.4, this.ctx.currentTime);
    const osc2Gain = this.ctx.createGain();
    osc2Gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    this.osc2.connect(osc2Gain);
    osc2Gain.connect(this.filterNode);
    this.osc2.start();

    // Low water rumble noise buffer
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.05;
    }
    this.noiseNode = this.ctx.createBufferSource();
    this.noiseNode.buffer = noiseBuffer;
    this.noiseNode.loop = true;
    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    this.noiseNode.connect(noiseGain);
    noiseGain.connect(this.filterNode);
    this.noiseNode.start();
  }

  toggleSound() {
    if (!this.ctx) this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    
    this.isMuted = !this.isMuted;
    if (this.ambientGain) {
      const targetGain = this.isMuted ? 0.001 : 0.25;
      this.ambientGain.gain.exponentialRampToValueAtTime(
        targetGain,
        this.ctx.currentTime + 1.2
      );
    }
    return !this.isMuted;
  }

  playRuneChime(freq = 523.25) { // C5 default
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      
      // Frequency glide for ethereal magical chime
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + 0.8);
      
      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.15, this.ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.5);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(this.ctx.currentTime + 1.6);
    } catch (e) {
      console.warn('Audio chime error:', e);
    }
  }
}

export const soundscape = new SoundscapeSystem();
