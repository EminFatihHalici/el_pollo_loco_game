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

  Object.keys(controls).forEach((id) => {
    const btn = document.getElementById(id);
    const key = controls[id];

    btn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      keyboard[key] = true;
    });

    btn.addEventListener("touchend", (e) => {
      e.preventDefault();
      keyboard[key] = false;
    });
  });
}
