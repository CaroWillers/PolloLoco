class Character extends MovableObject {
    speed = 10;
    height = 300;
    health = 100;
    y = 180;
    collectedBottles = 0;
    hitCooldown = false;
    isMoving = false;

    offset = {
        top: 150,
        left: 40,
        right: 40,
        bottom: 0
    };

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png'
    ];

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.x = 100;
        this.animate();
    }

    animate() {
        this.handleMovement();
        this.handleAnimation();
    }

    handleMovement() {
        setInterval(() => {
            audioManager.pause('walking'); // Pause walking sound by default
            this.isMoving = false;

            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                audioManager.play('walking');
                this.world.updateBackground();
                this.isMoving = true;
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                audioManager.play('walking');
                this.world.updateBackground();
                this.isMoving = true;
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
    }

    handleAnimation() {
        setInterval(() => {
            if (this.isDead()) {
                this.die();
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 50);
    }

    setIdle() {
        this.playAnimation(this.IMAGES_IDLE);
    }

    jump() {
        this.speedY = 25;
        this.isMoving = true;
    }

    isAboveGround() {
        return this.y < 180;
    }

    hit() {
        if (!this.hitCooldown) {
            this.health -= 5;
            this.world.statusBarHealth.setPercentage(this.health);
            audioManager.play('hit');

            if (this.health <= 0) {
                this.health = 0;
                this.die();
            } else {
                this.lastHit = new Date().getTime();
                this.hitCooldown = true;
                setTimeout(() => {
                    this.hitCooldown = false;
                }, 500);
            }
        }
    }

    die() {
        if (this.isDead()) return;
        this.playAnimation(this.IMAGES_DEAD);
        audioManager.play('dead');
        setTimeout(() => {
            this.remove();
        }, 500);
        this.health = 0;
        this.world.statusBarHealth.setPercentage(this.health);
        if (!this.world.lostGame && !this.world.winGame) {
            this.world.lostGame = true;
            this.world.gameOver = true;
            window.lostGame();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    isDead() {
        return this.health == 0;
    }

    remove() {
        this.world.character = null;
    }
}
