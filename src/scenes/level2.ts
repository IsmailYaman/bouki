import { Player } from "../objects/player"
import { Platform } from "../objects/platform"
import { Key } from "../objects/key"
import { Mazedoor } from "../objects/mazedoor"
import { Enemy } from "../objects/enemy"
import { Enemy1 } from "../objects/enemy1"
import { EnemyRed } from "../objects/enemyred"
import { Banana } from "../objects/banana";
import { Star } from "../objects/star";

export class level2 extends Phaser.Scene {
    
    private player : Player
    private platforms: Phaser.GameObjects.Group
    private stars: Phaser.GameObjects.Group
    private key: Phaser.GameObjects.Group
    private mazedoor: Phaser.GameObjects.Group
    private banana: Phaser.GameObjects.Group
    private enemy: Phaser.GameObjects.Group
    private enemy1: Phaser.GameObjects.Group
    private enemy3: Phaser.GameObjects.Group

    private collectedBanana = 0
    private scoreField

    public lives = 300

    constructor() {
        super({ key: "level2" })
    }

    init(): void {
        console.log("dit is Level 2")
        this.registry.values.score = 0
    }

    create(): void {
        this.input.once('pointerdown', (pointer) => {
            this.scene.start('level3')
            console.log('volgend level')
        })


        this.add.image(0, 0, 'ground').setOrigin(0, 0)  
          

        
        this.stars = this.add.group()
        this.stars.add(new Star(this, 210, 140), true)
        this.stars.add(new Star(this, 65, 190), true)
        this.stars.add(new Star(this, 65, 390), true)
        this.stars.add(new Star(this, 310, 390), true)
        this.stars.add(new Star(this, 310, 290), true)
        this.stars.add(new Star(this, 170, 290), true)
        this.stars.add(new Star(this, 310, 190), true)
        this.stars.add(new Star(this, 410, 390), true)
        this.stars.add(new Star(this, 505, 290), true)
        this.stars.add(new Star(this, 505, 190), true)
        this.stars.add(new Star(this, 410, 190), true)
        this.stars.add(new Star(this, 410, 80), true)
        this.stars.add(new Star(this, 610, 190), true)
        this.stars.add(new Star(this, 610, 290), true)
        this.stars.add(new Star(this, 710, 290), true)
        this.stars.add(new Star(this, 710, 390), true)
        this.stars.add(new Star(this, 710, 80), true)
        this.stars.add(new Star(this, 710, 190), true)


        this.key = this.add.group()
        this.key.add(new Key(this, 320, 86), true)
        
        this.mazedoor = this.add.group()
        this.mazedoor.add(new Mazedoor(this, 663, 190), true)

        this.banana = this.add.group()
        this.banana.add(new Banana(this, 530, 85), true)

        
        this.enemy3 = this.add.group({runChildUpdate:true})
        this.enemy3.add(new EnemyRed(this, 420, 65), true)
        this.enemy3.add(new EnemyRed(this, 600, 195), true)
        this.enemy3.add(new EnemyRed(this, 50, 305), true)
        this.enemy3.add(new EnemyRed(this, 720, 390), true)
        
        

        // TODO add player
        this.player = new Player(this)

        this.platforms = this.add.group({ runChildUpdate: true })
        this.platforms.addMultiple([


            //Right downside (X > 400px, Y >= 300px)
            new Platform(this, 662, 302, "mazewall1"),
            new Platform(this, 507, 339, "mazewall2"),
            new Platform(this, 615, 339, "mazewall"),

            //Right topside (X > 400px, Y < 300px)
            new Platform(this, 708, 240, "mazewall2"),
            new Platform(this, 615, 141, "mazewall"),
            new Platform(this, 557, 204, "mazewall1"),
            new Platform(this, 510, 141, "mazewall"),  
            new Platform(this, 457, 104, "mazewall1"),  
            new Platform(this, 406, 241, "mazewall"),

            //Left downside (X < 400px, Y >= 300px)
            new Platform(this, 360, 302, "mazewall1"),
            new Platform(this, 213, 339, "mazewall"),
            new Platform(this, 117, 302, "mazewall1"),

            //Left topside (X < 400px, Y < 300px)     
            new Platform(this, 114, 141, "mazewall"), 
            new Platform(this, 163, 241, "mazewall2"), 
            new Platform(this, 260, 104, "mazewall1"),
            new Platform(this, 260, 204, "mazewall1"),
            new Platform(this, 313, 141, "mazewall"),            
            new Platform(this, 360, 204, "mazewall1"),                    
           
            
            //Borders
            new Platform(this, 20, 20,"topleft"),
            new Platform(this, 750, 20,"topright"),
            new Platform(this, 20, 430,"bottomleft"),
            new Platform(this, 750, 430,"bottomright"),
            new Platform(this, 20, 225, "caveleft"),
            new Platform(this, 385, 20, "cavetop"),
            new Platform(this, 750, 225, "caveright"),
            new Platform(this, 385, 430, "cavebot"),

        ], true)
        
        this.add.image(0, 0, 'shade').setOrigin(0, 0)


        this.add.text(710, 20, 'Level 2', { fontFamily: 'Arial Black', fontSize: 24, color: '#2ac9be' }).setOrigin(0.5).setStroke('black', 5)
        this.scoreField = this.add.text(150, 20, this.collectedBanana + ' Bananas collected', { fontFamily: 'Arial Black', fontSize: 24, color: '#2ac9be' }).setOrigin(0.5).setStroke('#000000', 5)
        
        // define collisions for bouncing, and overlaps for pickups
        this.physics.add.collider(this.enemy3, this.platforms)
        this.physics.add.collider(this.enemy3, this.mazedoor)
        this.physics.add.collider(this.stars, this.platforms)
        this.physics. add.collider(this.player, this.mazedoor)
        this.physics.add.collider(this.player, this.platforms)
        
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this)
        this.physics.add.overlap(this.player, this.key, this.hitKey, null, this)
        this.physics.add.overlap(this.player, this.banana, this.hitBanana, null, this)
        this.physics.add.overlap(this.player, this.enemy3, this.hitEnemy, null, this)


        this.physics.world.bounds.width = 770
        this.physics.world.bounds.height = 450
        
        this.cameras.main.setSize(770, 450)
        this.cameras.main.setBounds(0, 0, 0, 0)
    }

    private collectStar(player : Player , star) : void {
        this.stars.remove(star, true, true)
        this.registry.values.score++
        this.collectedBanana++
        console.log(this.registry.values.score + ' sterren')

        // TO DO check if we have all the stars, then go to the end scene'
        this.scoreField.text = this.collectedBanana + ' Bananas collected'
        
    
    }
    private hitKey(player:Player, key){
        console.log(key);
        
        this.key.remove(key, true, true)
        this.mazedoor.remove(this.mazedoor.children.entries[0], true)
        console.log("Deur is open!")
    }

    private hitEnemy(player:Player, enemy){
        console.log("Je bent dood")
        this.scene.start('EndScene')
    }
    
    
    private hitBanana(player:Player, banana){
        this.banana.remove(banana, true)
        console.log("Volgend level")
        this.scene.start('level3')
    }

    update(){
        this.player.update()
        // this.add.text(170, 50,' Sterren', { fontFamily: 'Arial Black', fontSize: 40, color: '#2ac9be' }).setOrigin(0.5).setStroke('#000000', 5)
    }

}