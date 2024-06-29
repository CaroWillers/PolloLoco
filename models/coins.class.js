class Coins extends MovableObject { 
    coinSound = new Audio('audio/coin.mp3');
    IMAGES_COIN = [ 
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor(x, y) {
        super().loadImage("img/8_coin/coin_1.png");
        this.loadImages(this.IMAGES_COIN);
        this.width = 50;
        this.height = 50;
        this.x = 700 + Math.random() * 719 * 3 - 700; // Zahl zwischen 200 und 700px
        this.y = 280 - Math.random() * 150;

        this.loadImages(this.IMAGES_COIN);
        this.animateCoins();
    }

    animateCoins() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 250);
    }
}
