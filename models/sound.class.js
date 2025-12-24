class Sound {
    audio;

    constructor(path) {
        this.audio = new Audio(path);
    }

    play() {
        this.audio.currentTime = 0;
        this.audio.play();
    }

    pause() {
        this.audio.pause();
    }

    volume(vol) {
        this.audio.volume = vol;
    }

    loop() {
        this.audio.loop = true;
        this.audio.play();
    }

    isPlaying() {
        return !this.audio.paused;
    }

}