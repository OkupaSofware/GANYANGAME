class Bootloader extends Phaser.Scene {
    constructor() {
        super('Bootloader'); 
    }

    preload() {
        this.load.spritesheet("test_buttons", "assets/buttons_test.png",{ frameWidth: 236, frameHeight: 65 });
        this.scene.start("MainMenu");
    }

    create() {
        //this.add.text(100, 100, "hola", {color: '#000'})
        
    }
}
export default Bootloader;