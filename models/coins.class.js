/** * Represents collectable coins with idle animation and sound effects.
 * @extends MovableObject
 */
class Coins extends MovableObject {
  width = 100;
  height = 100;
  collectSound = new Sound("audio/coin_collect.mp3");

  IMAGES = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  offset = {
    top: 20,
    bottom: 20,
    left: 20,
    right: 20,
  };

  /**
   * @param {number} x - Horizontal position.
   * @param {number} y - Vertical position.
   */
  constructor(x, y) {
    super();
    this.loadImage("img/8_coin/coin_1.png");
    this.loadImages(this.IMAGES);
    this.x = x;
    this.y = y;
  }

  /** Starts the coin's rotation animation */
  animate() {
    this.setStoppableInterval(() => {
      this.playAnimation(this.IMAGES);
    }, 200);
  }

  /** Plays the sound effect when the coin is collected */
  collect() {
    this.collectSound.play();
  }
}
