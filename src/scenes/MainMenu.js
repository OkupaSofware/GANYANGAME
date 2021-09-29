import Button from "../gameObjects/Button.js";
class MainMenu extends Phaser.Scene {
    constructor(){
        super( "MainMenu");
    }
    
    
    create(){
       //Animated background

       //this.background = this.add.image(640, 360, "background_2");
       this.add.image(640, 690, "FLOOR").setScale(0.3,0.3);
       
       this.cloud = this.add.image(-200,0,"cloud");
       this.cloud.setScale(0.3,0.3)
       this.cloud1 = this.add.image(-200,0,"cloud");
       this.cloud1.setScale(0.2,0.2)
       this.titleText=this.add.text(640,80, "WELCOME TO",{font: 'bold 32px Arial', fontSize: "36px"}).setOrigin(0.5,0.5)
       this.title = this.add.sprite(640,200, "title_anim")
       this.title.setScale(0.2,0.2)
       this.anims.create({key: "colorful_title",frames: this.anims.generateFrameNumbers("title_anim", {frames: [0,1,2,3,4]}), repeat: -1, frameRate: 8})
       this.title.anims.play("colorful_title")


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
        //Nubes
        this.cloud.x++;
        this.cloud1.x--;
        //this.cloud.y++;
        if(this.cloud.x>1500){
            this.cloud.x=200;
        }
        if(this.cloud1.x<-200){
            this.cloud1.x=1500;
        }
        /*
        if(Math.sin(time)>-0.5){

            this.titleText.setColor("red")
        }else{
            this.titleText.setColor("white")
        }
        //console.log(Math.sin(time))
        */
    }
}
export default MainMenu;