class DrawableObject {
    img;  
    imageCache = {};
    currentImage = 0;
    x = 100;
    y = 50;
    width = 150;
    height = 150;
    offset = { top: 0, left: 0, right: 0, bottom: 0 };

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        if (this.img && !this.isRemoved) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
            this.drawFrame(ctx);
        }
    }


    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof ChickenSmall || this instanceof Endboss || this instanceof Coins || this instanceof Bottle) {
            // Draw the actual position
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();

            // Draw the offset position
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.left - this.offset.right, this.height - this.offset.top - this.offset.bottom);
            ctx.stroke();
        }
    }

    loadImages(arr) {   
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}
