"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codeGenerator = (number) => {
    return Math.random().toString(number).slice(2);
};
exports.default = codeGenerator;
