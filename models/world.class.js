class World {
    character = new Character();
    level = level1;
    enemies = level1.enemies;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    clouds = level1.clouds;

    backgroundObjects = level1.backgroundObjects;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //Löscht die vorherigen Bilder im Canvas
        this.ctx.translate(this.camera_x, 0); //Verschiebe das Koordinatensystem nach links
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.ctx.translate(-this.camera_x, 0); //Verschiebe das Koordinatensystem zurück

        //draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });

    }

    //vereinfache die Schleifen // eine für alle
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);

        mo.drawFrame(this.ctx); // Rahmen um Objekte zum Testen

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }

    }


    flipImage(mo) {
        this.ctx.save();
        // verschiebe das Koordinatensystem
        this.ctx.translate(mo.width, 0);
        // Spiegeln
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    setWorld() {
        this.character.world = this;
    }



}