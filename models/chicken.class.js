class Chicken extends MovableObject { 
    height = 80;
    width = 80;
    y = 380;    
    level_end_x = 3500;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    walking_sound = new Audio('audio/walkGrass.mp3');

    constructor(world) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.world = world;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 250 + Math.random() * 2000;
        this.x = 250 + Math.random() * (this.level_end_x - 500); 
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

animate() {
    this.movingInterval = setInterval(() => {
        this.moveLeft();
    }, 1000 / 60);

    this.animationInterval = setInterval(() => {
        this.playAnimation(this.IMAGES_WALKING);        
    }, 200);
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
