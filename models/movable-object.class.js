class MovableObject {
    x = 120;
    y = 300;
    img;  
    width = 150;
    height = 150;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherdirection = false;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {   
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
    
    playAnimation(images) { 
            let i = this.currentImage % this.IMAGES_WALKING.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }

    moveRight() {
        setInterval(() => {
            this.x += this.speed;
        }, 1000 / 60);
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}