/** * Represents a background layer in the game world.
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
  width = 720;
  height = 480;

  /**
   * @param {string} imagePath - Path to the image file.
   * @param {number} x - Horizontal position.
   */

  constructor(imagePath, x, y) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}
