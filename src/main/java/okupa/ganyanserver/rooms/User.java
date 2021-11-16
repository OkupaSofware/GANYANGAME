package com.example.okupa.ganyanserver.rooms;

public class User {
	
	private String id; //Id o nombre del usuario en el chat
	private String chatRoomId; //Id de la sala en la que se encuentra
	private boolean online; //Si esta conectado o no

	//Constructor
	public User() {}

	//Getters y setters
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getChatRoomId() {
		return chatRoomId;
	}

	public void setChatRoomId(String chatRoomId) {
		this.chatRoomId = chatRoomId;
	}

	public boolean getOnline() {
		return online;
	}

	public void setOnline(boolean online) {
		this.online = online;
	}
}
