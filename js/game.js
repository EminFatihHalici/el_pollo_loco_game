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
let totalImages = 0;
let imagesLoaded = 0;

function init() {
  introMusic = new Sound("audio/intro.mp3");
  winMusic = new Sound("audio/win_sound.mp3");
  loseMusic = new Sound("audio/lose_sound.mp3");
  canvas = document.getElementById("canvas");
  checkOrientation();
  renderStartScreen();
  bindTouchEvents();
  preloadAllAssets();
}

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
  if (winMusic) {
    winMusic.pause();
    winMusic.currentTime = 0;
  }
  if (loseMusic) {
    loseMusic.pause();
    loseMusic.currentTime = 0;
  }
  document.getElementById("loader").classList.remove("d-none");
  setTimeout(() => {
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
    document.getElementById("startScreen").classList.add("d-none");
    document.getElementById("mobile-controls").classList.remove("d-none");
  }, 500);
}

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

function checkOrientation() {
  let rotateElement = document.getElementById("rotateDevice");
  let gameContainer = document.getElementById("game-container");

  let isPortrait = window.innerHeight > window.innerWidth;
  let isMobile = window.innerWidth < 1024;

  if (isPortrait && isMobile) {
    rotateElement.classList.remove("d-none");
    gameContainer.classList.add("d-none");
  } else {
    rotateElement.classList.add("d-none");
    gameContainer.classList.remove("d-none");
  }
}

function openTab(tabId) {
  let contents = document.querySelectorAll(
    ".tab-content, #instruction, #about, #legal",
  );
  contents.forEach((c) => c.classList.add("d-none"));
  document.getElementById(tabId).classList.remove("d-none");
  let buttons = document.querySelectorAll(".tab-nav button");
  buttons.forEach((b) => b.classList.remove("active"));
  event.currentTarget.classList.add("active");
}

function preloadAllAssets() {
  new Bottles();
  new Character();
  new Chicken();
  new Cloud();
  new Coins();
  new Endboss();
  new SmallChicken();
  new StatusBarBottle();
  new StatusBarCoin();
  new StatusBarEndboss();
  new StatusBarHealth();
  new ThrowableObject();
}

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded >= totalImages && totalImages > 0) {
    document.getElementById("loader").classList.add("d-none");
  }
}

function backToMenu() {
  location.reload();
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

window.addEventListener("load", checkOrientation);
window.addEventListener("resize", checkOrientation);
