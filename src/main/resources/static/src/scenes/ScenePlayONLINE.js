import Player from '../gameObjects/Player.js';
import Boost from '../gameObjects/boost.js';
import Bullet from '../gameObjects/bullet.js';

var connection;
var posConnection;

var timer = 0;

var p1_A;
var p1_D;
var p1_W;
var p1_mousex;
var p1_mousey;
var p1_click = 0;
var p1_life;
var p1_shield;
var p1_xPos = 0;
var p1_yPos = 0;

var p2_A;
var p2_D;
var p2_W;
var p2_mousex;
var p2_mousey;
var p2_click;
var p2_life;
var p2_shield;
var p2_xPos = 0;
var p2_yPos = 0;

class ScenePlayONLINE extends Phaser.Scene {
    constructor() {
        super({ key: "ScenePlay" });
        this.menuOn = false;
        this.respawnPlaces = [[490, 300], [850, 300], [450, 550], [930, 550]];
        this.respawnBoostPlaces = [[640, 460], [230, 160], [1050, 160]];
        this.timeText;
        this.gap = 0;
        this.tcount = 0;
    }


    create() {
        connect()
        //timer        
        this.timeText = this.add.text(640, 30, "T", { font: 'Bold 32px Arial' }).setOrigin(0.5).setDepth(10) //Elapsed Time Text
        this.gap = 0;
        this.tcount = 0;
        
        this.cameras.main.fadeIn(500, 0, 0, 0);
        this.killText = this.add.text(640, 200, "+1 KILL", { font: 'Bold 50px Arial' }).setOrigin(0.5).setDepth(10).setTint(0xffdf00).setAlpha(0); //Elapsed Time Text
        // Add background
        this.background = this.add.image(640, 360, "background_2");
        //Options button
        this.add.text(15, 15, "Press ESC to open in game menu", { font: '24px Arial' }).setDepth(10)

        //________________________________________________________

        //Sound effects
        //this.hitPlayer = this.sound.add('impact');
        this.funnyPlayer = this.sound.add('cry');
        this.hitPlayer = this.sound.add('deathcry');
        this.shieldEffect = this.sound.add('shieldEffect');
        this.extraLife = this.sound.add('extraLife');
        this.reload = this.sound.add('reload');
        //this.hitPlayer.play();
        this.funnyPlayer.play();

        this.input.keyboard.on('keydown-' + 'ESC', this.launchMenu, this);
        
        //Ambiental music
        this.sceneplayMusicBackground = this.sound.add('sceneplayMusic');
        this.sceneplayMusicBackground.play({volume: this.registry.get("backgroundVolumeFromMenu")});
        
        //#region Add platforms
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(1130, 500, "platform_1").setScale(0.3, 0.3).refreshBody().setSize(115, 25, 0, 0);
        this.platforms.create(150, 500, "platform_1").setScale(0.3, 0.3).refreshBody().setSize(115, 25, 0, 0);
        this.platforms.create(640, 500, "platform_1").setScale(0.3, 0.3).refreshBody().setSize(115, 25, 0, 0);

        this.platforms.create(500, 100, "platform_2").setScale(0.3, 0.3).refreshBody().setSize(150, 25, 0, 0);
        this.platforms.create(780, 100, "platform_2").setScale(0.3, 0.3).refreshBody().setSize(150, 25, 0, 0);

        this.platforms.create(400, 600, "platform_3").setScale(0.3, 0.3).refreshBody().setSize(190, 25, 0, 0);
        this.platforms.create(880, 600, "platform_3").setScale(0.3, 0.3).refreshBody().setSize(190, 25, 0, 0);

        this.platforms.create(800, 350, "platform_4").setScale(0.3, 0.3).refreshBody().setSize(230, 25, 0, 0);
        this.platforms.create(480, 350, "platform_4").setScale(0.3, 0.3).refreshBody().setSize(230, 25, 0, 0);
        this.platforms.create(1050, 200, "platform_4").setScale(0.3, 0.3).refreshBody().setSize(230, 25, 0, 0);
        this.platforms.create(230, 200, "platform_4").setScale(0.3, 0.3).refreshBody().setSize(230, 25, 0, 0);
        //#endregion

        //boost
        this.boostArray = new Array();
        this.boostArray[0] = new Boost(this, 640, 450 + 10, "live").setScale(0.3, 0.3);
        this.boostArray[1] = new Boost(this, 230, 150 + 10, "bubble").setScale(0.3, 0.3);
        this.boostArray[2] = new Boost(this, 1050, 150 + 10, "ammo").setScale(0.15, 0.15);

        //PLAYER 2
        //En este caso uno mas 
        this.enemyPlayer = new Player(this, 550, 650, "idle",this.registry.get("username2"),this.add.image(this.x, this.y+2, "shotgun")).setScale(0.5, 0.5).setOrigin(0.5, 0.8).setInteractive({ cursor: 'url(assets/player/weapon/mirillaRed.png), pointer' }).setTint(this.registry.get("color2"));
        //Cambio de controles para local
        this.enemyWeapon = this.add.image(this.enemyPlayer.x, this.enemyPlayer.y+2, "rifle").setOrigin(0.1, 0).setScale(0.2, 0.2).setDepth(1);

        // Bullets player 2
        this.bulletsPlayer2 = new Array();
        for(var i = 0; i < this.enemyPlayer.getTotalAmmo(); i++){
            let bullet = new Bullet(this, -50, -50, "bala").setScale(0.5);
            this.bulletsPlayer2.push(bullet);
            this.physics.add.collider(this.platforms, this.bulletsPlayer2[i], this.hit);
            this.physics.add.collider(this.bulletsPlayer2[i], this.player1, this.hitBody); // Collision with only one enemy
        }

        //PLAYER 1
        this.player1 = new Player(this, 50, 650, "idle", this.registry.get("username1"),this.add.image(this.x, this.y+2, "rifle")).setScale(0.5, 0.5).setOrigin(0.5, 0.8).setInteractive({ cursor: 'url(assets/player/weapon/mirillaRed.png), pointer' }).setTint(this.registry.get("color1"));

        // bullets player 1
        this.bulletsPlayer1 = new Array();
        for(var i = 0; i < this.player1.getTotalAmmo(); i++){
            let bullet = new Bullet(this, -50, -50, "bala").setScale(0.5);
            this.bulletsPlayer1.push(bullet);
            this.physics.add.collider(this.platforms, this.bulletsPlayer1[i], this.hit);
            this.physics.add.collider(this.bulletsPlayer1[i], this.enemyPlayer, this.hitBody); // Collision with only one enemy
        }
        

        // player 1 shooting
        this.input.on('pointerdown', function (pointer) {
            if (this.menuOn == false && p1_click == 0) {
                if (this.player1.getCurrentAmmo() > 0) {
                    let foundBullet = false;
                    for(var i = 0; i < this.player1.getTotalAmmo();i++){
                        if(!this.bulletsPlayer1[i].active){
                            this.bulletsPlayer1[i].shot(pointer, this.player1);
                            p1_click = 1;
                            console.log("pulso el boton")
                            foundBullet = true;
                        }
                        if(foundBullet)
                            i = this.player1.getTotalAmmo() - 1; // ends finding bullet
                    }

                    this.player1.decreaseCurrentAmmo();

                    //sound effect
                    //Sounds variables. this.bulletMenuSound is created here and not outside the functions so it creates a new sound every time and is independent from the old ones.
                    this.bulletMenuSound = this.sound.add('shot');
                    this.bulletMenuSound.play({volume: this.registry.get("effectsVolumeFromMenu")});
                    
                    //this.player1.decreaseLife(10);
                }else{
                    this.noAmmo = this.sound.add('noAmmo');
                    this.noAmmo.play();
                }
            }
        }, this);
        this.input.on('pointerup', function (pointer) {
            p1_click = 0;
            console.log("solto el boton");
        }, this);

        //controls player 1
        
        //Physics player 1
        this.physics.add.collider(this.player1, this.platforms);
        this.physics.add.collider(this.enemyPlayer, this.platforms);

        for (var i = 0; i < this.boostArray.length; i++) {
            this.physics.add.collider(this.platforms, this.boostArray)
            this.physics.add.collider(this.player1, this.boostArray[i], this.boostArray[i].efect)
            this.physics.add.collider(this.enemyPlayer, this.boostArray[i], this.boostArray[i].efect)
        }
        
        this.cameras.main.once('camerafadeoutcomplete', function() {
        });

    }

    update(time, delta) {
        timer++;


        //almaceno los valores del p1 para enviarselo al player 2
        p1_mousex = this.input.activePointer.x;
        p1_mousey = this.input.activePointer.y;
        //p1_life = this.player1.getLife();
        
        if(this.player1.player1LeftControl.isDown){
            p1_A = 1;
        }else{
            p1_A = 0;
        }
        if(this.player1.player1RightControl.isDown){
            p1_D = 1;
        }else{
            p1_D = 0;
        }
        if(this.player1.player1jump.isDown){
            p1_W = 1;
        }else{
            p1_W = 0;
        }

        this.checkRespawn();
        
        this.randBoostFunc();

        this.cronoFunc(time);
        
        //#region Players movement
        if (this.menuOn == false) {

            if (p2_D == 1) {
                this.enemyPlayer.body.setVelocityX(400)
            }
            if (p2_A == 1) {
                this.enemyPlayer.body.setVelocityX(-400)
            }
            if (p2_W == 1 && this.enemyPlayer.body.onFloor()){
                this.enemyPlayer.jumpTimer = 1;
                this.enemyPlayer.body.setVelocityY(-600);
            }
            else if (p2_W == 1 && (this.enemyPlayer.jumpTimer != 0)) {
                if (this.enemyPlayer.jumpTimer > 16) {
                    this.enemyPlayer.jumpTimer = 0;
                }
                else {
                    this.enemyPlayer.jumpTimer++;
                    this.enemyPlayer.body.setVelocityY(-600);
                }
            }
            else if (this.enemyPlayer.jumpTimer != 0) {
                this.enemyPlayer.jumpTimer = 0;
            }
            if ((p2_A == 1 || p2_D == 1) && this.enemyPlayer.body.onFloor()) {
                this.enemyPlayer.anims.play('run', true)
            }
            if (!(p2_A == 1 || p2_D == 1) && this.enemyPlayer.body.onFloor()) {
                this.enemyPlayer.anims.play('idle', true)
            }
            if (!this.enemyPlayer.body.onFloor()) {
                this.enemyPlayer.anims.play('jump', true)
            }
            if(p2_A == 0 && p2_D == 0){
                this.enemyPlayer.body.setVelocityX(0)
            }    
            this.enemyPlayer.hud.update(this.enemyPlayer.x,this.enemyPlayer.y)
            this.player1.body.setVelocityX(0)
            this.player1.update(time, delta);
            this.player1.aim(this.input.activePointer.x, this.input.activePointer.y);

            // Position send data
            if(timer%2 == 0){
                p1_xPos = this.player1.body.position.x;
                p1_yPos = this.player1.body.position.y;
                sendPosAux();
                this.enemyPlayer.body.position.x = p2_xPos;
                this.enemyPlayer.body.position.y = p2_yPos;
            }
            

            
        }else{
            this.player1.body.setVelocityX(0)
            this.enemyPlayer.body.setVelocityX(0)
        }
        //#endregion
        
        //#region Player flip horizontal
        if(p2_mousex > this.enemyPlayer.x){
            this.enemyPlayer.flipX = true;
            this.enemyWeapon.setOrigin(0.1, 0);
            this.enemyWeapon.flipX = false;
        }else{
            this.enemyPlayer.flipX = false;
            this.enemyWeapon.setOrigin(0.9, 0);
            this.enemyWeapon.flipX = true;
        }
        //#endregion
        
        // Player 2 weapon positioning and rotation
        this.enemyWeapon.setPosition(this.enemyPlayer.x, this.enemyPlayer.y + 2);
        this.enemyWeapon.rotation = Math.atan((p2_mousey-this.enemyWeapon.y) / (p2_mousex-this.enemyWeapon.x));

        // Bullets position out of bounds. Need to be modularized.
        for(var i = 0; i < this.player1.getTotalAmmo() ;i++){
            if(this.bulletsPlayer1[i].active){
                //Code that we want
                //this.bulletsPlayer1[i].checkOutOfBounds(1280, 720);

                //Code that works by now
                if(this.bulletsPlayer1[i].x >= 1275 ||
                   this.bulletsPlayer1[i].x <= 5    ||
                   this.bulletsPlayer1[i].y <= 5    ||
                   this.bulletsPlayer1[i].y >= 715)
                {
                    this.bulletsPlayer1[i].setPosition(-50);
                    this.bulletsPlayer1[i].body.setVelocityX(0);
                    this.bulletsPlayer1[i].body.setVelocityY(0);
                    this.bulletsPlayer1[i].setVisible(false);
                    this.bulletsPlayer1[i].setActive(false);
                }
            }
        }

        // Player 2 shooting
        // player 1 shooting
        if(p2_click == 1) {
            p2_click = 0;
            if (this.menuOn == false) {
                for(var i = 0; i < this.player1.getTotalAmmo();i++){
                    if(!this.bulletsPlayer2[i].active){
                        var pos = new Phaser.Math.Vector2(p2_mousex, p2_mousey);
                        this.bulletsPlayer2[i].shot(pos, this.enemyPlayer);
                    }
                }
                this.bulletMenuSound = this.sound.add('shot');
                this.bulletMenuSound.play({volume: this.registry.get("effectsVolumeFromMenu")});
            }
           console.log("Disparo recibido");
        }

        // Bullets enemy player out of bounds
        for(var i = 0; i < this.player1.getTotalAmmo() ;i++){
            if(this.bulletsPlayer2[i].active){
                //Code that we want
                //this.bulletsPlayer1[i].checkOutOfBounds(1280, 720);

                //Code that works by now
                if(this.bulletsPlayer2[i].x >= 1275 ||
                   this.bulletsPlayer2[i].x <= 5    ||
                   this.bulletsPlayer2[i].y <= 5    ||
                   this.bulletsPlayer2[i].y >= 715)
                {
                    this.bulletsPlayer2[i].setPosition(-50);
                    this.bulletsPlayer2[i].body.setVelocityX(0);
                    this.bulletsPlayer2[i].body.setVelocityY(0);
                    this.bulletsPlayer2[i].setVisible(false);
                    this.bulletsPlayer2[i].setActive(false);
                }
            }
        }

        // Life update
        this.player1.setLife(p1_life);
        p2_life = this.enemyPlayer.getLife();
        // Shield update
        //this.player1.setLife(p1_life);
        //p2_life = this.enemyPlayer.getLife();

    }
    
    launchMenu() {
        if (this.menuOn == false) {
            this.menuOn = true;
            this.scene.launch("InGameMenu");
            this.scene.bringToTop("InGameMenu");
            console.log("TEST");
        } else if (this.menuOn == true) {
            this.menuOn = false;
            this.scene.stop("InGameMenu");
        }

    }

//#region Bullets
    hit(gBullet, platform) {
        gBullet.setPosition(-50);
        gBullet.body.setVelocityX(0);
        gBullet.body.setVelocityY(0);
        gBullet.setVisible(false);
        gBullet.setActive(false);
        
    }
    hitBody(gBullet, target) {
        gBullet.setPosition(-50);
        gBullet.body.setVelocityX(0);
        gBullet.body.setVelocityY(0);
        gBullet.setVisible(false);
        gBullet.setActive(false);

        target.decreaseLife(20);
    }
//#endregion
    
    cronoFunc(time){
        // Time counter
        if (this.tcount == 0) {
            this.gap = Math.round(time * 0.001);
            this.tcount++;
        }
        var seconds = (time * 0.001); //Converted to Seconds
        var timer = 500 - Math.round(seconds) + this.gap;
        var ttext = timer.toString();
        if (timer < 495){
            sendData();
        }
        if (timer > 0) {
            if (timer > 20) {
                this.timeText.setTint(0xFFFFFF);
                this.timeText.setText(ttext);
            } else {
                if (timer % 2 == 0) {
                    this.timeText.setTint(0xFFFFFF);
                    this.timeText.setText(ttext);
                }
                if (timer % 2 == 1) {
                    this.timeText.setTint(0xFF0000);
                    this.timeText.setText(ttext);
                }
            }
        }
        else {
            this.timeText.setText("END");
            this.player1.setCountKills(this.enemyPlayer.getCountDeaths());
            this.enemyPlayer.setCountKills(this.player1.getCountDeaths());
            this.registry.set("player1", this.player1);
            this.registry.set("player2", this.enemyPlayer);
            this.scene.launch("StatsScene");
            this.scene.bringToTop("StatsScene");
            this.scene.pause("ScenePlay");
            this.scene.stop("InGameMenu");
        }
    }
    randBoostFunc(){
        // Boost generator
        var randBoost = Math.floor(Math.random() * 3) + 1;
        console.log(randBoost)
        for (var i = 0; i < this.boostArray.length; i++) {
            if (this.boostArray[i].status == false) {
                this.boostArray[i].counter++;
            }
            if (this.boostArray[i].counter == 700) {
                if (i == 0) {
                    if (randBoost == 1) {
                        this.boostArray[i] = new Boost(this, 640, 450 + 10, "live").setScale(0.3, 0.3);
                    }
                    if (randBoost == 2) {
                        this.boostArray[i] = new Boost(this, 640, 450 + 10, "bubble").setScale(0.3, 0.3);
                    }
                    if (randBoost == 3) {
                        this.boostArray[i] = new Boost(this, 640, 450 + 10, "ammo").setScale(0.15, 0.15);
                    }
                }
                if (i == 1) {
                    if (randBoost == 1) {
                        this.boostArray[i] = new Boost(this, 230, 150 + 10, "live").setScale(0.3, 0.3);
                    }
                    if (randBoost == 2) {
                        this.boostArray[i] = new Boost(this, 230, 150 + 10, "bubble").setScale(0.3, 0.3);
                    }
                    if (randBoost == 3) {
                        this.boostArray[i] = new Boost(this, 230, 150 + 10, "ammo").setScale(0.15, 0.15);
                    }
                }
                if (i == 2) {
                    if (randBoost == 1) {
                        this.boostArray[i] = new Boost(this, 1050, 150 + 10, "live").setScale(0.3, 0.3);
                    }
                    if (randBoost == 2) {
                        this.boostArray[i] = new Boost(this, 1050, 150 + 10, "bubble").setScale(0.3, 0.3);
                    }
                    if (randBoost == 3) {
                        this.boostArray[i] = new Boost(this, 1050, 150 + 10, "ammo").setScale(0.15, 0.15);
                    }
                }
                this.physics.add.collider(this.player1, this.boostArray[i], this.boostArray[i].efect);
                this.physics.add.collider(this.enemyPlayer, this.boostArray[i], this.boostArray[i].efect);
            }
        }
    }
    checkRespawn(){
        if (this.enemyPlayer.alive == false) {
            this.funnyPlayer.play();
            this.killText.setAlpha(1);
            this.killText.setPosition(this.killText.x,this.killText.y+5)
            this.enemyPlayer.dieTimer--;
        }

        if (this.enemyPlayer.alive == false && this.enemyPlayer.dieTimer == 0) {
            var idx = Math.floor(Math.random() * (3 - 0 + 1) + 0)
            //this.enemyPlayer.body.setPosition(-200,-200);
            this.killText.setAlpha(0);
            this.killText.setPosition(640,200)
            this.enemyPlayer.respawn(this.respawnPlaces[idx][0], this.respawnPlaces[idx][1])
            this.enemyPlayer.dieTimer = 200;
        }
    }
    
}
function sendData(){
        var msg = {
            left: p1_A,
            right: p1_D,
            jump: p1_W,
            mousex: p1_mousex,
            mousey: p1_mousey,
            click: p1_click,
            life: p2_life
		}

	connection.send(JSON.stringify(msg)); //convierto el msg en formato json y la envio por el socket conecction
    p1_click = 0;
}

function sendPosAux(){
    var msg = {
        posX: p1_xPos,
        posY: p1_yPos
    }
    posConnection.send(JSON.stringify(msg));
}

function connect(){
    // Sockets initializations
    connection = new WebSocket('ws://127.0.0.1:8080/game');
    posConnection = new WebSocket('ws://127.0.0.1:8080/position');
    
    // Connections
	connection.onerror = function(e) {
		console.log("WS error: " + e);
	}
    posConnection.onerror = function(e) {
		console.log("WS error: " + e);
	}

    //Desconnections
    connection.onclose = function() {
		console.log("Closing socket");
	}
    posConnection.onclose = function() {
		console.log("Closing socket");
	}

    // On messages
	connection.onmessage = function(msg) { //esto es lo que me viene
		//console.log("WS color: " + msg.data); //saco por consola el msg que me envia web
		var message = JSON.parse(msg.data) //descodifico el msg para convertirlo en message que es legible
        
        p2_A = message.left;
        p2_D = message.right;
        p2_W = message.jump;
        p2_mousex = message.mousex;
        p2_mousey = message.mousey;
        p2_click = message.click;
        p1_life = message.life;
	}
    posConnection.onmessage = function(msg) { //esto es lo que me viene
		//console.log("WS color: " + msg.data); //saco por consola el msg que me envia web
		var message = JSON.parse(msg.data) //descodifico el msg para convertirlo en message que es legible

        p2_xPos = message.posX;
        p2_yPos = message.posY;
	}

	

    //al pulsar el boton el jugador host envia esta informacion al jugador web
	$('#send-btn').click(function() { //esto es lo que yo he puesto
		sendData();
	});
}

export default ScenePlayONLINE;
