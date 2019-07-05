import { Player } from "../objects/player"
import { Platform } from "../objects/platform"
import { Key } from "../objects/key"
import { Door } from "../objects/door"
import { Door1 } from "../objects/door1"
import { Enemy } from "../objects/enemy"
import { Enemy1 } from "../objects/enemy1"
import { EnemyRed } from "../objects/enemyred";
import { Banana } from "../objects/banana";
import { Star } from "../objects/star";


export class level1 extends Phaser.Scene {
    
    private player : Player
    private platforms: Phaser.GameObjects.Group
    private stars: Phaser.GameObjects.Group
    private key: Phaser.GameObjects.Group
    private door: Phaser.GameObjects.Group
    private door1: Phaser.GameObjects.Group
    private banana: Phaser.GameObjects.Group
    private enemy: Phaser.GameObjects.Group
    private enemy1: Phaser.GameObjects.Group
    private enemy3: Phaser.GameObjects.Group
    private collectedBanana = 0
    private scoreField
    public lives = 300


    constructor() {
        super({ key: "level1" })
    }

    init(): void {
        console.log("dit is level 1")

        //Reset banana score
        this.registry.values.score = 0
    }

    //Click on screen to skip level
    create(): void {
        this.input.once('pointerdown', (pointer) => {
            this.scene.start('level2')
            console.log('volgend level')            
        })
        
        //Background
        this.add.image(0, 0, 'ground').setOrigin(0, 0)  

        //Stars are bananas
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

        //Vertical green enemy
        this.enemy1 = this.add.group({runChildUpdate:true})
        this.enemy1.add(new Enemy1(this, 710, 390), true)

        //Horizontal green enemy
        this.enemy = this.add.group({runChildUpdate:true})
        this.enemy.add(new Enemy(this, 420, 65), true)
        this.enemy.add(new Enemy(this, 600, 195), true)
        this.enemy.add(new Enemy(this, 50, 305), true)

        //Horizontal red enemy
        this.enemy3 = this.add.group({runChildUpdate:true})
        this.enemy3.add(new EnemyRed(this, 710, 390), true)

        //Door banana
        this.door = this.add.group()
        this.door.add(new Door(this, 240, 140), true)

        //Door key
        this.door1 = this.add.group()
        this.door1.add(new Door1(this, 420, 370), true)

        //Key
        this.key = this.add.group()
        this.key.add(new Key(this, 480, 300), true)

        //Goal banana
        this.banana = this.add.group()
        this.banana.add(new Banana(this, 155, 200), true)

        this.player = new Player(this)

        //All platforms in the level
        this.platforms = this.add.group({ runChildUpdate: true })    
        this.platforms.addMultiple([
            //Borders
            new Platform(this, 20, 20,"topleft"),
            new Platform(this, 750, 20,"topright"),
            new Platform(this, 20, 430,"bottomleft"),
            new Platform(this, 750, 430,"bottomright"),
            new Platform(this, 20, 225, "caveleft"),
            new Platform(this, 385, 20, "cavetop"),
            new Platform(this, 385, 430, "cavebot"),
            new Platform(this, 750, 225, "caveright"),

            //Walls
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

        //Text up right & Score field up left
        this.add.text(710, 20, 'Level 1', { fontFamily: 'Arial Black', fontSize: 24, color: '#2ac9be' }).setOrigin(0.5).setStroke('black', 5)
        this.scoreField = this.add.text(150, 20, this.collectedBanana + ' Bananas collected', { fontFamily: 'Arial Black', fontSize: 24, color: '#2ac9be' }).setOrigin(0.5).setStroke('#000000', 5)
        
        //Defined collision and overlaps
        this.physics.add.collider(this.enemy, this.platforms)
        this.physics.add.collider(this.enemy, this.door1)
        this.physics.add.collider(this.enemy1, this.platforms)
        this.physics.add.collider(this.enemy1, this.door1)
        this.physics.add.collider(this.enemy3, this.platforms)
        this.physics.add.collider(this.enemy3, this.door1)
        this.physics.add.collider(this.stars, this.platforms)
        this.physics.add.collider(this.player, this.platforms)
        this.physics.add.collider(this.player, this.door)
        this.physics.add.collider(this.player, this.door1)
        
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this)
        this.physics.add.overlap(this.player, this.key, this.hitKey, null, this)
        this.physics.add.overlap(this.player, this.banana, this.hitBanana, null, this)
        this.physics.add.overlap(this.player, this.enemy, this.hitEnemy, null, this)
        this.physics.add.overlap(this.player, this.enemy1, this.hitEnemy, null, this)
        this.physics.add.overlap(this.player, this.enemy3, this.hitEnemy, null, this)

        //World bounds
        this.physics.world.bounds.width = 770
        this.physics.world.bounds.height = 450
    }

    //If enemy hit, you die
    private hitEnemy(player:Player, enemy){
        console.log("Je bent dood")
        this.scene.start('EndScene')
    }

    //If banana hit, you go to next level
    private hitBanana(player:Player, banana){
        this.banana.remove(banana, true, true)
        console.log("Volgend level")
        this.scene.start('level2')
    }

    // if key hit, doors open
    private hitKey(player:Player, key){
        console.log(key);
        this.key.remove(key, true, true)
        this.door.remove(this.door.children.entries[0], true, true)
        this.door1.remove(this.door1.children.entries[0], true, true)
        console.log("Deur is open!")
    }

    //If collected banana, add +1 to score
    private collectStar(player : Player , star) : void {
        this.stars.remove(star, true, true)
        this.registry.values.score++
        this.collectedBanana++
        console.log(this.registry.values.score + ' sterren')
        this.scoreField.text = this.collectedBanana + ' Bananas collected'
    }

    update(){
        this.player.update()
    }
}