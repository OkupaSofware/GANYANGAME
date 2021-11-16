import Button from '../gameObjects/Button.js';
class Credits extends Phaser.Scene {
    constructor() {
        super({key: "Credits"});
    }

create(){
    this.cameras.main.fadeIn(250, 0, 0, 0)
    this.text=this.add.text(640,80, "CREDITS",{font: 'bold 32px Arial', fontSize: "36px"}).setOrigin(0.5,0.5);
    this.add.image(640, 320, "creditsBackground").setScale(0.4,0.4);

    var back_button = new Button({
        'scene': this,
        'key':'back_buttons',
        'up': 0,
        'over':1,
        'down':2,
        'x': 1010,
        'y': 186
    }).setScale(0.7,0.7);
    back_button.on('pointerup',this.goBack,this)
    
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
    this.scene.stop("Credits")
    this.scene.wake("MainMenu");

}

}
export default Credits;
