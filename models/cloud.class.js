/** * Moving cloud background object for visual depth.
 * @extends MovableObject
 */
class Cloud extends MovableObject {
  y = 50;
  width = 500;
  height = 250;

  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");

    this.x = Math.random() * 500;
  }

  /** Starts the continuous leftward movement */
  animate() {
    this.moveLeft();
  }

  /** Overrides moveLeft to set a constant frame-based horizontal movement */
  moveLeft() {
    this.setStoppableInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }
}
