// Web Audio API Synthesizer for cheerful acoustic birthday chimes, fanfares, and music
// Works seamlessly on iOS Safari, Android Chrome, and all desktop browsers without external files

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private musicPlaying: boolean = false;
  private melodyTimer: NodeJS.Timeout | null = null;
  private bgAudio: HTMLAudioElement | null = null;

  private initCtx() {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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

  // Celestial sparkle chime
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
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);

      gain.gain.setValueAtTime(0.001, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.18, now + idx * 0.06 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 1.3);
    });
  }

  // Fanfare when opening curtains or celebration
  public playGiftFanfare() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const chordSeq = [
      { t: 0.0, freqs: [261.63, 329.63, 392.0], d: 0.22 },
      { t: 0.22, freqs: [349.23, 440.0, 523.25], d: 0.22 },
      { t: 0.44, freqs: [392.0, 493.88, 587.33], d: 0.3 },
      { t: 0.78, freqs: [523.25, 659.25, 783.99, 1046.5], d: 1.4 },
    ];

    chordSeq.forEach((step) => {
      step.freqs.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + step.t);

        gain.gain.setValueAtTime(0.001, now + step.t);
        gain.gain.exponentialRampToValueAtTime(0.14, now + step.t + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + step.t + step.d);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + step.t);
        osc.stop(now + step.t + step.d + 0.1);
      });
    });
  }

  // Candle blow swoosh
  public playCandleBlow() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const bufferSize = ctx.sampleRate * 0.5;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(450, now);
    filter.frequency.exponentialRampToValueAtTime(120, now + 0.45);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + 0.5);

    setTimeout(() => {
      this.playCelestialChime();
    }, 380);
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

  // Play background birthday song
  public startBackgroundMusic(onStateChange?: (playing: boolean) => void) {
    if (this.isMuted) return;
    this.musicPlaying = true;
    onStateChange?.(true);

    if (typeof window === "undefined") return;

    if (this.bgAudio) {
      this.bgAudio.play().catch(() => {
        this.startSynthBirthdaySong();
      });
      return;
    }

    // Try local audio assets
    const audioCandidates = [
      "/music/happy-birthday.mp3",
      "/music/birthday-song.mp3",
      "/music/birthday-music.mp3",
    ];

    const tryLoad = (idx: number) => {
      if (idx >= audioCandidates.length) {
        this.startSynthBirthdaySong();
        return;
      }
      const audio = new Audio(audioCandidates[idx]);
      audio.loop = true;
      audio.volume = 0.6;
      audio
        .play()
        .then(() => {
          this.bgAudio = audio;
        })
        .catch(() => {
          tryLoad(idx + 1);
        });
    };

    tryLoad(0);
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

  // Cheerful, warm music-box Happy Birthday Song loop
  private startSynthBirthdaySong() {
    if (!this.musicPlaying || this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    // "Happy Birthday To You" Notes & Chords in F Major
    const melody: [number, number, number?][] = [
      // Hap-py Birth-day to you
      [261.63, 0.35, 130.81],
      [261.63, 0.35, 130.81],
      [293.66, 0.7, 146.83],
      [261.63, 0.7, 130.81],
      [349.23, 0.7, 174.61],
      [329.63, 1.2, 164.81],

      // Hap-py Birth-day to you
      [261.63, 0.35, 130.81],
      [261.63, 0.35, 130.81],
      [293.66, 0.7, 146.83],
      [261.63, 0.7, 130.81],
      [392.00, 0.7, 196.00],
      [349.23, 1.2, 174.61],

      // Hap-py Birth-day dear Al-len
      [261.63, 0.35, 130.81],
      [261.63, 0.35, 130.81],
      [523.25, 0.7, 261.63],
      [440.00, 0.7, 220.00],
      [349.23, 0.7, 174.61],
      [329.63, 0.7, 164.81],
      [293.66, 1.1, 146.83],

      // Hap-py Birth-day to you
      [466.16, 0.35, 233.08],
      [466.16, 0.35, 233.08],
      [440.00, 0.7, 220.00],
      [349.23, 0.7, 174.61],
      [392.00, 0.7, 196.00],
      [349.23, 1.5, 174.61],
    ];

    let offset = 0;
    const now = ctx.currentTime + 0.1;

    melody.forEach(([freq, duration, bassFreq]) => {
      // Main melody bell
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + offset);

      gain.gain.setValueAtTime(0.001, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.09, now + offset + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + duration * 0.9);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + offset);
      osc.stop(now + offset + duration);

      // Warm acoustic bass accompaniment
      if (bassFreq) {
        const bassOsc = ctx.createOscillator();
        const bassGain = ctx.createGain();
        bassOsc.type = "triangle";
        bassOsc.frequency.setValueAtTime(bassFreq, now + offset);
        bassGain.gain.setValueAtTime(0.001, now + offset);
        bassGain.gain.exponentialRampToValueAtTime(0.04, now + offset + 0.02);
        bassGain.gain.exponentialRampToValueAtTime(0.0001, now + offset + duration * 0.85);

        bassOsc.connect(bassGain);
        bassGain.connect(ctx.destination);

        bassOsc.start(now + offset);
        bassOsc.stop(now + offset + duration);
      }

      offset += duration * 0.68;
    });

    const totalTimeMs = (offset + 1.2) * 1000;
    this.melodyTimer = setTimeout(() => {
      if (this.musicPlaying && !this.isMuted) {
        this.startSynthBirthdaySong();
      }
    }, totalTimeMs);
  }
}

export const soundManager = new SoundManager();
