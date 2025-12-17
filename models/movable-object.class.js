class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = [];
    currentIMage = 0;


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


    moveRight() {
        console.log('Moving right');
        
    }

    moveLeft() {

    }
}