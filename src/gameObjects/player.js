import PlayerHUD from '../gameObjects/HUD.js';
class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, type){
        super(scene, x, y, type);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);
        this.cursorsCreated = false;
        this.name = new String("Paqui")
        this.hud = new PlayerHUD(scene,this);
        this.life = 50;
        this.hud.life.setScale(this.life/100,1)
        this.ammo = 100;
        this.ammoSpeed = 80;
        this.alive = true;
        this.jumptimer = 0;
        
        //Weapon
        this.weapon = scene.add.image(this.x, this.y+2, "shotgun");
        this.weapon.setOrigin(0.1, 0)
        this.weapon.setScale(0.5,0.5)
        this.weapon.setDepth(1)
    }
    
};

Player.prototype.aim = function(xTarget, yTarget){
    this.weapon.rotation = Math.atan((yTarget-this.weapon.y) / (xTarget-this.weapon.x));
}


// Getters and setters
Player.prototype.setLife = function(life){this.life = life; };
Player.prototype.getLife = function(){return this.life; };

Player.prototype.increaseLife = function(life){
    if(this.life<100){
    var scale0 = this.life/100
    var auxlife = life/100
    var scalef = scale0 + auxlife;
    this.life += life; 
    this.hud.life.setScale(scalef,1)
    }
};
Player.prototype.decreaseLife = function(damage){
    var scale0 = this.life/100
    var auxdamage = damage/100
    var scalef = scale0 - auxdamage;
    this.life -= damage;
    this.hud.life.setScale(scalef,1)
 };

Player.prototype.setAmmo = function(ammo){this.ammo = ammo; };
Player.prototype.getAmmo = function(){return this.ammo; };

Player.prototype.setAmmoSpeed = function(speed){this.ammoSpeed = speed; };
Player.prototype.getAmmoSpeed = function(){return this.ammoSpeed; };

Player.prototype.increaseAmmoByOne = function(){this.ammo += 1; };
Player.prototype.decreaseAmmoByOne = function(){this.ammo -= 1; };

Player.prototype.isAlive = function(){return this.alive; };

Player.prototype.update = function(time,delta){

    this.weapon.setPosition(this.x, this.y+2)
    this.hud.update(this.x,this.y)
        //Flip sprites
        if(this.scene.input.activePointer.x > this.getCenter().x){
            this.flipX = true;
            this.weapon.setOrigin(0.1, 0)
            this.weapon.flipX = false
        }else{
            this.flipX = false;
            this.weapon.setOrigin(0.9, 0)
            this.weapon.flipX= true
        }
        
    
}


export default Player;
