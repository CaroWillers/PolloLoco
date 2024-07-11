class Cloud extends MovableObject {
    y = 50;
    height = 250;
    width = 719

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * this.level_end_x;  
        this.animate();
    }
    animate() {
        setInterval(() => {
            this.moveLeft();
            if (this.x + this.width < 0) {
                this.x = this.level_end_x; 
            }
        }, 1000 / 60);
    }
}