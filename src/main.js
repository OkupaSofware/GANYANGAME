import Bootloader from './Bootloader.js';
import MainMenu from './scenes/MainMenu.js';
import ScenePlay from './scenes/ScenePlay.js';
import Intro from './scenes/Intro.js';
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
    backgroundColor: "#00000",
    pixelArt: false,
    physics: {
        default: "arcade",
        "arcade": {
            debug: true,
            gravity: {
                y: 1800
            }
        }
    },
    fps: {
        target: 60,
        forceSetTimeOut: true
    },
    scene: [
        Bootloader,Intro,
        MainMenu,
        ScenePlay
    ]
};

new Phaser.Game(config);
