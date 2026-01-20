class Sound {
    audio;

    constructor(path) {
        this.audio = new Audio(path);
    }

 

    pause() {
        this.audio.pause();
    }

    volume(vol) {
        this.audio.volume = vol;
    }



    isPlaying() {
        return !this.audio.paused;
    }

    play() {
    this.audio.currentTime = 0;
    let playPromise = this.audio.play();

    if (playPromise !== undefined) {
        playPromise.catch(error => {
            // Wir fangen den "AbortError" ab, damit die Konsole sauber bleibt
            console.warn("Audio play interrupted:", error.message);
        });
    }
}

loop() {
    this.audio.loop = true;
    let playPromise = this.audio.play();

    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.warn("Audio loop interrupted:", error.message);
        });
    }
}

}