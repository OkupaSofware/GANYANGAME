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
    }
    efect(player1, boost){

        boost.status = false;

        if(boost.mode == 1){
            player1.increaseLife(25);
        }
        if(boost.mode == 2){
            player1.setShield(true);
        }
        if(boost.mode == 3){
            player1.setAmmo(100);
        }

        boost.destroy();
    }
}

export default Boost;