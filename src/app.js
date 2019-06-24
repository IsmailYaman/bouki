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
require("phaser");
var boot_scene_1 = require("./scenes/boot-scene");
var start_scene_1 = require("./scenes/start-scene");
var level1_1 = require("./scenes/level1");
var level2_1 = require("./scenes/level2");
var level3_1 = require("./scenes/level3");
var end_scene_1 = require("./scenes/end-scene");
var win_scene_1 = require("./scenes/win-scene");
var config = {
    width: 770,
    height: 450,
    parent: "game",
    resolution: window.devicePixelRatio,
    scene: [boot_scene_1.BootScene, start_scene_1.StartScene, level1_1.level1, level2_1.level2, level3_1.level3, end_scene_1.EndScene, win_scene_1.WinScene],
    input: {
        keyboard: true
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
        }
    },
    render: { pixelArt: true }
};
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game(config) {
        return _super.call(this, config) || this;
    }
    return Game;
}(Phaser.Game));
exports.Game = Game;
window.addEventListener("load", function () { return new Game(config); });
