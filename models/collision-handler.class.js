/** * Handles all collision detection and resulting game logic. */
class CollisionHandler {
  /** @param {World} world - Reference to the game world */
  constructor(world) {
    this.world = world;
  }

  /** Executes all collision and state checks */
  checkCollisions() {
    this.checkCharacterCollisionWithEnemy();
    this.checkThrowObjects();
    this.collisionBottlesWithEnemies();
    this.checkCoinCollisions();
    this.checkBottleCollisions();
    this.checkCharacterIdle();
    this.checkBossAttack();
  }

  /** Checks if player initiates a bottle throw */
  checkThrowObjects() {
    if (this.canThrowBottle()) {
      const bottle = this.createBottle();
      this.world.throwableObjects.push(bottle);
      this.updateBottleCount();
    }
  }

  canThrowBottle() {
    return this.world.keyboard.D && this.world.character.bottles > 0;
  }

  createBottle() {
    const c = this.world.character;
    const bottle = new ThrowableObject(c.x + 100, c.y + 100, c.otherDirection);
    bottle.world = this.world;
    bottle.throw();
    return bottle;
  }

  /** Updates bottle inventory and UI */
  updateBottleCount() {
    this.world.character.bottles--;
    const bottlePercent = this.world.character.bottles * 20;
    this.world.statusBarBottle.setPercantage(bottlePercent);
    this.world.keyboard.D = false;
  }

  /** Checks for collisions between thrown bottles and enemies */
  collisionBottlesWithEnemies() {
    this.world.throwableObjects.forEach((bottle) => {
      if (bottle.isBroken) return;
      this.world.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy)) {
          this.handleBottleCollision(bottle, enemy);
        }
      });
    });
  }

  /** @param {Object} bottle @param {Object} enemy - Handles bottle impact logic */
  handleBottleCollision(bottle, enemy) {
    bottle.isBroken = true;
    bottle.splash();
    if (enemy instanceof Endboss) {
      this.damageEndboss(enemy);
    } else if (enemy instanceof SmallChicken || enemy instanceof Chicken) {
      enemy.hit();
    }
  }

  damageEndboss(enemy) {
    enemy.hit(25);
    this.world.statusBarEndboss.setPercantage(enemy.energy);
  }

  /** Sets character idle state based on keyboard input */
  checkCharacterIdle() {
    if (
      this.world.keyboard.LEFT == false &&
      this.world.keyboard.RIGHT == false &&
      this.world.keyboard.SPACE == false
    ) {
      this.world.character.isIdle = true;
    } else {
      this.world.character.isIdle = false;
    }
  }

  /** Checks for coin collection */
  checkCoinCollisions() {
    this.world.level.coins.forEach((coin, index) => {
      if (this.world.character.isColliding(coin)) {
        this.world.character.collectCoin();
        coin.collect();
        let coinPercent = this.world.character.coins * 10; // 10 coins = 100%
        this.world.statusBarCoin.setPercantage(coinPercent);
        this.world.level.coins.splice(index, 1);
      }
    });
  }

  /** Manages physical contact between character and enemies */
  checkCharacterCollisionWithEnemy() {
    this.world.level.enemies.forEach((enemy) => {
      if (this.shouldHandleCollision(enemy)) {
        if (this.isJumpAttack(enemy)) {
          this.handleJumpAttack(enemy);
        } else {
          this.handleEnemyHit();
        }
      }
    });
  }

  shouldHandleCollision(enemy) {
    return (
      this.world.character.isColliding(enemy) &&
      !enemy.isDead() &&
      !this.world.character.isHurt()
    );
  }

  isJumpAttack(enemy) {
    const c = this.world.character;
    let characterBottom = c.y + c.height - c.offset.bottom;
    let enemyTop = enemy.y + enemy.offset.top;
    return (
      c.isAboveGround() && c.speedY <= 0 && characterBottom < enemyTop + 100
    );
  }

  handleJumpAttack(enemy) {
    enemy.hit();
    this.world.character.speedY = 15;
    this.world.character.y -= 10;
  }

  /**
   * Handles the logic when the character collides with an enemy.
   * @param {Object} enemy - The enemy object the character collided with.
   */
  handleEnemyHit(enemy) {
    if (this.world.character.isHurt()) return;
    this.applyDamage(enemy);
    if (!(enemy instanceof Endboss)) {
      this.executeKnockback();
    }
  }

  /**
   * Calculates and applies damage to the character based on the enemy type.
   * @param {Object} enemy - The enemy that caused the damage.
   */
  applyDamage(enemy) {
    const char = this.world.character;
    const damage = enemy instanceof Endboss ? 20 : 5;
    char.hit(damage);
    this.world.statusBarHealth.setPercantage(char.energy);
  }

  /**
   * Initiates a physical knockback effect, pushing the character away and upwards.
   */
  executeKnockback() {
    const char = this.world.character;
    char.speedY = 15;
    let knockbackTime = 0;
    let interval = setInterval(() => {
      this.moveCharacterBackwards(char);
      knockbackTime++;
      if (knockbackTime > 5) clearInterval(interval);
    }, 1000 / 60);
  }

  /**
   * Moves the character horizontally based on their current facing direction.
   * @param {MovableObject} char - The character to be moved.
   */
  moveCharacterBackwards(char) {
    if (char.otherDirection) {
      char.x += 10;
    } else {
      char.x -= 10;
    }
  }

  /** Checks for bottle item collection */
  checkBottleCollisions() {
    this.world.level.bottles.forEach((bottle, index) => {
      if (this.world.character.isColliding(bottle)) {
        this.world.character.collectBottles();
        bottle.collectBottleSound();
        let bottlePercent = this.world.character.bottles * 20;
        this.world.statusBarBottle.setPercantage(bottlePercent);
        this.world.level.bottles.splice(index, 1);
      }
    });
  }

  /** Handles damage from Endboss proximity attack */
  checkBossAttack() {
    this.world.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        if (
          enemy.currentDistance < 200 &&
          !this.world.character.isHurt() &&
          !enemy.isDead()
        ) {
          this.world.character.hit(10);
          this.world.statusBarHealth.setPercantage(this.world.character.energy);
        }
      }
    });
  }
}
