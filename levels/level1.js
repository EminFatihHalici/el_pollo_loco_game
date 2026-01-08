let enemies = [];
let coins = [];
let bottles = [];


// array for bottles
for (let i = 0; i < 5; i++) {
    let x = 300 + (i * 150);
    let y = 380;
     if (i === 0 || i === 5) {
    } else if (i === 1) {
        x = 1220;
    } else if (i === 2) {
        x = 3880;
    } else if (i === 3) {
        x = 2880;
    } else if (i === 4) {
        x = 3200;
    } else if (i === 5) {
        x = 1200;
    }
    bottles.push(new Bottles(x, y));
}

// array for coins , their positions and their arc style
for (let i = 0; i < 5; i++) {
    let x = 300 + (i * 150);
    let y = 300;
    if (i === 0 || i === 4) {
    } else if (i === 1 || i === 3) {
        y = 220;
    } else {
        y = 150;
    }
    coins.push(new Coins(x, y));
}

for (let i = 0; i < 5; i++) {
    let x = 1800 + (i * 150);
    let y = 300;
    if (i === 0 || i === 4) {
    } else if (i === 1 || i === 3) {
        y = 220;
    } else {
        y = 150;
    }
    coins.push(new Coins(x, y));
}

// array for the chicken and their position
for (let i = 0; i < 8; i++) {
    let xPosition = 400 + (i * 500) + (Math.random() * 300);
    enemies.push(new Chicken(xPosition));
}

// array for the small chicken and their position
for (let i = 0; i < 4; i++) {
    let startOfSmallChicken = 2500;
    enemies.push(new SmallChicken(startOfSmallChicken + i * 50));
}



enemies.push(new Endboss());


const level1 = new Level(
    enemies,


    [
        new Cloud()
    ],
    [
        new BackgroundObject('img/5_background/layers/air.png', -719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

        new BackgroundObject('img/5_background/layers/air.png', 719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 4),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 4),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 4),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 4),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 5),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 5),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 5),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 5),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 6),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 6),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 6),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 6),

    ],



    coins,
    bottles,

);

