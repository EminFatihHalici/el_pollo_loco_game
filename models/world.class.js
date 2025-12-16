class World {
    character = new Character();
    enemies = [new Chicken(), new Chicken(), new Chicken()];
    canvas;
    ctx;
    clouds = [
        new Cloud(),
    ]

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height); //Löscht die vorherigen Bilder im Canvas
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);

        //für das Zeichnen der Hühner als Array
        this.enemies.forEach((enemy) => {
            this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
        });

           this.clouds.forEach((cloud) => {
            this.ctx.drawImage(cloud.img, cloud.x, cloud.y, cloud.width, cloud.height);
        });

        //draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }
}