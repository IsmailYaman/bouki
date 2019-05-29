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
var StartScene = /** @class */ (function (_super) {
    __extends(StartScene, _super);
    function StartScene() {
        return _super.call(this, { key: "StartScene" }) || this;
    }
    StartScene.prototype.init = function () {
    };
    StartScene.prototype.preload = function () {
    };
    StartScene.prototype.create = function () {
        var _this = this;
        this.add.image(0, 0, 'sky').setOrigin(0, 0);
        // add another image here
        // add text here
        this.add.image(220, 100, 'start').setOrigin(0, 0);
        this.add.text(385, 300, 'Click anywhere', { fontFamily: 'Arial Black', fontSize: 35, color: 'grey' }).setOrigin(0.5).setStroke('black', 5);
        // add code here to switch to the GameScene, after a mouse click
        this.input.once('pointerdown', function (pointer) {
            _this.scene.start('GameScene');
        });
    };
    return StartScene;
}(Phaser.Scene));
exports.StartScene = StartScene;
