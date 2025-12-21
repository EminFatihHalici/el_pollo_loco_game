class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = [];
    currentIMage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    accelaration = 3;

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };


    // setting gravity for movable objects / character falls down
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.accelaration;
            }
        }, 1000 / 25)
    }




    drawFrame(ctx) {
        // frame only for specific classes (instance of)
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof SmallChicken) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }


    //character.isColliding(chicken);
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    // Abfrage
    isAboveGround() {
        return this.y < 160;
    }


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    //loading all img from character to json array
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });

    }

    playAnimation(images) {
        let i = this.currentIMage % this.IMAGES_WALKING.length; // let i = 0 % 6; => Rest 0
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
}