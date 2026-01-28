class Chicken extends MovableObject {
  width = 80;
  height = 80;
  y = 380;
  isGone = false;
  deathTimerStarted = false;
  chickenDeadSound = new Sound("audio/rooster_crowing.mp3");

  offset = {
    top: 10,
    bottom: 5,
    left: 5,
    right: 5,
  };

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  constructor(x) {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.x = x || 200 + Math.random() * 500; //Zufällige Startposition der Hühner
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.chickenDeadSound.volume(0.3);
    this.speed = 0.15 + Math.random() * 0.25; //Zufällige Geschwindigkeit der Hühner
  }

  animate() {
    this.setStoppableInterval(() => {
      if (!this.isDead()) {
        this.moveLeft();
      }
    }, 1000 / 60); // 60fps

    this.setStoppableInterval(() => {
      if (!this.isDead()) {
        this.playAnimation(this.IMAGES_WALKING);
      } else {
        this.playAnimation(this.IMAGES_DEAD);
        if (!this.deathTimerStarted) {
          this.deathTimerStarted = true;
          setTimeout(() => {
            this.isGone = true;
          }, 1000);
        }
      }
    }, 200);
  }

  hit(damage = 100) {
    if (!this.isDead()) {
      super.hit(damage);
      this.chickenDeadSound.play();
      setTimeout(() => {
        this.isGone = true;
      }, 1000);
    }
  }
}
