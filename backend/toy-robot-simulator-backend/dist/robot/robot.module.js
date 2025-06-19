"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RobotModule = void 0;
const common_1 = require("@nestjs/common");
const robot_controller_1 = require("./robot.controller");
const robot_service_1 = require("./robot.service");
const sequelize_1 = require("@nestjs/sequelize");
const robot_model_1 = require("./models/robot.model");
const moves_service_1 = require("../moves/moves.service");
const move_model_1 = require("./models/move.model");
let RobotModule = class RobotModule {
};
exports.RobotModule = RobotModule;
exports.RobotModule = RobotModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([robot_model_1.Robot, move_model_1.Move])],
        exports: [sequelize_1.SequelizeModule],
        controllers: [robot_controller_1.RobotController],
        providers: [robot_service_1.RobotService, moves_service_1.MovesService]
    })
], RobotModule);
//# sourceMappingURL=robot.module.js.map