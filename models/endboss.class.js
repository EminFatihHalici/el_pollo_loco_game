class Endboss extends MovableObject {

    width = 300;
    height = 400;
    y = 75;
    hadFirstContact = false;
    currentDistance = 5000;
    isAttacking = false;
    isStunned = false;


    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ]

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ]

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ]

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ]

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ]

    offset = {
        top: 70,
        left: 10,
        right: 5,
        bottom: 20
    }



    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.energy = 100;
        this.x = 4100;
        this.speed = 5;
        this.animate();
    }

    animate() {

        setInterval(() => {
            if (this.world && this.world.character) {
                this.currentDistance = Math.abs(this.x - this.world.character.x);
            } else {
                this.currentDistance = 0;
            }
        }, 1000 / 60);


        setInterval(() => {
            if (!this.hadFirstContact || this.isDead() || this.isAttacking || this.isStunned) return;
            if (this.currentDistance < 100) {
                this.attack();
            } else
                if (this.x > this.world.character.x) {
                    this.moveLeft();
                    this.otherDirection = false;
                } else if (this.x < this.world.character.x) {
                    this.moveRight();
                    this.otherDirection = true;
                }
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isStunned) {
                this.playAnimation(this.IMAGES_ALERT);
            } else if (this.isAttacking) {
                this.playAnimation(this.IMAGES_ATTACK);
            } else if (this.hadFirstContact) {
                this.playAnimation(this.IMAGES_WALKING);
            }

        }, 100);



    }

    attack() {
        this.isAttacking = true;
        this.speed = 0;
        setTimeout(() => {
            if (this.currentDistance < 200) {
                this.world.character.hit(10);
                this.world.statusBarHealth.setPercantage(this.world.character.energy);
            }
        }, 400);

        setTimeout(() => {
            if (this.otherDirection) {
                this.x -= 150;
            } else {
                this.x += 150;
            }
            this.isAttacking = false;
            this.speed = 5;
        }, 1000);
    }

    hit(damage) {
        super.hit(damage);
        this.x += 200;
        this.isStunned = true;

        setTimeout(() => {
            this.isStunned = false;
        }, 3000);
    }


}
