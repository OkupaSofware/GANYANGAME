package okupa.ganyanserver.rooms;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import okupa.ganyanserver.messages.Message;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(value = "/get/")
public class ChatRoomController {
	
	@Autowired
	ChatRoomService chatRoomService; //Gestor de la sala de chat del servidor
	
	@PostMapping()
	public User newUser(@RequestBody String userId) { //Post de nuevo usuario
		User tempUserId = chatRoomService.addUser(userId); //Se añade el usuario recibido desde el front-end a los usuarios de la sala mediante chatRoomService
		return tempUserId; //Devuelve el susodicho usuario para comprobaciones del front-end
	}
	
	@GetMapping("{chatRoomId}") //Get de mensajes
	public List<Message> returnDatabase(@PathVariable("chatRoomId") String chatRoomId){
		return chatRoomService.getRoomByIdx(chatRoomId).getDatabase().getMessages(); //A partir de un id de sala dado, devuelve una lista con los mensajes guardados en la base de datos
	}
	
	@PostMapping("{chatRoomId}") //Post de mensaje
	public boolean putAnuncio(@RequestBody Message message, @PathVariable("chatRoomId") String chatRoomId){ //A paritr de un mensaje y el id de una sala...
		chatRoomService.getRoomByIdx(chatRoomId).getDatabase().setMessage(message); //...añade el mensaje a la base de datos de la sala activa
		return true; //Devuelve que el Http esta creado
	}
	
	@GetMapping("{chatRoomId}/{userId}")  //Get de desconexiones
	public ConnectionCheck check(@PathVariable("chatRoomId") String chatRoomId, @PathVariable("userId") String userId){
		chatRoomService.markOnlineUser(chatRoomId, userId); //Comprueba si el usuario sigue conectado
		return new ConnectionCheck(chatRoomService.returnMessages(chatRoomId, userId), chatRoomService.returnUsers(chatRoomId, userId));
	}
	
}
