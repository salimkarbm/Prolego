"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../model/user");
const users = new user_1.UserStore();
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const userId = yield users.getUserById(id);
        if (userId.length === 0)
            return res.status(404).json({ message: 'user not found' });
        const response = {
            status: 'success',
            statusCode: 200,
            response: userId,
        };
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.default = getUserById;
