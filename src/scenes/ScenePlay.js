import Player from '../gameObjects/Player.js';
import Button from '../gameObjects/Button.js';

class ScenePlay extends Phaser.Scene {
    constructor() {
        super({key: "ScenePlay"});
    }


    create(){
        
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
        this.platforms.create(570, 300, "platform_1").setScale(0.3,0.3).refreshBody();
        this.platforms.create(64, 500, "platform_1").setScale(0.3,0.3).refreshBody();
        this.platforms.create(700, 350, "platform_1").setScale(0.3,0.3).refreshBody();
        
        this.platforms.create(400, 450, "platform_3").setScale(0.3,0.3).refreshBody();
        this.platforms.create(128, 230, "platform_3").setScale(0.3,0.3).refreshBody();
        this.platforms.create(1128, 630, "platform_3").setScale(0.3,0.3).refreshBody();
        
        this.platforms.create(1100, 315, "platform_4").setScale(0.3,0.3).refreshBody();
        this.platforms.create(1100, 315, "platform_4").setScale(0.3,0.3).refreshBody();
        this.platforms.create(850, 515, "platform_4").setScale(0.3,0.3).refreshBody();
        this.platforms.create(340, 650, "platform_4").setScale(0.3,0.3).refreshBody();
        //________________________________________________________

        //PLAYER 1
        this.player1 = new Player(this, 50, 650, "idle").setScale(0.5,0.5).setOrigin(0.5,0.8);
        
        //Weapon player 1
        this.shotgun = this.add.image(this.player1.x, this.player1.y, "shotgun");
        this.shotgun.setOrigin(0.1833, 1)
        this.shotgun.setScale(0.5,0.5)

        // bullets player 1
        this.player1bullets = this.physics.add.staticGroup();

        // plyer 1 shooting
        this.input.on('pointerdown', function (pointer) {
        this.player1bullets.create(this.player1.shootAt(this.shotgun.x, this.shotgun.y, pointer.x, pointer.y));
        }, this);
        
        //controls player 1
        this.player1jump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.player1RightControl = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.player1LeftControl = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    
        //Physics
        this.physics.add.collider(this.player1, this.platforms)
    }

    update(time, delta){
        this.player1.body.setVelocityX(0)
        this.shotgun.setPosition(this.player1.x, this.player1.y+30)
        this.checkMousePosition();
        
        // Player 1 controls
        if(this.player1RightControl.isDown){
            this.player1.body.setVelocityX(400)
        }
        if(this.player1LeftControl.isDown){
            this.player1.body.setVelocityX(-400)
        }
        if(this.player1jump.isDown && this.player1.body.onFloor()){
            this.player1.body.setVelocityY(-800)
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

        // Bullets 1 handling
        this.player1bullets.children.iterate((child) => {
            if(this.player1bullets.getLength() > 0){
                child.x.updatePosition(time, delta);
                //console.log(child.x.x);
                //console.log(child.x.y);
            }
        }, this);

    }

    optionsOnPressed(){
        this.scene.start("MainMenu")
    }

    checkMousePosition(){
        if(this.input.activePointer.x > this.player1.getCenter().x){
            this.player1.flipX = true;
            this.shotgun.setOrigin(0.1833, 1)
            this.shotgun.flipX = false
        }else{
            this.player1.flipX = false;
            this.shotgun.setOrigin(0.8166, 1)
            this.shotgun.flipX = true
        }
    }
}

export default ScenePlay;
