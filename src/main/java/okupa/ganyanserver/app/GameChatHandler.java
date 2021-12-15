package okupa.ganyanserver.app;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import okupa.ganyanserver.classes.Player;
import okupa.ganyanserver.classes.Room;
import okupa.ganyanserver.classes.RoomManager;
import okupa.ganyanserver.storage.Message;
import okupa.ganyanserver.storage.MessagesDB;

public class GameChatHandler extends TextWebSocketHandler {
	private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
	private ObjectMapper mapper = new ObjectMapper();
	private RoomManager manager = new RoomManager();
	
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("New user: " + session.getId());
		sessions.put(session.getId(), session);
		
		manager.addPlayer(new Player("_",session.getId()));
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("Session closed: " + session.getId());
		
		//Se encuentra al jugador en el managter
		int roomIdx = manager.getPlayerRoomIdx(session.getId());
		Player p = manager.getPlayerBySessionId(session.getId());
		Message msg = new Message("date", "GANCHAT", "P2 has left the room");
		roomIdx = manager.getPlayerRoomIdx(session.getId());
		manager.getRooms().get(roomIdx).getDatabase().setMessage(msg);
		
		//Se envia el mensaje a la sala de que se ha ido
		ObjectNode newNode = mapper.createObjectNode();
		System.out.println("Msg type info sent");
		newNode.put("type", "info");
		newNode.put("name", "Waiting for player 2...");
		String m = "GANCHAT: "+p.getName()+" has left the room";
		newNode.put("message", m);
		
		for(Player player: manager.getRooms().get(roomIdx).getPlayers()) {
			if(!player.equals(p)) {
				
				sessions.get(player.getSessionID()).sendMessage(new TextMessage(newNode.toString()));
			}
		}
		
		//Se elimina
		sessions.remove(session.getId());
		manager.removePlayer(session.getId());
		
		
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		
		//System.out.println("Message received: " + message.getPayload());
		JsonNode node = mapper.readTree(message.getPayload());
		int roomIdx = -1;
		
		//Si el mensaje es de tipo suscripcion se encuentra al jugador y se envia el mensaje al otro
		//A su vez, al otro jugador del lobby, si es que lo hay, se le envia el aviso de llegada de este
		if(node.get("type").asText().contentEquals("subscription")) {
			Message msg = new Message("date", "GANCHAT", node.get("message").asText());
			roomIdx = manager.getPlayerRoomIdx(session.getId());
			manager.getRooms().get(roomIdx).getDatabase().setMessage(msg);
			Player p = manager.getPlayerBySessionId(session.getId());
			p.setName(node.get("name").asText());
			p.setColor(node.get("color").asText());
			String otherName = "Waiting for player 2...";
			String otherColor = "0xffffff";
			String hasEntered = node.get("message").asText();
			
			for(Player player: manager.getRooms().get(roomIdx).getPlayers()) {
				if(!player.equals(p)) {
					otherName = player.getName();
					otherColor = player.getColor();
					hasEntered+="\nGANCHAT: "+otherName+" has entered the room";
			}
			}
			ObjectNode newNode = mapper.createObjectNode();
				
				newNode.put("type", node.get("type").asText());	
				newNode.put("name", p.getName());
				newNode.put("message", node.get("message").asText());
				newNode.put("color", node.get("color").asText());

				
				ObjectNode newNode2 = mapper.createObjectNode();
				
				newNode2.put("type", node.get("type").asText());	
				newNode2.put("name", otherName);
				newNode2.put("message", hasEntered);
				newNode2.put("color", otherColor);

				
				for(Player player: manager.getRooms().get(roomIdx).getPlayers()) {
					if(!player.equals(p)) {
						
						sessions.get(player.getSessionID()).sendMessage(new TextMessage(newNode.toString()));
					}else {
						sessions.get(player.getSessionID()).sendMessage(new TextMessage(newNode2.toString()));
					}
				}
				
			
		}
		
		//Si el mensaje es de tipo chat se encuentra la sala del jugador y se envia a ambos
		if(node.get("type").asText().contentEquals("chat")) {
			Message msg = new Message("date", node.get("name").asText(), node.get("message").asText());
			roomIdx = manager.getPlayerRoomIdx(session.getId());
			manager.getRooms().get(roomIdx).getDatabase().setMessage(msg);
			sendToLobbyParticipants(manager.getRooms().get(roomIdx), node);
		}

		
	}

	
	private void sendToLobbyParticipants(Room room, JsonNode node) throws IOException {

		
		//List<Message> msgs = db.getMessages();
		ObjectNode newNode = mapper.createObjectNode();
		
		if(node.get("type").asText().contentEquals("info")) {
			//System.out.println("Msg type info sent");
			newNode.put("type", node.get("type").asText());	
			newNode.put("name", node.get("name").asText());
			newNode.put("message", node.get("message").asText());
			
		}
		
		
		if(node.get("type").asText().contentEquals("chat")) {
		//System.out.println("Msg type chat sent");
		newNode.put("type", node.get("type").asText());	
		newNode.put("name", node.get("name").asText());
		newNode.put("message", node.get("message").asText());
		}
		
		
		
		
		for(Player p: room.getPlayers()) {
			sessions.get(p.getSessionID()).sendMessage(new TextMessage(newNode.toString()));
		}
		
		
		
	
	}
}
