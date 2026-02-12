/** @type {HTMLCanvasElement} */
/** @type {World} */
/** @type {Keyboard} */
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

/**
 * Helper object to manage sound settings persistence in the browser's localStorage.
 */
const SoundStorage = {
  KEY: "game_muted",
  save(isMuted) {
    localStorage.setItem(this.KEY, isMuted);
  },
  load() {
    const saved = localStorage.getItem(this.KEY);
    return saved === "true";
  },
};

/** Initializes the game, sounds, and UI components */
function init() {
  introMusic = new Sound("audio/intro.mp3");
  winMusic = new Sound("audio/win_sound.mp3");
  loseMusic = new Sound("audio/lose_sound.mp3");
  canvas = document.getElementById("canvas");
  checkOrientation();
  renderStartScreen();
  bindTouchEvents();
  preloadAllAssets();
  showInstructionTemplate();
  showAboutTemplate();
  showLegalTemplate();
}

/** Animates the start screen images in an interval */
function renderStartScreen() {
  let imgElement = document.getElementById("introImage");
  intervalId = setInterval(() => {
    currentImageIndex = (currentImageIndex + 1) % startImages.length;
    imgElement.src = startImages[currentImageIndex];
  }, 3000);
}

/** Prepares and starts the game world and music */
function startGame() {
  resetMusic();
  showLoader();
  setTimeout(() => {
    let currentMuteState = world ? world.gameMuted : false;
    playIntroMusic();
    initLevel();
    if (world) world.stopGame();
    hideScreens();
    initializeWorld(currentMuteState);
  }, 500);
}

/** Resets all game-over related music */
function resetMusic() {
  [winMusic, loseMusic].forEach((music) => {
    if (music) {
      music.pause();
      music.currentTime = 0;
    }
  });
}

/** Shows the loading spinner */
function showLoader() {
  document.getElementById("loader").classList.remove("d-none");
}

/** Plays the intro background music at low volume */
function playIntroMusic() {
  introMusic.play();
  introMusic.volume(0.06);
}

/** Hides all menu and game-over screens */
function hideScreens() {
  ["startScreen", "gameOverScreen", "winScreen"].forEach((id) => {
    document.getElementById(id).classList.add("d-none");
  });
}

/** @param {boolean} currentMuteState - Sets up the world with current settings */
function initializeWorld(currentMuteState) {
  const initialMuteState = SoundStorage.load();
  world = new World(canvas, keyboard);
  world.gameMuted = initialMuteState;
  world.updateAllSounds();
  updateMuteIcon(initialMuteState);
  document.getElementById("mute-btn").classList.remove("d-none");
  document.getElementById("pause-btn").classList.remove("d-none");
  document.getElementById("fullscreen").classList.remove("d-none");
  document.getElementById("mobile-controls").classList.remove("d-none");
}

/** Exits fullscreen mode if active */
function exitFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
}

/** Toggles the information/instruction overlay */
function toggleOverlay() {
  let overlay = document.getElementById("info-overlay");
  overlay.classList.toggle("d-none");
  if (!overlay.classList.contains("d-none")) {
    openTab("instruction");
  }
}

/** Displays the game over screen and plays loss music */
function showLostScreen() {
  loseMusic.play();
  loseMusic.volume(0.1);
  exitFullscreen();
  document.getElementById("gameOverScreen").classList.remove("d-none");
}

/** Displays the win screen and plays victory music */
function showWinScreen() {
  winMusic.play();
  winMusic.volume(0.12);
  exitFullscreen();
  document.getElementById("winScreen").classList.remove("d-none");
}

/** Toggles game pause state and handles audio accordingly */
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

/** Toggles the global mute state and updates UI icons */
function toggleMute() {
  if (world) {
    world.gameMuted = !world.gameMuted;
    SoundStorage.save(world.gameMuted); // Speichern!
    world.updateAllSounds();
    updateMuteIcon(world.gameMuted);
  }
}

function updateMuteIcon(isMuted) {
  let icon = document.getElementById("mute-icon");
  icon.src = isMuted ? "img/volume-mute-fill.svg" : "img/volume-up-fill.svg";
}

/** Checks and handles device orientation for mobile support */
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

/** @param {string} tabId - Switches between tabs in the overlay */
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

/** Instantiates all models once to trigger image preloading */
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

/** Tracks image loading progress to hide the loader */
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded >= totalImages && totalImages > 0) {
    document.getElementById("loader").classList.add("d-none");
  }
}

/** Reloads the page to return to the main menu */
function backToMenu() {
  location.reload();
}

/** Renders the instruction template content */
function showInstructionTemplate() {
  let container = document.getElementById("instruction");
  container.innerHTML = "";
  container.innerHTML += instructionTemplate();
}

/** Renders the about template content */
function showAboutTemplate() {
  let container = document.getElementById("about");
  container.innerHTML = "";
  container.innerHTML += aboutTemplate();
}

/** Renders the legal/imprint template content */
function showLegalTemplate() {
  let container = document.getElementById("legal");
  container.innerHTML = "";
  container.innerHTML += legalTemplate();
}

/** Event listener for keyboard input (press) */
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

/** Event listener for keyboard input (release) */
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
