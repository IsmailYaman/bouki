import { Player } from "../objects/player"
import { Platform } from "../objects/platform"
import { Bomb } from "../objects/bomb"
import { MovingPlatform } from "../objects/movingplatform"

export class GameScene extends Phaser.Scene {

    private player : Player
    private platforms: Phaser.GameObjects.Group
    private stars: Phaser.Physics.Arcade.Group
    private bombs : Phaser.GameObjects.Group
    constructor() {
        super({ key: "GameScene" })
    }

    init(): void {
        this.registry.values.score = 0
       this.physics.world.bounds.width = 1600
       this.physics.world.bounds.height = 600
    }

    create(): void {
        this.add.image(0, 0, 'jungle').setOrigin(0, 0)      
    
        // 11 STARS
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 30, stepX: 70 },
        })

        this.bombs = this.add.group()
        this.bombs.add(new Bomb(this, 20,20), true)



        // TODO add player
        this.player = new Player(this)

        this.platforms = this.add.group({ runChildUpdate: true })
        this.platforms.addMultiple([
            new Platform(this, 800,574, "ground"),
            new Platform(this, 80,250, "ice"),
            new Platform(this, 80, 400, "platform"),
            new MovingPlatform(this, 400,400, "platform")
        ], true)
        
        // define collisions for bouncing, and overlaps for pickups
         this.physics.add.collider(this.stars, this.platforms)
         this.physics.add.collider(this.player, this.platforms)
         this.physics.add.collider(this.bombs, this.platforms)
        
         this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this)
         this.physics.add.overlap(this.player, this.bombs, this.hitBomb, null, this)

         this.cameras.main.setSize(800,600)
         this.cameras.main.setBounds(0, 0, 1600, 600)
         this.cameras.main.startFollow(this.player)
    }
    private hitBomb(player: Player, bomb){
this.scene.start("EndScene")

    }
    private collectStar(player : Player , star) : void {
        this.stars.remove(star, true, true)
        this.registry.values.score++
        console.log("Dit is je score nu " + this.registry.values.score)

        // TO DO check if we have all the stars, then go to the end scene
    if( this.registry.values.score == 12){

        this.scene.start('LevelTwoScene')
    }

    }

    update(){
        this.player.update()
    }

}
