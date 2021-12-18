package okupa.ganyanserver.app;

import java.io.IOException;
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





public class GameProcessHandler extends TextWebSocketHandler {

	private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
	private ObjectMapper mapper = new ObjectMapper();
	private RoomManager manager = new RoomManager();
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("New Player: " + session.getId());
		sessions.put(session.getId(), session);
		
		manager.addPlayer(new Player("_",session.getId()));
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("Session closed: " + session.getId());

		//Se elimina
		sessions.remove(session.getId());
		manager.removePlayer(session.getId());
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		
		JsonNode node = mapper.readTree(message.getPayload());
		//System.out.println("Message recieve: " + message.getPayload());
		//int roomIdx = manager.getPlayerRoomIdx(session.getId());
		//sendToLobbyParticipants(manager.getRooms().get(roomIdx), node);
		sendOtherPlayers(session,node);
		
	}

private void sendToLobbyParticipants(Room room, JsonNode node) throws IOException {

	double randBoost = Math.floor(Math.random() * 3) + 1;
		
		//List<Message> msgs = db.getMessages();
		ObjectNode newNode = mapper.createObjectNode();
		//newNode.put("type", node.get("type").asText());
		newNode.put("left", node.get("left").asText());
		newNode.put("right", node.get("right").asText());
		newNode.put("jump", node.get("jump").asText());
		newNode.put("mousex", node.get("mousex").asText());
		newNode.put("mousey", node.get("mousey").asText());
		newNode.put("click", node.get("click").asText());
		newNode.put("life", node.get("life").asText());
		//newNode.put("shield", node.get("shield").asText());
		
		
		/*
		for(Player player: manager.getRooms().get(roomIdx).getPlayers()) {
			if(!player.equals()) {
				
				sessions.get(player.getSessionID()).sendMessage(new TextMessage(newNode.toString()));
			}
		}
		*/
		
	
	}

private void sendOtherPlayers(WebSocketSession session, JsonNode node) throws IOException {
	
	
	ObjectNode newNode = mapper.createObjectNode();
	newNode.put("type", node.get("type").asText());
	
	if(node.get("type").asText().contentEquals("movement")){
		newNode.put("left", node.get("left").asText());
		newNode.put("right", node.get("right").asText());
		newNode.put("jump", node.get("jump").asText());
	}
	if(node.get("type").asText().contentEquals("mouse")) {	
		newNode.put("mousex", node.get("mousex").asText());
		newNode.put("mousey", node.get("mousey").asText());
		newNode.put("click", node.get("click").asText());
	}
	if(node.get("type").asText().contentEquals("status")) {		
		newNode.put("life", node.get("life").asText());
		newNode.put("shield", node.get("shield").asText());
	}
	if(node.get("type").asText().contentEquals("position")) {
		newNode.put("posX", node.get("posX").asText());
		newNode.put("posY", node.get("posY").asText());
	}
	if(node.get("type").asText().contentEquals("boost")) {
		double randBoost = Math.floor(Math.random() * 3) + 1;
		newNode.put("indexBoost", (int)randBoost);
		System.out.println("Message sent: " + randBoost);
		session.sendMessage(new TextMessage(newNode.toString()));
		//newNode.put("posY", node.get("posY").asText());
	}
	//newNode.put("shield", node.get("shield").asText());
	
	
	
	for(WebSocketSession participant : sessions.values()) {
		if(!participant.getId().equals(session.getId())) {
			participant.sendMessage(new TextMessage(newNode.toString()));
			
		}
	}
}

}
