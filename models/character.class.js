class Character extends MovableObject {
    speed = 10;
    y = 120;
    height = 280;
    health = 100;
    collectedBottles = 0; 
    hitCooldown = false;  
    hitSound = new Audio('audio/hit.mp3'); 
    deadSound = new Audio('audio/dead.mp3');
    killedEnemySound = new Audio('audio/killedEnemy.mp3');

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

    offset = {
        top: 200,
        left: 20,
        right: 20,
        bottom: 10
    };

    world;
    walking_sound = new Audio('audio/walking.mp3');

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.x = 100;
        this.y = 180;  
        this.animate();
    }

    animate() {
        this.handleMovement();
        this.handleAnimation();
    }

    handleMovement() {
        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                this.walking_sound.play();
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                this.walking_sound.play();
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
        this.speedY = 30;
    }

    isAboveGround() {
        return this.y < 180; 
    }

    hit() {
        if (!this.hitCooldown) {
            this.health -= 5;
            this.world.statusBarHealth.setPercentage(this.health);
            this.playhitSound();

            if (this.health <= 0) {
                this.health = 0;
                this.die();
            } else {
                this.lastHit = new Date().getTime();
                this.hitCooldown = true;
                setTimeout(() => {
                    this.hitCooldown = false;
                }, 1500);
            }
        }
    }

    die() {
        this.playAnimation(this.IMAGES_DEAD);
        this.playdeadSound();
        setTimeout(() => {
            this.remove();
        }, 500);
        this.health = 0;
        this.world.statusBarHealth.setPercentage(this.health);
        this.world.lostGame();
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

    playhitSound() {
        if (!muted) {
            this.hitSound.play();
            setTimeout(() => {
                this.hitSound.pause();
                this.hitSound.currentTime = 0;
            }, 2000);  
        }
    }
    
    playdeadSound() {
        if (!muted) {
            this.deadSound.play();
            setTimeout(() => {
                this.deadSound.pause();
                this.deadSound.currentTime = 0;
            }, 1500); 
        }
    }
    
    playKilledEnemySound() {
        if (!muted) {
            this.killedEnemySound.play();
            setTimeout(() => {
                this.killedEnemySound.pause();
                this.killedEnemySound.currentTime = 0;
            }, 2000);  
        }
    }
}
