class Endboss extends MovableObject {
  width = 300;
  height = 400;
  y = 75;
  hadFirstContact = false;
  currentDistance = 5000;
  isAttacking = false;
  isStunned = false;
  endbossHurtSound = new Sound("audio/endboss.mp3");

  offset = {
    top: 60,
    bottom: 10,
    left: 40,
    right: 40,
  };

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.energy = 100;
    this.x = 4100;
    this.groundLevel = 55;
    this.speed = 5;
    this.endbossHurtSound.volume(0.3);
  }

  animate() {
    this.setStoppableInterval(() => this.updateDistance(), 1000 / 60);
    this.setStoppableInterval(() => this.handleMovement(), 1000 / 60);
    this.setStoppableInterval(() => this.playCurrentAnimation(), 150);
  }

  updateDistance() {
    if (this.world && this.world.character) {
      this.currentDistance = Math.abs(
        this.getBossMid() - this.getCharacterMid(),
      );
    } else {
      this.currentDistance = 0;
    }
  }

  handleMovement() {
    if (this.shouldNotMove()) return;
    if (this.currentDistance < 100) {
      this.attack();
    } else {
      this.moveBasedOnCharacter();
    }
  }

  playCurrentAnimation() {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.isStunned) {
      this.playAnimation(this.IMAGES_ALERT);
    } else if (this.isAttacking) {
      this.playAnimation(this.IMAGES_ATTACK);
    } else if (this.hadFirstContact) {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }

  getBossMid() {
    return this.x + this.width / 2;
  }

  getCharacterMid() {
    return this.world.character.x + this.world.character.width / 2;
  }

  shouldNotMove() {
    return (
      !this.hadFirstContact ||
      this.isDead() ||
      this.isAttacking ||
      this.isStunned
    );
  }

  moveBasedOnCharacter() {
    const bossMid = this.getBossMid();
    const characterMid = this.getCharacterMid();
    if (characterMid < bossMid - 50) {
      this.moveLeft();
      this.otherDirection = false;
    } else if (characterMid > bossMid + 50) {
      this.moveRight();
      this.otherDirection = true;
    }
  }

  attack() {
    this.isAttacking = true;
    this.speed = 0;

    const attackInterval = this.startAttackInterval();
    setTimeout(() => this.endAttack(attackInterval), 800);
  }

  startAttackInterval() {
    return setInterval(() => {
      if (this.canAttack()) {
        this.performAttack();
      }
    }, 400);
  }

  canAttack() {
    return this.currentDistance < 200 && !this.isDead();
  }

  performAttack() {
    this.world.character.hit(10);
    this.world.statusBarHealth.setPercantage(this.world.character.energy);
  }

  endAttack(attackInterval) {
    clearInterval(attackInterval);
    this.adjustPositionAfterAttack();
    this.isAttacking = false;
    this.speed = 5;
  }

  adjustPositionAfterAttack() {
    this.x += this.otherDirection ? -150 : 150;
  }

  hit(damage) {
    if (this.world.gameEnded || this.isDead()) return;
    super.hit(damage);
    this.isStunned = true;
    this.playHurtSound();

    if (this.energy > 0) {
      this.handlePositionAfterHit();
      this.resetStun();
    }
  }

  playHurtSound() {
    this.endbossHurtSound.currentTime = 2.0;
    this.endbossHurtSound.play();
  }

  handlePositionAfterHit() {
    setTimeout(() => {
      this.x +=
        this.world.character.x < this.x
          ? Math.min(160, 4500 - this.x)
          : Math.max(-160, 2000 - this.x);
    }, 200);
  }

  resetStun() {
    setTimeout(() => (this.isStunned = false), 1500);
  }

  isAboveGround() {
    return this.y < this.groundLevel;
  }
}
