/** * Small enemy chicken with faster movement.
 * @extends Chicken */
class SmallChicken extends Chicken {
  width = 60;
  height = 60;
  y = 400;

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  constructor(x) {
    super(x);
    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.offset = { top: 5, bottom: 5, left: 5, right: 5 };
  }
}
