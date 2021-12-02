import Button from "../gameObjects/Button.js";
import ScenePlayOFFLINE from "./ScenePlayOFFLINE.js";
var inputText1, inputText2, usernameText1, usernameText2;
class LobbyOFFLINE extends Phaser.Scene {
    constructor() {
        super({ key: "Lobby" });
        
    }
    create(){
        this.text=this.add.text(640,80, "LOBBY",{fontFamily: 'army_font', fontSize:'50px' }).setOrigin(0.5,0.5)
    
        this.add.image(640, 320, "gamemode").setScale(0.4,0.4)
        this.idle1 = this.add.image(420, 285, "idle").setTint(0xCC6666);
        this.idle1.flipX=true;
        this.idle2 = this.add.image(840, 285, "idle").setTint(0x92C5FC);
        
        var exit_button = new Button({
            'scene': this,
            'key':'back_buttons',
            'up': 0,
            'over':1,
            'down':2,
            'x': 1010,
            'y': 186
        }).setScale(0.7,0.7);
        exit_button.on('pointerup',this.goBack,this)
        var offlineButton = new Button({
            'scene': this,
            'key':'button_basic',
            'up': 0,
            'over':1,
            'down':2,
            'x': 640,
            'y': 490
        },"play").setScale(0.9,0.9);
        offlineButton.on('pointerup',this.playOffline,this)

        //Display text for player name
        usernameText1 = this.add.text(420, 400, '', {font: 'bold 32px Arial', color: 'white', fontSize: '30px '}).setOrigin(0.5,0.5);  
        usernameText2 = this.add.text(840, 400, '', {font: 'bold 32px Arial', color: 'white', fontSize: '30px '}).setOrigin(0.5,0.5);

        //Input text for player name
        var element1 = this.add.dom(420,425).createFromCache('nameform');
        var element2 = this.add.dom(840,425).createFromCache('nameform');

        inputText1 = "Player 1";
        inputText2 = "Player 2";

        element1.addListener('click');

        element1.on('click', function (event) {

            if (event.target.name === 'playButton')
            {
            
                inputText1 = this.getChildByName('nameField');

                //  Have they entered anything?
                if (inputText1.value !== '')
                {
                    //  Turn off the click events
                    this.removeListener('click');

                    //  Hide the login element
                    this.setVisible(false);

                    //  Populate the text with whatever they typed in
                    inputText1 = inputText1.value;
                    
                    console.log("Soy " + inputText1);
                    usernameText1.setText('P1: ' + inputText1);
                    
                    //usernameText.setText('Username: ' + this.registry.get('username'));
                }
                else
                {
                    alert("Player 1, please enter a username");
                }
            }

        });

        element2.addListener('click');

        element2.on('click', function (event) {

            if (event.target.name === 'playButton')
            {
            
                inputText2 = this.getChildByName('nameField');

                //  Have they entered anything?
                if (inputText2.value !== '')
                {
                    //  Turn off the click events
                    this.removeListener('click');

                    //  Hide the login element
                    this.setVisible(false);

                    //  Populate the text with whatever they typed in
                    inputText2 = inputText2.value;
                    
                    console.log("Soy " + inputText2);
                    usernameText2.setText('P2: ' + inputText2);
                    
                    //usernameText.setText('Username: ' + this.registry.get('username'));
                }
                else
                {
                    alert("Player 2, please enter a username");
                }
            }

        });
    }

    goBack(){
        this.scene.start("GameMode")
        this.scene.remove("Lobby")
    }
    playOffline(){
        
        usernameText1.destroy();
        usernameText2.destroy();
        this.registry.set('username1', inputText1);
        this.registry.set('username2', inputText2);

        this.scene.add("ScenePlay",ScenePlayOFFLINE,true);
        this.scene.sleep("Lobby")
        
    }


    

}

export default LobbyOFFLINE;