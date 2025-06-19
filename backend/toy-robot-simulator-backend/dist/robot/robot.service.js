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
var RobotService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RobotService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const robot_model_1 = require("./models/robot.model");
const helpers_1 = require("./utils/helpers");
const sequelize_2 = require("sequelize");
const robot_1 = require("./robot");
let RobotService = RobotService_1 = class RobotService {
    robotModel;
    constructor(robotModel) {
        this.robotModel = robotModel;
    }
    logger = new common_1.Logger(RobotService_1.name);
    async getCurrentRobot() {
        this.logger.log('getting current robot');
        const robotData = await this.robotModel.findOne({
            order: [['createdAt', 'DESC']],
        });
        this.logger.log('last robot', robotData?.dataValues);
        if (robotData) {
            const { id, x, y, lastMove, facing } = robotData.dataValues;
            const robot = new robot_1.Robot({
                robotId: id,
                x,
                y,
                lastMove,
                facing: facing,
            });
            return robot;
        }
        return undefined;
    }
    async placeRobot(x = 0, y = 0) {
        this.logger.log(`placing robot, ${x}, ${y}`);
        const robotData = await this.robotModel.create({
            x: x,
            y: y,
            facing: 'north',
            lastMove: 0,
        });
        const { id, x: placeX, y: placeY, lastMove, facing } = robotData.dataValues;
        const robot = new robot_1.Robot({
            robotId: id,
            x: placeX,
            y: placeY,
            lastMove,
            facing: facing,
        });
        return robot;
    }
    async moveRobot(id, facing) {
        this.logger.log(`moving robot, ${id}, ${facing}`);
        if (facing === 'north') {
            await this.robotModel.increment({
                y: 1,
            }, {
                where: {
                    y: {
                        [sequelize_2.Op.lt]: 4,
                    },
                    id: id,
                },
            });
        }
        else if (facing === 'east') {
            await this.robotModel.increment({
                x: 1,
            }, {
                where: {
                    x: {
                        [sequelize_2.Op.lt]: 4,
                    },
                    id: id,
                },
            });
        }
        else if (facing === 'south') {
            await this.robotModel.decrement({
                y: 1,
            }, {
                where: {
                    y: {
                        [sequelize_2.Op.gt]: 0,
                    },
                    id: id,
                },
            });
        }
        else if (facing === 'west') {
            await this.robotModel.decrement({
                x: 1,
            }, {
                where: {
                    x: {
                        [sequelize_2.Op.gt]: 0,
                    },
                    id: id,
                },
            });
        }
    }
    async rotateRobot(direction, facing, id) {
        console.log('rotating robot', direction, facing, id);
        let newFace;
        if (direction === 'left') {
            newFace = (0, helpers_1.rotateLeft)(facing);
        }
        else {
            newFace = (0, helpers_1.rotateRight)(facing);
        }
        await this.robotModel.update({
            facing: newFace,
        }, {
            where: {
                id: id,
            },
        });
    }
};
exports.RobotService = RobotService;
exports.RobotService = RobotService = RobotService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(robot_model_1.Robot)),
    __metadata("design:paramtypes", [Object])
], RobotService);
//# sourceMappingURL=robot.service.js.map