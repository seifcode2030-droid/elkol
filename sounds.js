window.soundSystem = {
  context: null,

  ensureContext() {
    if (!this.context) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.context = new AudioCtx();
    }
    if (this.context && this.context.state === 'suspended') this.context.resume();
    return this.context;
  },

  tone({ frequency = 440, duration = 0.18, type = 'sine', gainValue = 0.03, sweep = 0 }) {
    const ctx = this.ensureContext();
    if (!ctx) return;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

    if (sweep) {
      oscillator.frequency.linearRampToValueAtTime(frequency + sweep, ctx.currentTime + duration);
    }

    gainNode.gain.setValueAtTime(0.0001, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(gainValue, ctx.currentTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.start();
    oscillator.stop(ctx.currentTime + duration);
  },

  playReaction() {
    this.tone({ frequency: 220, duration: 0.24, type: 'triangle', gainValue: 0.04, sweep: 80 });
  },

  playExplosion() {
    this.tone({ frequency: 80, duration: 0.7, type: 'sawtooth', gainValue: 0.08, sweep: 240 });
  }
};
