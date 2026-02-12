/** * Represents a game level containing all static and dynamic entities. */
class Level {
  enemies;
  coins;
  bottles;
  clouds;
  backgroundObjects;
  level_end_x = 4300;

  /**
   * @param {Enemy[]} enemies - Array of enemy objects.
   * @param {Cloud[]} clouds - Array of background clouds.
   * @param {BackgroundObject[]} backgroundObjects - Array of parallax background layers.
   * @param {Coins[]} coins - Collectable coin objects.
   * @param {Bottles[]} bottles - Collectable bottle objects.
   */

  constructor(enemies, clouds, backgroundObjects, coins, bottles) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
    this.bottles = bottles;
  }
}
