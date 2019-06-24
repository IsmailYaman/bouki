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
var key_1 = require("../objects/key");
var door1_1 = require("../objects/door1");
var enemy_1 = require("../objects/enemy");
var enemy1_1 = require("../objects/enemy1");
var enemy2_1 = require("../objects/enemy2");
var enemyred_1 = require("../objects/enemyred");
var banana_1 = require("../objects/banana");
var star_1 = require("../objects/star");
var level3 = /** @class */ (function (_super) {
    __extends(level3, _super);
    function level3() {
        var _this = _super.call(this, { key: "level3" }) || this;
        _this.collectedBanana = 0;
        _this.lives = 300;
        return _this;
    }
    level3.prototype.init = function () {
        console.log("dit is level 3");
        this.registry.values.score = 0;
    };
    level3.prototype.create = function () {
        var _this = this;
        this.input.once('pointerdown', function (pointer) {
            _this.scene.start('WinScene');
            console.log('Je hebt gewonnen!');
            _this.graphics = _this.add.graphics({ fillStyle: { color: 0x00AA00 } });
        });
        this.add.image(0, 0, 'ground').setOrigin(0, 0);
        this.stars = this.add.group();
        this.stars.add(new star_1.Star(this, 60, 140), true);
        this.stars.add(new star_1.Star(this, 120, 220), true);
        this.stars.add(new star_1.Star(this, 60, 310), true);
        this.stars.add(new star_1.Star(this, 120, 390), true);
        this.stars.add(new star_1.Star(this, 200, 65), true);
        this.stars.add(new star_1.Star(this, 375, 65), true);
        this.stars.add(new star_1.Star(this, 590, 65), true);
        this.stars.add(new star_1.Star(this, 630, 230), true);
        this.stars.add(new star_1.Star(this, 710, 310), true);
        this.enemy = this.add.group({ runChildUpdate: true });
        this.enemy.add(new enemy2_1.Enemy2(this, 210, 395), true);
        this.enemy.add(new enemy1_1.Enemy1(this, 265, 60), true);
        this.enemy.add(new enemy2_1.Enemy2(this, 320, 395), true);
        this.enemy.add(new enemy1_1.Enemy1(this, 375, 60), true);
        this.enemy.add(new enemy2_1.Enemy2(this, 430, 395), true);
        this.enemy.add(new enemy1_1.Enemy1(this, 485, 60), true);
        this.enemy.add(new enemy2_1.Enemy2(this, 540, 395), true);
        this.enemy.add(new enemyred_1.EnemyRed(this, 561, 220), true);
        this.enemy.add(new enemyred_1.EnemyRed(this, 200, 100), true);
        this.enemy.add(new enemy_1.Enemy(this, 60, 180), true);
        this.enemy.add(new enemyred_1.EnemyRed(this, 200, 310), true);
        // this.door = this.add.group()
        // this.door.add(new Door(this, 440, 140), true)
        this.door1 = this.add.group();
        this.door1.add(new door1_1.Door1(this, 590, 370), true);
        this.key = this.add.group();
        this.key.add(new key_1.Key(this, 680, 65), true);
        this.banana = this.add.group();
        this.banana.add(new banana_1.Banana(this, 690, 170), true);
        // TODO add player
        this.player = new player_1.Player(this);
        this.platforms = this.add.group({ runChildUpdate: true });
        this.platforms.addMultiple([
            new platform_1.Platform(this, 20, 20, "topleft"),
            new platform_1.Platform(this, 750, 20, "topright"),
            new platform_1.Platform(this, 20, 430, "bottomleft"),
            new platform_1.Platform(this, 750, 430, "bottomright"),
            new platform_1.Platform(this, 710, 230, "wall3b"),
            new platform_1.Platform(this, 40, 140, "wall3"),
            new platform_1.Platform(this, 140, 339, "wall3"),
            new platform_1.Platform(this, 160, 318, "wall2b"),
            new platform_1.Platform(this, 40, 220, "wall3"),
            new platform_1.Platform(this, 20, 225, "caveleft"),
            new platform_1.Platform(this, 385, 20, "cavetop"),
            new platform_1.Platform(this, 385, 430, "cavebot"),
            new platform_1.Platform(this, 750, 225, "caveright"),
            new platform_1.Platform(this, 670, 112, "wall3b"),
            new platform_1.Platform(this, 630, 310, "wall3b"),
            new platform_1.Platform(this, 160, 159, "wall2"),
            // new Platform(this, 590, 199, "wall2"),
            new platform_1.Platform(this, 590, 211, "wall2"),
        ], true);
        this.add.text(710, 20, 'Level 3', { fontFamily: 'Arial Black', fontSize: 24, color: '#2ac9be' }).setOrigin(0.5).setStroke('black', 5);
        this.scoreField = this.add.text(150, 20, this.collectedBanana + ' Bananas collected', { fontFamily: 'Arial Black', fontSize: 24, color: '#2ac9be' }).setOrigin(0.5).setStroke('#000000', 5);
        // define collisions for bouncing, and overlaps for pickups
        this.physics.add.collider(this.enemy, this.platforms);
        this.physics.add.collider(this.enemy, this.door1);
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.door);
        this.physics.add.collider(this.player, this.door1);
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        this.physics.add.overlap(this.player, this.key, this.hitKey, null, this);
        this.physics.add.overlap(this.player, this.banana, this.hitBanana, null, this);
        this.physics.add.overlap(this.player, this.enemy, this.hitEnemy, null, this);
        this.add.image(400, 20, 'heart');
        this.add.image(360, 20, 'heart');
        this.add.image(440, 20, 'heart');
        this.physics.world.bounds.width = 770;
        this.physics.world.bounds.height = 450;
        this.cameras.main.setSize(770, 450);
        this.cameras.main.setBounds(0, 0, 0, 0);
    };
    level3.prototype.hitEnemy = function (player, enemy) {
        console.log("Je bent dood");
        this.scene.start('EndScene');
    };
    level3.prototype.hitBanana = function (player, banana) {
        this.banana.remove(banana, true, true);
        console.log("Je hebt gewonnen!");
        this.scene.start('WinScene');
    };
    level3.prototype.hitKey = function (player, key) {
        console.log(key);
        this.key.remove(key, true, true);
        this.door1.remove(this.door1.children.entries[0], true, true);
        console.log("Deur is open!");
        1;
    };
    level3.prototype.collectStar = function (player, star) {
        this.stars.remove(star, true, true);
        this.registry.values.score++;
        this.collectedBanana++;
        console.log(this.registry.values.score + ' sterren');
        // TO DO check if we have all the stars, then go to the end scene'
        this.scoreField.text = this.collectedBanana + ' Bananas collected';
    };
    level3.prototype.update = function () {
        var _this = this;
        this.player.update();
        this.input.once('pointerdown', function (pointer) {
            _this.scene.start('level');
            console.log('volgend level');
            _this.graphics.clear();
            _this.graphics.fillRectShape(new Phaser.Geom.Rectangle(400, 200, _this.lives, 20));
        });
    };
    return level3;
}(Phaser.Scene));
exports.level3 = level3;
