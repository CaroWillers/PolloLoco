class Cloud extends MovableObject {
    y = 50;
    height = 250;
    width = 500;
    speed = 0.5;

    constructor(canvasWidth) {
        super();
        this.loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * canvasWidth; // Initiale Position der Wolke
        this.canvasWidth = canvasWidth;
    }

    moveLeft() {
        this.x -= this.speed;
        if (this.x + this.width < 50) { // Wenn die Wolke den linken Rand des Canvas verlässt
            this.x = this.canvasWidth + Math.random();
        }
    }
}
