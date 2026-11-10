// Web Audio API Synthesizer for magical chimes, fanfare, candle blow, and birthday chimes
// Works on iOS Safari, Android Chrome, and all desktop browsers without requiring external assets

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private musicPlaying: boolean = false;
  private melodyTimer: NodeJS.Timeout | null = null;
  private bgAudio: HTMLAudioElement | null = null;

  private initCtx() {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopBackgroundMusic();
    }
  }

  public getMuted() {
    return this.isMuted;
  }

  public isPlayingMusic() {
    return this.musicPlaying;
  }

  // Magical celestial chime (for gift click, wish click, sparkle)
  public playCelestialChime() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98]; // C5, E5, G5, C6, E6, G6
    const now = ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.07);

      gain.gain.setValueAtTime(0.001, now + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.2, now + idx * 0.07 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 1.3);
    });
  }

  // Triumphant magical fanfare when gift opens
  public playGiftFanfare() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Chords: C major -> F major -> G major -> High C sparkle
    const chordSeq = [
      { t: 0.0, freqs: [261.63, 329.63, 392.0], d: 0.25 },
      { t: 0.25, freqs: [349.23, 440.0, 523.25], d: 0.25 },
      { t: 0.5, freqs: [392.0, 493.88, 587.33], d: 0.35 },
      { t: 0.9, freqs: [523.25, 659.25, 783.99, 1046.5], d: 1.5 },
    ];

    chordSeq.forEach((step) => {
      step.freqs.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + step.t);

        gain.gain.setValueAtTime(0.001, now + step.t);
        gain.gain.exponentialRampToValueAtTime(0.15, now + step.t + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + step.t + step.d);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + step.t);
        osc.stop(now + step.t + step.d + 0.1);
      });
    });

    // Sparkle trail
    for (let i = 0; i < 10; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const f = 1200 + Math.random() * 1500;
      const startTime = now + 0.9 + i * 0.08;

      osc.type = "sine";
      osc.frequency.setValueAtTime(f, startTime);

      gain.gain.setValueAtTime(0.08, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.35);
    }
  }

  // Wish blow candle sound
  public playCandleBlow() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Breath swoosh (filtered noise simulation)
    const bufferSize = ctx.sampleRate * 0.6;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(400, now);
    filter.frequency.exponentialRampToValueAtTime(150, now + 0.5);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + 0.5);

    // Followed by sweet magical bell chime
    setTimeout(() => {
      this.playCelestialChime();
    }, 400);
  }

  // Pop / firework sound
  public playFireworkPop() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.2);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  // Play background music:
  // First tries local audio `/music/birthday-music.mp3`.
  // If it fails or is absent, seamlessly plays a soft acoustic music-box synthesized birthday loop!
  public startBackgroundMusic(onStateChange?: (playing: boolean) => void) {
    if (this.isMuted) return;
    this.musicPlaying = true;
    onStateChange?.(true);

    if (typeof window === "undefined") return;

    // Check if background audio is already active
    if (this.bgAudio) {
      this.bgAudio.play().catch(() => {
        this.startSynthMelody();
      });
      return;
    }

    const audio = new Audio("/music/birthday-music.mp3");
    audio.loop = true;
    audio.volume = 0.5;

    audio
      .play()
      .then(() => {
        this.bgAudio = audio;
      })
      .catch(() => {
        // Fallback to warm music-box synthesizer loop
        this.startSynthMelody();
      });
  }

  public stopBackgroundMusic(onStateChange?: (playing: boolean) => void) {
    this.musicPlaying = false;
    onStateChange?.(false);

    if (this.bgAudio) {
      this.bgAudio.pause();
    }
    if (this.melodyTimer) {
      clearTimeout(this.melodyTimer);
      this.melodyTimer = null;
    }
  }

  // Music-box style dreamy birthday theme loop
  private startSynthMelody() {
    if (!this.musicPlaying || this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    // "Happy Birthday To You" in C Major
    // C4, C4, D4, C4, F4, E4 ...
    const melody: [number, number][] = [
      [261.63, 0.4], [261.63, 0.4], [293.66, 0.8], [261.63, 0.8], [349.23, 0.8], [329.63, 1.4],
      [261.63, 0.4], [261.63, 0.4], [293.66, 0.8], [261.63, 0.8], [392.00, 0.8], [349.23, 1.4],
      [261.63, 0.4], [261.63, 0.4], [523.25, 0.8], [440.00, 0.8], [349.23, 0.8], [329.63, 0.8], [293.66, 1.2],
      [466.16, 0.4], [466.16, 0.4], [440.00, 0.8], [349.23, 0.8], [392.00, 0.8], [349.23, 1.6],
    ];

    let offset = 0;
    const now = ctx.currentTime + 0.1;

    melody.forEach(([freq, duration]) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Soft music box timbre: sine with subtle harmonic
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + offset);

      gain.gain.setValueAtTime(0.001, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.07, now + offset + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + duration * 0.95);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + offset);
      osc.stop(now + offset + duration);

      offset += duration * 0.65;
    });

    // Schedule next loop
    const totalTimeMs = (offset + 1.5) * 1000;
    this.melodyTimer = setTimeout(() => {
      if (this.musicPlaying && !this.isMuted) {
        this.startSynthMelody();
      }
    }, totalTimeMs);
  }
}

export const soundManager = new SoundManager();

