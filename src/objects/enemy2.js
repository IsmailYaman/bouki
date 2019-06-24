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
var Enemy2 = /** @class */ (function (_super) {
    __extends(Enemy2, _super);
    function Enemy2(scene, x, y, friction) {
        if (friction === void 0) { friction = 1; }
        var _this = _super.call(this, scene, x, y, "enemy") || this;
        _this.scene.physics.add.existing(_this);
        var body = _this.body;
        _this.setGravity(0);
        _this.setBounce(1);
        _this.setCollideWorldBounds(true);
        _this.setVelocity(0, -100);
        console.log("enemy 2 is geladen");
        return _this;
    }
    return Enemy2;
}(Phaser.Physics.Arcade.Sprite));
exports.Enemy2 = Enemy2;
