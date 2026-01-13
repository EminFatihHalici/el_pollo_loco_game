class ThrowableObject extends MovableObject {

    IMAGES_ROTATE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ]

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]

    constructor(x, y, direction) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_ROTATE);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.isLookingLeft = direction;
        this.throw();
        this.isBroken = false;
    }

    throw() {

            this.speedY = 15;

            this.applyGravity();
            this.movementTimer = setInterval(() => {
                if (this.isLookingLeft) {
                    this.x -= 15;
                } else {
                    this.x += 15;
                }
                if (this.y > 360 && !this.isBroken) {
                    this.isBroken = true;
                    this.splash();
                }
            }, 25);

            this.animationTimer = setInterval(() => {
                this.playAnimation(this.IMAGES_ROTATE);
            }, 100);

        
    }


    splash() {
        clearInterval(this.movementTimer);
        clearInterval(this.animationTimer);
        clearInterval(this.gravityTimer);
        this.speedY = 0;
        this.y = 400;
        this.splashTimer = setInterval(() => {
            this.playAnimation(this.IMAGES_SPLASH);
        }, 100);
        setTimeout(() => {
            clearInterval(this.splashTimer);
            this.isGone = true;
        }, 700);
    }
}

