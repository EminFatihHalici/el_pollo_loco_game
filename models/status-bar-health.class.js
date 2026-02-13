/**
 * Visual status bar for the character health.
 * @extends StatusBar
 */
class StatusBarHealth extends StatusBar {
  IMAGES = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  /** * Initializes the health bar with specific images and position.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.setPercantage(100);
    this.y = 45;
    this.x = 20;
    this.width = 200;
    this.height = 60;
  }
}
