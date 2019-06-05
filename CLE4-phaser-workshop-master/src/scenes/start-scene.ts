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

        this.add.text(400, 300, "Bouki", { fontFamily: 'Arial Black', fontSize: 70, color: '#2ac9be' }).setOrigin(0.5).setStroke('#7df2ea', 16)

        this.add.text(400, 350, 'and', { fontFamily: 'Arial Black', fontSize: 40, color: '#2ac9be' }).setOrigin(0.5).setStroke('#7df2ea', 16)

        this.add.text(400, 400, 'The Bananamonument', { fontFamily: 'Arial Black', fontSize: 50, color: '#2ac9be' }).setOrigin(0.5).setStroke('#7df2ea', 16)

        this.add.text(400, 450, 'Click anywhere', { fontFamily: 'Arial Black', fontSize: 35, color: '#2ac9be' }).setOrigin(0.5).setStroke('#7df2ea', 16)

        // add code here to switch to the GameScene, after a mouse click

        this.input.once('pointerdown', (pointer) => {
            this.scene.start('GameScene')
        })
    }
}
