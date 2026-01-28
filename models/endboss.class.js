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
    this.setStoppableInterval(() => {
      if (this.world && this.world.character) {
        this.bossMid = this.x + this.width / 2;
        this.characterMid =
          this.world.character.x + this.world.character.width / 2;
        this.currentDistance = Math.abs(this.bossMid - this.characterMid);
      } else {
        this.currentDistance = 0;
      }
    }, 1000 / 60);

    this.setStoppableInterval(() => {
      if (
        !this.hadFirstContact ||
        this.isDead() ||
        this.isAttacking ||
        this.isStunned
      )
        return;
      this.bossMid = this.x + this.width / 2;
      this.characterMid =
        this.world.character.x + this.world.character.width / 2;
      if (this.currentDistance < 100) {
        this.attack();
      } else if (this.characterMid < this.bossMid - 50) {
        this.moveLeft();
        this.otherDirection = false;
      } else if (this.characterMid > this.bossMid + 50) {
        this.moveRight();
        this.otherDirection = true;
      }
    }, 1000 / 60);

    this.setStoppableInterval(() => {
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
    }, 150);
  }

  attack() {
    this.isAttacking = true;
    this.speed = 0;
    this.setStoppableInterval(() => {
      if (this.currentDistance < 200) {
        this.world.character.hit(10);
        this.world.statusBarHealth.setPercantage(this.world.character.energy);
      }
    }, 400);

    this.setStoppableInterval(() => {
      if (this.otherDirection) {
        this.x -= 150;
        a;
      } else {
        this.x += 150;
      }
      this.isAttacking = false;
      this.speed = 5;
    }, 1000);
  }

  hit(damage) {
    super.hit(damage);
    this.isStunned = true;
    this.endbossHurtSound.currentTime = 0.5;
    this.endbossHurtSound.play();

    setTimeout(() => {
      let levelEnd = 4500;
      let levelStart = 2000;

      if (this.world.character.x < this.x) {
        if (this.x + 160 < levelEnd) {
          this.x += 160;
        } else {
          this.x = levelEnd;
        }
      } else {
        if (this.x - 160 > levelStart) {
          this.x -= 160;
        } else {
          this.x = levelStart;
        }
      }
    }, 800);

    setTimeout(() => {
      this.isStunned = false;
    }, 1500);
  }

  isAboveGround() {
    return this.y < this.groundLevel;
  }
}
