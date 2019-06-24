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
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(scene) {
        var _this = _super.call(this, scene, 100, 80, "player") || this;
        _this.currentHealth = 100;
        _this.maxHealth = 100;
        _this.cursors = _this.scene.input.keyboard.createCursorKeys();
        _this.scene.add.existing(_this);
        _this.scene.physics.add.existing(_this);
        _this.setCollideWorldBounds(true);
        _this.setDragX(1000);
        _this.setDragY(1000);
        return _this;
    }
    Player.prototype.update = function () {
        if (this.cursors.left.isDown) {
            this.setVelocityX(-200);
            this.flipX = true;
        }
        if (this.cursors.right.isDown) {
            this.setVelocityX(200);
            this.flipX = false;
        }
        if (this.cursors.up.isDown) {
            this.setVelocityY(-200);
        }
        if (this.cursors.down.isDown) {
            this.setVelocityY(200);
        }
        if (this.cursors.down.isDown && this.cursors.left.isDown) {
            this.flipX = true;
        }
        if (this.cursors.up.isDown && this.cursors.left.isDown) {
            this.flipX = true;
        }
        if (this.cursors.down.isDown && this.cursors.right.isDown) {
            this.flipX = false;
        }
        if (this.cursors.up.isDown && this.cursors.right.isDown) {
            this.flipX = false;
        }
        if (this.cursors.down.isDown || this.cursors.up.isDown || this.cursors.right.isDown || this.cursors.left.isDown) {
            console.log('Ik beweeg');
        }
        console.log(this.maxHealth, this.currentHealth);
        // Jumping
        // let grounded = this.body.touching.down 
        // if (this.cursors.up.isDown && grounded) {
        //     this.setVelocityY(-350)
        // }
        //lives
    };
    return Player;
}(Phaser.Physics.Arcade.Sprite));
exports.Player = Player;
