// Audio Synthesizer using Web Audio API for rich, zero-dependency tactile sound effects

let audioCtx: AudioContext | null = null;
let isMuted = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setMuted(muted: boolean) {
  isMuted = muted;
}

export function getMuted(): boolean {
  return isMuted;
}

// Gentle pleasant pop/click for buttons
export function playClickSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(600, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.06);

  gain.gain.setValueAtTime(0.12, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.06);
}

// Keypad tap sound with pitch variation
export function playKeySound(pitchMultiplier = 1) {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  const baseFreq = 523.25; // C5
  osc.frequency.setValueAtTime(baseFreq * pitchMultiplier, ctx.currentTime);

  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.08);
}

// Romantic success chord arpeggio
export function playSuccessChime() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (C Major sparkle)
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.07);

    gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.07);
    gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + i * 0.07 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.07 + 0.45);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + i * 0.07);
    osc.stop(ctx.currentTime + i * 0.07 + 0.45);
  });
}

// Gentle buzz for wrong answer/code
export function playErrorSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(150, ctx.currentTime);
  osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.15);

  gain.gain.setValueAtTime(0.12, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.15);
}

// Wax seal cracking/peeling sound
export function playWaxSealSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  // Synthesize white noise burst with filter to mimic wax crunch & paper sliding
  const bufferSize = ctx.sampleRate * 0.2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(1200, ctx.currentTime);
  filter.Q.setValueAtTime(3, ctx.currentTime);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.2, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start();

  // Subtle warm note underneath
  const osc = ctx.createOscillator();
  const oscGain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(440, ctx.currentTime + 0.05);
  oscGain.gain.setValueAtTime(0.1, ctx.currentTime + 0.05);
  oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

  osc.connect(oscGain);
  oscGain.connect(ctx.destination);
  osc.start(ctx.currentTime + 0.05);
  osc.stop(ctx.currentTime + 0.3);
}

// Slot machine reel tick sound
export function playReelTick() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(800 + Math.random() * 200, ctx.currentTime);

  gain.gain.setValueAtTime(0.08, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.03);
}

// Teasing / playful victory music
export function playTeasingMusic() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  // Playful, mischievous boing/bounce melody ("Wah-wah-wah-boing" or sassy swing tune)
  // Notes: [F4, Ab4, A4, C5, Eb5, D5, Db5, C5] with bouncy staccato syncopation
  const notes = [
    { freq: 349.23, time: 0.00, dur: 0.14, type: 'triangle' as OscillatorType, vol: 0.18 }, // F4
    { freq: 415.30, time: 0.16, dur: 0.14, type: 'triangle' as OscillatorType, vol: 0.18 }, // Ab4
    { freq: 440.00, time: 0.32, dur: 0.16, type: 'sawtooth' as OscillatorType, vol: 0.15 }, // A4
    { freq: 523.25, time: 0.50, dur: 0.18, type: 'triangle' as OscillatorType, vol: 0.20 }, // C5
    { freq: 622.25, time: 0.70, dur: 0.18, type: 'sawtooth' as OscillatorType, vol: 0.16 }, // Eb5
    { freq: 587.33, time: 0.90, dur: 0.16, type: 'triangle' as OscillatorType, vol: 0.18 }, // D5
    { freq: 554.37, time: 1.08, dur: 0.16, type: 'triangle' as OscillatorType, vol: 0.18 }, // Db5
    { freq: 523.25, time: 1.26, dur: 0.45, type: 'sine' as OscillatorType, vol: 0.22 },     // C5 (held)
    // Sassy cheeky slide at the end
    { freq: 659.25, time: 1.75, dur: 0.15, type: 'triangle' as OscillatorType, vol: 0.20 }, // E5
    { freq: 698.46, time: 1.92, dur: 0.35, type: 'sawtooth' as OscillatorType, vol: 0.22 }, // F5
  ];

  notes.forEach((n) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = n.type;
    osc.frequency.setValueAtTime(n.freq, ctx.currentTime + n.time);

    gain.gain.setValueAtTime(0, ctx.currentTime + n.time);
    gain.gain.linearRampToValueAtTime(n.vol, ctx.currentTime + n.time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + n.time + n.dur);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + n.time);
    osc.stop(ctx.currentTime + n.time + n.dur);
  });
}

// Jackpot victory fanfare
export function playJackpotSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  // Joyful triumphant fanfare (C5, G5, C6, E6, G6)
  const notes = [523.25, 783.99, 1046.5, 1318.51, 1567.98];
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);

    gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.1);
    gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + idx * 0.1 + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.1 + 0.6);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + idx * 0.1);
    osc.stop(ctx.currentTime + idx * 0.1 + 0.6);
  });
}
