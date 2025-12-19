class SmallChicken extends MovableObject {

    width = 60;
    height = 60;
    y = 400;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ]


      constructor() {
       super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png')
       this.x = 2550 +Math.random() * 500; //Zufällige Startposition der Hühner
       this.loadImages(this.IMAGES_WALKING);
       this.animate();
       this.speed = 0.15 + Math.random() * 0.25; //Zufällige Geschwindigkeit der Hühner
       this.moveLeft();
    }


     animate() {
        setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }

}