let canvas;
let world;
let keyboard = new Keyboard();
let startImages = [
    'img/9_intro_outro_screens/start/startscreen_1.png',
    'img/9_intro_outro_screens/start/startscreen_2.png'
];
let currentImageIndex = 0;
let intervalId;

function init() {
    canvas = document.getElementById('canvas');
    renderStartScreen();
}

// rendering both intro pics
function renderStartScreen() {
    let imgElement = document.getElementById('introImage');
    intervalId = setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % startImages.length;
        imgElement.src = startImages[currentImageIndex];

    }, 3000);
}

//function to dissappear the intro pic and show the canvas
function startGame() {
    clearInterval(intervalId);
    document.getElementById('startScreen').classList.add('d-none');
    world = new World(canvas, keyboard);
    document.getElementById('fullscreen').classList.remove('d-none');
}


function toggleFullscreen() {
    if (canvas.requestFullscreen) {
        canvas.requestFullscreen();
    } else if (canvas.mozRequestFullScreen) { /* Firefox */
        canvas.mozRequestFullScreen();
    } else if (canvas.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        canvas.webkitRequestFullscreen();
    } else if (canvas.msRequestFullscreen) { /* IE/Edge */
        canvas.msRequestFullscreen();
    }  else {
        canvas.exitFullscreen();
    }
}

function showLostScreen() {
    document.getElementById('gameOverScreen').classList.remove('d-none');
}

function showWinScreen() {
    document.getElementById('winScreen').classList.remove('d-none');
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