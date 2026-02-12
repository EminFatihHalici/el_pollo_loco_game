/** @type {Level} */ let level1;

/** Initializes level 1 by generating all game objects and background layers */
function initLevel() {
  level1 = new Level(
    createLevelEnemies(),
    [new Cloud()],
    createLevelBackground(),
    createLevelCoins(),
    createLevelBottles(),
  );
}

/** @returns {Enemy[]} Array of enemies including regular chickens, small chickens and the boss */
function createLevelEnemies() {
  let enemies = [];
  for (let i = 0; i < 8; i++)
    enemies.push(new Chicken(400 + i * 500 + Math.random() * 300));
  for (let i = 0; i < 4; i++) enemies.push(new SmallChicken(2500 + i * 50));
  enemies.push(new Endboss());
  return enemies;
}

/** @returns {BackgroundObject[]} Array of background layers repeated for the level length */
function createLevelBackground() {
  let background = [];
  for (let i = -1; i <= 6; i++) {
    let x = i * 719;
    let set = i % 2 === 0 ? "1" : "2";
    background.push(
      new BackgroundObject("img/5_background/layers/air.png", x),
      new BackgroundObject(
        `img/5_background/layers/3_third_layer/${set}.png`,
        x,
      ),
      new BackgroundObject(
        `img/5_background/layers/2_second_layer/${set}.png`,
        x,
      ),
      new BackgroundObject(
        `img/5_background/layers/1_first_layer/${set}.png`,
        x,
      ),
    );
  }
  return background;
}

/** @returns {Coins[]} Array of coins at specific coordinates */
function createLevelCoins() {
  let coins = [];
  const addCoinSet = (startX) => {
    for (let i = 0; i < 5; i++) {
      let y = i === 1 || i === 3 ? 220 : i === 2 ? 150 : 300;
      coins.push(new Coins(startX + i * 150, y));
    }
  };
  addCoinSet(300);
  addCoinSet(1800);
  return coins;
}

/** @returns {Bottles[]} Array of collectable bottles at specific coordinates */
function createLevelBottles() {
  let bottles = [];
  const coords = [
    { x: 300 + 0 * 150, y: 380 },
    { x: 1220, y: 380 },
    { x: 3880, y: 380 },
    { x: 2880, y: 380 },
    { x: 3200, y: 380 },
  ];
  coords.forEach((p) => bottles.push(new Bottles(p.x, p.y)));
  return bottles;
}
