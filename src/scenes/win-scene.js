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
var WinScene = /** @class */ (function (_super) {
    __extends(WinScene, _super);
    function WinScene() {
        return _super.call(this, { key: "WinScene" }) || this;
    }
    WinScene.prototype.init = function () {
    };
    WinScene.prototype.preload = function () {
    };
    WinScene.prototype.create = function () {
        var _this = this;
        this.add.image(0, 0, 'jungle').setOrigin(0, 0);
        // add another image here
        // add text here
        this.add.image(220, 60, 'start').setOrigin(0, 0);
        this.add.image(340, 360, 'bananaL').setOrigin(0, 0);
        this.add.image(250, 340, 'bananaL').setOrigin(0, 0);
        this.add.image(430, 340, 'bananaL').setOrigin(0, 0);
        this.add.text(385, 250, 'CONGRATULATIONS', { fontFamily: 'Arial Black', fontSize: 50, color: 'grey' }).setOrigin(0.5).setStroke('black', 5);
        this.add.text(385, 300, 'YOU WON!', { fontFamily: 'Arial Black', fontSize: 35, color: 'grey' }).setOrigin(0.5).setStroke('black', 5);
        // add code here to switch to the GameScene, after a mouse click
        this.input.once('pointerdown', function (pointer) {
            _this.scene.start('StartScene');
        });
    };
    return WinScene;
}(Phaser.Scene));
exports.WinScene = WinScene;
