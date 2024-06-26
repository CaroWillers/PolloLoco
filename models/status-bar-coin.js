class StatusBarCoin extends DrawableObject {

    IMAGES_COIN = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];
    
    percentage = 100;
     
    constructor() {
        super();
        this.loadImages(this.IMAGES_COIN); 
        this.x = 30;
        this.y = 45;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);    
    }
    
    setPercentage(percentage) { 
        this.percentage = percentage; // => 0 ...5
        let path = this.IMAGES_COIN[this.resolveImageIndex(percentage)];
        this.img = this.imageCache[path];
    } 
    
    resolveImageIndex (percentage) {
        if(percentage == 0) {
            return 0;
        } else if(percentage < 20) {
            return 1;
        } else if(percentage < 40) {
            return 2;
        } else if(percentage < 60) {
            return 3;
        } else if(percentage < 80) {
            return 4;
        } else {
            return 5;
        }
    }
    }
    
    
    
