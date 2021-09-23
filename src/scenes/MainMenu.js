import Button from "../gameObjects/Button.js";
class MainMenu extends Phaser.Scene {
    constructor(){
        super( "MainMenu");
    }
    
    
    create(){
        this.background = this.add.image(1080, 720, "background");
        //Fondo animado
        this.cloud = this.add.image(-200,200,"cloud");
        this.cloud.setScale(0.3,0.3)
        this.cloud1 = this.add.image(-200,600,"cloud");
        this.cloud1.setScale(0.2,0.2)
        //Titulo
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
        this.cloud.x++;
        this.cloud1.x--;
        //this.cloud.y++;
        if(this.cloud.x>1500){
            this.cloud.x=200;
        }
        if(this.cloud1.x<-200){
            this.cloud1.x=1500;
        }
    }
}
export default MainMenu;