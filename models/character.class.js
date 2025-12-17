class Character extends MovableObject {

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    currentIMage = 0;

    constructor() {
       super().loadImage('img/2_character_pepe/2_walk/W-21.png')
       this.loadImages(this.IMAGES_WALKING);
       this.width = 150;
       this.height = 300;
       this.x = 100;
       this.y = 170;

       this.animate();
    }

    //currentImage is increased every second to change the image of the character and length calculated with modulo operator
    animate() {
        setInterval(() => {
        let i = this.currentIMage % this.IMAGES_WALKING.length; // let i = 0 % 6; => Rest 0
        // i = 0, 1, 2, 3, 4, 5, 0, 1, ...
        let path = this.IMAGES_WALKING[i];
        this.img = this.imageCache[path];
        this.currentIMage++;

        }, 100);
    }

    jump() {

    }
} 