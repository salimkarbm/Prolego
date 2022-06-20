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
exports.forgotPasswordMail = exports.index = exports.getUserById = void 0;
const user_1 = __importDefault(require("../../models/user"));
const appError_1 = __importDefault(require("../../utils/errors/appError"));
const authentication_1 = __importDefault(require("../../services/authentication"));
const codegenerator_1 = __importDefault(require("../../utils/codegenerator"));
const mailer_1 = __importDefault(require("../../utils/mailer"));
const store = new user_1.default();
const authStore = new authentication_1.default();
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const user = yield store.getUserById(id);
        if (!user) {
            return next(new appError_1.default('user not found', 400));
        }
        return res.status(200).json({
            status: 'success',
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
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield store.index();
        if (!users) {
            return new appError_1.default('users not found', 400);
        }
        const allUser = users.map((el) => {
            const userObj = {
                id: el.id,
                firstName: el.firstname,
                lastname: el.lastname,
                email: el.email,
                creatAt: el.created_at,
            };
            return userObj;
        });
        res.status(200).json({
            status: 'success',
            data: {
                allUser,
            },
        });
    }
    catch (err) {
        throw new appError_1.default('Something went wrong, Unable to get users', 400);
    }
});
exports.index = index;
const forgotPasswordMail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const foundemail = yield authStore.checkEmail(email);
        if (!foundemail) {
            return next(new appError_1.default('Fill in the right email', 400));
        }
        const token = (0, codegenerator_1.default)(30);
        const result = yield store.forgotPassword(email, req.params.passwordResetToken);
        (0, mailer_1.default)(email, token);
        return res
            .status(204)
            .json({ message: 'Password Resent Email Sent Successfully', result });
    }
    catch (err) {
        console.log(err);
        return next(err);
    }
});
exports.forgotPasswordMail = forgotPasswordMail;
