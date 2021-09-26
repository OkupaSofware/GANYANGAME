import Bootloader from './Bootloader.js';
import MainMenu from './scenes/MainMenu.js';
import ScenePlay from './scenes/ScenePlay.js';
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
    pixelArt: false,
    physics: {
        default: "arcade",
        "arcade": {
            gravity: {
                y: 1800
            }
        }
    },
    scene: [
        Bootloader,
        MainMenu,
        ScenePlay
    ]
};

new Phaser.Game(config);
