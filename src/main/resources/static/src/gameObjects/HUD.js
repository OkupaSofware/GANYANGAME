class PlayerHUD{
    constructor(scene, player){
        scene.add.existing(this);
        this.name = scene.add.text(-100,-100, player.name,{font: '20px Arial', fontSize: "20px"}).setOrigin(0.5,0.5)
        this.lifeBar = scene.add.image(-100, -100, "bar").setOrigin(0,0.5)
        this.life = scene.add.image(-100, -100, "life").setOrigin(0,0.5)
        this.shieldBar = scene.add.image(-100, -100, "bar").setOrigin(0,0.5)
        this.shield = scene.add.image(-100, -100, "shield").setOrigin(0,0.5)
        //this.life = scene.add.image(player.x+5, player.y-60, "lifeBar").setScale(0.9,0.9)
        this.shieldOn = false;

    }
    update(x,y){
        this.lifeBar.setPosition(x-47,y-60)
        this.life.setPosition(x-44,y-60)
        if(this.shieldOn == false){
            this.shieldBar.setVisible(false);
            this.shield.setVisible(false);
        }else{
            this.shieldBar.setVisible(true);
            this.shield.setVisible(true);
            this.shieldBar.setPosition(x-47,y-48)
            this.shield.setPosition(x-44,y-48)
        }

        this.name.setPosition(x,y-82)
    }
    setLife(life){
        var newScale = life/100
        this.life.setScale(newScale,1)
    }
    setShield(bool){
        this.shieldOn = bool;
        if(bool == true){
            this.shield.setScale(1,1)
        }
    }
    decreaseLife(newScale){
        this.life.setScale(newScale,1)
    }
    increaseLife(newScale){
        this.life.setScale(newScale,1)
    }
    decreaseShield(newScale){
        this.shield.setScale(newScale,1)
    }
    increaseShield(newScale){
        this.shield.setScale(newScale,1)
    }
    setVisible(bool){
        this.name.setVisible(bool)
        this.lifeBar.setVisible(bool) 
        this.life.setVisible(bool) 
        this.shieldBar.setVisible(bool) 
        this.shield.setVisible(bool) 
    }
}
export default PlayerHUD;