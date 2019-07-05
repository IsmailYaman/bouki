export class EndScene extends Phaser.Scene {

    constructor() {
        super({key: "EndScene"})
    }

    init(): void {
    }

    preload(): void {
    }

    create(): void {

        //Background
        this.add.image(0, 0, 'jungle').setOrigin(0, 0)

        //Logo
        this.add.image(220, 100, 'start').setOrigin(0, 0)

        //Text
        this.add.text(385, 300, 'Click here to Restart', { fontFamily: 'Arial Black', fontSize: 35, color: 'grey' }).setOrigin(0.5).setStroke('black', 5)


        //Click screen to start over
        this.input.once('pointerdown', (pointer) => {
            this.scene.start('level1')
        })
    }
}
