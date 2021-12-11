import Button from "../gameObjects/Button.js";
import ScenePlayONLINE from "./ScenePlayONLINE.js";
var inputText1, usernameText1, usernameText2, serverStatus="SERVER CONNECTED", player2Status="Waiting for player 2...";
var chatRoomId;
var baseUrl =  window.location + "get/";
var userId;
var clock;
var online = false;
var server = true;
var chat = ["","",""]
var sendText = "";

var chatSocket;


	
class LobbyONLINE extends Phaser.Scene {
    constructor() {
        super({ key: "Lobby" });

        
    }
    
    create(){
        this.text=this.add.text(640,80, "LOBBY",{fontFamily: 'army_font', fontSize:'50px' }).setOrigin(0.5,0.5)
    
        this.add.image(640, 320, "gamemode").setScale(0.4,0.4)

        
        this.serverStatus = this.add.text(640,160, "Disconnected",{fontFamily: 'army_font', fontSize: "36px"}).setOrigin(0.5,0.5).setTint(0xff0000)
        // Comprueba si el servidor está conectado de primeras
        //checkConnection();
        

        
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
        exit_button.on('pointerup',this.goBack,this);
        var offlineButton = new Button({
            'scene': this,
            'key':'button_basic',
            'up': 0,
            'over':1,
            'down':2,
            'x': 640,
            'y': 490
        },"play").setScale(0.9,0.9);
        offlineButton.on('pointerup',this.playOnline,this);

        //Display text for player name
        usernameText1 = this.add.text(420, 400, '', {fontFamily: 'army_font', color: 'white', fontSize: '30px '}).setOrigin(0.5,0.5);  
        usernameText2 = this.add.text(840, 400, player2Status, {fontFamily: 'army_font', color: 'white', fontSize: '30px '}).setOrigin(0.5,0.5);


        //GANCHAT
        this.chatTitle = this.add.text(20, 530, 'GANCHAT', {fontFamily: 'army_font', color: 'white', fontSize: '35px '}).setTint(0xffff00)
        this.chat1 = this.add.text(20, 600, '', {font: 'bold 12px Arial', color: 'white', fontSize: '20px '}).setTint(0xffff00)
        this.chat2 = this.add.text(20, 625, '', {font: 'bold 12px Arial', color: 'white', fontSize: '20px '}).setTint(0xffff00)
        this.chat3 = this.add.text(20, 650, '', {font: 'bold 12px Arial', color: 'white', fontSize: '20px '}).setTint(0xffff00)
        //this.chat4 = this.add.text(20, 670, '', {font: 'bold 12px Arial', color: 'white', fontSize: '15px '})
        //this.chat5 = this.add.text(20, 690, '', {font: 'bold 12px Arial', color: 'white', fontSize: '15px '})

        //Input text for player name
        var elementHTML1 = this.add.dom(420, 425).createFromCache('connection');
        var elementHTML2 = this.add.dom(220, 705).createFromCache('sendMessage');
        var elementHTML3 = this.add.dom(150, 622).createFromCache('chat');
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
                    
                    userId = inputText1;
                   
           	var msg = {
			name: userId,
            message: "Has connected"
		}
                    
		//chatSocket.send(JSON.stringify(msg));
		if(chat[0]==""){
						chat[0]= userId + ": " + "Has connected";
					}else if(chat[1]==""){
						chat[0]=chat[1];
						chat[1]= userId + ": " + "Has connected";
					}else if(chat[2]==""){
						chat[0]=chat[1];
						chat[1]=chat[2];
						chat[2]= userId + ": " + "Has connected";
						}
                }
                else
                {
                    alert("Player 1, please enter a username");
                }
            }
            
        });

        elementHTML2.addListener('click');
        
        elementHTML2.on('click', function (event) {
	 if (event.target.name === 'sendButton')
            {
                sendText = this.getChildByName('sendMessage');
                if (sendText.value !== ''){
                    
	 			 var textMessage = sendText.value;
           var msg = {
			name: userId,
            message: textMessage
		}
                    sendText.value = "";
					chatSocket.send(JSON.stringify(msg));
					/*
					if(chat[0]==""){
						chat[0]= userId + ": " + textMessage;
					}else if(chat[1]==""){
						chat[0]=chat[1];
						chat[1]= userId + ": " + textMessage;
					}else if(chat[2]==""){
						chat[0]=chat[1];
						chat[1]=chat[2];
						chat[2]= userId + ": " + textMessage;
						}
						*/
                }
            }
	   // $('#chat').val($('#chat').val() + "\n" + msg.name + ": " + msg.message);
        });
    
        
    }
    
    goBack(){
        //disconnect()
        inputText1 = null; usernameText1=null; usernameText2=null, serverStatus="Cheking connection...", player2Status="Waiting for player 2...";
        chatRoomId = -1;
        baseUrl =  window.location + "get/";
        userId = -1;
        clock = null;
        online = false;
        server = false;
        chat = ["","",""]
        sendText = "";
        this.scene.start("GameMode")
        this.scene.remove("Lobby")
    }
    playOnline(){
        
        if(player2Status!="Waiting for player 2..."){
        usernameText1.destroy();
        usernameText2.destroy();
        this.registry.set('username1', inputText1);
         this.registry.set('username2', player2Status);
        //this.registry.set('username2', inputText2);
        this.scene.add("ScenePlay",ScenePlayONLINE,true);
        inputText1 = null; usernameText1=null; usernameText2=null, serverStatus="Cheking connection...", player2Status="Waiting for player 2...";
        chatRoomId = -1;
        baseUrl =  window.location + "get/";
        userId = -1;
        clock = null;
        online = false;
        server = false;
        chat = ["","",""];
        sendText = "";
        this.scene.sleep("Lobby");
        }
        
    }
    
    sendMessage(){
	 var textMessage = sendText.value;
           var msg = {
			name: userId,
            message: textMessage
		}
            sendText.value = "";
		chatSocket.send(JSON.stringify(msg));
		
}
    
    update(time,delta){
        this.serverStatus.setText(serverStatus);
        usernameText2.setText("P2: "+player2Status)
        

        
        if(server === true){
            this.serverStatus.setTint(0x00ff00);
        }else{
            this.serverStatus.setTint(0xff0000);
        }

        
        this.chat1.setText(chat[0])
        this.chat2.setText(chat[1])
        this.chat3.setText(chat[2])
       
    }
    
    
}
function connect(){
	chatSocket = new WebSocket('ws://127.0.0.1:8080/chat');
                    chatSocket.onerror = function(e) {
		console.log("WS error: " + e);
		server = false;
		serverStatus = "SERVER DISCONNECTED"
	}
	chatSocket.onmessage = function(msg) {
		console.log("WS message: " + msg.data);
		var message = JSON.parse(msg.data)
		/*
		chat[2] = message.name1 + ": " + message.message1;
		chat[1] = message.name2 + ": " + message.message2;
		chat[0] = message.name3 + ": " + message.message3;
		*/
		//elementHTML3.getChildByName('chat');
		$('.chat').val($('.chat').val() + "\n" + message.name + ": " + message.message);

		var psconsole = $('.chat');
    	if(psconsole.length)
       	psconsole.scrollTop(psconsole[0].scrollHeight - psconsole.height());

		chat[0] = message.name + ": " + message.message;
		//player2Status = message.name
	}
	chatSocket.onclose = function() {
		console.log("Closing socket");
	}
	chatSocket.binaryType;
	
	
}
	
	

	



export default LobbyONLINE;