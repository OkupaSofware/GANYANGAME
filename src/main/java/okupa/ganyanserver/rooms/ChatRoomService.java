package okupa.ganyanserver.rooms;

import org.springframework.stereotype.Component;

import okupa.ganyanserver.messages.Message;

import javax.swing.Timer;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

@Component
public class ChatRoomService {

	private int maxDefaultUsers = 2; //Numero maximo por defecto de participantes permitidos
	
	private ChatRoom activeRoom = new ChatRoom(); //Sala actual
	
	Timer clock = new Timer(3000, new ActionListener(){ //Temporizador de 3 segundos
        @Override
        public void actionPerformed(ActionEvent e) {
        	for(int i = 0; i<activeRoom.getUsersList().size(); i++) { 
        		User tempUser = activeRoom.getUsersList().get(i);
        		if(tempUser.getOnline()) { //Comprueba la conexion de los usuarios
                	tempUser.setOnline(false); 
           
                }else{
                	DateFormat formatter = new SimpleDateFormat("dd-MM-yyyy hh:mm"); //Nota -> Cambiar formato fecha para que coincida con el de javascript
   				 	Date currentDate = new Date(); //Establece y marca la fecha de desconexion del usuario
   				 	activeRoom.getDatabase().setMessage(new Message(formatter.format(currentDate),"GANCHAT", activeRoom.getUsersList().get(i).getId() + " has disconnected" )); //Deja por escrito en el chat que el usuario ha abandonado la sala
   				 	activeRoom.getUsersList().remove(i); //Elimina al usuario de la lista de usaurios activos de la sala
                	
                }
        	}
            
        }
    });
	
	//Constructor
	public ChatRoomService() {
		Random rand = new Random();
		activeRoom.setMaxUsers(maxDefaultUsers);
		String alphabet = "123xyz";
		activeRoom.setId("" + alphabet.charAt(rand.nextInt(alphabet.length())) + (long)(Math.floor(rand.nextDouble()*999)) + alphabet.charAt(rand.nextInt(alphabet.length())) + (long)(Math.floor(rand.nextDouble()*999))); //Crea un id aleatorio alfanumerico para la sala
		activeRoom.getDatabase().setPath("chatDatabase/ChatRecordId_" + activeRoom.getId() + ".txt"); //Genera el txt donde se guardaran los mensajes con una ruta especificada
		clock.start(); //El temporizador se pone en marcha
	}
	
	//Getters y setters
	public ChatRoom getActiveRoom() {
		return activeRoom;
	}

	public void setActiveRoom(ChatRoom activeRoom) {
		this.activeRoom = activeRoom;
	}

	public User addUser(String userId) {
		
		for(int i = 0; i<activeRoom.getUsersList().size();i++) {
			if(activeRoom.getUser(userId)!=null) {
				return null;
			}
		}

		User newUser = new User(); //Se crea el nuevo usuario
		newUser.setId(userId); //Se establece su id
		newUser.setChatRoomId(activeRoom.getId()); //Se establece el id de su sala
		newUser.setOnline(true); //Se le marca como conectado
		activeRoom.getUsersList().add(newUser); //Se anade el usuario a la lista de usuarios activos de la sala
		DateFormat formatter = new SimpleDateFormat("dd-MM-yyyy hh:mm");//Nota -> Cambiar formato fecha para que coincida con el de javascript
		Date currentDate = new Date(); //Establece y marca la fecha de desconexion del usuario
		activeRoom.getDatabase().setMessage(new Message(formatter.format(currentDate),"GANCHAT", userId + " has connected")); //Escribe por chat que el usuario se ha unido mediante un mensaje
		return newUser;
	}
	
	public void markOnlineUser(String chatRoomId, String userId) {
		User tempUser = activeRoom.getUser(userId);
		if(tempUser!=null) { //Si el usuario no esta ya en al sala...
			tempUser.setOnline(true); //...se le marca como conectado
		}
	}
	
	public List<Message> returnMessages(String chatRoomId, String userId){
		
		if(!activeRoom.getId().equals(chatRoomId)) { //Si la sala que nos envia el servidor y la que tenemos activa no coinciden...
			List<Message> tempList = new ArrayList<>();
			tempList.add(new Message("1234", "GANCHAT", "Invalid connection")); //...devolvemos que la conexion es invalida
			return tempList;
		}
		
		if(activeRoom.getUser(userId)!=null) {
			return activeRoom.getDatabase().getMessages(); //Devolvemos los mensajes guardados de la sala activa
		}
		
		List<Message> tempList = new ArrayList<>();
		tempList.add(new Message("4321", "GANCHAT", "Invalid user")); //Si no se cumple la condicion anterior, devolvemos usuario no valido
		return tempList;
		
	}
	
	public List<String> returnUsers(String chatRoomId, String userId) {
		
		List<String> tempList = new ArrayList<>();
		
		if(!activeRoom.getId().equals(chatRoomId)) { //Si la sala que nos envia el servidor y la que tenemos activa no coinciden...
			tempList.add("GANCHAT " + "1234 " + "Invalid connection"); //...devolvemos que la conexion es invalida
			return tempList;
		}
		if(activeRoom.getUser(userId)!=null) {
			for(int i = 0; i<activeRoom.getUsersList().size(); i++) {
				tempList.add(activeRoom.getUsersList().get(i).getId()); //Si existe el usuario, devolvemos la lista de los mismos
			}
			return tempList;
		}
		tempList.add("GANCHAT " + "1234 " + "Conexion invalida");
		return tempList;
	}
}
