export class Star extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x,y) {
        super(scene, x, y, "bananaS")

        this.scene.physics.add.existing(this)

    }
}
