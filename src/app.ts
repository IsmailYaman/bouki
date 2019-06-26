import "phaser";
import { BootScene } from "./scenes/boot-scene"
import { StartScene } from "./scenes/start-scene"
import { level1 } from "./scenes/level1"
import {level2} from "./scenes/level2"
import { level3} from "./scenes/level3"
import { EndScene } from "./scenes/end-scene"
import { WinScene} from "./scenes/win-scene"
import { Arcade } from "./arcade/arcade"

const config: GameConfig = {
    width: 770,
    height: 450,
    parent: "game",
    resolution: window.devicePixelRatio,
    scene: [BootScene, StartScene, level1, level2, level3, EndScene, WinScene],
    input: {
        keyboard: true
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: 0, 
            // gravity: { y: 400 }
        }
    },
    render: { pixelArt: true }
};

export class Game extends Phaser.Game {
    public arcade:Arcade
    constructor(config: GameConfig) {
        super(config)

        // create the arcade once, otherwise we keep connecting/disconnecting every scene
        this.arcade = new Arcade()
    }
}

window.addEventListener("load", () => new Game(config))

