import Bootloader from './Bootloader.js';
import MainMenuBackground from './scenes/MainMenuBackground.js';
import MainMenu from './scenes/MainMenu.js';
//import ScenePlayOFFLINE from './scenes/ScenePlayOFFLINE.js';
//import ScenePlayONLINE from './scenes/ScenePlayONLINE.js';
import Intro from './scenes/Intro.js';
import Tutorial from './scenes/Tutorial.js';
import Settings from './scenes/Settings.js';
import Credits from './scenes/Credits.js';
import InGameMenu from './scenes/InGameMenu.js';
import StatsScene from './scenes/StatsScene.js';
import GameMode from './scenes/GameMode.js';
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
    dom: {
        createContainer: true
    },
    scene: [
        Bootloader,Intro,MainMenu,
        MainMenuBackground,GameMode,
        Tutorial,Settings,Credits,InGameMenu,StatsScene
    ]
};

new Phaser.Game(config);
