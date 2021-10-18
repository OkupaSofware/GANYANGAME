import Button from "../gameObjects/Button.js";

var inputText;

class MainMenu extends Phaser.Scene {
    constructor(){
        super( "MainMenu");
    }
    
    
    create(){
       //Animated background
       this.cameras.main.fadeIn(1500, 0, 0, 0)
       this.background = this.add.image(640, 360, "background_2");
       this.cloud = this.add.image(-200,0,"cloud");
       this.cloud.setScale(0.3,0.3)
       this.cloud1 = this.add.image(-200,0,"cloud");
       this.neo = this.add.image(640,165,"new_title").setScale(0.7,0.7);
       this.cloud1.setScale(0.2,0.2)
       this.titleText=this.add.text(640,80, "WELCOME TO",{font: 'bold 32px Arial', fontSize: "36px"}).setOrigin(0.5,0.5)

       //this.title = this.add.sprite(640,165, "title_anim")
       //this.title.setScale(0.15,0.15)
       this.anims.create({key: "colorful_title",frames: this.anims.generateFrameNumbers("title_anim", {frames: [0,1,2,3]}), repeat: -1, frameRate: 8})
       //this.title.anims.play("colorful_title")
       this.character2 = this.add.sprite(-100,600,"run") 
       this.character2.setScale(0.75,0.75)
       this.character2.anims.play('run',true)
       this.character2.flipX = true
       this.sniper = this.add.image(this.character2.x+50, this.character2.y+10, "sniper");
       this.sniper.setScale(0.3,0.3)
       this.add.image(640, 540, "FLOOR").setScale(0.6,0.6);
       this.character1 = this.add.sprite(-300,600,"run") 
       this.character1.setScale(0.8,0.8)
       this.character1.anims.play('run',true)
       this.character1.flipX = true
       this.shotgun = this.add.image(this.character1.x+30, this.character1.y+20, "shotgun");
       this.shotgun.setScale(0.8,0.8)
       this.fog = this.add.sprite(640,600, "fog_anim")
       this.anims.create({key: "fog",frames: this.anims.generateFrameNumbers("fog_anim", {frames: [0,1,2,3,4]}), repeat: -1, frameRate: 7})
       this.fog.anims.play("fog")
       this.rights = this.add.text (640,700, "Okupa Software. All rights reserved. 2021.",{font: 'bold 12px Arial'}).setOrigin(0.5,0.5)
       
       
        //Buttons creation
        var play_button = new Button({
            'scene': this,
            'key':'play_buttons',
            'up': 0,
            'over':1,
            'down':2,
            'x': 780,
            'y': 400
        }).setScale(0.8,0.8);
        var settings_button = new Button({
            'scene': this,
            'key':'credits_button',
            'up': 0,
            'over':1,
            'down':2,
            'x': 780,
            'y': 500
        }).setScale(0.8,0.8);
        var code_button = new Button({
            'scene': this,
            'key':'help_button',
            'up': 0,
            'over':1,
            'down':2,
            'x': 500,
            'y': 400
        }).setScale(0.8,0.8);
        var tutorial_button = new Button({
            'scene': this,
            'key':'setting_button',
            'up': 0,
            'over':1,
            'down':2,
            'x': 500,
            'y': 500
        }).setScale(0.8,0.8);
        play_button.on('pointerup',this.playOnPressed,this);

        //Display text for player name
        var usernameText = this.add.text(500, 300, '', {font: 'bold 32px Arial', color: 'white', fontSize: '30px '});  

        //Input text for player name
        var element = this.add.dom(650,300).createFromCache('nameform');
        
        inputText = "Player";
        
        element.addListener('click');

        element.on('click', function (event) {

            if (event.target.name === 'playButton')
            {
            
                 inputText = this.getChildByName('nameField');

                //  Have they entered anything?
                if (inputText.value !== '')
                {
                    //  Turn off the click events
                    this.removeListener('click');

                    //  Hide the login element
                    this.setVisible(false);

                    //  Populate the text with whatever they typed in
                    usernameText.setText('Username: ' + inputText.value);
                    inputText = inputText.value;
                    //usernameText.setText('Username: ' + this.registry.get('username'));
                }
                else
                {
                    alert("Please introduce a username");
                }
            }

        });
        
        
        // Button "animation"
        this.input.on('pointerdown', function (pointer) {
            //frameWidth: 236, frameHeight: 95
            // Play button. Center Coords: 780, 400. Dimensions: width:236, height: 95. Scale: 0.8
            // Settings button. Center Coords: 780, 500. Dimensions: width:236, height: 95. Scale: 0.8
            // Credits button. Center Coords: 500, 400. Dimensions: width:236, height: 95. Scale: 0.8
            // Help button. Center Coords: 500, 500. Dimensions: width:236, height: 95. Scale: 0.8

            if((pointer.x > 780-(236/2)*0.8 && pointer.x < 780+(236/2)*0.8 && pointer.y > 400-(95/2)*0.8 && pointer.y < 400+(95/2)*0.8)  || //play button
                (pointer.x > 780-(236/2)*0.8 && pointer.x < 780+(236/2)*0.8 && pointer.y > 500-(95/2)*0.8 && pointer.y < 500+(95/2)*0.8) || //settings button
                (pointer.x > 500-(236/2)*0.8 && pointer.x < 500+(236/2)*0.8 && pointer.y > 400-(95/2)*0.8 && pointer.y < 400+(95/2)*0.8) || //credits button
                (pointer.x > 500-(236/2)*0.8 && pointer.x < 500+(236/2)*0.8 && pointer.y > 500-(95/2)*0.8 && pointer.y < 500+(95/2)*0.8))   //help button
            {
                
                var bulletMenuSound = this.sound.add('shot');
                bulletMenuSound.play();
                this.trigger = this.add.image(pointer.x, pointer.y, "bulletMenu").setScale(0.3);
            }
        }, this);
    }

    playOnPressed()
    {
        //console.log("I am pressed!");
        //this.cameras.main.fadeOut(3000, 0, 0, 0)
        //Saves the username in a phaser registry
        this.registry.set('username', inputText);
        this.scene.start("ScenePlay");
    }

    update(time, delta){
        //Animation control
        this.cloud.x++;
        this.cloud1.x--;
        this.character1.x+=1.2;
        this.shotgun.x+=1.2;
        this.character2.x+=0.8;
        this.sniper.x+=0.8;
      
        if(this.cloud.x>1500){
            this.cloud.x=-100;
        }
        if(this.cloud1.x<-200){
            this.cloud1.x=1500;
        }
        if(this.character1.x> 1400){
            this.character1.x = -100
            this.shotgun.x = this.character1.x+30
        }
        if(this.character2.x> 1400){
            this.character2.x = -100
            this.sniper.x = this.character2.x+50
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
