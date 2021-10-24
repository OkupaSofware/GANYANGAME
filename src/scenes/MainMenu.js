import Button from "../gameObjects/Button.js";
var inputText;
class MainMenu extends Phaser.Scene {
    constructor(){
        super( "MainMenu");
    }
create(){
this.cameras.main.fadeIn(1500, 0, 0, 0)
this.titleText=this.add.text(640,80, "WELCOME TO",{font: 'bold 32px Arial', fontSize: "36px"}).setOrigin(0.5,0.5)
this.neo = this.add.image(640,165,"new_title").setScale(0.7,0.7);
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
var credits_button = new Button({
    'scene': this,
    'key':'credits_button',
    'up': 0,
    'over':1,
    'down':2,
    'x': 780,
    'y': 500
}).setScale(0.8,0.8);
var tutorial_button = new Button({
    'scene': this,
    'key':'help_button',
    'up': 0,
    'over':1,
    'down':2,
    'x': 500,
    'y': 400
}).setScale(0.8,0.8);
var settings_button = new Button({
    'scene': this,
    'key':'setting_button',
    'up': 0,
    'over':1,
    'down':2,
    'x': 500,
    'y': 500
}).setScale(0.8,0.8);
play_button.on('pointerup',this.playOnPressed,this);
tutorial_button.on('pointerup',this.launchTutorialMenu,this);
settings_button.on('pointerup',this.launchSettingsMenu,this);
credits_button.on('pointerup',this.launchCreditsMenu,this);


//Display text for player name
var usernameText = this.add.text(500, 300, '', {font: 'bold 32px Arial', color: 'white', fontSize: '30px '});  

//Input text for player name
var element = this.add.dom(640,300).createFromCache('nameform');

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

this.holesTrigger = this.physics.add.staticGroup();
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
        //this.holesTrigger.create(pointer.x, pointer.y, "bulletMenu").setScale(0.3);
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
        this.scene.stop("MainMenuBackground");
        this.scene.get("MainMenuBackground").backgroundMusic.stop();
    }
    launchTutorialMenu(){
        //this.holesTrigger.destroy(true,true)
        this.scene.launch("Tutorial");
        //this.scene.moveAbove("Tutorial","MainMenu")
        this.scene.bringToTop("Tutorial")
        this.scene.sleep("MainMenu")
    }
    launchSettingsMenu(){
        this.scene.launch("Settings");
        this.scene.bringToTop("Settings")
        this.scene.sleep("MainMenu")
    }
    launchCreditsMenu(){
        this.scene.launch("Credits");
        this.scene.bringToTop("Credits")
        this.scene.sleep("MainMenu")
    }

}
export default MainMenu;
