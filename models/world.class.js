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
    backgroundSound = new Sound('audio/background_wind_sound.mp3')
    intervalIds = [];


    constructor(canvas, keyboard) {
        this.level = level1;
this.enemies = level1.enemies;
this.clouds = level1.clouds;
this.backgroundObjects = level1.backgroundObjects;
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.backgroundSound.volume(0.025);
        this.backgroundSound.loop();
        this.run();
    }

    run() {

        let id1 = setInterval(() => {

            this.checkCharacterCollisionWithEnemy()
            this.checkThrowObjects();
            this.collisionBottlesWithEnemies();
            this.checkCoinCollisions();
            this.checkBottleCollisions();
            this.checkCharacterIdle();
            this.checkBossAttack();
            this.checkGameOver()
        }, 1000 / 60);
        this.addInterval(id1);

        let id2 = setInterval(() => {
            // this.checkCollisions();
            this.splashedBottlesCleanUp();
            this.cleanUpEnemies();
            this.calculateDistanceOfChar();
        }, 200);
        this.addInterval(id2);
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.character.bottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.character.otherDirection);
            bottle.world = this;
            this.throwableObjects.push(bottle);
            bottle.throw();
            this.character.bottles--;
            let bottlePercent = this.character.bottles * 20;
            this.statusBarBottle.setPercantage(bottlePercent);
            this.keyboard.D = false;
        }
    }

    // checkCollisions() {
    //     this.level.enemies.forEach((enemy) => {
    //         if (this.character.isColliding(enemy) && !enemy.isDead()) {
    //             this.character.hit(5);
    //             console.log('Energy ', this.character.energy);
    //         }
    //     });
    // }



    collisionBottlesWithEnemies() {
        for (let i = this.throwableObjects.length - 1; i >= 0; i--) {
            let bottle = this.throwableObjects[i];
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy) && !bottle.isBroken) {
                    bottle.isBroken = true;
                    bottle.splash();
                    if (enemy instanceof Endboss) {
                        enemy.hit(25);
                        let bossPercent = enemy.energy;
                        this.statusBarEndboss.setPercantage(bossPercent);
                        console.log('Boss wurde getroffen!');
                        console.log('Boss Energy ', enemy.energy);
                    }
                    else if (enemy instanceof SmallChicken || enemy instanceof Chicken) {
                        enemy.energy = 0;
                    }
                }
            });

        }
    }

    checkCharacterIdle() {
        if (this.keyboard.LEFT == false && this.keyboard.RIGHT == false && this.keyboard.SPACE == false) {
            this.character.isIdle = true;
        } else {
            this.character.isIdle = false;
        }
    }

    checkCoinCollisions() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.character.collectCoin();
                let coinPercent = this.character.coins * 10; // 10 coins = 100%
                this.statusBarCoin.setPercantage(coinPercent);
                this.level.coins.splice(index, 1);
            }
        });
    }

    checkCharacterCollisionWithEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.isDead() && !this.character.isHurt()) {
                if (this.character.isAboveGround() && this.character.speedY < 0 && !(enemy instanceof Endboss)) {
                    enemy.energy = 0;
                    this.character.speedY = 15;
                } else {
                    this.character.hit(5);
                    console.log('Energy ', this.character.energy);
                    this.statusBarHealth.setPercantage(this.character.energy);
                }
            }
        });
    }

    cleanUpEnemies() {
        for (let i = this.level.enemies.length - 1; i >= 0; i--) {
            let enemy = this.level.enemies[i];
            if (enemy.isGone) {
                this.level.enemies.splice(i, 1);
            }
        }
    }

    checkBottleCollisions() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.character.collectBottles();
                let bottlePercent = this.character.bottles * 20;
                this.statusBarBottle.setPercantage(bottlePercent);
                this.level.bottles.splice(index, 1);
            }
        });
    }

    splashedBottlesCleanUp() {
        for (let i = this.throwableObjects.length - 1; i >= 0; i--) {
            let bottle = this.throwableObjects[i];
            if (bottle.isGone) {
                this.throwableObjects.splice(i, 1);
            }
        }
    }

    calculateDistanceOfChar() {
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss) {
                let distance = Math.abs(enemy.x - this.character.x);
                if (distance < 500) {
                    enemy.hadFirstContact = true;
                }
            }
        });
    }

    checkBossAttack() {
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss) {
                if (enemy.currentDistance < 200 && !this.character.isHurt() && !enemy.isDead()) {
                    this.character.hit(10);
                    this.statusBarHealth.setPercantage(this.character.energy);
                }
            }
        });
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //Löscht die vorherigen Bilder im Canvas
        this.ctx.translate(this.camera_x, 0); //Verschiebe das Koordinatensystem nach links
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        //space for fixed objects
        this.addToMap(this.statusBarBottle)
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarHealth);
        // drawing healtbar of endboss only when boss fight starts
        if (this.level.enemies.some(enemy => enemy instanceof Endboss && enemy.hadFirstContact)) {
            this.addToMap(this.statusBarEndboss);
        }
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.bottles)
        this.addObjectsToMap(this.level.coins);
        this.statusBarHealth.setPercantage(this.character.energy);

        this.addObjectsToMap(this.level.enemies);
        this.ctx.translate(-this.camera_x, 0);   //Verschiebe das Koordinatensystem zurück

        //draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });

    }

    //vereinfache die Schleifen // eine für alle
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);

        // mo.drawFrame(this.ctx); // Rahmen um Objekte zum Testen

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }

    }




    flipImage(mo) {
        this.ctx.save();
        // verschiebe das Koordinatensystem
        this.ctx.translate(mo.width, 0);
        // Spiegeln
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


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

    addInterval(id) {
        this.intervalIds.push(id);
    }

/*     stopGame() {
        this.intervalIds.forEach(id => {
            clearInterval(id);
        });
        this.backgroundSound.pause();
    } */

        stopGame() {
    this.intervalIds.forEach(id => clearInterval(id));
    this.character.stopAllMyIntervals();
    this.level.enemies.forEach(enemy => {
        enemy.stopAllMyIntervals();
    });
    this.backgroundSound.pause();
}

    checkGameOver() {
        if (this.character.isDead()) {
            this.stopGame();
            showLostScreen();
        } else if (this.endbossDead()) {
            this.stopGame();
            showWinScreen();
        }
    }

    endbossDead() {
        let boss = this.level.enemies.find(e => e instanceof Endboss);
        return boss && boss.isDead();
    }


}