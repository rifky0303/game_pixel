/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

class SoundSynth {
  private ctx: AudioContext | null = null;
  private bgmOscs: { osc: OscillatorNode; gain: GainNode }[] = [];
  private lofiIntervalId: any = null;
  private masterGain: GainNode | null = null;
  private isBgmPlaying = false;

  private initContext() {
    if (!this.ctx) {
      // @ts-ignore
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play sound for hoe/digging
  playHoe() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const time = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(120, time);
    osc.frequency.exponentialRampToValueAtTime(30, time + 0.15);

    gain.gain.setValueAtTime(0.6, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.15);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(time);
    osc.stop(time + 0.15);
  }

  // Play watering sound
  playWater() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const time = this.ctx.currentTime;
    // Create soft white-noise-like sound using overlapping triangles
    for (let i = 0; i < 3; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800 + i * 200, time);
      osc.frequency.exponentialRampToValueAtTime(300 + i * 50, time + 0.3);

      gain.gain.setValueAtTime(0.15, time + i * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.25 + i * 0.05);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(time + i * 0.05);
      osc.stop(time + 0.3 + i * 0.05);
    }
  }

  // Play seed planting sound
  playSeed() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const time = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(250, time);
    osc.frequency.linearRampToValueAtTime(350, time + 0.1);

    gain.gain.setValueAtTime(0.3, time);
    gain.gain.linearRampToValueAtTime(0.01, time + 0.1);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(time);
    osc.stop(time + 0.1);
  }

  // Play harvesting pop sound (cheerful retro ring)
  playHarvest() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const time = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, time);
    osc.frequency.exponentialRampToValueAtTime(880, time + 0.1);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(554, time);
    osc2.frequency.exponentialRampToValueAtTime(1108, time + 0.1);

    gain.gain.setValueAtTime(0.3, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.2);

    osc.connect(gain);
    osc2.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc2.start(time);
    osc.stop(time + 0.2);
    osc2.stop(time + 0.2);
  }

  // Play buy/sell coin sound
  playCoin() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const time = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(987.77, time); // B5 note
    osc.frequency.setValueAtTime(1318.51, time + 0.08); // E6 note

    gain.gain.setValueAtTime(0.25, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.25);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(time);
    osc.stop(time + 0.25);
  }

  // Play dialogue step sound (tiny text beep)
  playTextBeep() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const time = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    // Random subtle variation for natural sound
    osc.frequency.setValueAtTime(400 + Math.random() * 50, time);

    gain.gain.setValueAtTime(0.04, time);
    gain.gain.setValueAtTime(0, time + 0.03);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(time);
    osc.stop(time + 0.04);
  }

  // Play level-up sound (majestic rising chords)
  playLevelUp() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // C Major scale notes
    const time = this.ctx.currentTime;

    notes.forEach((freq, index) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time + index * 0.08);

      gain.gain.setValueAtTime(0.2, time + index * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, time + index * 0.08 + 0.4);

      osc.connect(gain);
      gain.connect(this.masterGain!);
      osc.start(time + index * 0.08);
      osc.stop(time + index * 0.08 + 0.45);
    });
  }

  // Play a beautiful, gentle ambient note-sequence in the background (Lo-Fi style cozy loop)
  startRelaxingBGM() {
    if (this.isBgmPlaying) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    this.isBgmPlaying = true;
    
    // Cozy chords pentatonic scale: F, G, A, C, D (Warm F-Major Pentatonic)
    const notes = [
      174.61, 196.00, 220.00, 261.63, 293.66, // Low octave
      349.23, 392.00, 440.00, 523.25, 587.33, // Mid octave
      698.46, 783.99, 880.00, 1046.50 // High octave
    ];

    // Simple bass progression
    const chordRoots = [174.61, 220.00, 261.63, 196.00]; // F, A, C, G
    let beat = 0;

    const playAmbientStep = () => {
      if (!this.ctx || !this.masterGain || !this.isBgmPlaying) return;
      const time = this.ctx.currentTime;

      // Play soft bass root on beat 0, 4
      if (beat % 4 === 0) {
        const root = chordRoots[Math.floor(beat / 4) % chordRoots.length];
        
        const bassOsc = this.ctx.createOscillator();
        const bassGain = this.ctx.createGain();
        bassOsc.type = 'triangle';
        bassOsc.frequency.setValueAtTime(root / 2, time); // 1 octave lower

        bassGain.gain.setValueAtTime(0.12, time);
        bassGain.gain.exponentialRampToValueAtTime(0.001, time + 2.5);

        bassOsc.connect(bassGain);
        bassGain.connect(this.masterGain);
        bassOsc.start(time);
        bassOsc.stop(time + 2.6);
      }

      // Play random sweet melody note (pentatonic, matches the harmony)
      // High probability on beat offsets, creating gentle syncopation
      if (Math.random() < 0.7) {
        // Select an matching note from the scale depending on current chord root
        const baseOffset = [0, 4, 8][Math.floor(Math.random() * 3)];
        const midiNote = notes[baseOffset + Math.floor(Math.random() * 5)];

        const melOsc = this.ctx.createOscillator();
        const melGain = this.ctx.createGain();

        // Round sine wave for warm flute-like tones
        melOsc.type = 'sine';
        melOsc.frequency.setValueAtTime(midiNote, time);

        // Soft attack & long decay
        melGain.gain.setValueAtTime(0, time);
        melGain.gain.linearRampToValueAtTime(0.08, time + 0.1);
        melGain.gain.exponentialRampToValueAtTime(0.001, time + 1.8);

        melOsc.connect(melGain);
        melGain.connect(this.masterGain);
        melOsc.start(time);
        melOsc.stop(time + 1.9);
      }

      beat = (beat + 1) % 16;
    };

    // Play initial immediately
    playAmbientStep();
    // Loop every 1.5 seconds $(cozy 80BGM tempo)
    this.lofiIntervalId = setInterval(playAmbientStep, 1500);
  }

  stopBGM() {
    this.isBgmPlaying = false;
    if (this.lofiIntervalId) {
      clearInterval(this.lofiIntervalId);
      this.lofiIntervalId = null;
    }
  }

  setVolume(volume: number) {
    this.initContext();
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(volume, this.ctx.currentTime);
    }
  }
}

export const sound = new SoundSynth();
