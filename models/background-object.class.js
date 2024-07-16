class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    constructor(imagePath,x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}