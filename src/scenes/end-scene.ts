export class EndScene extends Phaser.Scene {

    constructor() {
        super({key: "EndScene"})
    }

    init(): void {
    }

    preload(): void {
    }

    create(): void {
        // change this to a nice game over image

        this.add.image(0, 0, 'jungle').setOrigin(0, 0)

        // add text here
        this.add.image(220, 100, 'start').setOrigin(0, 0)

        this.add.text(385, 300, 'Click here to Restart', { fontFamily: 'Arial Black', fontSize: 35, color: 'grey' }).setOrigin(0.5).setStroke('black', 5)


        // add code here to switch to the GameScene, after a mouse click
        this.input.once('pointerdown', (pointer) => {
            this.scene.start('level1')
        })
    }
}
