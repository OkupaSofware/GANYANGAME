package okupa.ganyanserver.messages;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.util.List;
import java.util.ArrayList;
import java.io.IOException;

import org.springframework.stereotype.Component;

@Component
public class MessagesDB {

private String path = "messageRegistry.txt"; //Ruta por defecto para las conversaciones guardadas
	
	//Constructor
	public MessagesDB() {
		
	}
	
	//Getters y setters
	public List<Message> getMessages() {
		List<Message> messageList = new ArrayList<Message>(); //Creamos un ArrayList de mensajes
		try {
			String line;
			BufferedReader reader = new BufferedReader(new FileReader(path)); //Lector de los ficheros de texto que conforman nuestros registros
			
			while((line = reader.readLine()) != null) { //Leemos hasta que ya no haya mas lineas
				String[] tempLine = line.split("\\|"); //Separamos cada linea por los caracteres '|' (al ser un separador textual se escribe como \\|
				Message tempMessage = new Message(tempLine[0], tempLine[1], tempLine[2]); //Guardamos en cada variable de Message la parte de la linea del txt que corresponde
				messageList.add(tempMessage); //Y anadimos el mensaje a nuestra lista
			}
            reader.close(); //Cerramos el lector
        }catch (Exception messageReaderException) { //Si ocurre algun error durante la lectura de archivos lo atrapamos
             System.out.println(messageReaderException);
        }
		return messageList; //Por ultimo devolvemos la lista con todos los mensajes del txt en cuestion
	}

	public void setMessage(Message message) {
		try {
            BufferedWriter messageFile = new BufferedWriter(new FileWriter(path, true)); //Escritor en ficheros de texto
            messageFile.write(message.getDate() + "|" + message.getUsername() + "|" + message.getTextMessage() + "\n"); //Introducimos en la siguiente linea en blanco el mensaje recibido, dividiendo cada componente por '|'
            messageFile.close(); //Cerramos el escritor de texto
        } catch (IOException messageWriterException) { //Si ocurre algun error durante la escritura de archivos lo atrapamos
            System.out.println(messageWriterException);
        }
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
}
