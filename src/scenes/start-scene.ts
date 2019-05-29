export class StartScene extends Phaser.Scene {

    
    constructor() {
        super({key: "StartScene"})
    }

    init(): void {
    }

    preload(): void {
    }

    create(): void {
        this.add.image(0, 0, 'sky').setOrigin(0, 0)

        // add another image here

        // add text here
        this.add.image(220, 100, 'start').setOrigin(0, 0)

        this.add.text(385, 300, 'Click anywhere', { fontFamily: 'Arial Black', fontSize: 35, color: 'grey' }).setOrigin(0.5).setStroke('black', 5)

        // add code here to switch to the GameScene, after a mouse click

        this.input.once('pointerdown', (pointer) => {
            this.scene.start('GameScene')
        })
    }
}
