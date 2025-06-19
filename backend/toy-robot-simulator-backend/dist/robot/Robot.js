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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Robot = void 0;
const swagger_1 = require("@nestjs/swagger");
class Robot {
    robotId;
    x;
    y;
    facing;
    lastMove;
    constructor({ robotId, x, y, facing, lastMove }) {
        this.robotId = robotId;
        this.facing = facing;
        this.x = x;
        this.y = y;
        this.lastMove = lastMove;
    }
}
exports.Robot = Robot;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Robot.prototype, "robotId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Robot.prototype, "x", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Robot.prototype, "y", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Robot.prototype, "facing", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Robot.prototype, "lastMove", void 0);
//# sourceMappingURL=robot.js.map