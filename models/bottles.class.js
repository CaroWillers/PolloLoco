class Bottles extends MovableObject { 
    bottleSound = new Audio('audio/jump1.mp3');
    IMAGES_BOTTLE = [ 
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor(x, y) {
        super().loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
        this.loadImages(this.IMAGES_BOTTLE);
        this.width = 120;
        this.height = 120;
        this.x = 400 + Math.random() * 719 * 3 - 700; // Zahl zwischen 200 und 700px
        this.y = 380 - Math.random() * 150;
        this.loadImages(this.IMAGES_BOTTLE);
     
    }
}
