class Endboss extends MovableObject {
    height = 500;
    width = 300;
    y = -10;
    speed = 10;
    hitCount = 0;
    endbossSound = new Audio('audio/endboss.mp3');
    endbossHurtSound = new Audio('audio/hurt.mp3');
    endbossDeadSound = new Audio('audio/dead.mp3');

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
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 3600;
        this.animate();
    }

    animate() {
        this.animationInterval = setInterval(() => {
            let distance = this.calculatedDistance();

            if (this.isDead()) {
                this.endbossDead();
            } else if (distance <= 200) {
                this.endbossAttack();
            } else if (distance <= 450) {
                this.endbossWalk();
            } else {
                this.endbossAlert();
            }
        }, 200);
    }

    calculatedDistance() {
        if (this.world && this.world.character) {
            return Math.abs(this.x - this.world.character.x);
        }
        return Infinity;
    }

    endbossAlert() {
        this.playAnimation(this.IMAGES_ALERT);
    }

    endbossWalk() {
        this.playAnimation(this.IMAGES_WALKING);
        this.moveLeft();
    } 

    endbossAttack() {
        this.playAnimation(this.IMAGES_ATTACK);
        this.moveLeft();
        if (this.isTouchingCharacter()) {
            this.world.character.die();
            this.world.gameOver();  
        }
    }

    isTouchingCharacter() {
        const distance = this.calculatedDistance();
        return distance <= 100;
    }

    endbossDead() {
        this.playAnimation(this.IMAGES_DEAD);
        this.playEndbossDeadSound();
        setTimeout(() => {
            this.removeEndboss();
        }, 1000);
        this.world.youWin();
    }

    isDead() {
        return this.hitCount >= 3;
    }

    playEndbossSound() {
        if (!muted) {
            this.endbossSound.play();
        }
    }

    playEndbossHurtSound() {
        if (!muted) {
            this.endbossHurtSound.play();
        }
    }

    playEndbossDeadSound() {
        if (!muted) {
            this.endbossDeadSound.play();
        }
    }

    hitByBottle() {
        this.hitCount++;
        this.playEndbossHurtSound();
        if (this.isDead()) {
            this.endbossDead();
        }
    }

    removeEndboss() {
        const index = this.world.level.enemies.indexOf(this);
        if (index > -1) {
            this.world.level.enemies.splice(index, 1);
        }
    }
}
