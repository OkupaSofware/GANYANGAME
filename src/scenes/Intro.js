class Intro extends Phaser.Scene {
    constructor(){
        super( "Intro");
    }
    create(){
        this.cameras.main.fadeIn(2000, 0, 0, 0)
        //Boot
        this.dev = this.add.image(640,360,"developer");
        //this.dev.alpha=0;
        this.cameras.main.once('camerafadeincomplete', function (camera) {
           
                camera.fadeOut(2000);
            
        });
       
       
    }
    update(time, delta){
        
        if( time>5000){
            //this.cameras.main.fadeOut(2000, 0, 0, 0)
            this.scene.start("MainMenu");
        }
        
    }
}
export default Intro;