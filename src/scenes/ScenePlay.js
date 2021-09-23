import Player from '../gameObjects/Player.js';
import Button from '../gameObjects/Button.js';
class ScenePlay extends Phaser.Scene {
    constructor() {
        super({key: "ScenePlay"});
    }


    create(){
        
        // Add background
        this.background = this.add.image(1080, 720, "background");
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
        this.platforms.create(400, 568, "platform").setScale(3, 1);
        this.platforms.create(700, 568, "platform").setScale(2, 2);
        //this.platforms.setVelocity(0, 0);

        this.p1 = this.physics.add.image(600, 400, "platform");
        //p1.setVelocity(0, 20);
        
        //________________________________________________________

        //PLAYER
        this.player = new Player(this, 50, 50, "idle");

        //animations
        

        //controls
        this.input.on('pointerdown', function (pointer) {
            this.player.shootAt(this.player.x, this.player.y, pointer.x, pointer.y);
        }, this);
        
        this.cQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q)
        this.cW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.cE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)
        this.cD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.cA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    }

    update(){
        this.player.body.setVelocityX(0)
        
        if(this.cD.isDown){
            this.player.flipX = true;
            this.player.body.setVelocityX(450)
        }
        if(this.cA.isDown){
            this.player.flipX = false;
            this.player.body.setVelocityX(-450)
        }
        if(this.cW.isDown && this.player.body.onFloor()){
            this.player.body.setVelocityY(-400)
        }
        if((this.cA.isDown || this.cD.isDown) && this.player.body.onFloor()){
            this.player.anims.play('run',true)
        }
        if(!this.player.body.onFloor()){
            this.player.anims.play('jump',true)
        }
        if(!(this.cA.isDown || this.cD.isDown) && this.player.body.onFloor()){
            this.player.anims.play('idle',true)
        }
    }

    optionsOnPressed(){
        this.scene.start("MainMenu")
    }
}

export default ScenePlay;
