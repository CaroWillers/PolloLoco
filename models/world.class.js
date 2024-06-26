class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusBarHealth();
    statusBarCoin = new StatusBarCoin();
    statusBarBottle = new StatusBarBottle(); 
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
     
setWorld() {
    this.character.world = this;
    }

run() {
    setInterval(() => { 
        this.checkCollisions();
        this.checkThrowObjects();
        this.checkBackgroundExtension();
        this.level.clouds[0].moveLeft(); 
        }, 1000 / 60); // 60 Mal pro Sekunde
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
            this.statusBarHealth[0].setPercentage(this.character.energy);  
        }
    });
}

checkBackgroundExtension() {
    const segmentWidth = 719;
    const buffer = segmentWidth * 2; // Buffer distance to add new segments before reaching the edge

    if (this.character.x + this.canvas.width > this.level.backgroundObjects[this.level.backgroundObjects.length - 1].x + buffer) {
        this.generateBackgroundObjects();
    }
}

generateBackgroundObjects() {
    const lastSegment = this.level.backgroundObjects[this.level.backgroundObjects.length - 1];
    const lastX = lastSegment.x;
    const segmentWidth = 719;

    for (let i = 1; i <= 2; i++) { // Add two new segments
        addBackgroundSegment(this.level, lastX + segmentWidth * i);
    }
}

draw() {
    // Clear the canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
     
    // Camera movement
    this.ctx.translate(this.camera_x, 0);  
    this.addObjectsToMap(this.level.backgroundObjects); 
         
    this.ctx.translate(-this.camera_x, 0); // Back to the original position
    this.addToMap(this.statusBarHealth);
    this.addToMap(this.statusBarCoin);
    this.addToMap(this.statusBarBottle);
    this.ctx.translate(this.camera_x, 0); // Forward to the original position

    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);

    this.ctx.translate(-this.camera_x, 0);

    // Draw() wird immer wieder aufgerufen
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
