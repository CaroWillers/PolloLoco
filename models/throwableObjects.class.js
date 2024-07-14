class ThrowableObject extends MovableObject {
   
    IMAGES_BOTTLE_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png', 
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];
 
    constructor(x, y) {
        super();
        this.loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');  
        this.loadImages(this.IMAGES_BOTTLE_ROTATION);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.brokenBottleSound = new Audio('audio/glass.mp3');
        this.x = x;
        this.y = y;
        this.speedY = 15;
        this.world = world; 
    }

    clearImages() {
        this.IMAGES_BOTTLE_SPLASH = [];  
    }

    throw() {
        console.log('Throwing bottle with coordinates:', this.x, this.y);
        this.applyGravity();
        this.movementInterval = setInterval(() => {
            this.x += 10;
            this.checkGroundCollision();
        }, 25);
        this.animationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
        }, 50);
    }

    checkGroundCollision() {
        let splashHeight = 340;
        if (this.y >= 380) {
            clearInterval(this.animationInterval);
            clearInterval(this.movementInterval);    
            this.y = splashHeight;
            this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
            setTimeout(() => {
                this.removeBottle();
            }, 500);
        }
    }

    checkCollision(enemies) {
        if (this.isRemoved) return;
        enemies.forEach((enemy) => {
            if (this.isColliding(enemy)) {
                clearInterval(this.animationInterval);
                clearInterval(this.movementInterval);
                this.isRemoved = true; // Mark bottle as removed
                if (enemy instanceof Endboss) {
                    console.log('Bottle collided with Endboss');
                    this.world.handleBottleHitEndboss(this);
                } else {
                    console.log('Bottle collided with enemy');
                    enemy.die();
                    this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
                    setTimeout(() => {
                        this.removeBottle();
                    }, 500);
                }
            }
        });
    }


    removeBottle() {
        this.isRemoved = true;
        let index = this.world.throwableObjects.indexOf(this);
        if (index > -1) {
            this.world.throwableObjects.splice(index, 1);
        }
    }
}
