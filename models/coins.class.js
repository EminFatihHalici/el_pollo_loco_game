class Coins extends MovableObject {

    width = 100;
    height = 100;


    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ]

    constructor (x, y) {
        super();
        this.loadImage('img/8_coin/coin_1.png');
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
    setInterval(() => {
      this.playAnimation(this.IMAGES);
        }, 200);
}

}