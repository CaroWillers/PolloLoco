class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    health = 100;  
    lastHit = 0; 
    world;
    movingInterval;
    animationInterval;

applyGravity() {
    setInterval(() => {
        if(this.isAboveGround() || this.speedY > 0 ) {   
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
        }
    }, 1000 / 25);
}

isAboveGround() {
    if (this instanceof Bottle) {  
        return true;
        } else {
        return this.y < 380;
    }
}

isColliding(obj) {
    return (this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&
        this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
        this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom &&
        this.height + this.y - this.offset.bottom > obj.y + obj.offset.top);
}


hit() { 
    this.energy -= 5;
        if(this.energy <= 0) {
            this.energy = 0; 
            punchSound.play();
        } else {
            this.lastHit = new Date().getTime(); }
    }

isHurt() {  
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
        if (timepassed < 1) {
            this.playpainSound();
            return true;
        }
    return false; 
}

isDead() {
    if (this.health == 0) {
        return true;
        }
    return false;
}
    
playAnimation(images) { 
    let i = this.currentImage % images.length; // let i = 7 % 6 => 1, Rest 1
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
}   

moveRight() {
    this.x += this.speed;
}

moveLeft() {
    this.x -= this.speed;
}

jump() {
    this.speedY = 30;
}   

isFalling() {
    return this.speedY < 0; 
}

die() {
    this.loadImage(this.IMAGES_DEAD[0]);
    this.speed = 0;
    clearInterval(this.movingInterval);
    clearInterval(this.animationInterval);
    setTimeout(() => {
        this.remove();
    }, 1000);
}

remove() {
    let index = this.world.level.enemies.indexOf(this);
        if (index > -1) {
        this.world.level.enemies.splice(index, 1);
        }
    }
}
    
