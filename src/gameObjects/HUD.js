class PlayerHUD{
    constructor(scene, player){
        scene.add.existing(this);
        this.name = scene.add.text(0,0, player.name,{font: '20px Arial', fontSize: "20px"}).setOrigin(0.5,0.5)
        this.lifeBar = scene.add.image(0, 0, "lifeBar").setOrigin(0,0.5)
        this.life = scene.add.image(0, 0, "life").setOrigin(0,0.5)
        //this.life = scene.add.image(player.x+5, player.y-60, "lifeBar").setScale(0.9,0.9)

    }
    update(x,y){
        this.lifeBar.setPosition(x-47,y-60)
        this.life.setPosition(x-44,y-60)
        this.name.setPosition(x,y-82)
    }
}
export default PlayerHUD;