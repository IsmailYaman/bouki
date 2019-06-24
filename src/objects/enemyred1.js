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
var EnemyRed1 = /** @class */ (function (_super) {
    __extends(EnemyRed1, _super);
    function EnemyRed1(scene, x, y, friction) {
        if (friction === void 0) { friction = 1; }
        var _this = _super.call(this, scene, x, y, "enemyred") || this;
        _this.scene.physics.add.existing(_this);
        var body = _this.body;
        _this.setGravity(0);
        _this.setBounce(1);
        _this.setCollideWorldBounds(true);
        _this.setVelocity(0, 175);
        return _this;
    }
    return EnemyRed1;
}(Phaser.Physics.Arcade.Sprite));
exports.EnemyRed1 = EnemyRed1;
