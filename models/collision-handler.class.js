class CollisionHandler {
  constructor(world) {
    this.world = world;
  }

  checkCollisions() {
    this.checkCharacterCollisionWithEnemy();
    this.checkThrowObjects();
    this.collisionBottlesWithEnemies();
    this.checkCoinCollisions();
    this.checkBottleCollisions();
    this.checkCharacterIdle();
    this.checkBossAttack();
  }

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

  updateBottleCount() {
    this.world.character.bottles--;
    const bottlePercent = this.world.character.bottles * 20;
    this.world.statusBarBottle.setPercantage(bottlePercent);
    this.world.keyboard.D = false;
  }

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

  checkCharacterCollisionWithEnemy() {
    this.world.level.enemies.forEach((enemy) => {
      if (
        this.world.character.isColliding(enemy) &&
        !enemy.isDead() &&
        !this.world.character.isHurt()
      ) {
        if (
          this.world.character.isAboveGround() &&
          this.world.character.speedY < 0 &&
          !(enemy instanceof Endboss)
        ) {
          enemy.hit();
          this.world.character.speedY = 15;
        } else {
          this.world.character.hit(5);
          this.world.statusBarHealth.setPercantage(this.world.character.energy);
        }
      }
    });
  }

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
