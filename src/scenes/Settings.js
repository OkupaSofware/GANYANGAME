import Button from '../gameObjects/Button.js';
class Settings extends Phaser.Scene {
    constructor() {
        super({key: "Settings"});
    }

create(){
    var back_button = new Button({
        'scene': this,
        'key':'setting_button',
        'up': 0,
        'over':1,
        'down':2,
        'x': 500,
        'y': 550
    }).setScale(1,1);
    this.add.image(640, 360, "background").setScale(0.1,0.1);
}


}
export default Settings;