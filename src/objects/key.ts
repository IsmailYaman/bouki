export class Key extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x,y) {
        super(scene, x, y, "key")

        this.scene.physics.add.existing(this)

        this.setCollideWorldBounds(true)

    }
} 
