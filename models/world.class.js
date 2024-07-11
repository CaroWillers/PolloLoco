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
    youWin = false;
    gameOver = false;

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
    this.level.enemies.forEach(enemy => {
        enemy.world = this;
    });
    this.level.clouds.forEach(cloud => {
        cloud.world = this;
    });
}

run() {
    this.runInterval = setInterval(() => {
        if (!this.gameOver) {
            this.checkCollisions();
            this.checkThrowObjects();
            this.level.clouds.forEach(cloud => cloud.moveLeft());
        }
    }, 1000 / 60);
}

checkThrowObjects() {
    if(this.keyboard.D) {
        let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
        this.throwableObjects.push(bottle);
    }
}

checkCollisions() {
    this.checkCoinCollisions(); 
    this.checkBottleCollisions();
    this.handleEnemyHit();
    this.checkEnemyCollisions(); 
    this.handleCharacterHitByEnemy();
}

checkCoinCollisions() {
    this.level.coins.forEach((coin, index) => {
        if (this.character.isColliding(coin)) { 
            this.coinCounter++;
            this.statusBarCoin.setPercentage((this.coinCounter / this.level.coins.length) * 100);
            this.level.coins.splice(index, 1);  
            coin.playCoinSound();  
        }
    });
}

checkBottleCollisions() {
    this.level.bottle.forEach((bottle, index) => {
        if (this.character.isColliding(bottle)) { 
            this.bottleCounter++;
            this.statusBarBottle.setPercentage((this.bottleCounter / this.level.bottle.length) * 100);
            this.level.bottle.splice(index, 1);  
            bottle.playBottleSound();  
        }
    });
}

handleEnemyHit(enemy) {
    if (this.character.isFalling() && this.character.y + this.character.height < enemy.y + enemy.height / 2) {
        enemy.die();
        this.character.playKilledEnemySound();
    } else {
        if (enemy instanceof Chicken) {
            this.character.hit();
            this.statusBarHealth.setPercentage(this.character.health);
            if (this.character.isDead()) {
                this.character.die();
            }
        } else if (enemy instanceof Endboss) {
            this.character.die();
        }
    }
}

checkEnemyCollisions() {
    this.level.enemies.forEach(enemy => {
        if (enemy.isColliding(this.character)) {
            this.handleCharacterHitByEnemy(enemy);
        }
    });
}

handleCharacterHitByEnemy(enemy) {
    if (enemy instanceof Chicken) {
        this.character.hit();
        this.statusBarHealth.setPercentage(this.character.health);
        if (this.character.isDead()) {
            this.character.die();
        }
    } else if (enemy instanceof Endboss) {
        this.character.die();
    }
}

youWin() {
    this.youWin = true;
    clearInterval(this.runInterval);
    document.getElementById('youWin').style.display = 'block';
    console.log('You Win!');
}

gameOver() {
    this.gameOver = true;
    clearInterval(this.runInterval);
    document.getElementById('gameOver').style.display = 'block';
    console.log('Game Over!');
}

draw() {
    if (!this.gameOver) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds); 
            
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character); 
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottle);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);

            // Draw() is repeatedly called
        let self = this;
        requestAnimationFrame(function() {
        self.draw();
        });
    } else {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.font = "48px serif";
        this.ctx.fillText("Game Over", this.canvas.width / 2 - 100, this.canvas.height / 2);
    }
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
