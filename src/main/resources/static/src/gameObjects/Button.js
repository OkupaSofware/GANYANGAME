class Button extends Phaser.GameObjects.Sprite{
    constructor(config, text) {

      //check if config contains a scene
      if (!config.scene) {
        console.log('No scene');
        return;
    }
    //check if config contains a key
    if (!config.key) {
        console.log("No key!");
        return;
    }
    //if there is no up property assume 0
    if (!config.up) {
        config.up = 0;
    }
    //if there is no down in config use up
    if (!config.down) {
        config.down = config.up;
    }
    //if there is no over in config use up
    if (!config.over) {
        config.over = config.up;
     
    }
    super(config.scene, 0, 0, config.key, config.up);
    this.config = config;
    //if there is an x assign it
    if (config.x) {
        this.x = config.x;
    }
    //if there is an x assign it
    if (config.y) {
        this.y = config.y;
    }
    //add this to the scene
    config.scene.add.existing(this);
    //add text to button
    this.content = config.scene.add.text(config.x,config.y-5, text,{fontFamily: 'army_font', fontSize:'45px'  }).setOrigin(0.5,0.5).setTint(0x250303 ).setAlpha(0.8)
    //make interactive and set listeners
    this.setInteractive();
    this.on('pointerdown',this.onDown,this);
    this.on('pointerup',this.onUp,this);
    this.on('pointerover',this.onOver,this);
    this.on('pointerout',this.onUp,this);
}
onDown()
    {
    	this.setFrame(this.config.down);
        this.content.setTint(0xffffff)
    }
    onOver()
    {
    	this.setFrame(this.config.over);
        this.content.setTint(0x8B2600)
    }
    onUp()
    {
    	this.setFrame(this.config.up);
       this.content.setTint(0x250303 ).setAlpha(0.8)
    }


}
export default Button;