import { Player } from "../objects/player"
import { Platform } from "../objects/platform"
import { Key } from "../objects/key"
import { Door1 } from "../objects/door1"
import { Enemy } from "../objects/enemy"
import { Enemy1 } from "../objects/enemy1"
import { Enemy2 } from "../objects/enemy2"
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
            this.scene.start('WinScene')
            console.log('Je hebt gewonnen!')

            this.graphics = this.add.graphics({ fillStyle: { color: 0x00AA00 } })
            
        })
        

        this.add.image(0, 0, 'ground').setOrigin(0, 0)  

        this.stars = this.add.group()
        this.stars.add(new Star(this, 60, 140), true)
        this.stars.add(new Star(this, 120, 220), true)
        this.stars.add(new Star(this, 60, 310), true)
        this.stars.add(new Star(this, 120, 390), true)
        this.stars.add(new Star(this, 200, 65), true)
        this.stars.add(new Star(this, 375, 65), true)
        this.stars.add(new Star(this, 590, 65), true)
        this.stars.add(new Star(this, 630, 230), true)
        this.stars.add(new Star(this, 710, 310), true)
        

        this.enemy = this.add.group({runChildUpdate:true})
        this.enemy.add(new Enemy2(this, 210, 395), true)
        this.enemy.add(new Enemy1(this, 265, 60), true)
        this.enemy.add(new Enemy2(this, 320, 395), true)
        this.enemy.add(new Enemy1(this, 375, 60), true)
        this.enemy.add(new Enemy2(this, 430, 395), true)
        this.enemy.add(new Enemy1(this, 485, 60), true)
        this.enemy.add(new Enemy2(this, 540, 395), true)
        this.enemy.add(new Enemy(this, 561, 220), true)
        this.enemy.add(new Enemy(this, 200, 100), true)
        this.enemy.add(new Enemy(this, 60, 180), true)
        this.enemy.add(new Enemy(this, 200, 310), true)



        // this.door = this.add.group()
        // this.door.add(new Door(this, 440, 140), true)

        this.door1 = this.add.group()
        this.door1.add(new Door1(this, 590, 370), true)

        this.key = this.add.group()
        this.key.add(new Key(this, 680, 65), true)

        this.banana = this.add.group()
        this.banana.add(new Banana(this, 690, 170), true)

        // TODO add player
        this.player = new Player(this)

        this.platforms = this.add.group({ runChildUpdate: true })
        
        

        this.platforms.addMultiple([
            new Platform(this, 20, 20,"topleft"),
            new Platform(this, 750, 20,"topright"),
            new Platform(this, 20, 430,"bottomleft"),
            new Platform(this, 750, 430,"bottomright"),
            new Platform(this, 710, 230, "wall3b"),
            new Platform(this, 40, 140, "wall3"),
            new Platform(this, 140, 339, "wall3"),
            new Platform(this, 160, 318, "wall2b"),
            new Platform(this, 40, 220, "wall3"),
            new Platform(this, 20, 225, "caveleft"),
            new Platform(this, 385, 20, "cavetop"),
            new Platform(this, 385, 430, "cavebot"),
            new Platform(this, 750, 225, "caveright"),
            new Platform(this, 670, 112, "wall3b"),
            new Platform(this, 630, 310, "wall3b"),
            new Platform(this, 160, 159, "wall2"), 
            // new Platform(this, 590, 199, "wall2"),
            new Platform(this, 590, 211, "wall2"),
            
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
        this.scene.start('EndScene')
    }

    private hitKey(player:Player, key){
        console.log(key);
        
        this.key.remove(key, true, true)

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