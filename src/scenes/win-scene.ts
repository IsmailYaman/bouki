export class WinScene extends Phaser.Scene {

    
    constructor() {
        super({key: "WinScene"})
    }

    init(): void {
    }

    preload(): void {
    }

    create(): void {

        //Background
        this.add.image(0, 0, 'jungle').setOrigin(0, 0)

        //Logo
        this.add.image(220, 60, 'start').setOrigin(0, 0)
    
        //Collected bananas
        this.add.image(340, 360, 'bananaL').setOrigin(0, 0)
        this.add.image(250, 340, 'bananaL').setOrigin(0, 0)
        this.add.image(430, 340, 'bananaL').setOrigin(0, 0)
    
        //Text
        this.add.text(385, 250, 'CONGRATULATIONS', { fontFamily: 'Arial Black', fontSize: 50, color: 'grey' }).setOrigin(0.5).setStroke('black', 5)
        this.add.text(385, 300, 'YOU WON!', { fontFamily: 'Arial Black', fontSize: 35, color: 'grey' }).setOrigin(0.5).setStroke('black', 5)

        //Click screen to start over
        this.input.once('pointerdown', (pointer) => {
            this.scene.start('StartScene')
        })
    }
}
