/**
 * Base class for all status bars in the game.
 * Handles percentage logic and image selection.
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {
  /** @type {number} Current percentage of the bar (0-100) */
  percentage = 100;

  /**
   * Updates the bar's percentage and visual representation.
   * @param {number} percentage - The new percentage value.
   */
  setPercantage(percentage) {
    this.percentage = percentage;
    let imagePath = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[imagePath];
  }

  /**
   * Calculates the index for the IMAGES array based on the current percentage.
   * @returns {number} The index (0-5) for the image array.
   */
  resolveImageIndex() {
    if (this.percentage >= 100) return 5;
    if (this.percentage >= 80) return 4;
    if (this.percentage >= 60) return 3;
    if (this.percentage >= 40) return 2;
    if (this.percentage >= 20) return 1;
    return 0;
  }
}
