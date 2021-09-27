class Bullet extends Phaser.GameObjects.Image{
    constructor(scene, xPos, yPos, type, xTarget, yTarget, bulletSpeed){
        super(scene, xPos, yPos, type);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(false);
        this.body.allowGravity = false;

        this.speed = bulletSpeed;
        this.xTarget = xTarget;
        this.yTarget = yTarget;
        this.xDirection = xTarget - xPos;
        this.yDirection = yTarget - yPos;
        this.direction = Math.atan((this.xTarget-this.body.x) / (this.yTarget-this.body.y));
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.setSize(10, 10);


        this.setInitialDirection();
    }
};

Bullet.prototype.updatePosition = function(time, delta){
    this.body.x += this.xSpeed * delta * this.speed * (1/2);
    this.body.y -= this.ySpeed * delta * this.speed * (1/2);
};

Bullet.prototype.setInitialDirection = function(){
    // Set direction
    if (this.yTarget >= this.body.y)
    {
        this.xSpeed = this.speed * Math.sin(this.direction);
        this.ySpeed = -this.speed * Math.cos(this.direction);
    }
    else
    {
        this.xSpeed = -this.speed * Math.sin(this.direction);
        this.ySpeed = this.speed * Math.cos(this.direction);
    }
};

// Getters and setters
Bullet.prototype.setSpeed = function(s){this.speed = s; };
Bullet.prototype.getSpeed = function(){return this.speed; };

Bullet.prototype.setDirection = function(d){this.direction = d; };
Bullet.prototype.getDirection = function(){return this.direction; };

Bullet.prototype.setXSpeed = function(xs){this.xSpeed = xs; };
Bullet.prototype.getXSpeed = function(){return this.xSpeed; };

Bullet.prototype.setYSpeed = function(ys){this.ySpeed = ys; };
Bullet.prototype.getYSpeed = function(){return this.ySpeed; };
export default Bullet;