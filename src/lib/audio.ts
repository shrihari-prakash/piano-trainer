type OscillatorConfig = {
  type: OscillatorType;
  frequency: number;
  freqRampTo?: { value: number; duration: number };
};

type EnvelopeConfig = {
  gainStart: number;
  duration: number;
  rampTo?: { value: number; duration: number };
  target?: { value: number; startTimeOffset: number; timeConstant: number };
};

class AudioManager {
  private ctx: AudioContext | null = null;

  init() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx?.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  private playSound(oscillators: OscillatorConfig[], envelope: EnvelopeConfig) {
    if (!this.ctx) return;
    this.init();

    const t = this.ctx.currentTime;
    const gain = this.ctx.createGain();
    gain.connect(this.ctx.destination);

    // Apply envelope
    gain.gain.setValueAtTime(envelope.gainStart, t);
    if (envelope.rampTo) {
      gain.gain.exponentialRampToValueAtTime(
        envelope.rampTo.value,
        t + envelope.rampTo.duration,
      );
    } else if (envelope.target) {
      gain.gain.setTargetAtTime(
        envelope.target.value,
        t + envelope.target.startTimeOffset,
        envelope.target.timeConstant,
      );
    }

    // Apply oscillators
    oscillators.forEach((oscConfig) => {
      const osc = this.ctx!.createOscillator();
      osc.connect(gain);
      osc.type = oscConfig.type;
      osc.frequency.setValueAtTime(oscConfig.frequency, t);

      if (oscConfig.freqRampTo) {
        osc.frequency.exponentialRampToValueAtTime(
          oscConfig.freqRampTo.value,
          t + oscConfig.freqRampTo.duration,
        );
      }

      osc.start(t);
      osc.stop(t + envelope.duration);
    });
  }

  private playMelody(
    notes: { pitch: number; duration: number; offset: number }[],
  ) {
    if (!this.ctx) return;
    this.init();

    const t = this.ctx.currentTime;

    notes.forEach((note) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.type = "sine";
      osc.frequency.setValueAtTime(note.pitch, t + note.offset);

      // Fast attack, smooth decay for each individual note
      gain.gain.setValueAtTime(0, t);
      gain.gain.setValueAtTime(0.3, t + note.offset); // Volume setting
      gain.gain.setTargetAtTime(
        0.001,
        t + note.offset + 0.05,
        note.duration * 0.3,
      );

      osc.start(t + note.offset);
      osc.stop(t + note.offset + note.duration);
    });
  }

  playTick() {
    this.playSound(
      [
        {
          type: "sine",
          frequency: 1500,
        },
      ],
      {
        gainStart: 0.5,
        duration: 0.1,
        rampTo: { value: 0.001, duration: 0.1 },
      },
    );
  }

  playBuzzer() {
    // Play a fast, pleasant ascending arpeggio melody (G4 -> C5)
    this.playMelody([
      { pitch: 392.0, duration: 0.2, offset: 0 }, // G4
      { pitch: 523.25, duration: 0.2, offset: 0.15 }, // C5
    ]);
  }
}

export const audioManager = new AudioManager();
