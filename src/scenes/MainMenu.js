import Button from "../gameObjects/Button.js";
class MainMenu extends Phaser.Scene {
    constructor(){
        super( "MainMenu");
    }

    
    create(){
        var title = this.add.text(640, 100, "MAIN MENU" ,{font: "96px courier"});
        title.setOrigin(0.5,0,5);
        //Buttons creation
        var play_button = new Button({
            'scene': this,
            'key':'test_buttons',
            'up': 0,
            'over':1,
            'down':2,
            'x': 261,
            'y': 420
        });
        var settings_button = new Button({
            'scene': this,
            'key':'test_buttons',
            'up': 0,
            'over':1,
            'down':2,
            'x': 1019,
            'y': 420
        });
        var code_button = new Button({
            'scene': this,
            'key':'test_buttons',
            'up': 0,
            'over':1,
            'down':2,
            'x': 640,
            'y': 420
        });
        var tutorial_button = new Button({
            'scene': this,
            'key':'test_buttons',
            'up': 0,
            'over':1,
            'down':2,
            'x': 640,
            'y': 540
        });
        play_button.on('pointerdown',this.playOnPressed,this);
        
    
    }
    playOnPressed()
    {
        //console.log("I am pressed!");
        this.scene.start("ScenePlay");
    }
    update(time, delta){

    }
}
export default MainMenu;