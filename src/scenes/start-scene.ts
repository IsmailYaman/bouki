export class StartScene extends Phaser.Scene {

    
    constructor() {
        super({key: "StartScene"})
    }

    init(): void {
    }

    preload(): void {
    }

    create(): void {
        this.add.image(0, 0, 'jungle').setOrigin(0, 0)

        // add another image here

        // add text here
        this.add.image(220, 60, 'start').setOrigin(0, 0)

        this.add.text(385, 250, 'Press any button to play!', { fontFamily: 'Arial Black', fontSize: 40, color: 'grey' }).setOrigin(0.5).setStroke('black', 5)

        // add code here to switch to the GameScene, after a mouse click

            let btn1 = this.add.image(370, 340, 'bananaL')
            btn1.setInteractive()
            btn1.on('pointerdown', (pointer) => {
                this.scene.start('level1')
            })
    }
}
