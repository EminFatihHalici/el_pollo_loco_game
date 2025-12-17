class Character extends MovableObject {

    constructor() {
       super().loadImage('img/2_character_pepe/2_walk/W-21.png')
       this.loadImages([
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
       ])
       this.width = 150;
       this.height = 300;
       this.x = 100;
       this.y = 170;
    }

    jump() {

    }
} 