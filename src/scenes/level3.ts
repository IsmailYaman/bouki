import { Player } from "../objects/player"
import { Platform } from "../objects/platform"
import { Key } from "../objects/key"
import { Door } from "../objects/door"
import { Door1 } from "../objects/door1"
import { MovingPlatform } from "../objects/movingplatform"
import { Enemy } from "../objects/enemy"
import { Enemy1 } from "../objects/enemy1"
import { Cameras } from "phaser";
import { platform } from "os";
import { Banana } from "../objects/banana";
import { Star } from "../objects/star";

export class level3 extends Phaser.Scene {
    
    private player : Player
    private platforms: Phaser.GameObjects.Group
    private stars: Phaser.GameObjects.Group
    // private bombs: Phaser.GameObjects.Group
    private key: Phaser.GameObjects.Group
    private door: Phaser.GameObjects.Group
    private door1: Phaser.GameObjects.Group
    private banana: Phaser.GameObjects.Group
    private enemy: Phaser.GameObjects.Group
    private collectedBanana = 0
    private scoreField
    private graphics
    public lives = 300


    constructor() {
        super({ key: "level3" })
    }

    init(): void {
        console.log("dit is level 3")
        this.registry.values.score = 0
    }
    create(): void {
        this.input.once('pointerdown', (pointer) => {
            this.scene.start('EndScene')
            console.log('volgend level')

            this.graphics = this.add.graphics({ fillStyle: { color: 0x00AA00 } })
            
        })
        

        this.add.image(0, 0, 'ground').setOrigin(0, 0)  

        this.stars = this.add.group()
        this.stars.add(new Star(this, 60, 140), true)
        this.stars.add(new Star(this, 60, 260), true)
        this.stars.add(new Star(this, 140, 390), true)
        this.stars.add(new Star(this, 220, 390), true)
        this.stars.add(new Star(this, 300, 390), true)
        this.stars.add(new Star(this, 625, 115), true)
        this.stars.add(new Star(this, 545, 150), true)
        this.stars.add(new Star(this, 710, 230), true)
        this.stars.add(new Star(this, 710, 350), true)

        this.enemy = this.add.group({runChildUpdate:true})
        this.enemy.add(new Enemy(this, 420, 65), true)
        this.enemy.add(new Enemy(this, 600, 195), true)
        this.enemy.add(new Enemy(this, 50, 305), true)
        this.enemy.add(new Enemy(this, 720, 390), true)


        this.door = this.add.group()
        this.door.add(new Door(this, 240, 140), true)

        this.door1 = this.add.group()
        this.door1.add(new Door1(this, 420, 370), true)

        this.key = this.add.group()
        this.key.add(new Key(this, 480, 300), true)

        this.banana = this.add.group()
        this.banana.add(new Banana(this, 155, 200), true)

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
            new Platform(this, 565, 112, "wall3"),
            new Platform(this, 625, 152, "wall3b"),
            new Platform(this, 220, 350, "wall4"),
            new Platform(this, 420, 211, "wall2"), 
            new Platform(this, 505, 132, "wall2b"),
            new Platform(this, 665, 132, "wall2b")
            
        ], true)

        
        this.add.text(710, 20, 'Level 1', { fontFamily: 'Arial Black', fontSize: 24, color: '#2ac9be' }).setOrigin(0.5).setStroke('black', 5)
        this.scoreField = this.add.text(150, 20, this.collectedBanana + ' Bananas collected', { fontFamily: 'Arial Black', fontSize: 24, color: '#2ac9be' }).setOrigin(0.5).setStroke('#000000', 5)
        
        // define collisions for bouncing, and overlaps for pickups
        this.physics.add.collider(this.enemy, this.platforms)
        this.physics.add.collider(this.enemy, this.door1)
        this.physics.add.collider(this.stars, this.platforms)
        this.physics.add.collider(this.player, this.platforms)
        this.physics.add.collider(this.player, this.door)
        this.physics.add.collider(this.player, this.door1)
        
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this)
        this.physics.add.overlap(this.player, this.key, this.hitKey, null, this)
        this.physics.add.overlap(this.player, this.banana, this.hitBanana, null, this)
        this.physics.add.overlap(this.player, this.enemy, this.hitEnemy, null, this)

        this.add.image(400, 20, 'heart')
        this.add.image(360, 20, 'heart')
        this.add.image(440, 20, 'heart')

        this.physics.world.bounds.width = 770
        this.physics.world.bounds.height = 450
        
        this.cameras.main.setSize(770, 450)
        this.cameras.main.setBounds(0, 0, 0, 0)
    }

    private hitEnemy(player:Player, enemy){
        console.log("Je bent dood")
        this.scene.start('EndScene')
    }

    private hitBanana(player:Player, banana){
        this.banana.remove(banana, true, true)
        console.log("Volgend level")
        this.scene.start('level2')
    }

    private hitKey(player:Player, key){
        console.log(key);
        
        this.key.remove(key, true, true)
        this.door.remove(this.door.children.entries[0], true, true)
        this.door1.remove(this.door1.children.entries[0], true, true)
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

            this.graphics.clear()
            this.graphics.fillRectShape(new Phaser.Geom.Rectangle(400, 200, this.lives, 20))
            
        })
    }

}