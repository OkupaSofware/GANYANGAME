import Player from '../gameObjects/Player.js';
import Button from '../gameObjects/Button.js';
import Boost from '../gameObjects/boost.js';


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

        //Sound effects
        this.hitPlayer = this.sound.add('impact');
        this.hitPlayer.play();
        
        
        // Add platforms
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(1130, 500, "platform_1").setScale(0.3,0.3).refreshBody().setSize(115,25,0,0);
        this.platforms.create(150, 500, "platform_1").setScale(0.3,0.3).refreshBody().setSize(115,25,0,0);
        this.platforms.create(640, 500, "platform_1").setScale(0.3,0.3).refreshBody().setSize(115,25,0,0);
        
        this.platforms.create(500, 100, "platform_2").setScale(0.3,0.3).refreshBody().setSize(150,25,0,0);
        this.platforms.create(780, 100, "platform_2").setScale(0.3,0.3).refreshBody().setSize(150,25,0,0);

        this.platforms.create(400, 600, "platform_3").setScale(0.3,0.3).refreshBody().setSize(190,25,0,0);
        this.platforms.create(880, 600, "platform_3").setScale(0.3,0.3).refreshBody().setSize(190,25,0,0);
        
        this.platforms.create(800, 350, "platform_4").setScale(0.3,0.3).refreshBody().setSize(230,25,0,0);
        this.platforms.create(480, 350, "platform_4").setScale(0.3,0.3).refreshBody().setSize(230,25,0,0);
        this.platforms.create(1050, 200, "platform_4").setScale(0.3,0.3).refreshBody().setSize(230,25,0,0);
        this.platforms.create(230, 200, "platform_4").setScale(0.3,0.3).refreshBody().setSize(230,25,0,0);
        //________________________________________________________
        
        this.boostArray = new Array();
        this.boostArray[0] = new Boost(this, 640, 450, Math.floor(Math.random() * 3) + 1);
        this.boostArray[1] = new Boost(this, 400, 550, Math.floor(Math.random() * 3) + 1);
        this.boostArray[2] = new Boost(this, 880, 550, Math.floor(Math.random() * 3) + 1);
        this.boostArray[3] = new Boost(this, 480, 300, Math.floor(Math.random() * 3) + 1);
        this.boostArray[4] = new Boost(this, 800, 300, Math.floor(Math.random() * 3) + 1);



        this.targetsArray = new Array();
        this.targetsArray[0] = new Player(this, 700, 650, "idle").setScale(0.5,0.5).setOrigin(0.5,0.8).setInteractive({ cursor: 'url(assets/mirillaRed.png), pointer' });
        this.targetsArray[0].setShield(true)
        //PLAYER 1
        this.player1 = new Player(this, 50, 650, "idle",this.registry.get("username")).setScale(0.5,0.5).setOrigin(0.5,0.8).setInteractive({ cursor: 'url(assets/mirillaRed.png), pointer' });
        
        // bullets player 1
        this.bulletsPlayer1 = new Array();

        // player 1 shooting
        this.input.on('pointerdown', function (pointer) {
            if(this.player1.getAmmo() > 0){
                this.createBullet(pointer.x, pointer.y, this.player1.weapon, this.bulletsPlayer1);
                this.player1.decreaseAmmoByOne();
                //sound effect
                //Sounds variables. this.bulletMenuSound is created here and not outside the functions so it creates a new sound every time and is independent from the old ones.
                this.bulletMenuSound = this.sound.add('shot');
                this.bulletMenuSound.play();
            }
        }, this);

        //controls player 1
        this.player1jump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.player1RightControl = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.player1LeftControl = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        
        //Physics player 1
        this.physics.add.collider(this.player1, this.platforms);
        

        for(var i = 0; i < this.boostArray.length; i++){
            this.physics.add.collider(this.player1, this.boostArray[i].live, this.boostArray[i].recover)
            this.physics.add.collider(this.player1, this.boostArray[i].bubble, this.boostArray[i].shield)
            this.physics.add.collider(this.player1, this.boostArray[i].ammo, this.boostArray[i].recharge)
        }
    }

    update(time, delta){
        console.log(this.boostArray[0].status)
        /* Boosts creation
            for(var i = 0; i < this.boostArray.length; i++){
                if(this.boostArray[i].status == false){
                    this.boostArray[i].counter++;
                    if(this.boostArray[i].counter == 100){
                        this.boostArray[i].counter = 0;
                    }
                }
            }
        */

            this.targetsArray[0].update(time,delta)
        // Bullets
        this.updateBulletsPosition(this.bulletsPlayer1, this.player1);

        // PLAYER 1
        this.player1.body.setVelocityX(0)
        this.player1.update(time,delta)
        this.player1.aim(this.input.activePointer.x,this.input.activePointer.y );

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
    }

    optionsOnPressed(){
        this.scene.start("MainMenuBackground");
    }

    // BULLETS
    createBullet(targetX, targetY, player, bulletsArray){
        this.bullet = this.physics.add.image(player.x, player.y+10, "bala").setScale(0.5).refreshBody();
        this.activateBullet(this.bullet);
        this.bullet.body.setSize(5,5,0,0)
        this.bullet.body.allowGravity = false;
        this.bullet.bulletPos = bulletsArray.length; //Used to splice it from array
        bulletsArray.push(this.bullet);
        this.bullet.body.setSize(10,10,0.5,0.5)

        this.bullet.angle = -180/Math.PI * Math.atan((targetX - player.x) / (targetY - player.y));
        if ((targetY >= player.y && targetX < player.x) || (targetY >= player.y && targetX >= player.x)) //cuadrante 1
        {
            this.bullet.flipY = true;
        }

        // Direction callculation
        this.calculateBulletSpeed(this.bullet, targetX+5, targetY, player);
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
                this.physics.add.collider(this.platforms, bulletsArray[i], this.hit);
                this.physics.add.collider(bulletsArray[i], this.targetsArray[0], this.hitBody);
                
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

    hit(gBullet, platform){
        if(gBullet.y < platform.y){
            gBullet.x = 1280;
            gBullet.y = 720;
        } else if(gBullet.y > platform.y){
            gBullet.x = 5;
            gBullet.y = 5;
        }
    }
    hitBody(gBullet, target){
        if(gBullet.x < target.x){
            gBullet.x = 1280;
        } else if(gBullet.x > target.x){
            gBullet.x = 5;
        }
        
        
        //EN PRINCIPIO CON LO QUE YA HAY NO HACEN FALTA ESTAS 3 SIGUIENTES LINEAS DE CÓDIGO
        //gBullet.setActive(false);
        //gBullet.setVisible(false);
        //gBullet.body.destroy()
        target.decreaseLife(5);

        

    }
}

export default ScenePlay;
