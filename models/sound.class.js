class Sound {
  audio;
  isRegistered = false;

  constructor(path) {
    this.audio = new Audio(path);
  }

  registerWorld() {
    if (typeof world !== "undefined" && world.addSound) {
      world.addSound(this);
      this.isRegistered = true;
    }
  }

  pause() {
    this.audio.pause();
  }

  volume(vol) {
    this.audio.volume = vol;
  }

  setMute(status) {
    this.audio.muted = status;
  }

  isPlaying() {
    return !this.audio.paused;
  }

  play() {
    this.registerWorld();
    this.audio.currentTime = 0;
    let playPromise = this.audio.play();

    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        // Wir fangen den "AbortError" ab, damit die Konsole sauber bleibt
        console.warn("Audio play interrupted:", error.message);
      });
    }
  }

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
