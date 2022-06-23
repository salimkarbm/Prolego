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
exports.forgotPasswordMail = exports.googleAuth = exports.authenticate = exports.create = void 0;
const google_auth_library_1 = require("google-auth-library");
const express_validator_1 = require("express-validator");
const appError_1 = __importDefault(require("../../utils/errors/appError"));
const authentication_1 = __importDefault(require("../../services/authentication"));
const user_1 = __importDefault(require("../../models/user"));
const httpsCookie_1 = __importDefault(require("../../utils/httpsCookie"));
const codegenerator_1 = __importDefault(require("../../utils/codegenerator"));
const mailer_1 = __importDefault(require("../../utils/mailer"));
// google client
const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const authStore = new authentication_1.default();
const store = new user_1.default();
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const err = errors.array();
        return next(err);
    }
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
    };
    try {
        const userEmail = yield authStore.checkEmail(user.email);
        if (userEmail) {
            return next(new appError_1.default('user with this email already exist', 400));
        }
        const newUser = yield authStore.create(user);
        (0, httpsCookie_1.default)(newUser, 201, req, res);
    }
    catch (err) {
        return next(err);
    }
});
exports.create = create;
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const loginUser = {
        password: req.body.password,
        email: req.body.email,
    };
    try {
        const user = yield authStore.authenticate(loginUser.email, loginUser.password);
        if (user === null) {
            return next(new appError_1.default('incorrect password or email', 400));
        }
        (0, httpsCookie_1.default)(user, 200, req, res);
    }
    catch (err) {
        return next(err);
    }
});
exports.authenticate = authenticate;
const googleAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.body.credential;
    if (!token) {
        return next(new appError_1.default('Invalid credentials, please try again.', 401));
    }
    try {
        const credentials = {
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        };
        // eslint-disable-next-line no-inner-declarations
        function verify() {
            return __awaiter(this, void 0, void 0, function* () {
                const ticket = yield client.verifyIdToken(credentials);
                const payload = ticket.getPayload();
                if (payload) {
                    const user = {
                        firstname: payload.given_name,
                        lastname: payload.family_name,
                        email: payload.email,
                        password: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
                        google_id: payload.sub,
                    };
                    const userEmail = yield authStore.checkEmail(user.email);
                    if (!userEmail) {
                        const googleUser = yield authStore.upsertGoogleUser(user);
                        (0, httpsCookie_1.default)(googleUser, 201, req, res);
                    }
                    else if (userEmail) {
                        const oldUser = {
                            firstname: payload.given_name,
                            lastname: payload.family_name,
                            email: payload.email,
                            password: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
                            google_id: payload.sub,
                        };
                        const newUser = yield store.getUserByEmail(oldUser.email);
                        (0, httpsCookie_1.default)(newUser, 201, req, res);
                    }
                }
            });
        }
        verify();
    }
    catch (err) {
        return next(new appError_1.default('Unable to verify user with this token, please try again.', 401));
    }
});
exports.googleAuth = googleAuth;
const forgotPasswordMail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const err = errors.array();
        return next(err);
    }
    const { email } = req.body;
    try {
        const foundemail = yield authStore.checkEmail(email);
        if (!foundemail) {
            return next(new appError_1.default('Fill in the right email', 400));
        }
        const token = (0, codegenerator_1.default)(36);
        const result = yield authStore.forgotPassword(email, token);
        yield (0, mailer_1.default)(email, token);
        return res.status(200).json({
            message: 'Password Resent Email Sent Successfully',
            data: result,
        });
    }
    catch (err) {
        return next(err);
    }
});
exports.forgotPasswordMail = forgotPasswordMail;
