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
exports.Move = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let Move = class Move extends sequelize_typescript_1.Model {
    robotId;
    x;
    y;
    facing;
};
exports.Move = Move;
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Move.prototype, "robotId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Move.prototype, "x", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Move.prototype, "y", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Move.prototype, "facing", void 0);
exports.Move = Move = __decorate([
    sequelize_typescript_1.Table
], Move);
//# sourceMappingURL=moves.model.js.map