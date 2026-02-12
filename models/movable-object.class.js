/** * Base class for all objects with physics, movement and health.
 * @extends DrawableObject */
class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  accelaration = 3;
  energy = 100;
  lastHit = 0;
  groundLevel = 160;
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };
  intervalIds = [];

  /** Applies constant downward force if object is in air */
  applyGravity() {
    this.gravityTimer = this.setStoppableInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.accelaration;
      }
    }, 1000 / 25);
  }

  /** @param {number} damage - Deducts energy and sets hit timestamp */
  hit(damage) {
    this.energy -= damage;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /** @returns {boolean} True if energy is zero */
  isDead() {
    return this.energy == 0;
  }

  /** @returns {boolean} True if last hit was less than 1 second ago */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  /** @param {MovableObject} mo @returns {boolean} Check for collision considering offsets */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /** @returns {boolean} True if object is not on ground level */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < this.groundLevel;
    }
  }

  /** @param {string[]} images - Cycles through an array of image paths */
  playAnimation(images) {
    let i = this.currentIMage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentIMage++;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 30;
  }

  /** @param {Function} fn @param {number} time @returns {number} Interval ID */
  setStoppableInterval(fn, time) {
    let id = setInterval(() => {
      if (this.world && this.world.gamePaused) {
        return;
      } else {
        fn();
      }
    }, time);
    this.intervalIds.push(id);
    return id;
  }

  /** Clears all intervals associated with this object */
  stopAllMyIntervals() {
    this.intervalIds.forEach((id) => clearInterval(id));
    this.intervalIds = [];
  }
}
