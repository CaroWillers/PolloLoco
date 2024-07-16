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
    lastThrowTime = 0;  // Zeitstempel für den letzten Wurf
    gameOver = false;
    winGame = false;
    lostGame = false; 

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
        this.level.enemies.forEach(enemy => {
            enemy.world = this;
        });
        this.level.clouds.forEach(cloud => {
            cloud.world = this;
        });
    }

    positionObjects() {
        let objects = [...this.level.enemies, ...this.level.coins, ...this.level.bottle];

        objects.forEach((obj, index) => {
            let collision;
            do {
                obj.x = 250 + Math.random() * (this.level.level_end_x - 500);
                obj.y = 380; // Für Bodenobjekte
                collision = objects.some((other, otherIndex) => {
                    if (index !== otherIndex) {
                        return this.isColliding(obj, other);
                    }
                    return false;
                });
            } while (collision);
        });
    }

    isColliding(obj1, obj2) {
        return (obj1.x < obj2.x + obj2.width &&
            obj1.x + obj1.width > obj2.x &&
            obj1.y < obj2.y + obj2.height &&
            obj1.height + obj1.y > obj2.y);
    }

    updateBackground() {
        this.level.backgroundObjects.forEach((bgObject, index) => {
            let layerSpeed = this.getLayerSpeed(index);
            bgObject.x -= layerSpeed * this.character.speed / 10;
        });
    }


    getLayerSpeed(index) {
        if (index % 4 === 0) return 0.2; // air
        if (index % 4 === 1) return 0.4; // third layer
        if (index % 4 === 2) return 0.6; // second layer
        if (index % 4 === 3) return 1;   // first layer
    }


    run() {
        this.runInterval = setInterval(() => {
            if (!this.gameOver) {
                this.checkCollisions();
                this.checkThrowObjects();
                this.level.clouds.forEach(cloud => cloud.moveLeft());
            } else {
                clearInterval(this.runInterval);
            }
        }, 1000 / 60);
    }

    checkThrowObjects() {
        if (this.gameOver) return;
        const currentTime = Date.now();
        if (this.keyboard.D && this.character.collectedBottles > 0 && currentTime - this.lastThrowTime > 500) { 
            this.throwBottle();
            this.lastThrowTime = currentTime; // Update last throw time
        }
    }

    throwBottle() { 
        if (this.gameOver) return;
        console.log('Throwing bottle...');
        let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
        this.throwableObjects.push(bottle);
        bottle.throw();
        this.character.collectedBottles--;
        console.log('Bottle thrown. Remaining bottles:', this.character.collectedBottles);
        this.statusBarBottle.setPercentage((this.character.collectedBottles / 5) * 100);
    }

    checkCollisions() {
        if (this.gameOver) return;
        this.collectCoins();
        this.collectBottles();
        this.checkBottleCollisions();
        this.checkEnemyCollisions();
    }

    collectCoins() {
        if (this.gameOver) return;
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.coinCounter++;
                let percentage = (this.coinCounter / 5) * 100;
                this.statusBarCoin.setPercentage(percentage);
                this.level.coins.splice(index, 1);
                audioManager.play('coin', 2000);
            }
        });
    }

    collectBottles() {
        if (this.gameOver) return;
        this.level.bottle.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                console.log('Bottle collected!', bottle);
                this.bottleCounter++;
                let percentage = (this.bottleCounter / 5) * 100;
                this.statusBarBottle.setPercentage(percentage);
                this.character.collectedBottles++;
                console.log('Collected Bottles: ', this.character.collectedBottles);
                audioManager.play('bottle', 2000);
                this.level.bottle.splice(index, 1);
            }
        });
    }

    checkBottleCollisions() {
        if (this.gameOver) return;
        this.throwableObjects.forEach((bottle) => {
            bottle.checkCollision(this.level.enemies);
            bottle.checkGroundCollision();
        });
    }

    checkEnemyCollisions() {
        if (this.gameOver) return;
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isFalling() && this.character.y + this.character.height < enemy.y + enemy.height / 2) {
                    enemy.die();
                    audioManager.play('killedEnemy', 2000);
                } else {
                    this.character.hit();
                    this.statusBarHealth.setPercentage(this.character.health);
                    if (this.character.isDead()) {
                        this.character.die();
                        if (!this.lostGame) {
                            this.lostGame = true;
                            this.gameOver = true;
                            window.lostGame();
                        }
                    }
                }
            }
        });
    }

    
    handleBottleHitEndboss(bottle) {
        if (this.gameOver) return;  
        console.log('Endboss hit by bottle');
        console.log('Endboss health before hit:', this.level.endboss?.health);

        if (this.level.endboss) {
            this.level.endboss.hit();
            bottle.removeBottle();

            if (this.level.endboss.health > 0) {
                this.level.endboss.playAnimation(this.level.endboss.IMAGES_HURT);
                audioManager.play('endbossHurt', 2000);
            }

            if (this.level.endboss.health <= 0) {
                this.level.endboss.die();
                if (!this.winGame) {
                    this.winGame = true;
                    this.gameOver = true;
                    window.winGame();
                }
            }
        } else {
            console.error('Endboss is not defined');
        }
    }



    draw() {
        if (this.gameOver) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            return;
        }

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
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            if (!o.isRemoved) {
                this.addToMap(o);
            }
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
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

    hideStatusBars() {
        document.querySelectorAll('.status-bar').forEach(bar => {
            bar.style.display = 'none';
        });
    }
}
