class SmallChicken extends MovableObject {
  width = 60;
  height = 60;
  y = 400;
  isGone = false;
  deathTimerStarted = false;
  smallChickenDeadSound = new Sound("audio/rooster_crowing.mp3");

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  offset = {
    top: 5,
    bottom: 5,
    left: 5,
    right: 5,
  };

  constructor(x) {
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.x = x + Math.random() * 500;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.speed = 0.15 + Math.random() * 0.25;
    this.smallChickenDeadSound.volume(0.3);
  }

  animate() {
    this.setStoppableInterval(this.moveChicken.bind(this), 1000 / 60);
    this.setStoppableInterval(this.playChickenAnimation.bind(this), 200);
  }

  moveChicken() {
    if (!this.isDead()) {
      this.moveLeft();
    }
  }

  playChickenAnimation() {
    if (!this.isDead()) {
      this.playAnimation(this.IMAGES_WALKING);
    } else {
      this.playAnimation(this.IMAGES_DEAD);
      this.startDeathTimer();
    }
  }

  startDeathTimer() {
    if (!this.deathTimerStarted) {
      this.deathTimerStarted = true;
      setTimeout(() => {
        this.isGone = true;
      }, 1000);
    }
  }

  hit(damage = 100) {
    if (!this.isDead()) {
      super.hit(damage);
      this.smallChickenDeadSound.play();
      setTimeout(() => {
        this.isGone = true;
      }, 1000);
    }
  }
}
