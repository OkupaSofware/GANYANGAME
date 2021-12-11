package okupa.ganyanserver.classes;


public class Player {

	
	private String name;
	private String sessionID;
	
	/*
	private boolean isGoingLeft;
	private boolean isGoingRight;
	private boolean isJumping;
	private int life;
	private int shield;
	private int mousex;
	private int mousey;
	*/
	
	
	
	public Player(String id, String session) {
		
		
		this.name = id;
		this.sessionID=session;
		
		/*
		this.isGoingLeft = false;
		isGoingRight = false;
		this. isJumping = false;
		this.life = 100;
		this.shield=0;
		this.mousex=0;
		this.mousey=0;
		*/
		
	}

	public String getName() {
		return name;
	}
	
	
	public void setName(String name) {
		this.name = name;
	}
/*
	public boolean isGoingLeft() {
		return isGoingLeft;
	}

	public void setGoingLeft(boolean isGoingLeft) {
		this.isGoingLeft = isGoingLeft;
	}

	public boolean isGoingRight() {
		return isGoingRight;
	}

	public void setGoingRight(boolean isGoingRight) {
		this.isGoingRight = isGoingRight;
	}

	public boolean isJumping() {
		return isJumping;
	}

	public void setJumping(boolean isJumping) {
		this.isJumping = isJumping;
	}

	public int getLife() {
		return life;
	}

	public void setLife(int life) {
		this.life = life;
	}

	public int getShield() {
		return shield;
	}

	public void setShield(int shield) {
		this.shield = shield;
	}

	public int getMousex() {
		return mousex;
	}

	public void setMousex(int mousex) {
		this.mousex = mousex;
	}

	public int getMousey() {
		return mousey;
	}

	public void setMousey(int mousey) {
		this.mousey = mousey;
	}

 */
	public String getSessionID() {
		return sessionID;
	}

	public void setSessionID(String sessionID) {
		this.sessionID = sessionID;
	}

	

	
}
