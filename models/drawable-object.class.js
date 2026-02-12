/** * Base class for all renderable objects in the game. */
class DrawableObject {
  x = 120;
  y = 280;
  img;
  height = 150;
  width = 100;
  imageCache = [];
  currentIMage = 0;

  /** @param {string} path - Loads a single image and tracks loading progress */
  loadImage(path) {
    totalImages++;
    this.img = new Image();
    this.img.onload = () => {
      imageLoaded();
    };
    this.img.src = path;
  }

  /** @param {CanvasRenderingContext2D} ctx - Draws the object onto the canvas */
  draw(ctx) {
    try {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height); // added try catch to handle image loading errors
    } catch (e) {
      console.warn("Error while drawing image: " + e);
      console.log("Could nout load image", this.img.src);
    }
  }

  /** @param {string[]} arr - Preloads an array of images into the cache */
  loadImages(arr) {
    totalImages += arr.length;
    arr.forEach((path) => {
      let img = new Image();
      img.onload = () => {
        imageLoaded();
      };
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
