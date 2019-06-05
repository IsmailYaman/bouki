import { Player } from "../objects/player"
import { Platform } from "../objects/platform"
import { MovingPlatform } from "../objects/movingplatform"
import { Bomb } from "../objects/bomb"
import { water} from "../objects/water"
import { Cameras } from "phaser";
import { platform } from "os";

export class GameScene extends Phaser.Scene {
    
    private player : Player
    private platforms: Phaser.GameObjects.Group
    private stars: Phaser.Physics.Arcade.Group
    private bombs: Phaser.GameObjects.Group
    private water: Phaser.GameObjects.Group
    private collectedBanana = 0
    private scoreField

    constructor() {
        super({ key: "GameScene" })
    }

    init(): void {
        console.log("dit is een gamescene")
        this.registry.values.score = 0
    }

    create(): void {
        this.add.image(0, 0, 'sky').setOrigin(0, 0)      
        
        // 11 STARS
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 30, stepX: 70 },
        })

        this.bombs = this.add.group()
        this.bombs.add(new Bomb(this, 20, 20), true)
        this.bombs.add(new Bomb(this, 120, 20), true)

        // TODO add player
        this.player = new Player(this)

        this.platforms = this.add.group({ runChildUpdate: true })
        this.platforms.addMultiple([
            new Platform(this, 110, 574, "ground"),
            new Platform(this, 1200, 574, "ground1"),
            new water(this, 200, 590, "water"),
            new Platform(this, 500, 350, "ice"),
            new Platform(this, 250, 450, "platform"),
            new MovingPlatform(this, 100, 250, "platform"),
        ], true)
        
        this.scoreField = this.add.text(250, 20, this.collectedBanana + ' Bananas collected', { fontFamily: 'Arial Black', fontSize: 40, color: '#2ac9be' }).setOrigin(0.5).setStroke('#000000', 5)
        // define collisions for bouncing, and overlaps for pickups
        this.physics.add.collider(this.stars, this.platforms)
        this.physics.add.collider(this.bombs, this.platforms)
        this.physics.add.collider(this.player, this.platforms)
        
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this)
        this.physics.add.overlap(this.player, this.bombs, this.hitBomb, null, this)
        this.physics.add.overlap(this.player, this.water, this.hitWater, null, this)

        this.physics.world.bounds.width = 1600
        this.physics.world.bounds.height = 600
        
        this.cameras.main.setSize(800, 600)
        this.cameras.main.setBounds(0, 0, 1600, 600)
        this.cameras.main.startFollow(this.player)
    }

    private hitBomb(player:Player, bomb){
        this.bombs.remove(bomb, true, true)
        this.scene.start('EndScene')
    }

    private hitWater(player:Player, water){
        
        this.scene.start('EndScene')
    }

    private collectStar(player : Player , star) : void {
        this.stars.remove(star, true, true)
        this.registry.values.score++
        this.collectedBanana++
        console.log(this.registry.values.score + ' sterren')

        // TO DO check if we have all the stars, then go to the end scene'
        this.scoreField.text = this.collectedBanana + ' Bananas collected'
    
    }

    update(){
        this.player.update()
        // this.add.text(170, 50,' Sterren', { fontFamily: 'Arial Black', fontSize: 40, color: '#2ac9be' }).setOrigin(0.5).setStroke('#000000', 5)
    }

}