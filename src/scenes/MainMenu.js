import Button from "../gameObjects/button.js";
class MainMenu extends Phaser.Scene {
    constructor(){
        super( "MainMenu");
    }

    preload(){
        this.load.spritesheet("test_buttons", "assets/buttons_test.png",{ frameWidth: 236, frameHeight: 65 });

    }
    create(){
        this.add.text(400, 100, "MAIN MENU" ,{font: "96px courier"});
        
        var button = new Button({
            'scene': this,
            'key':'test_buttons',
            'up': 0,
            'over':1,
            'down':2,
            'x': 240,
            'y': 480
        });
        
    
    button.on('pointerdown',this.onPressed,this);
    }
    onPressed()
    {
        console.log("I am pressed!");
    }
    update(time, delta){

    }
}
export default MainMenu;