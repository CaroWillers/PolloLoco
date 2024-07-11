class StatusBar extends DrawableObject {
    IMAGES_COIN_STATUS = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ];

    IMAGES_HEALTH_STATUS = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    IMAGES_BOTTLE_STATUS = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png', 
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ];
 
    statusType;

    constructor(type) {
        super();
        this.statusType = type;
        if (type === 'coin') {
            this.loadImages(this.IMAGES_COIN_STATUS);
            this.x = 30;
            this.y = 45;
            this.setPercentage(0);
        } else if (type === 'health') {
            this.loadImages(this.IMAGES_HEALTH_STATUS);
            this.x = 30;
            this.y = 0;
            this.setPercentage(100);
        } else if (type === 'bottle') {
            this.loadImages(this.IMAGES_BOTTLE_STATUS);
            this.x = 30;
            this.y = 90;
            this.setPercentage(0);
        }

        this.width = 200;
        this.height = 60; 
    }

    setPercentage(percentage) { 
        this.percentage = percentage; 
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
        if (percentage <= 0) {
            return 0;
        } else if (percentage <= 20) {
            return 1;
        } else if (percentage <= 40) {
            return 2;
        } else if (percentage <= 60) {
            return 3;
        } else if (percentage <= 80) {
            return 4;
        } else {
            return 5;
        }
    }
}