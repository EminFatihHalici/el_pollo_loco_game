class MovableObject extends DrawableObject {

    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    accelaration = 3;
    energy = 100;
    lastHit = 0;
    groundLevel = 160;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };
    intervalIds = []
    

    // setting gravity for movable objects / character falls downs
    applyGravity() {
        this.gravityTimer =  this.setStoppableInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.accelaration;
            }
        }, 1000 / 25)
    }

    hit(damage) {
        this.energy -= damage;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime(); // letzter Zeitpunkt der Verletzung
        }
    }

    isDead() {
        return this.energy == 0;
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; //difference in ms
        timepassed = timepassed / 1000; // difference in sec
        return timepassed < 1;
    }

    //character.isColliding(chicken);
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    // Abfrage
  isAboveGround() {
    if (this instanceof ThrowableObject) { 
        return true; // Flaschen fallen immer
    } else {
        return this.y < this.groundLevel;
    }
}

    playAnimation(images) {
        let i = this.currentIMage % images.length; // let i = 0 % 6; => Rest 0
        // i = 0, 1, 2, 3, 4, 5, 0, 1, ...
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentIMage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }

/*     setStoppableInterval(fn, time) {
        let id = setInterval(fn, time);
        if (this.world) {
            this.world.addInterval(id);
        }
        return id;
    } */

        setStoppableInterval(fn, time) {
        let id = setInterval(fn, time);
        this.intervalIds.push(id); 
        return id;
    }

    stopAllMyIntervals() {
        this.intervalIds.forEach(id => clearInterval(id));
        this.intervalIds = []; 
    }

}