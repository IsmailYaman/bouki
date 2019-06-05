export class Door extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x,y) {
        super(scene, x, y, "door")

        this.scene.physics.add.existing(this)

        this.setCollideWorldBounds(true)
        this.setImmovable(true)

    }
} 
