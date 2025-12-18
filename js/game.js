let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

//adding event listeners to detect key presses
window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    } else if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }   else if (e.keyCode == 38) {     
        keyboard.UP = true;
    }   else if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }   else if (e.keyCode == " ") {
        keyboard.SPACE = true;
    }
});


window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    } else if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }   else if (e.keyCode == 38) {     
        keyboard.UP = false;
    }   else if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }   else if (e.keyCode == " ") {
        keyboard.SPACE = false;
    }
});