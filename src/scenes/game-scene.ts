import { Player } from "../objects/player"
import { Platform } from "../objects/platform"
import { Door } from "../objects/door"
import { MovingPlatform } from "../objects/movingplatform"
import { Bomb } from "../objects/bomb"
import { Cameras } from "phaser";
import { platform } from "os";
import { Key } from "../objects/key";

export class GameScene extends Phaser.Scene {
    
    private player : Player
    private platforms: Phaser.GameObjects.Group
    private stars: Phaser.Physics.Arcade.Group
    private bombs: Phaser.GameObjects.Group
    private water: Phaser.GameObjects.Group
    private collectedBanana = 0
    private scoreField
    private door: Door
    private key: Key

    constructor() {
        super({ key: "GameScene" })
    }

    init(): void {
        console.log("dit is een gamescene")
        this.registry.values.score = 0
    }

    create(): void {
        this.add.image(0, 0, 'ground').setOrigin(0, 0)      
        
        // 11 STARS
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 60, stepX: 70 },
        })

        this.bombs = this.add.group()
        this.bombs.add(new Bomb(this, 200, 390), true)
        this.bombs.add(new Bomb(this, 150, 200), true)
        
        // this.key = this.physics.add.group({
        //     key : 'key',


        //   })


        this.key = new Key(this, 300,300, 'key')
        // TODO add player
        this.player = new Player(this)

        // this.physics.add.collider(this.player, this.key)
        this.physics.add.overlap(this.key, this.player, this.removeKey, null, this)
        

        this.platforms = this.add.group({ runChildUpdate: true })
        this.platforms.addMultiple([
            
            new Platform(this, 20, 225, "caveleft"),
            new Platform(this, 385, 20, "cavetop"),
            new Platform(this, 385, 430, "cavebot"),
            new Platform(this, 750, 225, "caveright"),
            new Platform(this, 100, 199, "wall"),
            new Platform(this, 540, 291, "wall"),
            new Platform(this, 665, 291, "wall"),
            new Platform(this, 200, 258, "wall1"),
            new Platform(this, 520, 232, "wall1"),
            new Platform(this, 300, 159, "wall2"),
            new Platform(this, 160, 140, "wall3"),
            new Platform(this, 220, 350, "wall4"),
            new Platform(this, 420, 211, "wall2"),
            new Platform(this, 240, 140, "door"),
            new Platform(this, 420, 370, "door1"),
            new Platform(this, 585, 132, "S"),
            // new Platform(this, 500, 350, "ice"),
            // new Platform(this, 250, 450, "platform"),
            // new MovingPlatform(this, 100, 250, "platform"),
        ], true)
        
        this.scoreField = this.add.text(250, 20, this.collectedBanana + ' Bananas collected', { fontFamily: 'Arial Black', fontSize: 40, color: '#2ac9be' }).setOrigin(0.5).setStroke('#000000', 5)
        // define collisions for bouncing, and overlaps for pickups
        this.physics.add.collider(this.stars, this.platforms)
        this.physics.add.collider(this.bombs, this.platforms)
        this.physics.add.collider(this.player, this.platforms)
        //this.physics.add.collider(this.key, this.platforms)
        
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this)
        this.physics.add.overlap(this.player, this.bombs, this.hitBomb, null, this)


        this.physics.world.bounds.width = 770
        this.physics.world.bounds.height = 450
        
        this.cameras.main.setSize(770, 450)
        this.cameras.main.setBounds(0, 0, 0, 0)
    }

    private hitBomb(player:Player, bomb){
        this.bombs.remove(bomb, true, true)
        this.scene.start('Level2')
    }
    private hitKey(player:Player, key){
        this.key.remove(key, true, true)
       this.door.remove(Door, true, true)
    }
    private collectStar(player : Player , star) : void {
        this.stars.remove(star, true, true)
        this.registry.values.score++
        this.collectedBanana++
        console.log(this.registry.values.score + ' sterren')

        // TO DO check if we have all the stars, then go to the end scene'
        this.scoreField.text = ' Find the Key!'
    
    }

    public removeKey(key:Key){
        console.log("de sleutel is weg")
    }

    update(){
        this.player.update()
        // this.add.text(170, 50,' Sterren', { fontFamily: 'Arial Black', fontSize: 40, color: '#2ac9be' }).setOrigin(0.5).setStroke('#000000', 5)
    }

}