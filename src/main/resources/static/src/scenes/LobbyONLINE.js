import Button from "../gameObjects/Button.js";
import ScenePlayONLINE from "./ScenePlayONLINE.js";
var inputText1, usernameText1, usernameText2, serverStatus="SERVER CONNECTED", player2Status="Waiting for player 2...";


var userId;

var online = false;
var server = true;

var sendText = "";

var chatSocket;
var interval;

var StartPlayInterval;
var player1Color ="0xffffff";
var player2Color ="0xffffff";
var ready2 = false;
var counter = 5;
var scene;
	
class LobbyONLINE extends Phaser.Scene {
    constructor() {
        super({ key: "Lobby" });

        
    }
    
    create(){
        this.text=this.add.text(640,80, "LOBBY",{fontFamily: 'army_font', fontSize:'50px' }).setOrigin(0.5,0.5)
    	//setCheck();
        this.add.image(640, 320, "gamemode").setScale(0.4,0.4)
		scene = this.scene.get("Lobby")
        this.socketRef;
        this.serverStatus = this.add.text(640,160, "Disconnected",{fontFamily: 'army_font', fontSize: "36px"}).setOrigin(0.5,0.5).setTint(0xff0000)
        // Comprueba si el servidor está conectado de primeras
        //checkConnection();
        this.checkServer;
        this.positionP1;
		
        
        this.idle1 = this.add.image(420, 285, "idle")//.setTint(0xffffff);
        this.idle1.flipX=true;
        this.idle2 = this.add.image(840, 285, "idle").setAlpha(0);
        
        var exit_button = new Button({
            'scene': this,
            'key':'button_basic',
            'up': 0,
            'over':1,
            'down':2,
            'x': 1010,
            'y': 186
        },"disconnect").setScale(0.7,0.7);
        //exit_button.content.setText("disconnect")  text,{fontFamily: 'army_font', fontSize:'45px'  }).setOrigin(0.5,0.5).setTint(0x250303 ).setAlpha(0.8)
        exit_button.on('pointerup',this.goBack,this);
        var offlineButton = new Button({
            'scene': this,
            'key':'button_basic',
            'up': 0,
            'over':1,
            'down':2,
            'x': 640,
            'y': 490
        },"ready").setScale(0.9,0.9);
        offlineButton.on('pointerup',this.setReady,this);
        //offlineButton.on('pointerup',this.playOnline,this);

        //Display text for player name
        usernameText1 = this.add.text(420, 400, '', {fontFamily: 'army_font', color: 'black', fontSize: '30px '}).setOrigin(0.5,0.5);  
        usernameText2 = this.add.text(840, 400, player2Status, {fontFamily: 'army_font', color: 'black', fontSize: '30px '}).setOrigin(0.5,0.5);
		
		this.readyText1 =this.add.text(420, 450, 'READY', {fontFamily: 'army_font', color: 'black', fontSize: '30px '}).setOrigin(0.5,0.5).setAlpha(0);
		this.readyText2 =this.add.text(840, 450, 'READY', {fontFamily: 'army_font', color: 'black', fontSize: '30px '}).setOrigin(0.5,0.5).setAlpha(0);
		
		this.ready = false;
        //GANCHAT
        this.chatTitle = this.add.text(20, 530, 'GANCHAT', {fontFamily: 'army_font', color: 'white', fontSize: '35px '}).setTint(0xffff00)
        

        //Input text for player name
        var elementHTML1 = this.add.dom(420, 425).createFromCache('connection');
        var elementHTML2 = this.add.dom(220, 705).createFromCache('sendMessage');
        var elementHTML3 = this.add.dom(150, 622).createFromCache('chat');
        var elementHTML4 = this.add.dom(420, 285).createFromCache('color');
        
        this.changeColor = this.add.text(420, 200, 'click on avatar to change color', {fontFamily: 'army_font', color: 'black', fontSize: '25px '}).setOrigin(0.5,0.5);
        this.countDownText = this.add.text(640, 300,counter, {fontFamily: 'army_font', color: 'black', fontSize: '100px '}).setOrigin(0.5,0.5).setAlpha(0);
        
        elementHTML4.addListener('change');
         elementHTML4.on('change', function (event) {
			//console.log("0x"+event.target.value.slice(8,0))	
			if(!online){
			player1Color = event.target.value;
			//console.log("0x"+player1Color.slice(1))
			player1Color="0x"+player1Color.slice(1)
			}
	});
        
        inputText1 = "Player 1";

        elementHTML1.addListener('click');

        elementHTML1.on('click', function (event) {

            if (event.target.name === 'playButton')
            {
            
                inputText1 = this.getChildByName('nameField');

                //  Have they entered anything?
                if (inputText1.value !== '')
                {
                    //  Turn off the click events
                    this.removeListener('click');

                    //  Hide the login element
                    this.setVisible(false);

                    //  Populate the text with whatever they typed in
                    inputText1 = inputText1.value;
                    
                    console.log("Soy " + inputText1);
                    usernameText1.setText('P1: ' + inputText1);
                    //usernameText.setText('Username: ' + this.registry.get('username'));
                    connect();
                    online = true
                     elementHTML4.setActive(false)
                    userId = inputText1;
                   
		
                }
                else
                {
                    alert("Player 1, please enter a username");
                }
            }
            
        });

        elementHTML2.addListener('click');
        
        elementHTML2.on('click', function (event) {
	if(online==true){
	 if (event.target.name === 'sendButton')
            {
                sendText = this.getChildByName('sendMessage');
                if (sendText.value !== ''){
                    
	 			 var textMessage = sendText.value;
           var msg = {
			type: "chat",
			name: userId,
            message: textMessage
		}
                    sendText.value = "";
					chatSocket.send(JSON.stringify(msg));
					
                }
            }
	  } else
                {
                    alert("Player 1, please enter a username and connect");
                }
        });
    
        
    }
    
    goBack(){
        //disconnect()
        inputText1 = null; usernameText1=null; usernameText2=null,  player2Status="Waiting for player 2...";
       
        
        userId = -1;
       
       	
       if(online){
        chatSocket.close()
        online = false;
        clearInterval(this.checkServer);
	
}
		player1Color ="0xffffff";
        //clearCheck();
        clearInterval(StartPlayInterval);
        server = true;
        ready2 = false;
        counter=5;
        this.scene.start("GameMode")
        this.scene.remove("Lobby")
    }
    setReady(){
	  if(player2Status!="Waiting for player 2..." && this.ready == false){
		this.readyText1.setAlpha(1)
		 var msg = {
			type: "ready"
			
		}
                    
		chatSocket.send(JSON.stringify(msg));
		this.ready = true;
	}else{
		alert("Wait for player 2")
	}
}
    
    playOnline(){
        
        if(player2Status!="Waiting for player 2..."){
        
        this.registry.set('username1', inputText1);
         this.registry.set('username2', player2Status);
         this.registry.set('color1', player1Color);
         this.registry.set('color2', player2Color);
         
         this.registry.set('position1', this.positionP1);
         if(this.positionP1==50){
			this.registry.set('position2', 1230);
}else{
	this.registry.set('position2', 50);
}
         
         
        //this.registry.set('username2', inputText2);
        this.scene.add("ScenePlay",ScenePlayONLINE,true);
        
       
       
        
        
       
        
       
        this.scene.sleep("Lobby");
        }else{
		alert("Player 2 is not ready")
}
        
    }
    
   
    
    update(time,delta){
        this.serverStatus.setText(serverStatus);
        usernameText2.setText("P2: "+player2Status)
        if(!online){
	this.changeColor.setAlpha(1)
}else{
	this.changeColor.setAlpha(0)
}
        
if(player2Status!="Waiting for player 2..."){
	this.idle2.setAlpha(1)
		this.idle2.setTint(player2Color)
	}else{
		this.idle2.setAlpha(0)
		
	}
        
        if(server === true){
            this.serverStatus.setTint(0x00ff00);
        }else{
            this.serverStatus.setTint(0xff0000);
        }
        
        if(ready2 ==true){
	
	this.readyText2.setAlpha(1);
}else{
	this.readyText2.setAlpha(0);

}

       this.idle1.setTint(player1Color) 
       if(counter<=4 && counter>=0){
	 this.countDownText.setAlpha(1);
	 this.countDownText.setText(counter)
}
       
       if(counter ==0){
	counter -1
	//this.playOnline();
}
       
    }
    
    reset(){
        inputText1 = null; usernameText1=null; usernameText2=null,  player2Status="Waiting for player 2...";
       
        
        userId = -1;
       
       	
      
        online = false;
	

		player1Color ="0xffffff";
        //clearCheck();
        clearInterval(StartPlayInterval);
        server = true;
        ready2 = false;
        counter=5;
		clearInterval(scene.checkServer);
	
}
}
function connect(){
	chatSocket = new WebSocket('ws://127.0.0.1:8080/chat');
	scene.socketRef = chatSocket;
                    chatSocket.onerror = function(e) {
		console.log("WS error: " + e);
		server = false;
		serverStatus = "SERVER DISCONNECTED"
		clearInterval(scene.checkServer)
	}
    
	chatSocket.onmessage = function(msg) {
		console.log("WS message: " + msg.data);
		var message = JSON.parse(msg.data)
		
		if(message.type=="subscription"){
		console.log("subscription")	
		$('.chat').val($('.chat').val() + "\n"+ message.message);
		player2Status = message.name
		player2Color = message.color
		player2Color = "0x"+player2Color.slice(2)
		console.log(player2Color)
		}
		
		if(message.type=="player2ready"){
		console.log("player2ready")	
		ready2 = true;
		}
		if(message.type=="ready"){
		console.log("Game starts in 10 seconds")	
		ready2 = true;
		StartPlayInterval = setInterval(countDown, 1000);
		scene.positionP1 = message.position;
		}
		
		if(message.type=="chat"){
			console.log("chat")	
		$('.chat').val($('.chat').val() + "\n" + message.name + ": " + message.message);
		}
		
		if(message.type=="info"){
			player2Status = message.name
			$('.chat').val($('.chat').val() + "\n" +message.message);
			clearInterval(StartPlayInterval);
			ready2= false;
			scene.ready = false;
			scene.readyText1.setAlpha(0)
			counter = 5;
			scene.countDownText.setText(counter)
			//escene.elementHTML4.setActive(true)
		}

		var psconsole = $('.chat');
    	if(psconsole.length)
       	psconsole.scrollTop(psconsole[0].scrollHeight - psconsole.height());

		
		//player2Status = message.name
	}
	chatSocket.onclose = function() {
		console.log("Closing socket");
		
	}
	chatSocket.binaryType;
	server = true
	serverStatus="SERVER CONNECTED"
	interval = setInterval(checkConnectionStatus, 1000);
}
	
	function checkConnectionStatus() {
       if(chatSocket.OPEN){
	 var msg = {
					type: "subscription",
					name: userId,
            		message: "GANCHAT: "+userId+" has entered the room",
            		color: player1Color
		}
                   
					chatSocket.send(JSON.stringify(msg));
					scene.checkServer = setInterval(function(){
						if(chatSocket.CLOSED){
							server = false;
							serverStatus = "SERVER DISCONNECTED"
		
							}else{
								server = true;
								serverStatus = "SERVER CONNECTED"
							}
						}, 3000);
					clearInterval(interval);
}
     }

	function countDown(){
		if(counter==0){
			clearInterval(StartPlayInterval);
			scene.playOnline()
			//LobbyONLINE.playOnline();
		}else{
			
		counter = counter-1
		}
		
		
	}

export default LobbyONLINE;