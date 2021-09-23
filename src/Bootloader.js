class Bootloader extends Phaser.Scene {
    constructor() {
        super('Bootloader'); 
    }

    preload() {
        
        // MAIN MENU SPRITES
        this.load.spritesheet("test_buttons", "assets/buttons_test.png",{ frameWidth: 236, frameHeight: 65 });

        this.load.on("complete", () =>{
            this.scene.start("MainMenu");
        });
        //this.scene.start("MainMenu");

        // SCENE PLAY SPRITES
        // Environment sprites
        this.load.image("background", "./assets/background.png");
        this.load.image("platform", "./assets/platform.png");
        this.load.image("cloud", "./assets/cloud.png");
        
        // Player sprite
        this.load.image("player", "./assets/player.png");
    }

    create() {
        //this.add.text(100, 100, "hola", {color: '#000'})
        
    }
}
export default Bootloader;
