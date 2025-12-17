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
       this.moveLeft();
    }


     animate() {
        setInterval(() => {
        let i = this.currentIMage % this.IMAGES_WALKING.length; // let i = 0 % 6; => Rest 0
        // i = 0, 1, 2, 3, 4, 5, 0, 1, ...
        let path = this.IMAGES_WALKING[i];
        this.img = this.imageCache[path];
        this.currentIMage++;
        }, 200);
    }

}