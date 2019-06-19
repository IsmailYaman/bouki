import "phaser";
import { BootScene } from "./scenes/boot-scene"
import { StartScene } from "./scenes/start-scene"
import { level1 } from "./scenes/level1"
import { level2} from "./scenes/level2"
import { level3} from "./scenes/level3"
import { EndScene } from "./scenes/end-scene"


const config: GameConfig = {
    width: 770,
    height: 450,
    parent: "game",
    resolution: window.devicePixelRatio,
    scene: [BootScene, StartScene, level1, level2, level3, EndScene ],
    input: {
        keyboard: true
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: false, 
            // gravity: { y: 400 }
        }
    },
    render: { pixelArt: true }
};

export class Game extends Phaser.Game {
    constructor(config: GameConfig) {
        super(config)
    }
}

window.addEventListener("load", () => new Game(config))

