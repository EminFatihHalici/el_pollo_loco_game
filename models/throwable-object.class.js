/** * Projectile object with parabolic flight path and splash effect.
 * @extends MovableObject */
class ThrowableObject extends MovableObject {
  offset = {
    top: 5,
    bottom: 5,
    left: 10,
    right: 10,
  };
  splashSound = new Sound("audio/bottle_break.mp3");

  IMAGES_ROTATE = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /** @param {number} x @param {number} y @param {boolean} direction */
  constructor(x, y, direction) {
    super().loadImage(
      "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    );
    this.loadImages(this.IMAGES_ROTATE);
    this.loadImages(this.IMAGES_SPLASH);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.isLookingLeft = direction;
    this.isBroken = false;
  }

  /** Plays the bottle breaking sound */
  bottleSound() {
    this.splashSound.play();
  }

  /** Initiates the throwing physics and animations */
  throw() {
    this.speedY = 15;
    this.applyGravity();
    this.startMovement();
    this.startAnimation();
  }

  /** Sets up the horizontal movement interval */
  startMovement() {
    this.movementTimer = setInterval(() => {
      this.updatePosition();
      if (this.shouldSplash()) {
        this.splash();
      }
    }, 25);
    this.addToWorld(this.movementTimer);
  }

  /** Updates X-coordinate based on direction */
  updatePosition() {
    this.x += this.isLookingLeft ? -15 : 15;
  }

  /** @returns {boolean} Checks if bottle hit ground or target */
  shouldSplash() {
    return this.y > 360 && !this.isBroken;
  }

  /** Starts the rotation animation interval */
  startAnimation() {
    this.animationTimer = setInterval(() => {
      this.playAnimation(this.IMAGES_ROTATE);
    }, 100);
    this.addToWorld(this.animationTimer);
  }

  /** @param {number} timer - Registers interval in the world for pausing */
  addToWorld(timer) {
    if (this.world) {
      this.world.addInterval(timer);
    }
  }

  /** Handles the transition from flight to impact */
  splash() {
    this.stopMovement();
    this.bottleSound();
    this.startSplashAnimation();
    this.scheduleRemoval();
  }

  /** Clears all physics and movement intervals */
  stopMovement() {
    clearInterval(this.movementTimer);
    clearInterval(this.animationTimer);
    clearInterval(this.gravityTimer);
    this.speedY = 0;
  }

  /** Starts the splash animation sequence */
  startSplashAnimation() {
    this.splashTimer = setInterval(() => {
      this.playAnimation(this.IMAGES_SPLASH);
    }, 100);
    this.addToWorld(this.splashTimer);
  }

  /** Removes the object from the game after animation finishes */
  scheduleRemoval() {
    setTimeout(() => {
      clearInterval(this.splashTimer);
      this.isGone = true;
    }, 700);
  }
}
