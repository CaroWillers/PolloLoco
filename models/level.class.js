class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottle;
    endboss;
    level_end_x = 3500;

    constructor(enemies, clouds, backgroundObjects, coins, bottle) {
        this.enemies = enemies;
        this.clouds =  clouds;
        this.backgroundObjects =  backgroundObjects;    
        this.coins = coins || [];
        this.bottle = bottle || [];
        this.endboss = this.enemies.find(enemy => enemy instanceof Endboss);
    }   
}