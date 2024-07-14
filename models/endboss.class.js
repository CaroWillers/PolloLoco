class Endboss extends MovableObject {
    height = 500;
    width = 300;
    y = -10;
    speed = 10;
    health = 2;
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
            } else if (distance <= 550) {
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
            window.lostGame(); // Verloren
        }
    }

    isTouchingCharacter() {
        let distance = this.calculatedDistance();
        return distance <= 100;
    }

    endbossDead() {
        if (this.isDead()) {
            return;
        }
        this.playAnimation(this.IMAGES_DEAD);
        this.playEndbossDeadSound();
        setTimeout(() => {
            this.removeEndboss();
            window.winGame();
        }, 1000);  
    }


    hit() {
        if (this.isDead()) return;
        this.health -= 1;
        if (this.health <= 0) {
            this.die();
        } else {
            this.playEndbossHurtSound();
            this.playAnimation(this.IMAGES_HURT);
        }
    }

    die() {
        if (this.isDead()) {
            return;
        }
        this.loadImage('img/4_enemie_boss_chicken/5_dead/G24.png');  
        setTimeout(() => {
            this.remove();
            this.removeEndboss();
            if (!this.world.winGame) {
                this.world.winGame = true;
                this.world.gameOver = true;  
                window.winGame();
            }
        }, 1000);  
        this.playEndbossDeadSound(); 
    }

    removeEndboss() {
        let index = this.world.level.enemies.indexOf(this);
        if (index > -1) {
            this.world.level.enemies.splice(index, 1);
        }
    }


    playEndbossSound() {
        if (!muted) {
            this.endbossSound.play();
            setTimeout(() => {
                this.endbossSound.pause();
                this.endbossSound.currentTime = 0;  
            }, 2000);  
        }
    }

    playEndbossHurtSound() {
        if (!muted) {
            this.endbossHurtSound.play();
            setTimeout(() => {
                this.endbossHurtSound.pause();
                this.endbossHurtSound.currentTime = 0;  
            }, 2000);  
        }
    }

    playEndbossDeadSound() {
        if (!muted) {
            this.endbossDeadSound.play();
            setTimeout(() => {
                this.endbossDeadSound.pause();
                this.endbossDeadSound.currentTime = 0;  
            }, 3000); 
        }
    }
}
