export class Door extends Phaser.Physics.Arcade.Sprite {

    private speed:number

    constructor(scene, x: number, y: number, texture:string, friction:number = 1) {
        super(scene, x, y, texture)
        // super(scene, x, y, "key")

        this.scene.physics.add.existing(this)
        
        let body = this.body as Phaser.Physics.Arcade.Body
        body.setAllowGravity(false)
        this.setGravity(0) 
        this.setImmovable(true)
    }
}
