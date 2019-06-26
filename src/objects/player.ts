import { Arcade } from "../arcade/arcade"
import { Game } from "../app"
import { level1 } from "../scenes/level1"

export class Player extends Phaser.Physics.Arcade.Sprite {

    private cursors: Phaser.Input.Keyboard.CursorKeys
    public currentHealth = 100;
    private maxHealth = 100;
    private arcade : Arcade 

    constructor(scene: level1) {
        super(scene, 100, 80, "player")

        this.cursors = this.scene.input.keyboard.createCursorKeys()
        
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.setCollideWorldBounds(true)
        // this.setBounce(0.1)
        this.setDragX(600)
        this.setDragY(600)

        let g = this.scene.game as Game
        this.arcade = g.arcade
    }

    public update(){
        this.keyboardInput()
        this.joystickInput()
    }
    
    public keyboardInput(): void {
 
        if (this.cursors.left.isDown ) {
            this.setVelocityX(-200)
            this.flipX = true
        } 
        
        if (this.cursors.right.isDown) {
            this.setVelocityX(200)
            this.flipX = false
        } 
        
        if (this.cursors.up.isDown) {
            this.setVelocityY(-200)
        } 
        
        if (this.cursors.down.isDown) {
            this.setVelocityY(200)
        } 

        if(this.cursors.down.isDown && this.cursors.left.isDown){
            this.flipX = true

        }

        if(this.cursors.up.isDown && this.cursors.left.isDown){
            this.flipX = true
        }

        if(this.cursors.down.isDown && this.cursors.right.isDown){
            this.flipX = false
        }
        if(this.cursors.up.isDown && this.cursors.right.isDown){
            this.flipX = false
        }

        if (this.cursors.down.isDown || this.cursors.up.isDown || this.cursors.right.isDown || this.cursors.left.isDown){
            console.log('Ik beweeg')
        }

        // Jumping
        
        // let grounded = this.body.touching.down 
        // if (this.cursors.up.isDown && grounded) {
        //     this.setVelocityY(-350)
        // }

        //lives
        
        
    }

    private joystickInput():void {
        for (let joystick of this.arcade.Joysticks) {
            joystick.update()
        }
        if (this.arcade.Joysticks[0]) {
           this.setVelocityX(this.arcade.Joysticks[0].X * 200)
           this.setVelocityY(this.arcade.Joysticks[0].Y * 200)
           this.flipX= true
           this.flipY= true
      
        }
    }
}