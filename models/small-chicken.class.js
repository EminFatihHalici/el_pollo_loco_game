class SmallChicken extends MovableObject {

  width = 60;
  height = 60;
  y = 400;
  isGone = false;
  deathTimerStarted = false;

  IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
  ]

  IMAGES_DEAD = [
    'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
  ]

  offset = {
    top: 5,
    bottom: 5,
    left: 5,
    right: 5
  }

  constructor(x) {
    super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png')
    this.x = x + Math.random() * 500; //Zufällige Startposition der Hühner
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.speed = 0.15 + Math.random() * 0.25; //Zufällige Geschwindigkeit der Hühner

  }


  animate() {

    this.setStoppableInterval(() => {
      if (!this.isDead()) {
        this.moveLeft();
      }
    }, 1000 / 60); // 60fps

    this.setStoppableInterval(() => {
      if (!this.isDead()) {
        this.playAnimation(this.IMAGES_WALKING);
      }
      else {
        this.playAnimation(this.IMAGES_DEAD);
        if (!this.deathTimerStarted) {
          this.deathTimerStarted = true;
          setTimeout(() => {
            this.isGone = true;
          }, 1000);
        }
      }
    }, 200);
  }

}