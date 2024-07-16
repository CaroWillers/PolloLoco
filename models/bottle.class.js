class Bottle extends MovableObject {
    height = 80;
    width = 80;
    y = 340;

    IMAGES_BOTTLE_ON_GROUND = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor(x, y) {
        super();
        let randomIndex = Math.floor(Math.random() * this.IMAGES_BOTTLE_ON_GROUND.length);
        this.loadImage(this.IMAGES_BOTTLE_ON_GROUND[randomIndex]);
        this.x = x || 250 + Math.random() * 719 * 4;
        this.y = y || 340;
    }

    playBottleSound() {
        audioManager.play('bottle');
    }

    playBrokenBottleSound() {
        audioManager.play('brokenBottle');
    }
}
