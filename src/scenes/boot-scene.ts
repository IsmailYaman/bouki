export class BootScene extends Phaser.Scene {

    private graphics: Phaser.GameObjects.Graphics

    constructor() {
        super({ key: "BootScene" })
    }

    init(){
    }

    preload(): void {
        this.load.image('jungle', require('../assets/background.png'))
        this.load.image('start', require('../assets/Start.png'))
        this.load.image('ground', require('../assets/ground.png'))
        this.load.image('wall', require('../assets/wall.png'))
        this.load.image('caveleft', require('../assets/caveleft.png'))
        this.load.image('cavetop', require('../assets/cavetop.png'))
        this.load.image('cavebot', require('../assets/cavebot.png'))
        this.load.image('caveright', require('../assets/caveright.png'))

        this.load.image('topleft', require('../assets/topleft.png'))
        this.load.image('topright', require('../assets/topright.png'))
        this.load.image('bottomleft', require('../assets/bottomleft.png'))
        this.load.image('bottomright', require('../assets/bottomright.png'))   
        this.load.image('wall', require('../assets/wall.png'))
        this.load.image('wall1', require('../assets/wall1.png'))
        this.load.image('wall2', require('../assets/wall2.png'))
        this.load.image('wall2b', require('../assets/wall2b.png')) 
        this.load.image('wall3', require('../assets/wall3.png'))
        this.load.image('wall3b', require('../assets/wall3b.png'))
        this.load.image('wall4', require('../assets/wall4.png'))
        this.load.image('door', require('../assets/door.png'))
        this.load.image('door1', require('../assets/door1.png'))
        this.load.image('heart', require('../assets/heart.png'))
        this.load.image('heart-broken', require('../assets/heart-broken.png'))

        this.load.image('mazewall', require('../assets/mazewall.png'))
        this.load.image('mazewall1', require('../assets/mazewall1.png'))
        this.load.image('mazewall2', require('../assets/mazewall2.png'))
        this.load.image('mazewall3', require('../assets/mazewall3.png'))

        this.load.image('mazedoor', require('../assets/mazedoor.png'))

        this.load.image('bananaS', require('../assets/bananaS.png'))
        this.load.image('bananaL', require('../assets/bananaL.png'))
        this.load.image('key', require('../assets/key.png'))
        // this.load.image('bomb', require('../assets/bomb.png'))
        this.load.image('enemy', require('../assets/enemy.png'))
        this.load.image('enemyred', require('../assets/enemyred.png'))
        this.load.image('spikes', require('../assets/spikes.png'))
        this.load.image('shade', require('../assets/shade.png'))
        this.load.image('player', require('../assets/player.png'))

        this.load.on('complete', () => {
            console.log("everything is loaded")
            // add code here to switch to the start scene

            this.scene.start("StartScene")
        })
    }
}