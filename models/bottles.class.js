/** * Represents collectable salsa bottles in the game.
 * @extends MovableObject
 */
class Bottles extends MovableObject {
  width = 70;
  height = 70;
  botlleCollectSound = new Sound("audio/bottle_collect.mp3");

  IMAGES = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  /**
   * @param {number} x - The x-coordinate for the bottle.
   * @param {number} y - The y-coordinate for the bottle.
   */
  constructor(x, y) {
    super();
    this.loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.loadImages(this.IMAGES);
    this.x = x;
    this.y = y;
    this.animate();

    this.offset = {
      top: 40,
      bottom: 40,
      left: 40,
      right: 40,
    };
  }

  /** Plays the sound effect when a bottle is collected */
  collectBottleSound() {
    this.botlleCollectSound.play();
  }

  /** Starts the slow idle animation for the bottle */
  animate() {
    this.setStoppableInterval(() => {
      this.playAnimation(this.IMAGES);
    }, 5000);
  }
}
