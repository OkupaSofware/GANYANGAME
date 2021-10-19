import Bootloader from './Bootloader.js';
import MainMenuBackground from './scenes/MainMenuBackground.js';
import MainMenu from './scenes/MainMenu.js';
import ScenePlay from './scenes/ScenePlay.js';
import Intro from './scenes/Intro.js';
import Tutorial from './scenes/Tutorial.js';
import Settings from './scenes/Settings.js';
import Credits from './scenes/Credits.js';
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
            debug: false,
            gravity: {
                y: 1800
            }
        }
    },
    fps: {
        target: 60,
        forceSetTimeOut: true
    },
    dom: {
        createContainer: true
    },
    scene: [
        Bootloader,Intro,MainMenu,
        MainMenuBackground,
        ScenePlay,Tutorial,Settings,Credits
    ]
};

new Phaser.Game(config);
