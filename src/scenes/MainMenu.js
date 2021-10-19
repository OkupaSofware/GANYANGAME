import Button from "../gameObjects/Button.js";
var inputText;
class MainMenu extends Phaser.Scene {
    constructor(){
        super( "MainMenu");
    }
create(){

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
var credits_buttom = new Button({
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
        this.scene.stop("MainMenuBackground")
    }
    launchTutorialMenu(){
        this.scene.launch("Tutorial");
        //this.scene.moveAbove("Tutorial","MainMenu")
        this.scene.bringToTop("Tutorial")
        this.scene.stop("MainMenu")
        console.log("launched")
    }

}
export default MainMenu;