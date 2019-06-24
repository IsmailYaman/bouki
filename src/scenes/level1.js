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
var door_1 = require("../objects/door");
var door1_1 = require("../objects/door1");
var enemy_1 = require("../objects/enemy");
var enemy1_1 = require("../objects/enemy1");
var enemyred_1 = require("../objects/enemyred");
var banana_1 = require("../objects/banana");
var star_1 = require("../objects/star");
var level1 = /** @class */ (function (_super) {
    __extends(level1, _super);
    function level1() {
        var _this = _super.call(this, { key: "level1" }) || this;
        _this.collectedBanana = 0;
        _this.lives = 300;
        return _this;
    }
    level1.prototype.init = function () {
        console.log("dit is level 1");
        this.registry.values.score = 0;
    };
    level1.prototype.create = function () {
        var _this = this;
        this.input.once('pointerdown', function (pointer) {
            _this.scene.start('level2');
            console.log('volgend level');
            _this.graphics = _this.add.graphics({ fillStyle: { color: 0x00AA00 } });
        });
        this.add.image(0, 0, 'ground').setOrigin(0, 0);
        this.stars = this.add.group();
        this.stars.add(new star_1.Star(this, 60, 140), true);
        this.stars.add(new star_1.Star(this, 60, 260), true);
        this.stars.add(new star_1.Star(this, 140, 390), true);
        this.stars.add(new star_1.Star(this, 220, 390), true);
        this.stars.add(new star_1.Star(this, 300, 390), true);
        this.stars.add(new star_1.Star(this, 625, 115), true);
        this.stars.add(new star_1.Star(this, 545, 150), true);
        this.stars.add(new star_1.Star(this, 710, 230), true);
        this.stars.add(new star_1.Star(this, 710, 350), true);
        this.enemy1 = this.add.group({ runChildUpdate: true });
        this.enemy1.add(new enemy1_1.Enemy1(this, 710, 390), true);
        this.enemy = this.add.group({ runChildUpdate: true });
        this.enemy.add(new enemy_1.Enemy(this, 420, 65), true);
        this.enemy.add(new enemy_1.Enemy(this, 600, 195), true);
        this.enemy.add(new enemy_1.Enemy(this, 50, 305), true);
        this.enemy3 = this.add.group({ runChildUpdate: true });
        this.enemy3.add(new enemyred_1.EnemyRed(this, 710, 390), true);
        this.door = this.add.group();
        this.door.add(new door_1.Door(this, 240, 140), true);
        this.door1 = this.add.group();
        this.door1.add(new door1_1.Door1(this, 420, 370), true);
        this.key = this.add.group();
        this.key.add(new key_1.Key(this, 480, 300), true);
        this.banana = this.add.group();
        this.banana.add(new banana_1.Banana(this, 155, 200), true);
        // TODO add player
        this.player = new player_1.Player(this);
        this.platforms = this.add.group({ runChildUpdate: true });
        this.platforms.addMultiple([
            new platform_1.Platform(this, 20, 20, "topleft"),
            new platform_1.Platform(this, 750, 20, "topright"),
            new platform_1.Platform(this, 20, 430, "bottomleft"),
            new platform_1.Platform(this, 750, 430, "bottomright"),
            new platform_1.Platform(this, 20, 225, "caveleft"),
            new platform_1.Platform(this, 385, 20, "cavetop"),
            new platform_1.Platform(this, 385, 430, "cavebot"),
            new platform_1.Platform(this, 750, 225, "caveright"),
            new platform_1.Platform(this, 100, 199, "wall"),
            new platform_1.Platform(this, 540, 291, "wall"),
            new platform_1.Platform(this, 665, 291, "wall"),
            new platform_1.Platform(this, 200, 258, "wall1"),
            new platform_1.Platform(this, 520, 232, "wall1"),
            new platform_1.Platform(this, 300, 159, "wall2"),
            new platform_1.Platform(this, 160, 140, "wall3"),
            new platform_1.Platform(this, 565, 112, "wall3"),
            new platform_1.Platform(this, 625, 152, "wall3b"),
            new platform_1.Platform(this, 220, 350, "wall4"),
            new platform_1.Platform(this, 420, 211, "wall2"),
            new platform_1.Platform(this, 505, 132, "wall2b"),
            new platform_1.Platform(this, 665, 132, "wall2b")
        ], true);
        this.add.text(710, 20, 'Level 1', { fontFamily: 'Arial Black', fontSize: 24, color: '#2ac9be' }).setOrigin(0.5).setStroke('black', 5);
        this.scoreField = this.add.text(150, 20, this.collectedBanana + ' Bananas collected', { fontFamily: 'Arial Black', fontSize: 24, color: '#2ac9be' }).setOrigin(0.5).setStroke('#000000', 5);
        // define collisions for bouncing, and overlaps for pickups
        this.physics.add.collider(this.enemy, this.platforms);
        this.physics.add.collider(this.enemy, this.door1);
        this.physics.add.collider(this.enemy1, this.platforms);
        this.physics.add.collider(this.enemy1, this.door1);
        this.physics.add.collider(this.enemy3, this.platforms);
        this.physics.add.collider(this.enemy3, this.door1);
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.door);
        this.physics.add.collider(this.player, this.door1);
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        this.physics.add.overlap(this.player, this.key, this.hitKey, null, this);
        this.physics.add.overlap(this.player, this.banana, this.hitBanana, null, this);
        this.physics.add.overlap(this.player, this.enemy, this.hitEnemy, null, this);
        this.physics.add.overlap(this.player, this.enemy1, this.hitEnemy, null, this);
        this.physics.add.overlap(this.player, this.enemy3, this.hitEnemy, null, this);
        this.add.image(400, 20, 'heart');
        this.add.image(360, 20, 'heart');
        this.add.image(440, 20, 'heart');
        this.physics.world.bounds.width = 770;
        this.physics.world.bounds.height = 450;
        this.cameras.main.setSize(770, 450);
        this.cameras.main.setBounds(0, 0, 0, 0);
    };
    level1.prototype.hitEnemy = function (player, enemy) {
        console.log("Je bent dood");
        this.scene.start('EndScene');
    };
    level1.prototype.hitBanana = function (player, banana) {
        this.banana.remove(banana, true, true);
        console.log("Volgend level");
        this.scene.start('level2');
    };
    level1.prototype.hitKey = function (player, key) {
        console.log(key);
        this.key.remove(key, true, true);
        this.door.remove(this.door.children.entries[0], true, true);
        this.door1.remove(this.door1.children.entries[0], true, true);
        console.log("Deur is open!");
    };
    level1.prototype.collectStar = function (player, star) {
        this.stars.remove(star, true, true);
        this.registry.values.score++;
        this.collectedBanana++;
        console.log(this.registry.values.score + ' sterren');
        // TO DO check if we have all the stars, then go to the end scene'
        this.scoreField.text = this.collectedBanana + ' Bananas collected';
    };
    level1.prototype.update = function () {
        var _this = this;
        this.player.update();
        this.input.once('pointerdown', function (pointer) {
            _this.scene.start('level');
            console.log('volgend level');
            _this.graphics.clear();
            _this.graphics.fillRectShape(new Phaser.Geom.Rectangle(400, 200, _this.lives, 20));
        });
    };
    return level1;
}(Phaser.Scene));
exports.level1 = level1;
