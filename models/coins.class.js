class Coins extends MovableObject { 
    coinSound = new Audio('audio/coin.mp3');

    IMAGES_COIN = [ 
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    offset = {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10
    };

    constructor() {
        super().loadImage("img/8_coin/coin_1.png");
        this.loadImages(this.IMAGES_COIN);
        this.width = 100;
        this.height = 100;  
        this.x = 700 + Math.random() * 719 * 4 - 700 + this.offset.left - this.offset.right;
        this.y = 280 - Math.random() * 150 + this.offset.top - this.offset.bottom;
        this.animateCoins();
    }

    animateCoins() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 250);
    }

    playCoinSound() {
        if (!muted) {
            this.coinSound.play();
        }
    }
}
