package com.example.okupa.ganyanserver.rooms;

import java.util.List;

import com.example.okupa.ganyanserver.messages.Message;

public class ConnectionCheck {
	
	private List<Message> messages; //Lista de mensajes
	private List<String> users; //Lista de usuarios
	
	//Constructores
	public ConnectionCheck() {};
	
	
	public ConnectionCheck(List<Message> messages, List<String> users) {
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
	public List<String> getUsers() {
		return users;
	}
	public void setUsers(List<String> users) {
		this.users = users;
	}
}
