class Character extends MovableObject {
    
       width = 150;
       height = 300;
       x = 100;
       y = 80;
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
       this.applyGravity();
       this.animate();
    }

    //currentImage is increased every second to change the image of the character and length calculated with modulo operator
    animate() {


        setInterval(() => {
            if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
                this.world.camera_x = -this.x + 100;
            }

             if(this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
                this.world.camera_x = -this.x + 100;
            }
        }   , 1000 / 60); // 60fps


        setInterval(() => {
            if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
             }
        }, 50);
    }

    jump() {

    }
} 