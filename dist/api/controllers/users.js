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
exports.getAllUser = exports.getUserById = void 0;
const user_1 = __importDefault(require("../../models/user"));
const appError_1 = __importDefault(require("../../utils/errors/appError"));
const users = new user_1.default();
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const user = yield users.getUserById(id);
        if (!user) {
            return next(new appError_1.default('user not found', 400));
        }
        return res.status(200).json({
            data: {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                createAt: user.created_at,
            },
        });
    }
    catch (err) {
        return next(err);
    }
});
exports.getUserById = getUserById;
const getAllUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUser = yield users.getAllUsers();
        if (allUser.length === 0)
            return next(new appError_1.default('Unable to return all user', 400));
        res.status(200).json({
            status: 'Success',
            message: 'User has been found',
            data: allUser,
        });
    }
    catch (err) {
        return next(err);
    }
});
exports.getAllUser = getAllUser;
