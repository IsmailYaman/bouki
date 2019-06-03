export class Banana extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x,y) {
        super(scene, x, y, "bananaL")

        this.scene.physics.add.existing(this)

    }
}
