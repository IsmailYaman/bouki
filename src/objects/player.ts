export class Player extends Phaser.Physics.Arcade.Sprite {

    private cursors: Phaser.Input.Keyboard.CursorKeys
    public currentHealth = 100;
    private maxHealth = 100;

    constructor(scene) {
        
        super(scene, 100, 80, "player")

        this.cursors = this.scene.input.keyboard.createCursorKeys()
        
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.setCollideWorldBounds(true)
        // this.setBounce(0.1)
        this.setDragX(600)
        this.setDragY(600)
    }
    
    public update(): void {
        
        
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
}

