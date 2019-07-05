export class Spikes extends Phaser.Physics.Arcade.Sprite {

    private startPosition:number

    constructor(scene, x: number, y: number, friction:number = 1) {
        super(scene, x, y, "spikes")

        this.scene.physics.add.existing(this)
        
        let body = this.body as Phaser.Physics.Arcade.Body
        this.setGravity(0) 

        this.setBounce(1)
        // this.setCollideWorldBounds(true)

        
        this.setVelocity(0, 20);

    }
}
