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
	private int maxDefaultRooms = 5;
	
	private List<ChatRoom> rooms= new ArrayList<ChatRoom>();
	
	Timer clock; 
	
	//Constructor
	public ChatRoomService() {
		for(int i =0; i<maxDefaultRooms;i++) {
			
			rooms.add(createNewRoom());
			
		}
		clock = new Timer(3000, new ActionListener(){ //Temporizador de 3 segundos
	        @Override
	        public void actionPerformed(ActionEvent e) {
	        	for(int r = 0; r<rooms.size(); r++) {
	        	for(int i = 0; i<rooms.get(r).getUsersList().size(); i++) { 
	        		User tempUser = rooms.get(r).getUsersList().get(i);
	        		if(tempUser.getOnline()) { //Comprueba la conexion de los usuarios
	                	tempUser.setOnline(true); 
	           
	                }else{
	                	DateFormat formatter = new SimpleDateFormat("dd-MM-yyyy hh:mm"); //Nota -> Cambiar formato fecha para que coincida con el de javascript
	   				 	Date currentDate = new Date(); //Establece y marca la fecha de desconexion del usuario
	   				 rooms.get(r).getDatabase().setMessage(new Message(formatter.format(currentDate),"GANCHAT", rooms.get(r).getUsersList().get(i).getId() + " has disconnected" )); //Deja por escrito en el chat que el usuario ha abandonado la sala
	   				rooms.get(r).getUsersList().remove(i); //Elimina al usuario de la lista de usaurios activos de la sala
	                	
	                }
	        	}
	        	}
	        }
	    });
		
		clock.start(); //El temporizador se pone en marcha
		
	}
	
	//Getters y setters
	
	public ChatRoom getRoomByIdx(String chatRoomId) {
		for(int r = 0; r<maxDefaultRooms; r++) {
			if(rooms.get(r).getId().equals(chatRoomId)) {
				return rooms.get(r);
			}
	}
		return null;
	}


	public User addUser(String userId) {
		
		
		
		for(int i =0; i<rooms.size();i++) {
			if(rooms.get(i).getUsersList().size()<rooms.get(i).getMaxUsers()) {
				for(int j = 0; j<rooms.get(i).getUsersList().size();j++) {
					if(rooms.get(i).getUser(userId)!=null) {
						return null;
					}
				}
				User newUser = new User(); //Se crea el nuevo usuario
				newUser.setId(userId); //Se establece su id
				newUser.setChatRoomId(rooms.get(i).getId()); //Se establece el id de su sala
				newUser.setOnline(true); //Se le marca como conectado
				rooms.get(i).getUsersList().add(newUser); //Se anade el usuario a la lista de usuarios activos de la sala
				DateFormat formatter = new SimpleDateFormat("dd-MM-yyyy hh:mm");//Nota -> Cambiar formato fecha para que coincida con el de javascript
				Date currentDate = new Date(); //Establece y marca la fecha de desconexion del usuario
				rooms.get(i).getDatabase().setMessage(new Message(formatter.format(currentDate),"GANCHAT", userId + " has connected")); //Escribe por chat que el usuario se ha unido mediante un mensaje
				return newUser;
				
			}
			
		}
		return null;
		

		
		
	}
	public ChatRoom createNewRoom() { //Creador de nuevas chatrooms
		
		ChatRoom activeRoom = new ChatRoom();
		Random rand = new Random();
		activeRoom.setMaxUsers(maxDefaultUsers);
		String alphabet = "123xyz";
		activeRoom.setId("" + alphabet.charAt(rand.nextInt(alphabet.length())) + (long)(Math.floor(rand.nextDouble()*999)) + alphabet.charAt(rand.nextInt(alphabet.length())) + (long)(Math.floor(rand.nextDouble()*999))); //Crea un id aleatorio alfanumerico para la sala
		activeRoom.getDatabase().setPath("chatDatabase/ChatRecordId_" + activeRoom.getId() + ".txt"); //Genera el txt donde se guardaran los mensajes con una ruta especificada
		
		return activeRoom;
		
	}
	
	
	public void markOnlineUser(String chatRoomId, String userId) { //Comprueba si el usuario sigue conectado. Tambien controla si hay una habitacion que se ha quedado vacia;
		for(int r = 0; r<maxDefaultRooms; r++) {
			if(rooms.get(r).getId()==chatRoomId) {
				System.out.print("Paso por aquiiii");
				//if(rooms.get(r).getUsersList().size()!=0) {
		User tempUser = rooms.get(r).getUser(userId);
		if(tempUser.getOnline()==false) {
			rooms.get(r).getUsersList().remove(tempUser); //Si no esta online lo saca y elimina.
		}
		/*
				}else {
					System.out.print("Paso por aqui");
					rooms.set(r, createNewRoom());//Si esta vacia la sustituye por una nueva habitacion. Para proteger datos de la habiaticación antigua
				}
				*/
		break;
			}
		}
	}
	
	public List<Message> returnMessages(String chatRoomId, String userId){
		
		for(int r = 0; r<maxDefaultRooms; r++) {
			
			if(rooms.get(r).getId().equals(chatRoomId)) {
		
		if(rooms.get(r).getUser(userId)!=null) {
			return rooms.get(r).getDatabase().getMessages(); //Devolvemos los mensajes guardados de la sala activa
		}
		
		List<Message> tempList = new ArrayList<>();
		tempList.add(new Message("4321", "GANCHAT", "Invalid user")); //Si no se cumple la condicion anterior, devolvemos usuario no valido
		return tempList;
		
			}
		}
		return null;
		
	}
	
	public List<User> returnUsers(String chatRoomId, String userId) {
		
		//List<String> tempList = new ArrayList<>();
		//String error = "Conexion invalida";
		for(int r = 0; r<maxDefaultRooms; r++) {
			
			if(rooms.get(r).getId().equals(chatRoomId)) {
		
		if(rooms.get(r).getUser(userId)!=null) {
			return rooms.get(r).getUsersList();
		}
		//tempList.add("GANCHAT " + "1234 " + "Conexion invalida");
		return rooms.get(r).getUsersList();
		}
			
		}
		return null;
	}
}
