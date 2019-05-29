export class Key extends Phaser.Physics.Arcade.Sprite {
    remove: any;
    add: any;
 
    constructor(scene, x,y, texture:string) {       
        super(scene, x, y, texture)

        this.scene.add.existing(this)


        


    }
}