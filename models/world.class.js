class World {
    character = new Character();
    enemies = level1.enemies;
    clouds = level1.clouds;
    backgroundObjects = level1.backgroundObjects;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) { 
        this.canvas = canvas;    
        this.keyboard = keyboard;    
        this.ctx = canvas.getContext('2d');
        this.character.world = this;
        this.draw(); 
        this.setWorld();    
    }


    generateBackgroundObjects() {
        let segmentWidth = 719;
        if (this.backgroundObjects.length > 0) {
            let lastX = this.backgroundObjects[this.backgroundObjects.length - 1].x;
            this.addBackgroundSegment(lastX + segmentWidth * 2);
        }
    }
     

    setWorld() {
        this.character.world = this;
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
 
        this.addObjectToMap(this.backgroundObjects); 
        this.addToMap(this.character);
        this.addObjectToMap(this.clouds);
        this.addObjectToMap(this.enemies);
        this.ctx.translate(-this.camera_x, 0);
        this.checkBackgroundExtension();

        let self = this;
        requestAnimationFrame(function() {
            self.draw();
    })
}

checkBackgroundExtension() {
    const segmentWidth = 719;
    const buffer = segmentWidth * 2; // Buffer distance to add new segments before reaching the edge

    if (this.character.x + this.canvas.width > this.backgroundObjects[this.backgroundObjects.length - 1].x + buffer) {
        this.generateBackgroundObjects();
    }
}

addObjectToMap(objects) {
    objects.forEach(object => {
        this.addToMap(object);
    });
}

addToMap(mo) {
    if(mo.otherDirection) { 
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height); 
    if(mo.otherDirection) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    } 
}
}