package okupa.ganyanserver.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import org.springframework.web.socket.config.annotation.EnableWebSocket;

import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;




@SpringBootApplication
@EnableWebSocket
public class GanYanApp implements WebSocketConfigurer{

	public static void main(String[] args) {
		SpringApplication.run(GanYanApp.class, args);
	}

	

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(createChatHandler(), "/chat")
			.setAllowedOrigins("*");
		registry.addHandler(createGameHandler(), "/game")
		.setAllowedOrigins("*");
	}
		
	@Bean
	public GameChatHandler createChatHandler() {
		return new GameChatHandler();
	}
	
	@Bean
	public GameProcessHandler createGameHandler() {
		return new GameProcessHandler();
	}

}

	

