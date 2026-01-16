class Chicken extends MovableObject {

  width = 80;
  height = 80;
  y = 380;

  offset = {
    top: -25,
    bottom: -15,
    left: -20,
    right: -20
  }

  IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
  ]

  IMAGES_DEAD = [
    'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
  ]


  constructor(x) {
    super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
    this.x = x || 200 + Math.random() * 500; //Zufällige Startposition der Hühner
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.animate();
    this.speed = 0.15 + Math.random() * 0.25; //Zufällige Geschwindigkeit der Hühner
  }


  animate() {

    setInterval(() => {
      if (!this.isDead()) {
        this.moveLeft();
      }
    }, 1000 / 60); // 60fps

    setInterval(() => {
      if (!this.isDead()) {
        this.playAnimation(this.IMAGES_WALKING);
      }
      else {
        this.playAnimation(this.IMAGES_DEAD);
      }
    }, 200);




  }

}