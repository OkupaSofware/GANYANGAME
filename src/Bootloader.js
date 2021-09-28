class Bootloader extends Phaser.Scene {
    constructor() {
        super('Bootloader'); 
    }

    preload() {
        
        // MAIN MENU SPRITES
        this.load.spritesheet("test_buttons", "assets/buttons_test.png",{ frameWidth: 236, frameHeight: 65 });
        this.load.spritesheet("title_anim", "assets/new_title_sheet.png",{ frameWidth: 3170, frameHeight: 1100 });
        //this.load.image("title", "./assets/TITLE_1.png");
        
        this.load.image("background_2", "./assets/BACKGROUND_SKY.png");
        this.load.image("FLOOR", "./assets/FLOOR.png");
        this.load.on("complete", () =>{
            this.scene.start("MainMenu");
        });
        //this.scene.start("MainMenu");

        // SCENE PLAY SPRITES
        // Environment sprites
        this.load.image("background", "./assets/background.png");
        this.load.image("platform", "./assets/platform.png");
        this.load.image("cloud", "./assets/cloud.png");
        this.load.image("1p", "assets/tileset/1p.png");
        this.load.image("2p", "assets/tileset/2p.png");
        this.load.image("3p", "assets/tileset/3p.png");
        
        // Bullet sprite
        this.load.image("bullet", "assets/bullet.png");
        
        // PLAYER SPRITES
        this.load.path = './assets/player/';

        //Animations
        //idle
        this.load.json('idle_anim','idle/idle_anim.json')
        this.load.atlas('idle', 'idle/idle.png', 'idle/idle_atlas.json')
        //correr
        this.load.json('run_anim','run/run_anim.json')
        this.load.atlas('run', 'run/run.png', 'run/run_atlas.json')
        //morir
        this.load.json('die_anim','die/die_anim.json')
        this.load.atlas('die', 'die/die.png', 'die/die_atlas.json')
        //saltar
        this.load.json('jump_anim','jump/jump_anim.json')
        this.load.atlas('jump', 'jump/jump.png', 'jump/jump_atlas.json')

        //Weapons
        this.load.image("shotgun", "/weapon/shotgun.png")
    }

    create() {
        
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
