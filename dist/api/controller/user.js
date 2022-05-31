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
const updateUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.name) {
            return res.status(404).json({
                error: 'Fill in the right User',
            });
        }
        const user = {
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
        };
        const updatedUser = yield users.updateUser(user, req.params.id);
        res.status(200).json({
            status: 'Success',
            message: 'The users has been successfully updated',
            data: updatedUser,
        });
    }
    catch (error) {
        return res.status(404).json(error);
    }
});
exports.default = updateUsers;
