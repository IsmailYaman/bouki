import { Player } from "../objects/player"
import { Platform } from "../objects/platform"
import { Key } from "../objects/key"
import { Mazedoor } from "../objects/mazedoor"
import { Bomb } from "../objects/bomb"
import { Banana } from "../objects/banana";
import { Cameras } from "phaser";
import { platform } from "os";

export class level2 extends Phaser.Scene {
    
    private player : Player
    private platforms: Phaser.GameObjects.Group
    private key: Phaser.GameObjects.Group
    private mazedoor: Phaser.GameObjects.Group
    private stars: Phaser.Physics.Arcade.Group
    private bombs: Phaser.GameObjects.Group
    private banana: Phaser.GameObjects.Group
    private collectedBanana = 0
    private scoreField

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
        
        // 11 STARS
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 60, stepX: 70 },
        })

        this.bombs = this.add.group()
        this.bombs.add(new Bomb(this, 700, 790), true)
        this.bombs.add(new Bomb(this, 750, 700), true)

        this.key = this.add.group()
        this.key.add(new Key(this, 320, 86), true)
        
        this.mazedoor = this.add.group()
        this.mazedoor.add(new Mazedoor(this, 663, 190), true)

        this.banana = this.add.group()
        this.banana.add(new Banana(this, 530, 85), true)
        
        

        // TODO add player
        this.player = new Player(this)

        this.platforms = this.add.group({ runChildUpdate: true })
        this.platforms.addMultiple([
            
            new Platform(this, 20, 225, "caveleft"),
            new Platform(this, 385, 20, "cavetop"),
            new Platform(this, 385, 430, "cavebot"),
            new Platform(this, 664, 300, "mazewall1"),
            new Platform(this, 710, 240, "mazewall2"),
            new Platform(this, 615, 140, "mazewall"),
            new Platform(this, 750, 225, "caveright"),
            new Platform(this, 558, 204, "mazewall1"),
            new Platform(this, 510, 141, "mazewall"),
            // new Platform(this, 662, 186, "mazewall3"),
            


            new Platform(this, 360, 300, "mazewall1"),
            
            new Platform(this, 212, 336, "mazewall"),  //lang rechts
            new Platform(this, 457, 104, "mazewall1"),
            new Platform(this, 120, 300, "mazewall1"),
             
            new Platform(this, 410, 240, "mazewall"),
            new Platform(this, 360, 203, "mazewall1"), 
            new Platform(this, 114, 141, "mazewall"), //kort rechts
            new Platform(this, 312, 141, "mazewall"),
            
            new Platform(this, 165, 241, "mazewall2"), //kort links
            new Platform(this, 260, 204, "mazewall1"),
            new Platform(this, 260, 104, "mazewall1"), //recht beneden

            new Platform(this, 507, 339, "mazewall2"),
            new Platform(this, 615, 339, "mazewall"),


            
            // new Platform(this, 80, 130, "mazewall"),
   
            // new Platform(this, 665, 291, "wall"),
            // new Platform(this, 200, 258, "wall1"),
            // new Platform(this, 520, 232, "wall1"),
            // new Platform(this, 300, 159, "wall2"),
            // new Platform(this, 160, 140, "wall3"),
            // new Platform(this, 220, 350, "wall4"),
            // new Platform(this, 420, 211, "wall2"),
            // new Platform(this, 240, 140, "door"),
            // new Platform(this, 420, 370, "door1"),
            // new Platform(this, 585, 132, "S"),
            // new Platform(this, 200,200, "key"),
            // new Platform(this, 500, 350, "ice"),
            // new Platform(this, 250, 450, "platform"),
            // new MovingPlatform(this, 100, 250, "platform"),
        ], true)
        
        this.add.text(710, 20, 'Level 2', { fontFamily: 'Arial Black', fontSize: 24, color: '#2ac9be' }).setOrigin(0.5).setStroke('black', 5)
        this.scoreField = this.add.text(150, 20, this.collectedBanana + ' Bananas collected', { fontFamily: 'Arial Black', fontSize: 24, color: '#2ac9be' }).setOrigin(0.5).setStroke('#000000', 5)
        // define collisions for bouncing, and overlaps for pickups
        this.physics.add.collider(this.stars, this.platforms)
        this.physics.add.collider(this.bombs, this.platforms)
        this.physics. add.collider(this.player, this.mazedoor)
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

    
    private hitBanana(player:Player, banana){
        this.banana.remove(banana, true)
        console.log("Volgend level")
        this.scene.start('level1')
    }

    update(){
        this.player.update()
        // this.add.text(170, 50,' Sterren', { fontFamily: 'Arial Black', fontSize: 40, color: '#2ac9be' }).setOrigin(0.5).setStroke('#000000', 5)
    }

}