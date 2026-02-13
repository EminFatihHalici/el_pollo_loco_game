/**
 * Visual status bar for collected coins.
 * @extends StatusBar
 */
class StatusBarCoin extends StatusBar {
  IMAGES = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  /** Initializes the coin bar with default position and 0% percentage. */
  constructor() {
    super(); // Ruft die Logik der StatusBar auf
    this.loadImages(this.IMAGES);
    this.x = 20;
    this.y = 90;
    this.width = 200;
    this.height = 60;
    this.setPercantage(0);
  }
}
