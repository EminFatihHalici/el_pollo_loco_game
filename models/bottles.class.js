class Bottles extends MovableObject {

    width = 70;
    height = 70;

    offset = {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20
    };


    IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]

    constructor (x, y) {
        super();
        this.loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        this.animate();

        this.offset = {
            top: 40,
            bottom: 40,
            left: 40,
            right: 40
        };

    }

    animate() {
    this.setStoppableInterval(() => {
      this.playAnimation(this.IMAGES);
        }, 5000);
}

}