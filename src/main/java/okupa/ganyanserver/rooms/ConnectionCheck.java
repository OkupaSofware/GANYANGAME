package okupa.ganyanserver.rooms;

import java.util.List;

import okupa.ganyanserver.messages.Message;

public class ConnectionCheck {
	
	private List<Message> messages; //Lista de mensajes
	private List<User> users; //Lista de usuarios
	
	//Constructores
	public ConnectionCheck() {};
	
	
	public ConnectionCheck(List<Message> messages, List<User> users) {
		this.messages = messages;
		this.users = users;
	}

	//Getters y setters
	public List<Message> getMessages() {
		return messages;
	}
	public void setMessages(List<Message> messages) {
		this.messages = messages;
	}
	public List<User> getUsers() {
		return users;
	}
	public void setUsers(List<User> users) {
		this.users = users;
	}
}
