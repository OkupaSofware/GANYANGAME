import Button from '../gameObjects/Button.js';
class InGameMenu extends Phaser.Scene {
    constructor() {
        super({key: "InGameMenu"});
    }

create(){
    this.cameras.main.fadeIn(250, 0, 0, 0)
    this.add.image(640, 308, "ingamemenu").setAlpha(0.5)
    var exit_button = new Button({
        'scene': this,
        'key':'button_basic',
        'up': 0,
        'over':1,
        'down':2,
        'x': 640,
        'y': 320
    },"quit").setScale(0.7,0.7);
    var resume_button = new Button({
        'scene': this,
        'key':'button_basic',
        'up': 0,
        'over':1,
        'down':2,
        'x': 640,
        'y': 420
    },"resume").setScale(0.7,0.7);
    exit_button.on('pointerup',this.goBack,this)
    resume_button.on('pointerup',this.resume,this)
}
goBack(){
	this.scene.get("Lobby").socketRef.close();
	this.scene.get("ScenePlay").socketRef.close();
	
    this.scene.start("MainMenuBackground");
    this.scene.remove("Lobby")
    this.scene.remove("ScenePlay")
    
}
resume(){
    this.scene.stop("InGameMenu");
    this.scene.get("ScenePlay").menuOn = false;
}

}
export default InGameMenu;
