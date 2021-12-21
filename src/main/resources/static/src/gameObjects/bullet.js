class Bullet extends Phaser.GameObjects.Image{
    constructor(scene, xPos, yPos, type){
        super(scene, xPos, yPos, type);

        scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(false);
        this.body.allowGravity = false;
        this.scene.add.existing(this);

        this.sizeX = 40;
        this.sizeY = 10;
        this.body.setSize(this.sizeX, this.sizeY, 0.5, 0.5);


        this.active = false;
        this.visible = false;


        this.initialPosXY = -50;
        this.xVel = 0;
        this.yVel = 0;
        this.angle = 0;
        this.direction = 0;
    }
};

Bullet.prototype.shot = function(target, player){
    this.setActive(true);
    this.setVisible(true);
    this.changeToPlayerRelativePosition(player);
    this.calculateAngle(target, player);
    this.calculateBulletSpeed(target, player);
   // console.log("shot");
};

Bullet.prototype.changeToPlayerRelativePosition = function(player){
    this.setPosition(player.x, player.y);
}

Bullet.prototype.calculateAngle = function(target, player){
    this.angle = -180 / Math.PI * Math.atan((target.x - player.x) / (target.y - player.y));
    if ((target.y >= player.y && target.x < player.x) || (target.y >= player.y && target.x >= player.x)) //cuadrante 1
    {
        this.flipY = true;
    }
}

Bullet.prototype.calculateBulletSpeed = function(target, player){
    this.direction = Math.atan((target.x - player.x) / (target.y - player.y));

    // Set direction
    if (target.y >= player.y) {
        this.xVel = 20 * Math.sin(this.direction);
        this.yVel = -20 * Math.cos(this.direction);
    }
    else {
        this.xVel = -20 * Math.sin(this.direction);
        this.yVel = 20 * Math.cos(this.direction);
    }
    
    this.body.setVelocityX(this.xVel * player.getAmmoSpeed());
    this.body.setVelocityY(-this.yVel * player.getAmmoSpeed());
}

Bullet.prototype.checkOutOfBounds = function (width, heigth){
    this.rightBound = width - (this.sizeX/4);
    this.leftBound = this.sizeX/4;
    this.upBound = this.sizeY/4;
    this.downBound = heigth - (this.sizeY/4);

    if((this.x === this.rightBound) || 
       (this.x === this.leftBound)  || 
       (this.y === this.upBound)    || 
       (this.y === this.downBound)){
            this.setPosition(this.initialPosXY);
            this.body.setVelocityX(0);
            this.body.setVelocityY(0);
            this.setVisible(false);
            this.setActive(false);
       }
}

// Getters and setters




export default Bullet;
