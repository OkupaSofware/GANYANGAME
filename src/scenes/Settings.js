import Button from '../gameObjects/Button.js';
class Settings extends Phaser.Scene {
    constructor() {
        super({key: "Settings"});
    }

create(){
    this.cameras.main.fadeIn(250, 0, 0, 0)
    this.text=this.add.text(640,80, "SETTINGS",{font: 'bold 32px Arial', fontSize: "36px"}).setOrigin(0.5,0.5)

    this.add.image(640, 360, "background").setScale(0.3,0.3);
    var back_button = new Button({
        'scene': this,
        'key':'setting_button',
        'up': 0,
        'over':1,
        'down':2,
        'x': 300,
        'y': 180
    }).setScale(0.7,0.7);
    back_button.on('pointerup',this.goBack,this)
}
goBack(){
    this.scene.stop("Settings")
    this.scene.wake("MainMenu");

}

}
export default Settings;