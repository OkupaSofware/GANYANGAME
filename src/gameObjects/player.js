import Bullet from './bullet.js';
class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, type){
        super(scene, x, y, type);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);

        this.cursorsCreated = false;
        this.lives = 3;
        this.ammo = 10;
        this.ammoSpeed = 2;
        this.alive = true;
        this.jumptimer = 0;
        
        // example bullet
        this.bullets = [];

        // Holds the scene reference to pass it to the bullet constructor
        this.scene = scene;
    }
};

Player.prototype.shootAt = function(xPlayer, yPlayer, xTarget, yTarget){
    this.bullet = new Bullet(this.scene, xPlayer, yPlayer, "bullet", xTarget, yTarget, this.getAmmoSpeed());
    return this.bullet;
}


// Getters and setters
Player.prototype.setLives = function(lives){this.lives = lives; };
Player.prototype.getLives = function(){return this.lives; };

Player.prototype.increaseLivesByOne = function(){this.lives -= 1; };
Player.prototype.decreaseLivesByOne = function(){this.lives += 1; };

Player.prototype.setAmmo = function(ammo){this.ammo = ammo; };
Player.prototype.getAmmo = function(){return this.ammo; };

Player.prototype.setAmmoSpeed = function(speed){this.ammoSpeed = speed; };
Player.prototype.getAmmoSpeed = function(){return this.ammoSpeed; };

Player.prototype.increaseAmmoByOne = function(){this.ammo -= 1; };
Player.prototype.decreaseAmmoByOne = function(){this.ammo += 1; };

Player.prototype.isAlive = function(){return this.alive; };
export default Player;