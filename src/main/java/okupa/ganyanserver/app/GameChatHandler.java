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
		
		manager.addPlayer(new Player("Pedro",session.getId()));
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("Session closed: " + session.getId());
		sessions.remove(session.getId());
		
		manager.removePlayer(session.getId());
		
		
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		
		System.out.println("Message received: " + message.getPayload());
		JsonNode node = mapper.readTree(message.getPayload());
		
		Message msg = new Message("date", node.get("name").asText(), node.get("message").asText());
		int roomIdx = manager.getPlayerRoomIdx(session.getId());
		manager.getRooms().get(roomIdx).getDatabase().setMessage(msg);

		
		sendToOtherLobbyParticipant(manager.getRooms().get(roomIdx), node);
	}

	private void sendOtherParticipants(WebSocketSession session, JsonNode node) throws IOException {

		System.out.println("Message sent: " + node.toString());
		
		ObjectNode newNode = mapper.createObjectNode();
		newNode.put("name", node.get("name").asText());
		newNode.put("message", node.get("message").asText());
		
		
		
		for(WebSocketSession participant : sessions.values()) {
			if(!participant.getId().equals(session.getId())) {
				participant.sendMessage(new TextMessage(newNode.toString()));
			}
		}
	}
	private void sendToOtherLobbyParticipant(Room room, JsonNode node) throws IOException {

		
		//List<Message> msgs = db.getMessages();
		ObjectNode newNode = mapper.createObjectNode();
		newNode.put("name", node.get("name").asText());
		newNode.put("message", node.get("message").asText());
		
		
		for(Player p: room.getPlayers()) {
			sessions.get(p.getSessionID()).sendMessage(new TextMessage(newNode.toString()));
		}
		
		
		
		
			
			

			
			
		
		
		
		/*
		newNode.put("name1", msgs.get(msgs.size()-1).getUsername());
		newNode.put("message1", msgs.get(msgs.size()-1).getTextMessage());
		if(msgs.size()>=2) {
		newNode.put("name2", msgs.get(msgs.size()-2).getUsername());
		newNode.put("message2", msgs.get(msgs.size()-2).getTextMessage());
		}
		if(msgs.size()>=3) {
		newNode.put("name3", msgs.get(msgs.size()-3).getUsername());
		newNode.put("message3", msgs.get(msgs.size()-3).getTextMessage());
		}
		for(WebSocketSession participant : sessions.values()) {
			if(participant.getId().equals(session.getId())) {
				participant.sendMessage(new TextMessage(newNode.toString()));
			}
		}
		*/
	
	}
}
