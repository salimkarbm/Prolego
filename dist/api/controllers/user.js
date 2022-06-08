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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../models/user");
const appError_1 = __importDefault(require("../../utils/errors/appError"));
const users = new user_1.UserStore();
const updateUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.email) {
            return next(new appError_1.default('Email is required', 404));
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
    catch (err) {
        console.log(err);
        return next(new appError_1.default(`${err}`, 400));
    }
});
exports.default = updateUsers;
