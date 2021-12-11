package okupa.ganyanserver.classes;
import java.util.ArrayList;
import java.util.Random;

import okupa.ganyanserver.storage.MessagesDB;

public class Room {

	private String id;
	private static final int MAX_PLAYERS = 2;
	private ArrayList<Player> players = new ArrayList<Player>(); 
	private MessagesDB database;
	
	
	public Room(String code) {
		
		this.id = code;
		this.database = new MessagesDB();
		this.database.setPath("chatDatabase/ChatRecordId_" + this.id + ".txt"); //Genera el txt donde se guardaran los mensajes con una ruta especificada
	}
	public MessagesDB getDB() { return database; }

	public void addPlayer(Player p) {
		players.add(p);
	}
	public void removePlayer(Player p) {
		players.remove(p);
	}

	public String getId() {
		return id;
	}


	public void setId(String id) {
		this.id = id;
	}


	public ArrayList<Player> getPlayers() {
		return players;
	}


	public void setPlayers(ArrayList<Player> players) {
		this.players = players;
	}


	public MessagesDB getDatabase() {
		return database;
	}


	public void setDatabase(MessagesDB messages) {
		this.database = messages;
	}


	public static int getMaxPlayers() {
		return MAX_PLAYERS;
	}
	
	public int generateRandomBoosterIdx() {
		Random rand = new Random();
		return rand.nextInt(2) + 0;
	}
	
}
