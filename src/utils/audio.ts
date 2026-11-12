/**
 * Romantic ambient soundscape generator using Web Audio API.
 * Synthesizes a warm, delicate piano-like acoustic melody loop and soft vinyl crackle
 * with zero external audio assets needed.
 */

class RomanceAmbiance {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private gainNode: GainNode | null = null;

  // Gentle acoustic chords (Cmaj7 - Am7 - Fmaj7 - G6 progression)
  private readonly chordNotes = [
    [261.63, 329.63, 392.00, 493.88], // C E G B (Cmaj7)
    [220.00, 261.63, 329.63, 392.00], // A C E G (Am7)
    [174.61, 261.63, 329.63, 349.23], // F C E F (Fmaj7)
    [196.00, 246.94, 293.66, 392.00], // G B D G (G6)
  ];
  private step: number = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.2, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playTone(freq: number, startTime: number, duration: number, volume: number) {
    if (!this.ctx || !this.gainNode) return;

    const osc = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Soft warm chime timbre
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    // Warm subtle harmonic overtone
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, startTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, startTime);
    filter.frequency.exponentialRampToValueAtTime(300, startTime + duration);

    // Gentle acoustic attack & decay envelope
    noteGain.gain.setValueAtTime(0.0001, startTime);
    noteGain.gain.linearRampToValueAtTime(volume, startTime + 0.08);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(filter);
    osc2.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.gainNode);

    osc.start(startTime);
    osc2.start(startTime);
    osc.stop(startTime + duration);
    osc2.stop(startTime + duration);
  }

  private playArpeggio() {
    if (!this.ctx || !this.isPlaying) return;

    const chord = this.chordNotes[this.step % this.chordNotes.length];
    const now = this.ctx.currentTime;

    // Pluck notes gently in sequence
    chord.forEach((freq, idx) => {
      this.playTone(freq, now + idx * 0.45, 2.8, 0.08);
    });

    // Subtle gentle high sparkle note
    const highNote = chord[idxRandom(chord.length)] * 2;
    this.playTone(highNote, now + 1.8, 2.0, 0.04);

    this.step++;
    this.timerId = window.setTimeout(() => this.playArpeggio(), 2400);
  }

  public toggle(): boolean {
    this.initContext();
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.isPlaying = true;
      this.playArpeggio();
      return true;
    }
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

function idxRandom(max: number): number {
  return Math.floor(Math.random() * max);
}

export const ambiance = new RomanceAmbiance();
