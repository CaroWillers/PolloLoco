class DrawableObject {
    img;  
    imageCache = {};
    currentImage = 0;
    x = 120;
    y;
    width = 150;
    height = 150;
     
loadImage(path) {
    this.img = new Image(); // this.img = document.getElementById('image') <img id='image' src=''>;
    this.img.src = path;
}

draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height); 
}

drawFrame(ctx) {
    if(this instanceof Character || this instanceof Chicken || this instanceof ChickenSmall || this instanceof ThrowableObject) {
    ctx.beginPath();
    ctx.lineWidth = '5';
    ctx.strokeStyle = 'blue';
    ctx.rect(this.x, this.y, this.width, this.height);
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