class StatusBar extends DrawableObject {
    IMAGES_COIN_STATUS = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    IMAGES_HEALTH_STATUS = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    IMAGES_BOTTLE_STATUS = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png', 
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];

    percentage = 100;
    statusType;

    constructor(type) {
        super();
        this.statusType = type;
        if (type === 'coin') {
            this.loadImages(this.IMAGES_COIN_STATUS);
            this.x = 30;
            this.y = 45;
        } else if (type === 'health') {
            this.loadImages(this.IMAGES_HEALTH_STATUS);
            this.x = 30;
            this.y = 0;
        } else if (type === 'bottle') {
            this.loadImages(this.IMAGES_BOTTLE_STATUS);
            this.x = 30;
            this.y = 90;
        }

        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    setPercentage(percentage) { 
        this.percentage = percentage; // => 0 ...5
        let path;
        if (this.statusType === 'coin') {
            path = this.IMAGES_COIN_STATUS[this.resolveImageIndex(percentage)];
        } else if (this.statusType === 'health') {
            path = this.IMAGES_HEALTH_STATUS[this.resolveImageIndex(percentage)];
        } else if (this.statusType === 'bottle') {
            path = this.IMAGES_BOTTLE_STATUS[this.resolveImageIndex(percentage)];
        }
        this.img = this.imageCache[path];
    }

    resolveImageIndex(percentage) {
        if (percentage === 0) {
            return 0;
        } else if (percentage < 20) {
            return 1;
        } else if (percentage < 40) {
            return 2;
        } else if (percentage < 60) {
            return 3;
        } else if (percentage < 80) {
            return 4;
        } else {
            return 5;
        }
    }
}
