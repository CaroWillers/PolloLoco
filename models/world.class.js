class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusBar('health');
    statusBarCoin = new StatusBar('coin');
    statusBarBottle = new StatusBar('bottle');
    coinCounter = 0;
    bottleCounter = 0;
    throwableObjects = [];

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
            this.level.clouds.forEach(cloud => cloud.moveLeft());
        }, 1000 / 60); // 60 Mal pro Sekunde
    }

checkThrowObjects() {
    if(this.keyboard.D) {
        let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
        this.throwableObjects.push(bottle);
    }
}

checkCollisions() {
    this.checkEnemyCollisions();
    // this.checkCoinCollisions(); // Diese Zeile auskommentieren, um die Funktion nicht auszuführen
    // Add checkBottleCollisions if bottle collision logic is needed
}

checkEnemyCollisions() {
    this.level.enemies.forEach(enemy => {
        if (this.character.isColliding(enemy)) {
            this.character.hit();
            this.statusBarHealth.setPercentage(this.character.energy);
        }
    });
}
// checkCoinCollisions() {
//     this.level.coins.forEach((coin, index) => {
//         if (this.character.isColliding(coin)) {
//             this.coinCounter++;
//             this.statusBarCoin.setPercentage((this.coinCounter / this.level.coins.length) * 100);
//             this.level.coins.splice(index, 1); // Entferne die eingesammelte Münze
//             // coin.coinSound.play(); // Assuming there is a sound to be played
//         }
//     });
// }


draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
 
    this.addObjectsToMap(this.level.backgroundObjects); 
         
    this.ctx.translate(-this.camera_x, 0); // Back to the original position
    this.addToMap(this.statusBarHealth);
    this.addToMap(this.statusBarCoin);
    this.addToMap(this.statusBarBottle);
    this.ctx.translate(this.camera_x, 0); // Forwaard to the original position

    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottle);
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
