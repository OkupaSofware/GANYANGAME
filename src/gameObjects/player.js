class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, type){
        super(scene, x, y, type);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);

        this.cursorsCreated = false;
        this.lives = 3;
        this.ammo = 10;
        this.alive = true;
    }
};

Player.prototype.basicMovement = function(){
    if(this.cursorsCreated === false){
        this.cursor_A = Phaser.Input.Keyboard.KeyCodes.A;
        this.cursor_D = Phaser.Input.Keyboard.KeyCodes.D;
        this.cursorsCreated = true;
    }
    

    /*// NO FUNCIONA
    if(this.cursor_A.isDown){
        console.log("s");
        this.body.setBounceY();
    } else if(this.cursor_D.isDown){
        this.body.setVelocityX(-300);
    }*/
};

Player.prototype.shootAt = function(xPlayer, yPlayer, xMouse, yMouse){
    console.log("s");
}

// Getters and setters
Player.prototype.setLives = function(lives){this.lives = lives; };
Player.prototype.getLives = function(){return this.lives; };
Player.prototype.increaseLivesByOne = function(){this.lives -= 1; };
Player.prototype.decreaseLivesByOne = function(){this.lives += 1; };

Player.prototype.setAmmo = function(ammo){this.ammo = ammo; };
Player.prototype.getAmmo = function(){return this.ammo; };
Player.prototype.increaseAmmoByOne = function(){this.ammo -= 1; };
Player.prototype.decreaseAmmoByOne = function(){this.ammo += 1; };

Player.prototype.isAlive = function(){return this.alive; };
export default Player;
