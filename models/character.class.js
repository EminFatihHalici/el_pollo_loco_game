class Character extends MovableObject {
    
       width = 150;
       height = 300;
       x = 100;
       y = 170;
       world;
       speed = 10; 

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
       this.animate();
    }

    //currentImage is increased every second to change the image of the character and length calculated with modulo operator
    animate() {


        setInterval(() => {
            if(this.world.keyboard.RIGHT) {
                this.x += this.speed;
            }

             if(this.world.keyboard.LEFT) {
                this.x -= this.speed;
            }
        }   , 1000 / 60); // 60fps


        setInterval(() => {
            if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {

                let i = this.currentIMage % this.IMAGES_WALKING.length; // let i = 0 % 6; => Rest 0
                // i = 0, 1, 2, 3, 4, 5, 0, 1, ...
                let path = this.IMAGES_WALKING[i];
                this.img = this.imageCache[path];
                this.currentIMage++;
             }
        }, 50);
    }

    jump() {

    }
} 