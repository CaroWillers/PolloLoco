class Bottle extends MovableObject {
    height = 80;
    width = 80;
    y = 380;
    bottleSound = new Audio('audio/bottle.mp3');
    brokenBottleSound = new Audio('audio/glass.mp3');

    IMAGES_BOTTLE_ON_GROUND = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor(x, y) {
        super();
        let randomIndex = Math.floor(Math.random() * this.IMAGES_BOTTLE_ON_GROUND.length);
        this.loadImage(this.IMAGES_BOTTLE_ON_GROUND[randomIndex]);
        this.x = x || 250 + Math.random() * 719 * 4;
        this.y = y || 380;
    }

    playBottleSound() {
        if (!muted) {
            this.bottleSound.play();
            setTimeout(() => {
                this.bottleSound.pause();
                this.bottleSound.currentTime = 0;  
            }, 2000);  
        }
    }

    playBrokenBottleSound() {
        if (!muted) {
            this.brokenBottleSound.play();
            setTimeout(() => {
                this.brokenBottleSound.pause();
                this.brokenBottleSound.currentTime = 0;  
            }, 2000);  
        }
    }
}
