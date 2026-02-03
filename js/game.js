let canvas;
let world;
let keyboard = new Keyboard();
let startImages = [
  "img/9_intro_outro_screens/start/startscreen_1.png",
  "img/9_intro_outro_screens/start/startscreen_2.png",
];
let currentImageIndex = 0;
let intervalId;
let introMusic;
let winMusic;
let loseMusic;

function init() {
  introMusic = new Sound("audio/intro.mp3");
  winMusic = new Sound("audio/win_sound.mp3");
  loseMusic = new Sound("audio/lose_sound.mp3");
  canvas = document.getElementById("canvas");
  renderStartScreen();
}
//hard stop
// function stopAllIntervals() {
//     for (let i = 1; i < 9999; i++) {
//         window.clearInterval(i);
//     }
// }

// rendering both intro pics
function renderStartScreen() {
  let imgElement = document.getElementById("introImage");
  intervalId = setInterval(() => {
    currentImageIndex = (currentImageIndex + 1) % startImages.length;
    imgElement.src = startImages[currentImageIndex];
  }, 3000);
}

//function to dissappear the intro pic and show the canvas
function startGame() {
  let currentMuteState = world ? world.gameMuted : false;
  introMusic.play();
  introMusic.volume(0.06);
  initLevel();
  if (world) {
    world.stopGame();
  }
  document.getElementById("startScreen").classList.add("d-none");
  document.getElementById("gameOverScreen").classList.add("d-none");
  document.getElementById("winScreen").classList.add("d-none");
  world = new World(canvas, keyboard);
  world.gameMuted = currentMuteState;
  world.updateAllSounds();
  document.getElementById("mute-btn").classList.remove("d-none");
  document.getElementById("pause-btn").classList.remove("d-none");
  document.getElementById("fullscreen").classList.remove("d-none");
}

/* function toggleFullscreen() {
  let container = document.getElementById("cover");
  let icon = document.getElementById("fullscreen-icon");
  if (!document.fullscreenElement) {
    if (container.requestFullscreen) {
      container.requestFullscreen();
    } else if (container.webkitRequestFullscreen) {
      container.webkitRequestFullscreen();
    }
    this.icon.src = "img/fullscreen-exit.svg";
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    this.icon.src = "img/fullscreen.svg";
  }
}
 */
function exitFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
}

function toggleOverlay() {
  let overlay = document.getElementById("info-overlay");
  overlay.classList.toggle("d-none");
  if (!overlay.classList.contains("d-none")) {
    openTab("instruction");
  }
}

function showLostScreen() {
  loseMusic.play();
  loseMusic.volume(0.1);
  exitFullscreen();
  document.getElementById("gameOverScreen").classList.remove("d-none");
}

function showWinScreen() {
  winMusic.play();
  winMusic.volume(0.12);
  exitFullscreen();
  document.getElementById("winScreen").classList.remove("d-none");
}

function togglePause() {
  if (world) {
    let icon = document.getElementById("pause-icon");
    world.gamePaused = !world.gamePaused;

    if (world.gamePaused) {
      icon.src = "img/play-fill.svg";
      world.allSounds.forEach((s) => s.pause());
    } else {
      icon.src = "img/pause-fill.svg";
      if (!world.gameMuted) {
        world.backgroundSound.play();
      }
    }
  }
}

function toggleMute() {
  if (world) {
    let icon = document.getElementById("mute-icon");
    world.gameMuted = !world.gameMuted;
    world.updateAllSounds();
    if (world.gameMuted) {
      icon.src = "img/volume-mute-fill.svg";
    } else {
      icon.src = "img/volume-up-fill.svg";
    }
  }
}

function openTab(tabId) {
  document.getElementById("instruction").classList.add("d-none");
  document.getElementById("about").classList.add("d-none");
  document.getElementById("legal").classList.add("d-none");
  document.getElementById(tabId).classList.remove("d-none");
}

//adding event listeners to detect key presses
window.addEventListener("keydown", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  } else if (e.keyCode == 37) {
    keyboard.LEFT = true;
  } else if (e.keyCode == 38) {
    keyboard.UP = true;
  } else if (e.keyCode == 40) {
    keyboard.DOWN = true;
  } else if (e.keyCode == 32) {
    keyboard.SPACE = true;
  } else if (e.keyCode == 68) {
    keyboard.D = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  } else if (e.keyCode == 37) {
    keyboard.LEFT = false;
  } else if (e.keyCode == 38) {
    keyboard.UP = false;
  } else if (e.keyCode == 40) {
    keyboard.DOWN = false;
  } else if (e.keyCode == 32) {
    keyboard.SPACE = false;
  } else if (e.keyCode == 68) {
    keyboard.D = false;
  }
});
