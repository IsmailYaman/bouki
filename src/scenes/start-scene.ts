export class StartScene extends Phaser.Scene {

    constructor() {
        super({key: "StartScene"})
    }

    init(): void {
        console.log("hey I am the startscene")
    }

    preload(): void {
    }

    create(): void {
        this.add.image(0, 0, 'jungle').setOrigin(0, 0)

        // add another image here

        // add text here

        this.add.text(400, 300, 'Bouki and the lost bananas!', { fontFamily: 'Gill sans nova', fontSize: 50, color: '#873600  ' }).setOrigin(0.5)

        let btn1 = this.add.image(400,400, 'startgame')
        btn1.setInteractive()
        btn1.on('pointerdown', (pointer) => {
            this.scene.start('GameScene')
        })
    }
    
}
