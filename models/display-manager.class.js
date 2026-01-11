class DisplayManager {

    constructor() {
        this.wrapper = document.getElementById('cover');
        this.canvas = document.getElementById('canvas');
        this.btn = document.getElementById('fullscreen');

        this.originalWidth = this.canvas.width;
        this.originalHeight = this.canvas.height;
        this.initListeners();
    }


    initListeners() {
        this.btn.addEventListener('click', () => this.toggleFullscreen());
        document.addEventListener('fullscreenchange', () => this.resizeCanvas());
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            this.wrapper.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    resizeCanvas() {
        if (document.fullscreenElement) {
            this.wrapper.style.width = window.innerWidth;
            this.wrapper.style.height = window.innerHeight;
            this.canvas.style.width = '100vw';
            this.canvas.style.height = '100vh';

        } else {
            this.wrapper.style.width = this.originalWidth;
            this.wrapper.style.height = this.originalHeight;
            this.canvas.style.width = '';
            this.canvas.style.height = '';
        }
    }
}



