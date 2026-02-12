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

  bottleSound() {
    this.splashSound.play();
  }

  throw() {
    this.speedY = 15;
    this.applyGravity();
    this.startMovement();
    this.startAnimation();
  }

  startMovement() {
    this.movementTimer = setInterval(() => {
      this.updatePosition();
      if (this.shouldSplash()) {
        this.splash();
      }
    }, 25);
    this.addToWorld(this.movementTimer);
  }

  updatePosition() {
    this.x += this.isLookingLeft ? -15 : 15;
  }

  shouldSplash() {
    return this.y > 360 && !this.isBroken;
  }

  startAnimation() {
    this.animationTimer = setInterval(() => {
      this.playAnimation(this.IMAGES_ROTATE);
    }, 100);
    this.addToWorld(this.animationTimer);
  }

  addToWorld(timer) {
    if (this.world) {
      this.world.addInterval(timer);
    }
  }

  splash() {
    this.stopMovement();
    this.bottleSound();
    this.startSplashAnimation();
    this.scheduleRemoval();
  }

  stopMovement() {
    clearInterval(this.movementTimer);
    clearInterval(this.animationTimer);
    clearInterval(this.gravityTimer);
    this.speedY = 0;
  }

  startSplashAnimation() {
    this.splashTimer = setInterval(() => {
      this.playAnimation(this.IMAGES_SPLASH);
    }, 100);
    this.addToWorld(this.splashTimer);
  }

  scheduleRemoval() {
    setTimeout(() => {
      clearInterval(this.splashTimer);
      this.isGone = true;
    }, 700);
  }
}
