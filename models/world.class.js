class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusbar = new StatusBar();
    throwableObjects = [new ThrowableObject()];

constructor(canvas, keyboard) { 
    this.canvas = canvas;    
    this.keyboard = keyboard;    
    this.ctx = canvas.getContext('2d'); 
    this.character.world = this;
    this.draw(); 
    this.setWorld();   
    this.run(); 
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

run() { 
    setInterval(() => { 
        this.checkCollisions();
        this.checkThrowObjects();
    }, 200);
}

checkThrowObjects() {
    if(this.keyboard.D) {
        let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
        this.throwableObjects.push(bottle);
    }
}

checkCollisions() {
    this.level.enemies.forEach(enemy => {
        if(this.character.isColliding(enemy)) {
            this.character.hit();
            this.statusbar.setPercentage(this.character.energy);
        }
    });
}

draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
 
    this.addObjectsToMap(this.level.backgroundObjects); 
         
    this.ctx.translate(-this.camera_x, 0); // Back to the original position
    this.addToMap(this.statusbar);
    this.ctx.translate(this.camera_x, 0); // Forwaard to the original position

    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);

    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(function() {
    self.draw();
    })
}

addObjectsToMap(objects) {
    objects.forEach(o => {
        this.addToMap(o);
    });
}

addToMap(mo) {
    if(mo.otherDirection) { 
        this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);


    if(mo.otherDirection) {
        this.flipImageBack(mo);
    } 
}

flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
    }

flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
    }
}
