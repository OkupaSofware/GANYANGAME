class Boost extends Phaser.GameObjects.Image{
    constructor(scene, x, y, type){
        super(scene, x, y, type);
        scene.add.existing(this);
        scene.physics.world.enable(this);

        if(type == "live"){
            this.mode = 1;
        }
        if(type == "bubble"){
            this.mode = 2;
        }
        if(type == "ammo"){
            this.mode = 3;
        }

        this.status = true;
        this.counter = 0;
        
        // Audio sounds
        this.shieldEffect = scene.shieldEffect;
        this.extraLifeEffect = scene.extraLife;
        this.reloadEffect = scene.reload;
    }
    efect(player1, boost){

        boost.status = false;

        if(boost.mode == 1){
            boost.extraLifeEffect.play();
            player1.increaseLife(25);
            player1.increaseCountHearts();
        }
        if(boost.mode == 2){
            boost.shieldEffect.play();
            player1.setShield(true);
            player1.increaseCountShields();
        }
        if(boost.mode == 3){
            boost.reloadEffect.play();
            player1.setCurrentAmmo(20 + player1.getCurrentAmmo());
            player1.increaseCountAmmos();
        }

        boost.destroy();
    }
}

export default Boost;
