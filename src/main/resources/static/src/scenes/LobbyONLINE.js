import Button from "../gameObjects/Button.js";
import ScenePlayONLINE from "./ScenePlayONLINE.js";
var inputText1, usernameText1, usernameText2, serverStatus="Cheking connection...", player2Status="Waiting for player 2...";
var chatRoomId;
var baseUrl =  window.location + "get/";
var userId;
var clock;
var online = false;
var server = false;
var chat = ["","",""]
var textUsersOnline = "";

class LobbyONLINE extends Phaser.Scene {
    constructor() {
        super({ key: "Lobby" });

        
    }
    create(){
        this.text=this.add.text(640,80, "LOBBY",{font: 'bold 32px Arial', fontSize: "36px"}).setOrigin(0.5,0.5)
    
        this.add.image(640, 320, "gamemode").setScale(0.4,0.4)

        
        this.serverStatus = this.add.text(640,160, "Disconnected",{font: 'bold 24px Arial', fontSize: "36px"}).setOrigin(0.5,0.5).setTint(0xff0000)
        checkConnection()
        this.userName=this.add.text(20,50, userId,{font: 'bold 20px Arial', fontSize: "20px"});
        this.numberOnline=this.add.text(20,75, textUsersOnline,{font: 'bold 20px Arial', fontSize: "20px"});

        
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
        offlineButton.on('pointerup',this.playOnline,this)
        var sendButton = new Button({
            'scene': this,
            'key':'play_buttons',
            'up': 0,
            'over':1,
            'down':2,
            'x': 50,
            'y': 700
        }).setScale(0.3,0.3);
        sendButton.on('pointerup', send,this);

        //Display text for player name
        usernameText1 = this.add.text(420, 400, '', {font: 'bold 32px Arial', color: 'white', fontSize: '15px '}).setOrigin(0.5,0.5);  
        usernameText2 = this.add.text(840, 400, player2Status, {font: 'bold 32px Arial', color: 'white', fontSize: '30px '}).setOrigin(0.5,0.5);


        //GANCHAT
        this.chatTitle = this.add.text(20, 600, 'GANCHAT', {font: 'bold 18px Arial', color: 'white', fontSize: '15px '})
        this.chat1 = this.add.text(20, 620, '', {font: 'bold 12px Arial', color: 'white', fontSize: '15px '})
        this.chat2 = this.add.text(20, 640, '', {font: 'bold 12px Arial', color: 'white', fontSize: '15px '})
        this.chat3 = this.add.text(20, 660, '', {font: 'bold 12px Arial', color: 'white', fontSize: '15px '})
        //this.chat4 = this.add.text(20, 670, '', {font: 'bold 12px Arial', color: 'white', fontSize: '15px '})
        //this.chat5 = this.add.text(20, 690, '', {font: 'bold 12px Arial', color: 'white', fontSize: '15px '})

        //Input text for player name
        var element1 = this.add.dom(420,425).createFromCache('nameform');

        inputText1 = "Player X";

        element1.addListener('click');

        element1.on('click', function (event) {

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
                    connect()
                }
                else
                {
                    alert("Player 1, please enter a username");
                }
            }
            
        });
    }
    
    goBack(){
        this.scene.start("GameMode")
        this.scene.remove("Lobby")
        disconnect()
    }
    playOnline(){
        
        
        usernameText1.destroy();
        usernameText2.destroy();
        this.registry.set('username1', inputText1);
        //this.registry.set('username2', inputText2);

        this.scene.add("ScenePlay",ScenePlayONLINE,true);
        this.scene.remove("Lobby")
        
    }
    
    update(time,delta){
        this.serverStatus.setText(serverStatus);
        usernameText2.setText("P2: "+player2Status)
        
        
        if(online === true){
            textUsersOnline = $("#onlineUsers").text();
        }else{
            textUsersOnline = "";
        }
        if(server === true){
            this.serverStatus.setTint(0x00ff00);
        }else{
            this.serverStatus.setTint(0xff0000);
        }

        
        this.chat1.setText(chat[0])
        this.chat2.setText(chat[1])
        this.chat3.setText(chat[2])
        //this.chat4.setText(chat[3])
        //this.chat5.setText(chat[4])
        this.numberOnline.setText(textUsersOnline);

    }
    
}
function connect() {
    if (!online) {
        var usernameId = inputText1;
        console.log(usernameId);
            $.ajax({
                method: "POST",
                url: baseUrl,
                data: usernameId,
                processData: false,
                headers: {
                    "Content-Type": "application/json"
                }
            }).done(function (data) {
                if (data.chatRoomId == null || data.chatRoomId == undefined) {
                   
                    online = false;
                } else {
                    chatRoomId = data.chatRoomId;
                    console.log(chatRoomId)
                    userId = data.id;
                    clock = setInterval(function () {
                        checkConnection();
                    }, 1000);
                    online = true;
                    
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
               serverStatus = "Server disconnected"
               server = false;
               clearInterval(clock);
                
            });

        
    }
}
function checkConnection() {
    $.ajax({
        url: baseUrl +"/"+ chatRoomId + "/" + userId,
    }).done(function (data) {
        if(server == true){
        //ACTUALIZA MENSAJES
        //var value = data.messages[i];
        if(data.messages.length >= 3){
            chat[0] = data.messages[data.messages.length-3].username + ": " + data.messages[data.messages.length-3].textMessage;
            chat[1] = data.messages[data.messages.length-2].username + ": " + data.messages[data.messages.length-2].textMessage;
            chat[2] = data.messages[data.messages.length-1].username + ": " + data.messages[data.messages.length-1].textMessage;
        } else if (data.messages.length == 2){
            chat[0] = data.messages[data.messages.length-2].username + ": " + data.messages[data.messages.length-2].textMessage;
            chat[1] = data.messages[data.messages.length-1].username + ": " + data.messages[data.messages.length-1].textMessage;
            chat[2] = "";
        } else if (data.messages.length == 1){
            chat[0] = data.messages[data.messages.length-1].username + ": " + data.messages[data.messages.length-1].textMessage;
            chat[1] = "";
            chat[2] = "";
        } else {
            chat[0] = "";
            chat[1] = "";
            chat[2] = "";
        }
        //ACTUALIZA ESTADO DEL JUGADOR EN RED
       for (var i = 0; i < data.users.length; i++) {
           if(data.users[i].id!=userId){
               player2Status = data.users[i].id
            }
        }
    }
        serverStatus = "Server connected"
        server = true;
        console.log(data.users)
    }).fail(function (jqXHR, textStatus, errorThrown) {
        serverStatus = "Server disconnected"
        server = false;
        clearInterval(clock);
    });

}
function disconnect() {
    if (online) {
        clearInterval(clock);
        online = false;
        //player2Status = "disconnected"
    }

}
function send() {
    var currentDate = new Date();
    var localDate = currentDate.toLocaleTimeString();
    if (online) {
        var textMessage = $("#messageInput").val();
        $("#messageInput").val("");
        $("#messageInput").val("");
        var message = {
	        date: localDate,
            username: "" + userId + "",
            textMessage: textMessage
        }
        $.ajax({
            method: "POST",
            url: baseUrl +""+ chatRoomId,
            data: JSON.stringify(message),
            processData: false,
            headers: {
                "Content-Type": "application/json"
            }
        })
        console.log("Item created: " + JSON.stringify(message));
    }
}

export default LobbyONLINE;