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
        
    // Add platforms
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, "platform").setScale(3, 1);
    this.platforms.create(700, 568, "platform").setScale(2, 2);
    //this.platforms.setVelocity(0, 0);

    this.p1 = this.physics.add.image(600, 400, "platform");
    //p1.setVelocity(0, 20);
    
    this.player = new Player(this, 50, 50, "player");

    this.input.on('pointerdown', function (pointer) {
        this.player.shootAt(this.player.x, this.player.y, pointer.x, pointer.y);
    }, this);


    }
    optionsOnPressed(){
        this.scene.start("MainMenu")
    }

    update(){
        this.player.basicMovement();
    }
}

export default ScenePlay;
