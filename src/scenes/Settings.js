import Button from '../gameObjects/Button.js';

class Settings extends Phaser.Scene {
    constructor() {
        super({key: "Settings"});
    }

create(){
    this.text=this.add.text(640,80, "SETTINGS",{font: 'bold 32px Arial', fontSize: "36px"}).setOrigin(0.5,0.5);
    this.add.image(640, 320, "settingsBackground").setScale(0.4,0.4);
    this.paintBulletsAudioEffect();
    this.paintBulletsAudioBackground();

    var back_button = new Button({
        'scene': this,
        'key':'back_buttons',
        'up': 0,
        'over':1,
        'down':2,
        'x': 990,
        'y': 200
    }).setScale(0.7,0.7);
    back_button.on('pointerup',this.goBack,this);

    // Handling of volume effects
    var increaseVolumeEffects = new Button({
        'scene': this,
        'key':'plus_buttons',
        'up': 0,
        'over':1,
        'down':2,
        'x': 380,
        'y': 280
    }).setScale(0.8,0.8);
    increaseVolumeEffects.on('pointerup', this.increaseVolumeEffects, this);
    var decreaseVolumeEffects = new Button({
        'scene': this,
        'key':'minus_buttons',
        'up': 0,
        'over':1,
        'down':2,
        'x': 280,
        'y': 280
    }).setScale(0.8,0.8);
    decreaseVolumeEffects.on('pointerup', this.decreaseVolumeEffects, this);
    this.previousVolumeEffects = this.registry.get('effectsVolumeFromMenu');

    // Handling of background music effects
    var increaseVolumeBackground = new Button({
        'scene': this,
        'key':'plus_buttons',
        'up': 0,
        'over':1,
        'down':2,
        'x': 380,
        'y': 400
    }).setScale(0.8,0.8);
    increaseVolumeBackground.on('pointerup', this.increaseVolumeBackground, this);
    var decreaseVolumeBackground = new Button({
        'scene': this,
        'key':'minus_buttons',
        'up': 0,
        'over':1,
        'down':2,
        'x': 280,
        'y': 400
    }).setScale(0.8,0.8);
    decreaseVolumeBackground.on('pointerup', this.decreaseVolumeBackground, this);
    this.previousVolumeBackground = this.registry.get('backgroundVolumeFromMenu');


    // Button "animation"
    this.input.on('pointerdown', function (pointer) {
        //image back_button: width:236, height: 95. Scale: 0.7 both axes
        if((pointer.x > 1030-(236/2)*0.7 && pointer.x < 1030+(236/2)*0.7 && pointer.y > 200-(95/2)*0.7 && pointer.y < 200+(95/2)*0.7)) //back button
        {
            var bulletMenuSound = this.sound.add('shot');
            bulletMenuSound.play({volume: this.registry.get('effectsVolumeFromMenu')});
            this.trigger = this.add.image(pointer.x, pointer.y, "bulletMenu").setScale(0.3);
        }
        }, this);
}

goBack(){
    this.scene.stop("Settings")
    this.scene.wake("MainMenu");
}

increaseVolumeEffects(){
    console.log("effect: " + this.registry.get("effectsVolumeFromMenu"));
    if(this.previousVolumeEffects >= 1){
        this.newVolume = 1;
    }else{
        this.newVolume = this.previousVolumeEffects + 0.1;
        this.previousVolumeEffects = this.newVolume;
        this.registry.set('effectsVolumeFromMenu', this.newVolume);
    }
    this.paintBulletsAudioEffect();
    //this.scene.get("MainMenuBackground").backgroundMusic.setVolume(this.newVolume);
}

decreaseVolumeEffects(){
    console.log("effect: " + this.registry.get("effectsVolumeFromMenu"));
    if(this.previousVolumeEffects <= 0){
        this.newVolume = 0;
    }else{
        this.newVolume = this.previousVolumeEffects - 0.1;
        this.previousVolumeEffects = this.newVolume;
        this.registry.set('effectsVolumeFromMenu', this.newVolume);
    }
    this.paintBulletsAudioEffect();
    //this.scene.get("MainMenuBackground").backgroundMusic.setVolume(this.newVolume);
}

increaseVolumeBackground(){
    console.log("background: " + this.registry.get("backgroundVolumeFromMenu"));
    if(this.previousVolumeBackground >= 1){
        this.newVolume = 1;
    }else{
        this.newVolume = this.previousVolumeBackground + 0.1;
        this.previousVolumeBackground = this.newVolume;
        this.registry.set('backgroundVolumeFromMenu', this.newVolume);
    }
    this.scene.get("MainMenuBackground").backgroundMusic.setVolume(this.newVolume);
    this.paintBulletsAudioBackground();
}

decreaseVolumeBackground(){
    console.log("background: " + this.registry.get("backgroundVolumeFromMenu"));
    if(this.previousVolumeBackground <= 0){
        this.newVolume = 0;
    }else{
        this.newVolume = this.previousVolumeBackground - 0.1;
        this.previousVolumeBackground = this.newVolume;
        this.registry.set('backgroundVolumeFromMenu', this.newVolume);
    }
    this.scene.get("MainMenuBackground").backgroundMusic.setVolume(this.newVolume);
    this.paintBulletsAudioBackground();
}

paintBulletsAudioEffect(){
    this.add.image(640, 320, "bulletsAudioEffects").setScale(0.4,0.4);
    
    this.numBullets = this.registry.get("effectsVolumeFromMenu") * 10 - 1;
    for(var i = 0; i < this.numBullets; i++){
        this.newSpriteBullet = this.add.image(517+i*52, 272, "bulletMenu").setScale(0.25);
    }

}

paintBulletsAudioBackground(){
    this.add.image(640, 320, "bulletsAudioMusic").setScale(0.4,0.4);
    
    this.numBullets = this.registry.get("backgroundVolumeFromMenu") * 10 - 1;
    for(var i = 0; i < this.numBullets; i++){
        this.newSpriteBullet = this.add.image(517+i*52, 390, "bulletMenu").setScale(0.25);
    }

}

}
export default Settings;
