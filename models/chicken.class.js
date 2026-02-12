/** * Simple enemy chicken that walks left and dies upon impact.
 * @extends MovableObject
 */
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

  /** @param {number} x - Initial horizontal position */
  constructor(x) {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.x = x || 200 + Math.random() * 500;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.chickenDeadSound.volume(0.3);
    this.speed = 0.15 + Math.random() * 0.25;
  }

  /** Starts movement and animation loops */
  animate() {
    this.setStoppableInterval(
      () => !this.isDead() && this.moveLeft(),
      1000 / 60,
    );
    this.setStoppableInterval(() => this.updateAnimation(), 200);
  }

  /** Updates the visual state based on life status (7 LOC) */
  updateAnimation() {
    if (!this.isDead()) {
      this.playAnimation(this.IMAGES_WALKING);
    } else {
      this.playAnimation(this.IMAGES_DEAD);
      this.handleDeath();
    }
  }

  /** Handles the removal of the chicken after death */
  handleDeath() {
    if (!this.deathTimerStarted) {
      this.deathTimerStarted = true;
      setTimeout(() => (this.isGone = true), 1000);
    }
  }

  /** @param {number} damage - Kills the chicken instantly by default */
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
