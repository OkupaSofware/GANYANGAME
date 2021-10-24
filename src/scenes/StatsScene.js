import Player from '../gameObjects/Player.js';
import Button from "../gameObjects/Button.js";

class StatsScene extends Phaser.Scene {
    constructor(){
        super("StatsScene");
    }
    
    create(){
        this.cameras.main.fadeIn(250, 0, 0, 0)
        this.text=this.add.text(640,80, "GAME RESULTS",{font: 'bold 32px Arial', fontSize: "36px"}).setOrigin(0.5,0.5)

        this.add.image(640, 360, "background").setScale(0.3,0.3);
        
        this.player1info = this.registry.get("player1");
        
        
        console.log(this.player1info.name);
        this.pointsPlayer1 = (this.player1info.getCountKills()*0.55 + this.player1info.getCountShields()*0.15 + this.player1info.getCountHearts()*0.15 + this.player1info.getCountAmmos()*0.15)*100;
        this.textName1=this.add.text(420,180, this.player1info.name,{font: 'bold 28px Arial', fontSize: "36px"}).setOrigin(0.5,0.5)
        this.textPoints1=this.add.text(420,230, this.pointsPlayer1,{font: 'bold 28px Arial', fontSize: "36px"}).setOrigin(0.5,0.5)
        this.textKills1=this.add.text(420,370, "Kills: " + this.player1info.getCountKills(),{font: 'bold 24px Arial', fontSize: "34px"}).setOrigin(0.5,0.5)
        this.textDeaths1=this.add.text(420,400, "Deaths: " + this.player1info.getCountDeaths(),{font: 'bold 24px Arial', fontSize: "34px"}).setOrigin(0.5,0.5)
        this.textShields1=this.add.text(420,430, "Shields: " + this.player1info.getCountShields(),{font: 'bold 24px Arial', fontSize: "34px"}).setOrigin(0.5,0.5)
        this.textHearts1=this.add.text(420,460, "Hearts: " + this.player1info.getCountHearts(),{font: 'bold 24px Arial', fontSize: "34px"}).setOrigin(0.5,0.5)
        this.textAmmos1=this.add.text(420,490, "Ammos: " + this.player1info.getCountAmmos(),{font: 'bold 24px Arial', fontSize: "34px"}).setOrigin(0.5,0.5)
        console.log(this.player1info.getCountDeaths());
        console.log(this.player1info.getCountKills());
        console.log(this.player1info.getCountShields());
        console.log(this.player1info.getCountHearts());
        console.log(this.player1info.getCountAmmos());
        
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
        this.scene.stop("StatsScene");
        this.scene.wake("MainMenu");

    }

}
export default StatsScene;