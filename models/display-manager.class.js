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
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        } else {
            this.canvas.width = this.originalWidth;
            this.canvas.height = this.originalHeight;
        }
    }
}
 


