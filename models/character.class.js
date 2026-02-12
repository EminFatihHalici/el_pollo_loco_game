class Character extends MovableObject {
  width = 150;
  height = 300;
  x = 100;
  y = 150;
  world;
  speed = 10;
  coins = 0;
  bottles = 0;
  lastAction = new Date().getTime();
  jumpSound = new Sound("audio/jump.mp3");
  walkingSound = new Sound("audio/character_walkling.mp3");
  hurtSound = new Sound("audio/character_hurt.mp3");
  snoreSound = new Sound("audio/snore.mp3");

  offset = {
    top: 120,
    bottom: 10,
    left: 40,
    right: 40,
  };

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  /*  currentImage = 0; */

  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.jumpSound.volume(0.2);
    this.walkingSound.volume(0.3);
    this.hurtSound.volume(0.3);
    this.snoreSound.volume(0.3);
  }

  //currentImage is increased every second to change the image of the character and length calculated with modulo operator
  animate() {
    this.setStoppableInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.lastAction = new Date().getTime();
        this.otherDirection = false;
        this.world.camera_x = -this.x + 100;
      }

      if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
        this.lastAction = new Date().getTime();
        this.otherDirection = true;
        this.world.camera_x = -this.x + 100;
      }

      if (
        (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) &&
        !this.isAboveGround()
      ) {
        if (
          (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) &&
          !this.isAboveGround() &&
          !this.world.gameEnded
        ) {
          this.walkingSound.loop();
        }
      } else {
        this.walkingSound.pause();
      }

      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
        this.jumpSound.play();
        this.lastAction = new Date().getTime();
      }

      //this.world.camera_x = -this.x + 100;
    }, 1000 / 60); // 60fps

    this.setStoppableInterval(() => {
      const isMoving = this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
      const idleTime = this.calculateIdleTime();
      const isLongIdle =
        idleTime > 5 &&
        !this.isAboveGround() &&
        !this.isDead() &&
        !isMoving &&
        !this.world.gameEnded;

      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else if (isMoving) {
        this.playAnimation(this.IMAGES_WALKING);
      } else if (isLongIdle) {
        this.playAnimation(this.IMAGES_LONG_IDLE);
      } else if (idleTime > 2) {
        this.playAnimation(this.IMAGES_IDLE);
      }
      this.handleSnoreSound(isLongIdle);
    }, 130);
  }

  handleSnoreSound(isLongIdle) {
    if (isLongIdle && !this.isHurt()) {
      if (!this.snoreSound.isPlaying()) {
        this.snoreSound.loop();
      }
    } else {
      this.snoreSound.pause();
    }
  }

  collectCoin() {
    this.coins += 1;
  }

  collectBottles() {
    this.bottles += 1;
  }

  calculateIdleTime() {
    let timepassed = new Date().getTime() - this.lastAction;
    timepassed = timepassed / 1000; // difference in sec
    return timepassed;
  }

  hit(damage = 5) {
    super.hit(damage);
    this.lastAction = new Date().getTime();
    if (!this.isDead()) {
      this.hurtSound.play();
    }
  }
}
