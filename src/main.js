import Bootloader from './Bootloader.js';
import mainMenu from './scenes/MainMenu.js';
const config = {
    title: "GAN-YAN",
    version: "0.0.1",
    type: Phaser.AUTO,
    scale: {
        parent: "phaser_container",
        width: 1280 ,
        height: 720,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    //backgroundColor: "#ffffff",
    pixelArt: true,
    physics: {
        default: "arcade",
        "arcade": {
            gravity: {
                y: 500
            }
        }
    },
    scene: [
        mainMenu,
        Bootloader
    ]
};

new Phaser.Game(config);