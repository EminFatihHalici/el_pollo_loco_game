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
        ctx.beginPath();
        ctx.lineWidth = '2';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
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