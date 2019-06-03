import { Player } from "../objects/player"
import { Platform } from "../objects/platform"
import { Key } from "../objects/key"
import { Door } from "../objects/door"
import { MovingPlatform } from "../objects/movingplatform"
import { Bomb } from "../objects/bomb"
import { Cameras } from "phaser";
import { platform } from "os";
import { Banana } from "../objects/banana";

export class Level1 extends Phaser.Scene {
    
    private player : Player
    private platforms: Phaser.GameObjects.Group
    private stars: Phaser.Physics.Arcade.Group
    private bombs: Phaser.GameObjects.Group
    private key: Phaser.GameObjects.Group
    private banana: Phaser.GameObjects.Group
    private collectedBanana = 0
    private scoreField
    door: any;

    constructor() {
        super({ key: "Level1" })
    }

    init(): void {
        console.log("dit is level 1")
        this.registry.values.score = 0
    }
fkey
    create(): void {
        this.input.once('pointerdown', (pointer) => {
            this.scene.start('level2')
            console.log('volgend level')
        })

        this.add.image(0, 0, 'ground').setOrigin(0, 0)      
        
        // 11 STARS
        this.stars = this.physics.add.group({
            key: 'bananaS',
            repeat: 11,
            setXY: { x: 12, y: 60, stepX: 70 },
        })

        this.key = this.add.group()
        this.key.add(new Key(this, 480, 300), true)

        this.banana = this.add.group()
        this.banana.add(new Banana(this, 155, 200), true)

        this.bombs = this.add.group()
        this.bombs.add(new Bomb(this, 200, 390), true)
        this.bombs.add(new Bomb(this, 150, 200), true)

        // TODO add player
        this.player = new Player(this)

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
            new Door(this, 240, 140, "door"),
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
        
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this)
        this.physics.add.overlap(this.player, this.bombs, this.hitBomb, null, this)
        this.physics.add.overlap(this.player, this.key, this.hitKey, null, this)
        this.physics.add.overlap(this.player, this.banana, this.hitBanana, null, this)

        this.physics.world.bounds.width = 770
        this.physics.world.bounds.height = 450
        
        this.cameras.main.setSize(770, 450)
        this.cameras.main.setBounds(0, 0, 0, 0)
    }

    private hitBomb(player:Player, bomb){
        this.bombs.remove(bomb, true, true)
        console.log("ik ga DOOD")
        this.scene.start('EndScene')
    }

    private hitBanana(player:Player, banana){
        this.banana.remove(banana, true, true)
        console.log("Volgend level")
        this.scene.start('level2')
    }

    private hitKey(player:Player, key){
        this.key.remove(key, true, true)
        // this.door.remove(Door, true, true)
        console.log("Deur is open!")
    1   
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
        this.input.once('pointerdown', (pointer) => {
            this.scene.start('level')
            console.log('volgend level')
        })
        // this.add.text(170, 50,' Sterren', { fontFamily: 'Arial Black', fontSize: 40, color: '#2ac9be' }).setOrigin(0.5).setStroke('#000000', 5)
    }

}