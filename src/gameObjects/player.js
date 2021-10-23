import PlayerHUD from '../gameObjects/HUD.js';
class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, type, username){
        super(scene, x, y, type);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);
        this.body.pushable = false
        this.body.setSize(50,116,1,1).setOffset(15,12)
        //this.body.setPushable(false)

        this.cursorsCreated = false;
        this.name = username;
        this.hud = new PlayerHUD(scene,this);
        this.life = 50;
        this.hud.setLife(this.life)
        this.ammo = 1000;
        this.ammoSpeed = 80;
        this.alive = true;
        this.shieldOn = false;
        this.shield = 100;
        this.jumptimer = 0;
        
        //Weapon
        this.weapon = scene.add.image(this.x, this.y+2, "rifle");
        this.weapon.setOrigin(0.1, 0)
        this.weapon.setScale(0.2,0.2)
        this.weapon.setDepth(1)
        
    }
    
};

Player.prototype.aim = function(xTarget, yTarget){
    this.weapon.rotation = Math.atan((yTarget-this.weapon.y) / (xTarget-this.weapon.x));
}


// Getters and setters
Player.prototype.setLife = function(life){
    this.life = life; 
    this.hud.setLife(life);
};
Player.prototype.getLife = function(){return this.life; };

Player.prototype.increaseLife = function(life){
    if(this.life<100){
    var scale0 = this.life/100
    var auxlife = life/100
    var scalef = scale0 + auxlife;
    this.life += life; 
    this.hud.increaseLife(scalef);
    }
};
Player.prototype.decreaseLife = function(damage){
    if(this.life>0){
        if(this.shieldOn==true){
            this.decreaseShield(damage);
        }else{
            var scale0 = this.life/100
            var auxdamage = damage/100
            var scalef = scale0 - auxdamage;
            this.life -= damage;
            this.hud.decreaseLife(scalef);
    }
    }else{
        this.alive = false;
    }
    console.log(this.life)
    console.log(this.alive)
};
Player.prototype.increaseShield = function(life){
   
};
Player.prototype.decreaseShield = function(damage){
    if(this.shield>0){
    var scale0 = this.shield/100
    var auxdamage = damage/100
    var scalef = scale0 - auxdamage;
    this.shield -= damage;
    this.hud.decreaseShield(scalef);
    }else{
        this.setShield(false);
    }
};

Player.prototype.setAmmo = function(ammo){this.ammo = ammo; };
Player.prototype.getAmmo = function(){return this.ammo; };

Player.prototype.setAmmoSpeed = function(speed){this.ammoSpeed = speed; };
Player.prototype.getAmmoSpeed = function(){return this.ammoSpeed; };

Player.prototype.increaseAmmoByOne = function(){this.ammo += 1; };
Player.prototype.decreaseAmmoByOne = function(){this.ammo -= 1; };

Player.prototype.isAlive = function(){return this.alive; };
Player.prototype.isShield = function(){return this.shieldOn; };
Player.prototype.setShield = function(bool){
    if(bool == true){
        this.shield =100;
    }
    this.shieldOn=bool; 
    this.hud.setShield(bool);
};
Player.prototype.die = function(){
    this.alive = false;
    this.setVisible(false);
    //this.setActive(false);
    this.hud.setVisible(false)
   
    this.weapon.setVisible(false);
}
Player.prototype.respawn = function(x,y){
    this.alive = true;
    this.setVisible(true);
    //this.setActive(true);
    this.hud.setVisible(true)
    this.weapon.setVisible(true);
    this.setLife(100);
    this.setAmmo(20);
    this.setPosition(x,y)
    }
    


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
        if(this.shield<=0){
            this.setShield(false);
        }
        
        if(this.life<=0){
           this.die();
            
        }

    }

export default Player;
