class Bootloader extends Phaser.Scene {
    constructor() {
        super('Bootloader'); 
    }

    preload() {
        //Boot
        this.load.image("developer", "assets/developer.png");
        

        // MAIN MENU SPRITES
        this.load.spritesheet("test_buttons", "assets/buttons_test_02.png",{ frameWidth: 236, frameHeight: 95 });
        this.load.spritesheet("play_buttons", "assets/play_button_holes.png",{ frameWidth: 236, frameHeight: 95 });
        this.load.spritesheet("setting_button", "assets/setting_button_holes.png",{ frameWidth: 236, frameHeight: 95 });
        this.load.spritesheet("credits_button", "assets/credits_button_holes.png",{ frameWidth: 236, frameHeight: 95 });
        this.load.spritesheet("help_button", "assets/help_button_holes.png",{ frameWidth: 236, frameHeight: 95 });
        this.load.spritesheet("quit_button", "assets/quit_button_holes.png",{ frameWidth: 236, frameHeight: 95 });
        this.load.spritesheet("resume_button", "assets/resume_button_holes.png",{ frameWidth: 236, frameHeight: 95 });
        this.load.spritesheet("title_anim", "assets/new_title_sheet.png",{ frameWidth: 3170, frameHeight: 1400 });
        this.load.spritesheet("fog_anim", "assets/fog.png",{ frameWidth: 1400, frameHeight: 750 });
        //this.load.image("title", "./assets/TITLE_1.png");
        this.load.image("background_2", "./assets/Background_03.png");
        //this.load.image("backg", "./assets/BACKGROUND_SKY.png");
        this.load.image("FLOOR", "./assets/floor.png");
        this.load.image("new_title", "./assets/neo_title_RUST.png");
        
        this.load.on("complete", () =>{
            this.scene.start("Intro");
        });
        
        //this.scene.start("MainMenu");

        //Dom elements
        this.load.html('nameform', 'assets/nameform.html');
        
        // SCENE PLAY SPRITES
        // Environment sprites

        this.load.image("background", "./assets/background.png");
        this.load.image("platform", "./assets/platform.png");
        this.load.image("cloud", "./assets/cloud_dark.png");
        this.load.image("1p", "assets/tileset/1b.png");
        this.load.image("2p", "assets/tileset/2b.png");
        this.load.image("3p", "assets/tileset/3p.png");
        this.load.image("platform_1", "assets/tileset/platform_1.png");
        this.load.image("platform_2", "assets/tileset/platform_2.png");
        this.load.image("platform_3", "assets/tileset/platform_3.png");
        this.load.image("platform_4", "assets/tileset/platform_4.png");
        this.load.image("bar", "assets/player/hud/lifeHUD.png");
        this.load.image("life", "assets/player/hud/life.png");
        this.load.image("shield", "assets/player/hud/shield.png");
        this.load.image("bulletMenu", "./assets/bulletMenu.png");
        
        //Boosters sprites
        this.load.image("ammo", "assets/boosters/ammo.png");
        this.load.image("live", "assets/boosters/Life.png")
        this.load.image("bubble", "assets/boosters/Bubble.png") 

        // Bullet sprite
        this.load.image("bullet", "assets/bullet.png");
        this.load.image("bala", "assets/bala.png");
        
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
        this.load.image("sniper", "/weapon/sniper.png")
        this.load.image("rifle", "/weapon/rifle.png")
        
        //Audio
        this.load.audio('shot', ['../audio/bullet.mp3']);
        this.load.audio('impact', ['../audio/impact.mp3']);
    }

    create() {
        //change cursor
        this.input.setDefaultCursor('url(assets/mirillaBlack.png), pointer');

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
