/** * Wrapper for the HTMLAudioElement to handle game-specific sound logic. */
class Sound {
  audio;
  isRegistered = false;

  /** @param {string} path - Path to the audio file */
  constructor(path) {
    this.audio = new Audio(path);
  }

  /** Registers the sound in the global world context if available */
  registerWorld() {
    if (typeof world !== "undefined" && world.addSound) {
      world.addSound(this);
      this.isRegistered = true;
    }
  }

  pause() {
    this.audio.pause();
  }

  /** @param {number} vol - Volume from 0 to 1 */
  volume(vol) {
    this.audio.volume = vol;
  }

  /** @param {boolean} status - Mute state */
  setMute(status) {
    this.audio.muted = status;
  }

  /** @returns {boolean} */
  isPlaying() {
    return !this.audio.paused;
  }

  /** Plays sound from start with global state checks */
  play() {
    if (typeof world !== "undefined" && world.gamePaused) {
      return;
    }
    this.registerWorld();
    this.audio.currentTime = 0;
    if (typeof world !== "undefined") {
      this.setMute(world.gameMuted);
    }
    let playPromise = this.audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.warn("Audio play interrupted:", error.message);
      });
    }
  }

  /** Starts looping the sound */
  loop() {
    this.registerWorld();
    this.audio.loop = true;
    let playPromise = this.audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.warn("Audio loop interrupted:", error.message);
      });
    }
  }
}
