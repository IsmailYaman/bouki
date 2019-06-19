export class Enemy extends Phaser.Physics.Arcade.Sprite {

    private startPosition:number

    constructor(scene, x: number, y: number, friction:number = 1) {
        super(scene, x, y, "enemy")

        this.scene.physics.add.existing(this)
        
        let body = this.body as Phaser.Physics.Arcade.Body
        this.setGravity(0) 

        this.setBounce(1)
        this.setCollideWorldBounds(true)

        
        this.setVelocity(100, 0);

    }

//     public update(): void {
//         if (this.setVelocity(100,0)) {
//             this.flipX = true
//         }
//         else if (!(this.setVelocity(100,0))) {
//             this.flipX = false
//         }
//     }
// }


// export class Enemy extends Phaser.Physics.Arcade.Sprite {

//     private startPosition:number

//     constructor(scene, x: number, y: number, friction:number = 1) {
//         super(scene, x, y, "enemy")

//         this.scene.physics.add.existing(this)
        
//         let body = this.body as Phaser.Physics.Arcade.Body
//         this.setGravity(0) 
//         this.setImmovable(true)
//         this.setVelocityX(30)

//         this.startPosition = x
//     }

//     public update(): void {
//         if (this.x>= this.startPosition + 280) {
//             this.setVelocityX(-50)
//             this.flipX = false
//         }
//         else if (this.x <= this.startPosition) {
//             this.setVelocityX(50)
//             this.flipX = true
//         }
//     }
// }
}
