package com.example.okupa.ganyanserver.rooms;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.example.demo.messages.MessagesDB;

@Controller
public class ChatRoom {
	
	private String id; //Id de la sala
	private int maxUsers; //Maximo numero de participantes
	private List<User> usersList = new ArrayList<User>(); //Lista de usuarios
	
	@Autowired
	private MessagesDB database; //La base de datos (txts)
	
	//Constructor
	public ChatRoom() {
		database = new MessagesDB();
	}

	//Getters y setters
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public int getMaxUsers() {
		return maxUsers;
	}

	public void setMaxUsers(int maxUsers) {
		this.maxUsers = maxUsers;
	}

	public List<User> getUsersList() {
		return usersList;
	}

	public void setUsersList(List<User> usersList) {
		this.usersList = usersList;
	}

	public MessagesDB getDatabase() {
		return database;
	}

	public void setDatabase(MessagesDB database) {
		this.database = database;
	}

	public User getUser(String userId) {
		for(int i = 0; i<usersList.size(); i++) {
			if(usersList.get(i).getId().equals(userId)) {
				return usersList.get(i);
			}
		}
		return null;
		
	}
}
