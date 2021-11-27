import Button from "../gameObjects/Button.js";
import LobbyOFFLINE from "./LobbyOFFLINE.js";
import LobbyONLINE from "./LobbyONLINE.js";



class GameMode extends Phaser.Scene {
    constructor(){
        super( "GameMode");
    }
create(){
    this.cameras.main.fadeIn(250, 0, 0, 0)
    this.text=this.add.text(640,80, "CHOOSE GAME MODE",{font: 'bold 32px Arial', fontSize: "36px"}).setOrigin(0.5,0.5)
    
    this.add.image(640, 320, "gamemode").setScale(0.4,0.4)
    this.add.text(480,280,"OFFLINE MODE",{font: 'bold 32px Arial', fontSize: "36px"}).setOrigin(0.5,0.5)//.setTint(0XFFA500)
    this.add.text(800,280,"ONLINE MODE",{font: 'bold 32px Arial', fontSize: "36px"}).setOrigin(0.5,0.5)//.setTint(0XFFA500)

    var offlineButton = new Button({
        'scene': this,
        'key':'offline_buttons',
        'up': 0,
        'over':1,
        'down':2,
        'x': 480,
        'y': 370
    }).setScale(0.4,0.4);
    offlineButton.on('pointerup',this.playOffline,this)
    var onlineButton = new Button({
        'scene': this,
        'key':'play_buttons',
        'up': 0,
        'over':1,
        'down':2,
        'x': 800,
        'y': 370
    }).setScale(0.9,0.9);
    onlineButton.on('pointerup',this.playOnline,this);
    var back_button = new Button({
        'scene': this,
        'key':'back_buttons',
        'up': 0,
        'over':1,
        'down':2,
        'x': 1010,
        'y': 186
    }).setScale(0.7,0.7);
    back_button.on('pointerup',this.goBack,this);
}
goBack(){
    this.scene.stop("GameMode")
    this.scene.wake("MainMenu");

}
playOffline(){
        //this.scene.start("GameMode");
        //this.scene.add("ScenePlay",ScenePlayOFFLINE,true);
        this.scene.add("Lobby",LobbyOFFLINE,true);
        this.scene.stop("GameMode")
        //this.scene.stop("MainMenuBackground");
        //this.scene.get("MainMenuBackground").backgroundMusic.stop();
    }
playOnline(){
        //this.scene.start("GameMode");
        this.scene.add("Lobby", LobbyONLINE,true);
        this.scene.stop("GameMode")
        //this.scene.stop("MainMenuBackground");
        //this.scene.get("MainMenuBackground").backgroundMusic.stop();
}



}

export default GameMode;