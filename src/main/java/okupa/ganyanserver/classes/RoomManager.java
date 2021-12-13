package okupa.ganyanserver.classes;

import java.util.ArrayList;
import java.util.Random;


public class RoomManager {

	
	private ArrayList<Room> rooms = new ArrayList<Room>();
	
	public RoomManager() {
			//rooms.add(createNewRoom());
	}
	
	

	public ArrayList<Room> getRooms() {
		return rooms;
	}

	public void setRooms(ArrayList<Room> rooms) {
		this.rooms = rooms;
	}
    public Room createNewRoom() { //Creador de nuevas chatrooms
		
		Random rand = new Random();
		String alphabet = "123xyz";
		Room newRoom = new Room("" + alphabet.charAt(rand.nextInt(alphabet.length())) + (long)(Math.floor(rand.nextDouble()*999)) + alphabet.charAt(rand.nextInt(alphabet.length())) + (long)(Math.floor(rand.nextDouble()*999)));
		newRoom.getDatabase().setPath("chatDatabase/ChatRecordId_" + newRoom.getId() + ".txt"); //Genera el txt donde se guardaran los mensajes con una ruta especificada
		System.out.println("Room: " + newRoom.getId() );
		return newRoom;
		
	}
    public boolean addPlayer(Player p) {
    	for(int i = 0; i<this.rooms.size();i++) {
    		if(this.rooms.get(i).getPlayers().size()<2) {
    			this.rooms.get(i).addPlayer(p);
    			System.out.println("Room: " + this.rooms.get(i).getId() + "Size: "+ this.rooms.get(i).getPlayers().size());
    			return true; //Devuelve true si habia hueco, para el bucle
    		}
    	}
    	Room auxRoom = this.createNewRoom();
    	auxRoom.addPlayer(p);
    	this.rooms.add(auxRoom);
    	System.out.println("New Room: " + auxRoom.getId());
    	return false; //Si no habia hueco, crea una nueva habitación y lo mete dentro
    }
	
    public boolean removePlayer(String sessionId) {
    	for(int i = 0; i<this.rooms.size();i++) {
    		
    		if(this.rooms.get(i).getPlayers().get(0).getSessionID().equals(sessionId)) {
    			this.rooms.get(i).getPlayers().remove(0);
    			
    			System.out.println("Room: " + this.rooms.get(i).getId() + "Size: "+ this.rooms.get(i).getPlayers().size());
    			
    			if(this.rooms.get(i).getPlayers().isEmpty()) { //Si no queda jugadores, elimina la habitación completamente.
    				this.rooms.remove(i);
    			}
    			return true;
    		}else if(this.rooms.get(i).getPlayers().get(1).getSessionID().equals(sessionId)) {
    			this.rooms.get(i).getPlayers().remove(1);
    			
    			System.out.println("Room: " + this.rooms.get(i).getId() + "Size: "+ this.rooms.get(i).getPlayers().size());
    			
    			if(this.rooms.get(i).getPlayers().isEmpty()) { //Si no queda jugadores, elimina la habitación completamente.
    				this.rooms.remove(i);
    			}
    			return true;
    		}
    		
    		
    	}
    	System.out.print("Player doesnt exist");
    	return false; //No se encontro a ese jugador
    }
	
    public int getPlayerRoomIdx(String sessionId) {
    	for(int i = 0; i<this.rooms.size();i++) {
    		
    	if(this.rooms.get(i).getPlayers().get(0).getSessionID().equals(sessionId)) {
			
    		return i;
		}else if(this.rooms.get(i).getPlayers().get(1).getSessionID().equals(sessionId)) {
			
			return i;
		}
    	
    	}
    	return -1;
    	
    }
    public Player getPlayerBySessionId(String sessionId) {
    	for(int i = 0; i<this.rooms.size();i++) {
    		
        	if(this.rooms.get(i).getPlayers().get(0).getSessionID().equals(sessionId)) {
    			
        		return this.rooms.get(i).getPlayers().get(0);
    		}else if(this.rooms.get(i).getPlayers().get(1).getSessionID().equals(sessionId)) {
    			
    			return this.rooms.get(i).getPlayers().get(1);
    		}
        	
        	}
        	return null;
    }
}
