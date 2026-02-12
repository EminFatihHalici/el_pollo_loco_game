class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false;
  D = false;
}

function bindTouchEvents() {
  const controls = {
    "btn-left": "LEFT",
    "btn-right": "RIGHT",
    "btn-jump": "SPACE",
    "btn-throw": "D",
  };

  Object.entries(controls).forEach(([id, key]) => {
    const btn = document.getElementById(id);
    btn.addEventListener("touchstart", (e) => handleTouch(e, key, true));
    btn.addEventListener("touchend", (e) => handleTouch(e, key, false));
  });
}

function handleTouch(event, key, state) {
  event.preventDefault();
  keyboard[key] = state;
}
