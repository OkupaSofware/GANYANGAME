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
import okupa.ganyanserver.classes.RoomManager;





public class GameProcessHandler extends TextWebSocketHandler {

	private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
	private ObjectMapper mapper = new ObjectMapper();
	private RoomManager manager = new RoomManager();
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("New player: " + session.getId());
		sessions.put(session.getId(), session);
		
		//manager.getRooms().get(0).addPlayer(new Player(session.getId()));
		
		
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("Session closed: " + session.getId());
		sessions.remove(session.getId());
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		
		JsonNode node = mapper.readTree(message.getPayload());
		
		sendOtherPlayers(session, node);
	}

	private void sendOtherPlayers(WebSocketSession session, JsonNode node) throws IOException {

		double randBoost = Math.floor(Math.random() * 3) + 1;
		System.out.println("Message sent: " + randBoost);
		
		ObjectNode newNode = mapper.createObjectNode();
		newNode.put("left", node.get("left").asText());
		newNode.put("right", node.get("right").asText());
		newNode.put("jump", node.get("jump").asText());
		newNode.put("mousex", node.get("mousex").asText());
		newNode.put("mousey", node.get("mousey").asText());
		newNode.put("click", node.get("click").asText());
		newNode.put("life", node.get("life").asText());
		
		
		
		for(WebSocketSession participant : sessions.values()) {
			if(!participant.getId().equals(session.getId())) {
				participant.sendMessage(new TextMessage(newNode.toString()));
				
			}
		}
	}
	
}
