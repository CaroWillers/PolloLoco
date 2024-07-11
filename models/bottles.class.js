class Bottles extends MovableObject {
    height = 80;
    width = 80;
    y = 380;
    bottleSound = new Audio('audio/bottle.mp3');
    brokenBottleSound = new Audio('audio/glass.mp3');

    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];
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

    constructor() {
        super();
        let randomIndex = Math.floor(Math.random() * this.IMAGES_BOTTLE.length);
        this.loadImage(this.IMAGES_BOTTLE[randomIndex]);
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = 250 + Math.random() * 719 * 4; 
    }

    playBottleSound() {
        if (!muted) {
            this.bottleSound.play();
        }
    }

    playBrokenBottleSound() {
        if (!muted) {
            this.brokenBottleSound.play();
        }
    }
}
