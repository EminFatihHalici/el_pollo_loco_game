class Level {
    enemies;
    coins;
    clouds;
    backgroundObjects;
    level_end_x = 4300;

    constructor(enemies, clouds, backgroundObjects, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
    } 
}