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
        this.load.path = './assets/';

        //idle
        this.load.json('idle_anim','idle_anim.json')
        this.load.atlas('idle', 'idle.png', 'idle_atlas.json')
        //correr
        this.load.json('run_anim','run_anim.json')
        this.load.atlas('run', 'run.png', 'run_atlas.json')
        //morir
        this.load.json('die_anim','die_anim.json')
        this.load.atlas('die', 'die.png', 'die_atlas.json')
        //saltar
        this.load.json('jump_anim','jump_anim.json')
        this.load.atlas('jump', 'jump.png', 'jump_atlas.json')
    }

    create() {
        //this.add.text(100, 100, "hola", {color: '#000'})
        this.player_anim_idle = this.cache.json.get('idle_anim')
        this.player_anim_run = this.cache.json.get('run_anim')
        this.player_anim_die = this.cache.json.get('die_anim')
        this.player_anim_jump = this.cache.json.get('jump_anim')

        this.anims.fromJSON(this.player_anim_idle)
        this.anims.fromJSON(this.player_anim_run)
        this.anims.fromJSON(this.player_anim_die)
        this.anims.fromJSON(this.player_anim_jump)
    }
}
export default Bootloader;
