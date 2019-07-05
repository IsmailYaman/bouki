import { Arcade } from "../arcade/arcade"
import { Game } from "../app"


export class StartScene extends Phaser.Scene {
    private arcade: Arcade
    private nextGameListener: EventListener
    

    
    constructor() {
        super({key: "StartScene"})
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

        //Text
        this.add.text(385, 250, 'Press any button to play!', { fontFamily: 'Arial Black', fontSize: 40, color: 'grey' }).setOrigin(0.5).setStroke('black', 5)

        //Click on the banana to go to level 1
        let btn1 = this.add.image(370, 340, 'bananaL')
            btn1.setInteractive()
            btn1.on('pointerdown', (pointer) => {
            this.scene.start('level1')
        })
    }

