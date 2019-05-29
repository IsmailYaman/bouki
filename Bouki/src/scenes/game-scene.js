"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var player_1 = require("../objects/player");
var platform_1 = require("../objects/platform");
var movingplatform_1 = require("../objects/movingplatform");
var bomb_1 = require("../objects/bomb");
var GameScene = /** @class */ (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this, { key: "GameScene" }) || this;
        _this.collectedBanana = 0;
        return _this;
    }
    GameScene.prototype.init = function () {
        console.log("dit is een gamescene");
        this.registry.values.score = 0;
    };
    GameScene.prototype.create = function () {
        //this.add.image(0, 0, 'ground').setOrigin(0, 0)      
        // 11 STARS
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 30, stepX: 70 },
        });
        this.bombs = this.add.group();
        this.bombs.add(new bomb_1.Bomb(this, 20, 20), true);
        this.bombs.add(new bomb_1.Bomb(this, 120, 20), true);
        // TODO add player
        this.player = new player_1.Player(this);
        this.platforms = this.add.group({ runChildUpdate: true });
        for (var i = 0; i < 770; i + 40) {
            this.platforms.addMultiple([
                new platform_1.Platform(this, i, 20, "wall")
            ], true);
        }
        this.platforms.addMultiple([
            new platform_1.Platform(this, 60, 20, "wall"),
            // new Platform(this, 500, 350, "ice"),
            new platform_1.Platform(this, 250, 450, "platform"),
            new movingplatform_1.MovingPlatform(this, 100, 250, "platform"),
        ], true);
        this.scoreField = this.add.text(250, 20, this.collectedBanana + ' Bananas collected', { fontFamily: 'Arial Black', fontSize: 40, color: '#2ac9be' }).setOrigin(0.5).setStroke('#000000', 5);
        // define collisions for bouncing, and overlaps for pickups
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        this.physics.add.overlap(this.player, this.bombs, this.hitBomb, null, this);
        this.physics.world.bounds.width = 770;
        this.physics.world.bounds.height = 450;
        this.cameras.main.setSize(770, 450);
        this.cameras.main.setBounds(0, 0, 0, 0);
    };
    GameScene.prototype.hitBomb = function (player, bomb) {
        this.bombs.remove(bomb, true, true);
        this.scene.start('EndScene');
    };
    GameScene.prototype.collectStar = function (player, star) {
        this.stars.remove(star, true, true);
        this.registry.values.score++;
        this.collectedBanana++;
        console.log(this.registry.values.score + ' sterren');
        // TO DO check if we have all the stars, then go to the end scene'
        this.scoreField.text = this.collectedBanana + ' Bananas collected';
    };
    GameScene.prototype.update = function () {
        this.player.update();
        // this.add.text(170, 50,' Sterren', { fontFamily: 'Arial Black', fontSize: 40, color: '#2ac9be' }).setOrigin(0.5).setStroke('#000000', 5)
    };
    return GameScene;
}(Phaser.Scene));
exports.GameScene = GameScene;
