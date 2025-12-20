class Chicken extends MovableObject {

    width = 80;
    height = 80;
    y = 380;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]


      constructor() {
       super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
       this.x = 250 +Math.random() * 500; //Zufällige Startposition der Hühner
       this.loadImages(this.IMAGES_WALKING);
       this.animate();
       this.speed = 0.15 + Math.random() * 0.25; //Zufällige Geschwindigkeit der Hühner
    }


     animate() {

      setInterval(() => {
          this.moveLeft();
        }, 1000 / 60); // 60fps

        setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
        }, 200);

    }

}