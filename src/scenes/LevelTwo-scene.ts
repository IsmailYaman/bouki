import { Player } from "../objects/player"
import { Platform } from "../objects/platform"
import { MovingPlatform } from "../objects/movingplatform"

export class LevelTwoScene extends Phaser.Scene {

    private player : Player
    private platforms: Phaser.GameObjects.Group
    private stars: Phaser.Physics.Arcade.Group

    constructor() {
        super({ key: "LevelTwoScene" })
    }

    init(): void {
        console.log("Ik ben level 2")
    }

    create(): void {
        this.add.image(0, 0, 'jungle').setOrigin(0, 0)      
    
        // 11 STARS
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 30, stepX: 70 },
        })

        // TODO add player
        this.player = new Player(this)

        this.platforms = this.add.group({ runChildUpdate: true })
        this.platforms.addMultiple([
            new Platform(this, 800,574, "ground"),
            new Platform(this, 80,100, "ice"),
            new Platform(this, 80, 400, "platform"),
            new MovingPlatform(this, 400,400, "platform"),
            new Platform(this, 300,100, "ice")
        ], true)
        
        // define collisions for bouncing, and overlaps for pickups
         this.physics.add.collider(this.stars, this.platforms)
         this.physics.add.collider(this.player, this.platforms)
        
         this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this)
    }

    private collectStar(player : Player , star) : void {
        this.stars.remove(star, true, true)
        this.registry.values.score++

        // TO DO check if we have all the stars, then go to the end scene
    
    }

    update(){
        this.player.update()
    }

}
