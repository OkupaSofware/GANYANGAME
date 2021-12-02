import Button from "../gameObjects/Button.js";

class MainMenu extends Phaser.Scene {
    constructor(){
        super( "MainMenu");
    }
create(){
this.cameras.main.fadeIn(1500, 0, 0, 0)
this.titleText=this.add.text(640,70, "WELCOME TO",{fontFamily: 'army_font', fontSize:'50px' }).setOrigin(0.5,0.5)
this.neo = this.add.image(640,165,"new_title").setScale(0.7,0.7);
//Buttons creation
var play_button = new Button({
    'scene': this,
    'key':'button_basic',
    'up': 0,
    'over':1,
    'down':2,
    'x': 780,
    'y': 400
},"play").setScale(0.8,0.8);
var credits_button = new Button({
    'scene': this,
    'key':'button_basic',
    'up': 0,
    'over':1,
    'down':2,
    'x': 780,
    'y': 500
},"credits").setScale(0.8,0.8);
var tutorial_button = new Button({
    'scene': this,
    'key':'button_basic',
    'up': 0,
    'over':1,
    'down':2,
    'x': 500,
    'y': 400
},"tutorial").setScale(0.8,0.8);
var settings_button = new Button({
    'scene': this,
    'key':'button_basic',
    'up': 0,
    'over':1,
    'down':2,
    'x': 500,
    'y': 500
},"settings").setScale(0.8,0.8);
play_button.on('pointerup',this.playOnPressed,this);
tutorial_button.on('pointerup',this.launchTutorialMenu,this);
settings_button.on('pointerup',this.launchSettingsMenu,this);
credits_button.on('pointerup',this.launchCreditsMenu,this);



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
        bulletMenuSound.play({volume: this.registry.get('effectsVolumeFromMenu')});
        this.trigger = this.add.image(pointer.x, pointer.y, "bulletMenu").setScale(0.3);
    }
}, this);


}
    playOnPressed()
    {
        //console.log("I am pressed!");
        //this.cameras.main.fadeOut(3000, 0, 0, 0)
        this.scene.launch("GameMode");
        //this.scene.moveAbove("Tutorial","MainMenu")
        this.scene.bringToTop("GameMode")
        this.scene.sleep("MainMenu")

        //this.scene.start("GameMode");
        //this.scene.stop("MainMenuBackground");
        //this.scene.get("MainMenuBackground").backgroundMusic.stop();
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
