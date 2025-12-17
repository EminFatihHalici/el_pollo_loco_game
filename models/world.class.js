class World {
    character = new Character();
    enemies = [new Chicken(), new Chicken(), new Chicken()];
    canvas;
    ctx;
    clouds = [
        new Cloud(),
    ]

    backgroundObjects = [
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
    ]

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //Löscht die vorherigen Bilder im Canvas
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);


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
                this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
            }
            


}