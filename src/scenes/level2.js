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
var mazedoor_1 = require("../objects/mazedoor");
var enemyred_1 = require("../objects/enemyred");
var banana_1 = require("../objects/banana");
var star_1 = require("../objects/star");
var level2 = /** @class */ (function (_super) {
    __extends(level2, _super);
    function level2() {
        var _this = _super.call(this, { key: "level2" }) || this;
        _this.collectedBanana = 0;
        _this.lives = 300;
        return _this;
    }
    level2.prototype.init = function () {
        console.log("dit is Level 2");
        this.registry.values.score = 0;
    };
    level2.prototype.create = function () {
        var _this = this;
        this.input.once('pointerdown', function (pointer) {
            _this.scene.start('level3');
            console.log('volgend level');
        });
        this.add.image(0, 0, 'ground').setOrigin(0, 0);
        this.stars = this.add.group();
        this.stars.add(new star_1.Star(this, 210, 140), true);
        this.stars.add(new star_1.Star(this, 65, 190), true);
        this.stars.add(new star_1.Star(this, 65, 390), true);
        this.stars.add(new star_1.Star(this, 310, 390), true);
        this.stars.add(new star_1.Star(this, 310, 290), true);
        this.stars.add(new star_1.Star(this, 170, 290), true);
        this.stars.add(new star_1.Star(this, 310, 190), true);
        this.stars.add(new star_1.Star(this, 410, 390), true);
        this.stars.add(new star_1.Star(this, 505, 290), true);
        this.stars.add(new star_1.Star(this, 505, 190), true);
        this.stars.add(new star_1.Star(this, 410, 190), true);
        this.stars.add(new star_1.Star(this, 410, 80), true);
        this.stars.add(new star_1.Star(this, 610, 190), true);
        this.stars.add(new star_1.Star(this, 610, 290), true);
        this.stars.add(new star_1.Star(this, 710, 290), true);
        this.stars.add(new star_1.Star(this, 710, 390), true);
        this.stars.add(new star_1.Star(this, 710, 80), true);
        this.stars.add(new star_1.Star(this, 710, 190), true);
        this.key = this.add.group();
        this.key.add(new key_1.Key(this, 320, 86), true);
        this.mazedoor = this.add.group();
        this.mazedoor.add(new mazedoor_1.Mazedoor(this, 663, 190), true);
        this.banana = this.add.group();
        this.banana.add(new banana_1.Banana(this, 530, 85), true);
        this.enemy3 = this.add.group({ runChildUpdate: true });
        this.enemy3.add(new enemyred_1.EnemyRed(this, 420, 65), true);
        this.enemy3.add(new enemyred_1.EnemyRed(this, 600, 195), true);
        this.enemy3.add(new enemyred_1.EnemyRed(this, 50, 305), true);
        this.enemy3.add(new enemyred_1.EnemyRed(this, 720, 390), true);
        // TODO add player
        this.player = new player_1.Player(this);
        this.platforms = this.add.group({ runChildUpdate: true });
        this.platforms.addMultiple([
            //Right downside (X > 400px, Y >= 300px)
            new platform_1.Platform(this, 662, 302, "mazewall1"),
            new platform_1.Platform(this, 507, 339, "mazewall2"),
            new platform_1.Platform(this, 615, 339, "mazewall"),
            //Right topside (X > 400px, Y < 300px)
            new platform_1.Platform(this, 708, 240, "mazewall2"),
            new platform_1.Platform(this, 615, 141, "mazewall"),
            new platform_1.Platform(this, 557, 204, "mazewall1"),
            new platform_1.Platform(this, 510, 141, "mazewall"),
            new platform_1.Platform(this, 457, 104, "mazewall1"),
            new platform_1.Platform(this, 406, 241, "mazewall"),
            //Left downside (X < 400px, Y >= 300px)
            new platform_1.Platform(this, 360, 302, "mazewall1"),
            new platform_1.Platform(this, 213, 339, "mazewall"),
            new platform_1.Platform(this, 117, 302, "mazewall1"),
            //Left topside (X < 400px, Y < 300px)     
            new platform_1.Platform(this, 114, 141, "mazewall"),
            new platform_1.Platform(this, 163, 241, "mazewall2"),
            new platform_1.Platform(this, 260, 104, "mazewall1"),
            new platform_1.Platform(this, 260, 204, "mazewall1"),
            new platform_1.Platform(this, 313, 141, "mazewall"),
            new platform_1.Platform(this, 360, 204, "mazewall1"),
            //Borders
            new platform_1.Platform(this, 20, 20, "topleft"),
            new platform_1.Platform(this, 750, 20, "topright"),
            new platform_1.Platform(this, 20, 430, "bottomleft"),
            new platform_1.Platform(this, 750, 430, "bottomright"),
            new platform_1.Platform(this, 20, 225, "caveleft"),
            new platform_1.Platform(this, 385, 20, "cavetop"),
            new platform_1.Platform(this, 750, 225, "caveright"),
            new platform_1.Platform(this, 385, 430, "cavebot"),
        ], true);
        // this.add.image(0, 0, 'shade').setOrigin(0, 0)
        this.add.text(710, 20, 'Level 2', { fontFamily: 'Arial Black', fontSize: 24, color: '#2ac9be' }).setOrigin(0.5).setStroke('black', 5);
        this.scoreField = this.add.text(150, 20, this.collectedBanana + ' Bananas collected', { fontFamily: 'Arial Black', fontSize: 24, color: '#2ac9be' }).setOrigin(0.5).setStroke('#000000', 5);
        // define collisions for bouncing, and overlaps for pickups
        this.physics.add.collider(this.enemy3, this.platforms);
        this.physics.add.collider(this.enemy3, this.mazedoor);
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.collider(this.player, this.mazedoor);
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        this.physics.add.overlap(this.player, this.key, this.hitKey, null, this);
        this.physics.add.overlap(this.player, this.banana, this.hitBanana, null, this);
        this.physics.add.overlap(this.player, this.enemy3, this.hitEnemy, null, this);
        this.physics.world.bounds.width = 770;
        this.physics.world.bounds.height = 450;
        this.cameras.main.setSize(770, 450);
        this.cameras.main.setBounds(0, 0, 0, 0);
    };
    level2.prototype.collectStar = function (player, star) {
        this.stars.remove(star, true, true);
        this.registry.values.score++;
        this.collectedBanana++;
        console.log(this.registry.values.score + ' sterren');
        // TO DO check if we have all the stars, then go to the end scene'
        this.scoreField.text = this.collectedBanana + ' Bananas collected';
    };
    level2.prototype.hitKey = function (player, key) {
        console.log(key);
        this.key.remove(key, true, true);
        this.mazedoor.remove(this.mazedoor.children.entries[0], true);
        console.log("Deur is open!");
    };
    level2.prototype.hitEnemy = function (player, enemy) {
        console.log("Je bent dood");
        this.scene.start('EndScene');
    };
    level2.prototype.hitBanana = function (player, banana) {
        this.banana.remove(banana, true);
        console.log("Volgend level");
        this.scene.start('level3');
    };
    level2.prototype.update = function () {
        this.player.update();
        // this.add.text(170, 50,' Sterren', { fontFamily: 'Arial Black', fontSize: 40, color: '#2ac9be' }).setOrigin(0.5).setStroke('#000000', 5)
    };
    return level2;
}(Phaser.Scene));
exports.level2 = level2;
