/** * Main game world managing rendering, game loops, and object lifecycles. */
class World {
  character = new Character();
  level;
  enemies;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  clouds;
  coins = new Coins();
  bottles = new Bottles();
  statusBarHealth = new StatusBarHealth();
  statusBarCoin = new StatusBarCoin();
  displayManager = new DisplayManager();
  statusBarBottle = new StatusBarBottle();
  statusBarEndboss = new StatusBarEndboss();
  backgroundObjects;
  throwableObjects = [];
  backgroundSound = new Sound("audio/background_wind_sound.mp3");
  triggerSound = new Sound("audio/danger.mp3");
  gameEnded = false;
  gamePaused = false;
  gameMuted = false;
  allSounds = [];
  intervalIds = [];

  /**
   * @param {HTMLCanvasElement} canvas
   * @param {Object} keyboard
   */
  constructor(canvas, keyboard) {
    this.level = level1;
    this.enemies = level1.enemies;
    this.clouds = level1.clouds;
    this.backgroundObjects = level1.backgroundObjects;
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.collisionHandler = new CollisionHandler(this);
    this.backgroundSound.volume(0.025);
    this.backgroundSound.loop();
    this.triggerSound.volume(0.3);
    this.run();
    this.allSounds.push(this.backgroundSound);
    this.allSounds.push(this.triggerSound);
  }

  /** Starts the core game intervals */
  run() {
    this.startMainLoop();
    this.startCleanupLoop();
  }

  /** Sets up the 60FPS state update interval */
  startMainLoop() {
    let id = setInterval(() => {
      if (this.gamePaused) return;
      this.updateGameState();
    }, 1000 / 60);
    this.addInterval(id);
  }

  /** Triggers collision checks and game over status */
  updateGameState() {
    this.collisionHandler.checkCollisions();
    this.checkGameOver();
  }

  /** Sets up the slower interval for object removal */
  startCleanupLoop() {
    let id = setInterval(() => {
      if (this.gamePaused) return;
      this.cleanupGameObjects();
    }, 200);
    this.addInterval(id);
  }

  /** Groups all cleanup-related tasks */
  cleanupGameObjects() {
    this.splashedBottlesCleanUp();
    this.cleanUpEnemies();
    this.calculateDistanceOfChar();
  }

  /** Removes enemies marked as gone from the level */
  cleanUpEnemies() {
    for (let i = this.level.enemies.length - 1; i >= 0; i--) {
      let enemy = this.level.enemies[i];
      if (enemy.isGone) {
        this.level.enemies.splice(i, 1);
      }
    }
  }

  /** Checks for character colliding with bottle items */
  checkBottleCollisions() {
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        this.character.collectBottles();
        bottle.collectBottleSound();
        let bottlePercent = this.character.bottles * 20;
        this.statusBarBottle.setPercantage(bottlePercent);
        this.level.bottles.splice(index, 1);
      }
    });
  }

  /** Removes splashed bottles from the active objects array */
  splashedBottlesCleanUp() {
    for (let i = this.throwableObjects.length - 1; i >= 0; i--) {
      let bottle = this.throwableObjects[i];
      if (bottle.isGone) {
        this.throwableObjects.splice(i, 1);
      }
    }
  }

  /** Updates boss contact state based on player distance */
  calculateDistanceOfChar() {
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss && !enemy.hadFirstContact) {
        let distance = Math.abs(enemy.x - this.character.x);
        if (distance < 500) {
          enemy.hadFirstContact = true;
          this.triggerSound.play();
        }
      }
    });
  }

  /** Checks if the boss is currently attacking the character */
  checkBossAttack() {
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        if (
          enemy.currentDistance < 200 &&
          !this.character.isHurt() &&
          !enemy.isDead()
        ) {
          this.character.hit(10);
          this.statusBarHealth.setPercantage(this.character.energy);
        }
      }
    });
  }

  /** Main animation loop for the canvas */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawGameWorld();
    this.drawStaticUI();
    this.drawGameObjects();
    this.drawOverlays();

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /** Draws background layers and clouds */
  drawGameWorld() {
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.ctx.translate(-this.camera_x, 0);
  }

  /** Draws the fixed status bars */
  drawStaticUI() {
    this.addToMap(this.statusBarBottle);
    this.addToMap(this.statusBarCoin);
    this.addToMap(this.statusBarHealth);
    this.statusBarHealth.setPercantage(this.character.energy);
    this.checkAndDrawBossBar();
  }

  /** Renders the boss health bar if contact was made */
  checkAndDrawBossBar() {
    const boss = this.level.enemies.find((e) => e instanceof Endboss);
    if (boss && boss.hadFirstContact) {
      this.addToMap(this.statusBarEndboss);
    }
  }

  /** Draws all moving game entities */
  drawGameObjects() {
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.enemies);
    this.ctx.translate(-this.camera_x, 0);
  }

  /** Draws screens that sit on top of the world */
  drawOverlays() {
    if (this.gamePaused) {
      this.drawPauseScreen();
    }
  }

  /** Renders the pause menu style */
  drawPauseScreen() {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "black";
    this.ctx.font = "60px Zabars";
    this.ctx.textAlign = "center";
    this.ctx.fillText("PAUSE", this.canvas.width / 2, this.canvas.height / 2);
  }

  /** @param {Array} objects - Draws an array of objects */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /** @param {MovableObject} mo - Draws a single object with direction check */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /** Mirors the context for mirrored sprites */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /** Restores context after mirroring */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  /** Connects world to entities and starts their logic */
  setWorld() {
    this.character.world = this;
    this.character.applyGravity();
    this.character.animate();
    if (this.level && this.level.enemies) {
      this.level.enemies.forEach((enemy) => {
        enemy.world = this;
        enemy.applyGravity();
        enemy.animate();
      });
    }
  }

  /** @param {number} id - Adds interval to the tracking list */
  addInterval(id) {
    this.intervalIds.push(id);
  }

  /** Stops all active intervals and sounds */
  stopGame() {
    this.intervalIds.forEach((id) => clearInterval(id));
    this.character.stopAllMyIntervals();
    this.level.enemies.forEach((enemy) => {
      enemy.stopAllMyIntervals();
    });
    this.backgroundSound.pause();
    document.getElementById("pause-btn").classList.add("d-none");
    document.getElementById("mobile-controls").classList.add("d-none");
  }

  /** Monitors win and loss conditions */
  checkGameOver() {
    if (this.gameEnded) return;
    if (this.character.isDead()) {
      this.handleGameOver("lost");
    } else if (this.endbossDead()) {
      this.handleGameOver("win");
    }
  }

  /** @param {string} result - Transitions to end screen */
  handleGameOver(result) {
    this.gameEnded = true;
    this.character.walkingSound.pause();
    const delay = result === "win" ? 1750 : 1000;
    setTimeout(() => {
      this.stopGame();
      this.cleanUp();
      if (result === "win") showWinScreen();
      else showLostScreen();
    }, delay);
  }

  /** Resets controls and stops all audio */
  cleanUp() {
    keyboard = {
      LEFT: false,
      RIGHT: false,
      UP: false,
      SPACE: false,
      D: false,
      SPACE: false,
    };
    document.querySelectorAll("audio").forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
  }

  /** @returns {boolean} Check if boss energy is 0 */
  endbossDead() {
    let boss = this.level.enemies.find((e) => e instanceof Endboss);
    return boss && boss.isDead();
  }

  /** @param {Object} sound - Registers new sound to the world */
  addSound(sound) {
    this.allSounds.push(sound);
    sound.setMute(this.gameMuted);
  }

  /** Updates mute state for all registered sounds */
  updateAllSounds() {
    this.allSounds.forEach((s) => {
      s.setMute(this.gameMuted);
    });
  }
}
