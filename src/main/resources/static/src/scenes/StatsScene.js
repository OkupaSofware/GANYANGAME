import Player from '../gameObjects/Player.js';
import Button from "../gameObjects/Button.js";

class StatsScene extends Phaser.Scene {
    constructor(){
        super("StatsScene");
    }
    
    create(){
        this.cameras.main.fadeIn(2000, 0, 0, 0)
        this.text=this.add.text(640,80, "GAME RESULTS",{font: 'bold 32px Arial', fontSize: "36px"}).setOrigin(0.5,0.5)

        this.add.image(640, 360, "ingamemenu").setScale(0.4,0.4);
        
        this.player1info = this.registry.get("player1");
        this.player2info = this.registry.get("player2");
        var msg = {
					type: "return",
		}
        this.scene.get("ScenePlay").socketRef.send(JSON.stringify(msg));    
		this.scene.get("Lobby").socketRef.send(JSON.stringify(msg));
		this.checkServer = setInterval(function(){
			
		if( this.scene.get("ScenePlay").socketRef.readyState == this.scene.get("ScenePlay").socketRef.CLOSED){
				clearInterval(this.checkServer)
				this.add.text(640, 300, "CONNECTION LOST. RETURNING TO MAIN MENU", {fontFamily: 'army_font', color: 'RED', fontSize: '60px '}).setOrigin(0.5)
			}
		},2000)
        
        console.log(this.player1info.name);
        this.pointsPlayer1 = Math.ceil(this.player1info.getCountKills()*55) + Math.ceil(this.player1info.getCountShields()*15) + Math.ceil(this.player1info.getCountHearts()*15) + Math.ceil(this.player1info.getCountAmmos()*15);
        this.textName1=this.add.text(420,380, this.player1info.name,{font: 'bold 28px Arial', fontSize: "36px"}).setOrigin(0.5,0.5).setTint(0xE2AD43)
        this.textPoints1=this.add.text(420,420, this.pointsPlayer1 + "pts",{font: 'bold 28px Arial', fontSize: "36px"}).setOrigin(0.5,0.5).setTint(0x000000)
        this.textKills1=this.add.text(420,460, "Kills/Deaths: " + this.player1info.getCountKills() + "/" + this.player1info.getCountDeaths() + " (" + Math.ceil(this.player1info.getCountKills()*55) + " pts)",{font: 'bold 24px Arial', fontSize: "34px"}).setOrigin(0.5,0.5).setTint(0x000000)
        this.textShields1=this.add.text(420,490, "Shields: " + this.player1info.getCountShields() + " (" + Math.ceil(this.player1info.getCountShields()*15) + " pts)",{font: 'bold 24px Arial', fontSize: "34px"}).setOrigin(0.5,0.5).setTint(0x000000)
        this.textHearts1=this.add.text(420,520, "Hearts: " + this.player1info.getCountHearts() + " (" + Math.ceil(this.player1info.getCountHearts()*15) + " pts)",{font: 'bold 24px Arial', fontSize: "34px"}).setOrigin(0.5,0.5).setTint(0x000000)
        this.textAmmos1=this.add.text(420,550, "Ammos: " + this.player1info.getCountAmmos() + " (" + Math.ceil(this.player1info.getCountAmmos()*15) + " pts)",{font: 'bold 24px Arial', fontSize: "34px"}).setOrigin(0.5,0.5).setTint(0x000000)

        
        this.pointsPlayer2 = Math.ceil(this.player2info.getCountKills()*55) + Math.ceil(this.player2info.getCountShields()*15) + Math.ceil(this.player2info.getCountHearts()*15) + Math.ceil(this.player2info.getCountAmmos()*15);
        this.textName2=this.add.text(840,380, this.player2info.name,{font: 'bold 28px Arial', fontSize: "36px"}).setOrigin(0.5,0.5).setTint(0xE2AD43)
        this.textPoints2=this.add.text(840,420, this.pointsPlayer2 + "pts",{font: 'bold 28px Arial', fontSize: "36px"}).setOrigin(0.5,0.5).setTint(0x000000)
        this.textKills2=this.add.text(840,460, "Kills/Deaths: " + this.player2info.getCountKills() + "/" + this.player2info.getCountDeaths() + " (" + Math.ceil(this.player2info.getCountKills()*55) + " pts)",{font: 'bold 24px Arial', fontSize: "34px"}).setOrigin(0.5,0.5).setTint(0x000000)
        this.textShields2=this.add.text(840,490, "Shields: " + this.player2info.getCountShields() + " (" + Math.ceil(this.player2info.getCountShields()*15) + " pts)",{font: 'bold 24px Arial', fontSize: "34px"}).setOrigin(0.5,0.5).setTint(0x000000)
        this.textHearts2=this.add.text(840,520, "Hearts: " + this.player2info.getCountHearts() + " (" + Math.ceil(this.player2info.getCountHearts()*15) + " pts)",{font: 'bold 24px Arial', fontSize: "34px"}).setOrigin(0.5,0.5).setTint(0x000000)
        this.textAmmos2=this.add.text(840,550, "Ammos: " + this.player2info.getCountAmmos() + " (" + Math.ceil(this.player2info.getCountAmmos()*15) + " pts)",{font: 'bold 24px Arial', fontSize: "34px"}).setOrigin(0.5,0.5).setTint(0x000000)
        
        /*
        this.pointsPlayer1 = Math.ceil(this.player1info.getCountKills()*55) + Math.ceil(this.player1info.getCountShields()*15) + Math.ceil(this.player1info.getCountHearts()*15) + Math.ceil(this.player1info.getCountAmmos()*15);
        this.textName1=this.add.text(420,220, this.player1info.name,{font: 'bold 28px Arial', fontSize: "36px"}).setOrigin(0.5,0.5).setTint(0x000000)
        this.textPoints1=this.add.text(420,420, this.pointsPlayer1 + "pts",{font: 'bold 28px Arial', fontSize: "36px"}).setOrigin(0.5,0.5).setTint(0x000000)
        this.textKills1=this.add.text(420,460, "Kills/Deaths: " + this.player1info.getCountKills() + "/" + this.player1info.getCountDeaths() + " (" + Math.ceil(this.player1info.getCountKills()*55) + " pts)",{font: 'bold 24px Arial', fontSize: "34px"}).setOrigin(0.5,0.5).setTint(0x000000)
        this.textShields1=this.add.text(420,490, "Shields: " + this.player1info.getCountShields() + " (" + Math.ceil(this.player1info.getCountShields()*15) + " pts)",{font: 'bold 24px Arial', fontSize: "34px"}).setOrigin(0.5,0.5).setTint(0x000000)
        this.textHearts1=this.add.text(420,520, "Hearts: " + this.player1info.getCountHearts() + " (" + Math.ceil(this.player1info.getCountHearts()*15) + " pts)",{font: 'bold 24px Arial', fontSize: "34px"}).setOrigin(0.5,0.5).setTint(0x000000)
        this.textAmmos1=this.add.text(420,550, "Ammos: " + this.player1info.getCountAmmos() + " (" + Math.ceil(this.player1info.getCountAmmos()*15) + " pts)",{font: 'bold 24px Arial', fontSize: "34px"}).setOrigin(0.5,0.5).setTint(0x000000)

        
        this.pointsPlayer2 = Math.ceil(this.player2info.getCountKills()*55) + Math.ceil(this.player2info.getCountShields()*15) + Math.ceil(this.player2info.getCountHearts()*15) + Math.ceil(this.player2info.getCountAmmos()*15);
        this.textName2=this.add.text(840,220, this.player2info.name,{font: 'bold 28px Arial', fontSize: "36px"}).setOrigin(0.5,0.5).setTint(0x000000)
        this.textPoints2=this.add.text(840,420, this.pointsPlayer2 + "pts",{font: 'bold 28px Arial', fontSize: "36px"}).setOrigin(0.5,0.5).setTint(0x000000)
        this.textKills2=this.add.text(840,460, "Kills/Deaths: " + this.player2info.getCountKills() + "/" + this.player2info.getCountDeaths() + " (" + Math.ceil(this.player2info.getCountKills()*55) + " pts)",{font: 'bold 24px Arial', fontSize: "34px"}).setOrigin(0.5,0.5).setTint(0x000000)
        this.textShields2=this.add.text(840,490, "Shields: " + this.player2info.getCountShields() + " (" + Math.ceil(this.player2info.getCountShields()*15) + " pts)",{font: 'bold 24px Arial', fontSize: "34px"}).setOrigin(0.5,0.5).setTint(0x000000)
        this.textHearts2=this.add.text(840,520, "Hearts: " + this.player2info.getCountHearts() + " (" + Math.ceil(this.player2info.getCountHearts()*15) + " pts)",{font: 'bold 24px Arial', fontSize: "34px"}).setOrigin(0.5,0.5).setTint(0x000000)
        this.textAmmos2=this.add.text(840,550, "Ammos: " + this.player2info.getCountAmmos() + " (" + Math.ceil(this.player2info.getCountAmmos()*15) + " pts)",{font: 'bold 24px Arial', fontSize: "34px"}).setOrigin(0.5,0.5).setTint(0x000000)
        */
        
        if(this.pointsPlayer1 > this.pointsPlayer2){
            this.win1=this.add.text(420,180, "WIN",{fontFamily: 'army_font', color: 'white', fontSize: '38px '}).setOrigin(0.5,0.5).setTint(0x50C234)
            this.lose2=this.add.text(840,180, "LOSE",{fontFamily: 'army_font', color: 'white', fontSize: '38px '}).setOrigin(0.5,0.5).setTint(0xD64239)
            this.textName1.setTint(0x50C234)
            this.textName2.setTint(0xD64239)
        }else if(this.pointsPlayer2 > this.pointsPlayer1){
            this.lose1=this.add.text(420,180, "LOSE",{fontFamily: 'army_font', color: 'white', fontSize: '38px '}).setOrigin(0.5,0.5).setTint(0xD64239)
            this.win2=this.add.text(840,180, "WIN",{fontFamily: 'army_font', color: 'white', fontSize: '38px '}).setOrigin(0.5,0.5).setTint(0x50C234)
            this.textName2.setTint(0x50C234)
            this.textName1.setTint(0xD64239)
        }else{
            this.draw1=this.add.text(420,180, "DRAW",{fontFamily: 'army_font', color: 'white', fontSize: '38px '}).setOrigin(0.5,0.5).setTint(0xE2AD43)
            this.draw2=this.add.text(840,180, "DRAW",{fontFamily: 'army_font', color: 'white', fontSize: '38px '}).setOrigin(0.5,0.5).setTint(0xE2AD43)
        }
        
        this.idle1 = this.add.image(420, 285, "idle").setTint(this.registry.get("color1"));
        this.idle1.flipX=true;
        this.idle2 = this.add.image(840, 285, "idle").setTint(this.registry.get("color2"));
        
        var exit_button = new Button({
            'scene': this,
            'key':'button_basic',
            'up': 0,
            'over':1,
            'down':2,
            'x': 1010,
            'y': 200
        },"lobby").setScale(0.7,0.7);
        exit_button.on('pointerup',this.goBack,this)
    }
    goBack(){
        //this.scene.start("MainMenuBackground");
        
        this.scene.get("ScenePlay").socketRef.close();
        this.scene.wake("Lobby")
        this.scene.remove("ScenePlay")
        this.scene.stop("StatsScene")

    }

}
export default StatsScene;