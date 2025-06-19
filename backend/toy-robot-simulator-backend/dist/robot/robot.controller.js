"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var RobotController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RobotController = void 0;
const common_1 = require("@nestjs/common");
const place_robot_dto_1 = require("./dtos/place-robot.dto");
const rotate_robot_dto_1 = require("./dtos/rotate-robot.dto");
const robot_service_1 = require("./robot.service");
const move_robot_dto_1 = require("./dtos/move-robot.dto");
const moves_service_1 = require("../moves/moves.service");
let RobotController = RobotController_1 = class RobotController {
    robotService;
    moveService;
    constructor(robotService, moveService) {
        this.robotService = robotService;
        this.moveService = moveService;
    }
    logger = new common_1.Logger(RobotController_1.name);
    async currentPosition() {
        this.logger.log('get position called');
        const robot = await this.robotService.getCurrentRobot();
        if (!robot) {
            return undefined;
        }
        const { x, y, facing, id } = robot;
        const res = {
            x: x,
            y: y,
            facing: facing,
            robotId: id
        };
        console.log(`returning, ${JSON.stringify(res)}`);
        return res;
    }
    async place(placeRobotDto) {
        this.logger.log('place called');
        const { x, y } = placeRobotDto;
        await this.robotService.placeRobot(x, y);
        const { x: placedX, y: placedY, facing, id } = await this.robotService.getCurrentRobot();
        this.logger.log('place succesful');
        return {
            x: placedX,
            y: placedY,
            facing,
            robotId: id
        };
    }
    async rotateFacing(rotateRobotDto) {
        this.logger.log('rotate called', rotateRobotDto);
        const { direction, facing, robotId } = rotateRobotDto;
        await this.robotService.rotateRobot(direction, facing, robotId);
        const { x, y, facing: newFacing, id } = await this.robotService.getCurrentRobot();
        this.logger.log('rotate succesful');
        return {
            x,
            y,
            facing: newFacing,
            robotId: id
        };
    }
    async moveRobot(moveRobotDto) {
        this.logger.log('move called');
        const { robotId, facing } = moveRobotDto;
        await this.robotService.moveRobot(robotId, facing);
        const { x, y, lastMove, id } = await this.robotService.getCurrentRobot();
        await this.moveService.writeMove(robotId, x, y, facing, lastMove);
        this.logger.log('move succesful');
        return {
            x,
            y,
            facing: facing,
            robotId: id
        };
    }
};
exports.RobotController = RobotController;
__decorate([
    (0, common_1.Get)('position'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RobotController.prototype, "currentPosition", null);
__decorate([
    (0, common_1.Post)('place'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [place_robot_dto_1.PlaceRobotDto]),
    __metadata("design:returntype", Promise)
], RobotController.prototype, "place", null);
__decorate([
    (0, common_1.Put)('rotate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [rotate_robot_dto_1.RotateRobotDto]),
    __metadata("design:returntype", Promise)
], RobotController.prototype, "rotateFacing", null);
__decorate([
    (0, common_1.Put)('move'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [move_robot_dto_1.MoveRobotDto]),
    __metadata("design:returntype", Promise)
], RobotController.prototype, "moveRobot", null);
exports.RobotController = RobotController = RobotController_1 = __decorate([
    (0, common_1.Controller)('robot'),
    __metadata("design:paramtypes", [robot_service_1.RobotService,
        moves_service_1.MovesService])
], RobotController);
//# sourceMappingURL=robot.controller.js.map