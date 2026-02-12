/** * Manages fullscreen transitions and canvas resizing logic. */
class DisplayManager {
  constructor() {
    this.iconImg = document.getElementById("fullscreen-icon");
    this.wrapper = document.getElementById("cover");
    this.canvas = document.getElementById("canvas");
    this.btn = document.getElementById("fullscreen");

    this.originalWidth = this.canvas.width;
    this.originalHeight = this.canvas.height;
    this.initListeners();
  }

  /** Sets up event listeners for fullscreen buttons and state changes */
  initListeners() {
    this.btn.addEventListener("click", () => this.toggleFullscreen());
    document.addEventListener("fullscreenchange", () => this.resizeCanvas());
    document.addEventListener("fullscreenchange", () => {
      if (document.fullscreenElement) {
        this.iconImg.src = "img/fullscreen-exit.svg";
      } else {
        this.iconImg.src = "img/fullscreen.svg";
      }
    });
  }

  /** Toggles the fullscreen state of the game container */
  toggleFullscreen() {
    let element = document.getElementById("game-container");
    if (!document.fullscreenElement) {
      element.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  /** Adjusts canvas and wrapper dimensions based on fullscreen state */
  resizeCanvas() {
    if (document.fullscreenElement) {
      this.wrapper.style.width = window.innerWidth;
      this.wrapper.style.height = window.innerHeight;
      this.canvas.style.width = "100vw";
      this.canvas.style.height = "100vh";
    } else {
      this.wrapper.style.width = this.originalWidth;
      this.wrapper.style.height = this.originalHeight;
      this.canvas.style.width = "";
      this.canvas.style.height = "";
    }
  }
}
