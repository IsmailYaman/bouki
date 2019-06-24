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
var Door1 = /** @class */ (function (_super) {
    __extends(Door1, _super);
    function Door1(scene, x, y) {
        var _this = _super.call(this, scene, x, y, "door1") || this;
        _this.scene.physics.add.existing(_this);
        _this.setCollideWorldBounds(true);
        _this.setImmovable(true);
        return _this;
    }
    return Door1;
}(Phaser.Physics.Arcade.Sprite));
exports.Door1 = Door1;
