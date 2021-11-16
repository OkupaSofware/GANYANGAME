package com.example.okupa.ganyanserver.messages;

public class Message {

	String date; //La fecha/hora en la que se creo el mensaje
	String username; //El autor del mensaje
	String textMessage; //El autor del mensaje
	
	//Constructores
	public Message() {}
	
	public Message(String date, String username, String textMessage) {
		this.date = date;
		this.username = username;
		this.textMessage = textMessage;
	}
	
	//Getters y setters
	public String getDate() {
		return date;
	}
	
	public void setDate(String date) {
		this.date = date;
	}
	
	public String getUsername() {
		return username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getTextMessage() {
		return textMessage;
	}
	
	public void setTextMessage(String textMessage) {
		this.textMessage = textMessage;
	}
}
