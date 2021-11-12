import Button from "../gameObjects/Button.js";
import ScenePlayOFFLINE from "./ScenePlayOFFLINE.js";

class LobbyOFFLINE extends Phaser.Scene {
    constructor() {
        super({ key: "Lobby" });
        
    }
    create(){
        this.text=this.add.text(640,80, "LOBBY",{font: 'bold 32px Arial', fontSize: "36px"}).setOrigin(0.5,0.5)
    
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
            'key':'play_buttons',
            'up': 0,
            'over':1,
            'down':2,
            'x': 640,
            'y': 490
        }).setScale(0.9,0.9);
        offlineButton.on('pointerup',this.playOffline,this)
    }

    goBack(){
        this.scene.start("GameMode")
        this.scene.remove("Lobby")
    }
    playOffline(){
        
        this.scene.add("ScenePlay",ScenePlayOFFLINE,true);
        this.scene.remove("Lobby")
        
    }


    

}

export default LobbyOFFLINE;