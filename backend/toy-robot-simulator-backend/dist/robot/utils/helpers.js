"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rotateLeft = rotateLeft;
exports.rotateRight = rotateRight;
function rotateLeft(facing) {
    switch (facing) {
        case 'north':
            return 'west';
        case 'south':
            return 'east';
        case 'east':
            return 'north';
        case 'west':
            return 'south';
    }
}
function rotateRight(facing) {
    switch (facing) {
        case 'north':
            return 'east';
        case 'south':
            return 'west';
        case 'east':
            return 'south';
        case 'west':
            return 'north';
    }
}
//# sourceMappingURL=helpers.js.map