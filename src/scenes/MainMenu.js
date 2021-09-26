import Button from "../gameObjects/Button.js";
class MainMenu extends Phaser.Scene {
    constructor(){
        super( "MainMenu");
    }
    
    
    create(){
        this.background = this.add.image(640, 360, "background_2");
        this.add.image(640, 900, "FLOOR");
        //Fondo animado
        this.cloud = this.add.image(-200,0,"cloud");
        this.cloud.setScale(0.3,0.3)
        this.cloud1 = this.add.image(-200,300,"cloud");
        this.cloud1.setScale(0.2,0.2)
        
        //Titulo
        //var title = this.add.text(640, 100, "MAIN MENU" ,{font: "96px courier"});
        //title.setOrigin(0.5,0,5);
        this.title = this.add.image(640,150, "title");
        this.title.setScale(0.2,0.2)
        //Buttons creation
        var play_button = new Button({
            'scene': this,
            'key':'test_buttons',
            'up': 0,
            'over':1,
            'down':2,
            'x': 780,
            'y': 480
        });
        var settings_button = new Button({
            'scene': this,
            'key':'test_buttons',
            'up': 0,
            'over':1,
            'down':2,
            'x': 780,
            'y': 580
        });
        var code_button = new Button({
            'scene': this,
            'key':'test_buttons',
            'up': 0,
            'over':1,
            'down':2,
            'x': 500,
            'y': 480
        });
        var tutorial_button = new Button({
            'scene': this,
            'key':'test_buttons',
            'up': 0,
            'over':1,
            'down':2,
            'x': 500,
            'y': 580
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