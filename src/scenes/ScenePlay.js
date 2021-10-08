import Player from '../gameObjects/Player.js';
import Button from '../gameObjects/Button.js';

class ScenePlay extends Phaser.Scene {
    constructor() {
        super({key: "ScenePlay"});
    }


    create(){
        this.cameras.main.fadeIn(500, 0, 0, 0)
        // Add background
        this.background = this.add.image(640, 360, "background_2");
        //Options button
        var options_button = new Button({
            'scene': this,
            'key':'test_buttons',
            'up': 0,
            'over':1,
            'down':2,
            'x': 120,
            'y': 60
        });   
        options_button.setScale(0.65,0.65);
        options_button.on('pointerdown',this.optionsOnPressed,this)

        //________________________________________________________

        // Add platforms
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(1130, 500, "platform_1").setScale(0.3,0.3).refreshBody();
        this.platforms.create(150, 500, "platform_1").setScale(0.3,0.3).refreshBody();
        this.platforms.create(640, 500, "platform_1").setScale(0.3,0.3).refreshBody();
        
        this.platforms.create(400, 600, "platform_3").setScale(0.3,0.3).refreshBody();
        this.platforms.create(880, 600, "platform_3").setScale(0.3,0.3).refreshBody();
        //this.platforms.create(1128, 630, "platform_3").setScale(0.3,0.3).refreshBody();
        
        this.platforms.create(800, 350, "platform_4").setScale(0.3,0.3).refreshBody();
        this.platforms.create(480, 350, "platform_4").setScale(0.3,0.3).refreshBody();
        this.platforms.create(1050, 200, "platform_4").setScale(0.3,0.3).refreshBody();
        this.platforms.create(230, 200, "platform_4").setScale(0.3,0.3).refreshBody();
        this.platforms.create(500, 100, "platform_2").setScale(0.3,0.3).refreshBody();
        this.platforms.create(780, 100, "platform_2").setScale(0.3,0.3).refreshBody();
        //________________________________________________________

        // TEST RECHARGE AMMO
        this.ammoRecharge = this.physics.add.staticGroup();
        this.ammoRecharge.create(25, this.sys.game.config.height - 25, "ammo").setScale(0.15, 0.15).refreshBody();
        this.ammoRecharge.create(890, 550, "ammo").setScale(0.15, 0.15).refreshBody();
        
        //PLAYER 1
        this.player1 = new Player(this, 50, 650, "idle").setScale(0.5,0.5).setOrigin(0.5,0.8).setInteractive({ cursor: 'url(assets/mirillaRed.png), pointer' });
        // bullets player 1
        this.bulletsPlayer1 = new Array();
        // plyer 1 shooting
        this.input.on('pointerdown', function (pointer) {
            if(this.player1.getAmmo() > 0){
                this.createBullet(pointer.x, pointer.y, this.player1.weapon, this.bulletsPlayer1);
                this.player1.decreaseAmmoByOne();
            }
        }, this);
        //controls player 1
        this.player1jump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.player1RightControl = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.player1LeftControl = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        //Physics player 1
        this.physics.add.collider(this.player1, this.platforms);



/*
        //PLAYER 2
        this.player2 = new Player(this, 700, 650, "idle").setScale(0.5,0.5).setOrigin(0.5,0.8);
        // bullets player 2
        this.bulletsPlayer2 = new Array();
        // plyer 2 shooting
        this.input.on('pointerdown', function (pointer) {
            if(this.player2.getAmmo() > 0){
                this.createBullet(pointer.x, pointer.y, this.player2, this.bulletsPlayer2);
                this.player2.decreaseAmmoByOne();
            }
        }, this);
        //controls player 2
        this.player2jump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        this.player2RightControl = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        this.player2LeftControl = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        //Physics player 2
        this.physics.add.collider(this.player2, this.platforms);
  
          */
        // Players collisions
        //this.physics.add.collider(this.player1, this.player2);
        this.physics.add.collider(this.player1, this.ammoRecharge, this.recharge);
        //this.physics.add.collider(this.player2, this.ammoRecharge, this.recharge);
    }

    update(time, delta){
        // Bullets
        this.updateBulletsPosition(this.bulletsPlayer1, this.player1);
        //this.updateBulletsPosition(this.bulletsPlayer2, this.player2);
        
        // PLAYER 1
        this.player1.body.setVelocityX(0)
        //this.player1.weapon.setPosition(this.player1.x, this.player1.y+2)
        //this.checkMousePosition();
        this.player1.update(time,delta)
        this.player1.aim(this.input.activePointer.x,this.input.activePointer.y );
        //this.player1.weapon.rotation+=0.1
        // Player 1 controls
        if(this.player1RightControl.isDown){
            this.player1.body.setVelocityX(400)
        }
        if(this.player1LeftControl.isDown){
            this.player1.body.setVelocityX(-400)
        }
        
        if (this.player1jump.isDown && this.player1.body.onFloor())
        {
            this.player1.jumptimer = 1;
            this.player1.body.setVelocityY(-600);
        } 
        else if (this.player1jump.isDown && (this.player1.jumptimer != 0)){
            if (this.player1.jumptimer > 16) {
                this.player1.jumptimer = 0;
            }
            else{
                this.player1.jumptimer++;
                this.player1.body.setVelocityY(-600);
            }
        }
        else if (this.player1.jumptimer != 0){
            this.player1.jumptimer = 0;
        }

        if((this.player1LeftControl.isDown || this.player1RightControl.isDown) && this.player1.body.onFloor()){
            this.player1.anims.play('run',true)
        }
        if(!this.player1.body.onFloor()){
            this.player1.anims.play('jump',true)
        }
        if(!(this.player1LeftControl.isDown || this.player1RightControl.isDown) && this.player1.body.onFloor()){
            this.player1.anims.play('idle',true)
        }

        
        /*
        // PLAYER 2
        this.player2.body.setVelocityX(0)
        this.player2.update(time,delta)
        this.player2.aim(this.input.activePointer.x,this.input.activePointer.y );
        // Player 2 basic controls
        if(this.player2RightControl.isDown){
            this.player2.body.setVelocityX(400)
        }
        if(this.player2LeftControl.isDown){
            this.player2.body.setVelocityX(-400)
        }
        if(this.player2jump.isDown && this.player2.body.onFloor()){
            this.player2.body.setVelocityY(-800)
        }
        if((this.player2LeftControl.isDown || this.player2RightControl.isDown) && this.player2.body.onFloor()){
            this.player2.anims.play('run',true)
        }
        if(!this.player2.body.onFloor()){
            this.player2.anims.play('jump',true)
        }
        if(!(this.player2LeftControl.isDown || this.player2RightControl.isDown) && this.player2.body.onFloor()){
            this.player2.anims.play('idle',true)
        }
        */

    }

    optionsOnPressed(){
        this.scene.start("MainMenu")
    }

    // BULLETS
    createBullet(targetX, targetY, player, bulletsArray){
        this.bullet = this.physics.add.image(player.x, player.y+10, "bala").setScale(0.5);
        this.activateBullet(this.bullet);
        this.bullet.body.setSize(5,5,0,0)
        this.bullet.body.allowGravity = false;
        this.bullet.bulletPos = bulletsArray.length; //Used to splice it from array
        bulletsArray.push(this.bullet);

        this.bullet.angle = -180/Math.PI * Math.atan((targetX - player.x) / (targetY - player.y));
        if ((targetY >= player.y && targetX < player.x) || (targetY >= player.y && targetX >= player.x)) //cuadrante 1
        {
            this.bullet.flipY = true;
        }
        
        
        
        
        // Direction callculation
        this.calculateBulletSpeed(this.bullet, targetX+8, targetY+8, player);
    };

    calculateBulletSpeed(bullet, targetX, targetY, player){
        this.direction = Math.atan((targetX - player.x) / (targetY - player.y));

        // Set direction
        if (targetY >= player.y)
        {
            bullet.xSpeed = 20 * Math.sin(this.direction);
            bullet.ySpeed = -20 * Math.cos(this.direction);
        }
        else
        {
            bullet.xSpeed = -20 * Math.sin(this.direction);
            bullet.ySpeed = 20 * Math.cos(this.direction);
        }
    };

    updateBulletsPosition(bulletsArray, player){
        for(var i = 0; i < bulletsArray.length ; i++){
                let ammoSpeed = player.getAmmoSpeed();
                bulletsArray[i].setVelocityX(bulletsArray[i].xSpeed * ammoSpeed);
                bulletsArray[i].setVelocityY(-bulletsArray[i].ySpeed * ammoSpeed);

                //console.log(bulletsArray[i].bulletPos);
            
                // Add collisions
                this.physics.add.collider(this.platforms, this.bullet, this.hit);
                
                // Bullet world bounds collision
                
                if(bulletsArray[i].x < 0 ||
                   bulletsArray[i].y < 0 ||
                   bulletsArray[i].x > this.sys.game.config.width||
                   bulletsArray[i].y > this.sys.game.config.height){
                        this.disableBullet(bulletsArray[i]);
                        bulletsArray.splice(i, 1);
                }
                
        }
    }

    activateBullet(gBullet){
        gBullet.setActive(true);
        gBullet.setVisible(true);
    }

    disableBullet(gBullet){
        gBullet.setActive(false);
        gBullet.setVisible(false);
    }

    hit(gbullet){
        gbullet.setActive(false);
        gbullet.setVisible(false);
        gbullet.body.destroy();

    }

    recharge(player, ammo){
        player.setAmmo(100);
    }
    
}

export default ScenePlay;
