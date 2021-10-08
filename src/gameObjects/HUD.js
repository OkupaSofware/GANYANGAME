class PlayerHUD{
    constructor(scene, player){
        scene.add.existing(this);
        
        this.lifeBar = scene.add.image(player.x, player.y-60, "lifeBar")
        //this.life = scene.add.image(player.x+5, player.y-60, "lifeBar").setScale(0.9,0.9)

    }
    update(x,y){
        this.lifeBar.setPosition(x,y-60)
        //this.life.setPosition(x,y-60)
        //this.life.setScale(0,)
    }
}
export default PlayerHUD;