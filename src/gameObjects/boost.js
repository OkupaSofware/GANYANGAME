class Boost{
    constructor(scene, xpos, ypos, type){
        scene.add.existing(this);
        this.type = type;
        this.status = true;
        this.counter = 0;
        
        if(type == 1){
            this.live = scene.physics.add.image(xpos, ypos, "live").setScale(0.3,0.3);
            this.live.body.allowGravity = false;
        }
        if(type == 2){
            this.bubble = scene.physics.add.image(xpos, ypos, "bubble").setScale(0.3,0.3);
            this.bubble.body.allowGravity = false;
        }
        if(type == 3){
            this.ammo = scene.physics.add.image(xpos, ypos, "ammo").setScale(0.15, 0.15);
            this.ammo.body.allowGravity = false;
        }
    }
    recover(player, boost){
        player.increaseLife(25)
        boost.setActive(false);
        boost.setVisible(false);
        boost.body.destroy();
    }
    shield(player, boost){
        //player.setLives(player.getLife()+50)
        boost.setActive(false);
        boost.setVisible(false);
        boost.body.destroy();
    }
    recharge(player, boost){
        player.setAmmo(100);
        boost.setActive(false);
        boost.setVisible(false);
        boost.body.destroy();
    }
}

export default Boost;