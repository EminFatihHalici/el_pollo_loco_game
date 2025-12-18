class World {
    character = new Character();
    enemies = [new Chicken(), new Chicken(), new Chicken()];
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    clouds = [
        new Cloud(),
    ]

    backgroundObjects = [
        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
    ]

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
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
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
                    this.ctx.save();
                    // verschiebe das Koordinatensystem
                    this.ctx.translate(mo.width, 0);
                    // Spiegeln
                    this.ctx.scale(-1, 1);
                    mo.x = mo.x * -1;
                }    

                this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);

                if (mo.otherDirection) {
                    mo.x = mo.x * -1;
                    this.ctx.restore();
                }
             
            }


      setWorld() {
        this.character.world = this; 
      }      
            


}