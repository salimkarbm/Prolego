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
exports.resetPassword = exports.forgotPassword = exports.googleAuth = exports.authenticate = exports.create = void 0;
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
        return next(errors);
    }
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password_digest: req.body.password,
    };
    try {
        const userEmail = yield authStore.checkEmail(user.email);
        if (userEmail) {
            return next(new appError_1.default('user with this email already exist', 400));
        }
        const newUser = yield authStore.create(user);
        if (!newUser) {
            return next(new appError_1.default('unable to create user', 400));
        }
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
        return next(errors);
    }
    const loginUser = {
        email: req.body.email,
        password: req.body.password,
    };
    try {
        const user = yield authStore.authenticate(loginUser);
        if (user === null) {
            return next(new appError_1.default('incorrect email and password', 401));
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
                        password_digest: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
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
                            password_digest: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
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
const forgotPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(errors);
    }
    // get user base on  POSTED email
    const { email } = req.body;
    // check if user exist
    const useremail = yield authStore.checkEmail(email);
    if (!useremail) {
        return next(new appError_1.default('the user with the email address does not exist', 400));
    }
    // generate password reset token
    const resetToken = (0, codegenerator_1.default)(36);
    yield authStore.passwordResetToken(email, resetToken);
    // seed it to user's email
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/users/resetpassword/${resetToken}`;
    const message = `<div><p></p>We are sending you this email because you requested for password reset. click on this link <a href="${resetUrl}">${resetUrl}</a> to create a new password.</p><p>if you didn't request for password reset, you can ignore this email.</p></p></div>`;
    try {
        const userInfo = {
            email,
            subject: 'Request to change your Password',
            message,
        };
        yield (0, mailer_1.default)(userInfo);
        return res.status(200).json({
            status: 'success',
            message: 'Your password reset token was successfully sent to email',
        });
    }
    catch (err) {
        next(new appError_1.default('There was an error sending email, try again later!.', 500));
    }
    next();
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(errors);
    }
    const token = String(req.params.token);
    try {
        const user = yield authStore.getUserByToken(token);
        // if token has not expired, and there is user set the new password
        if (user) {
            yield authStore.updatePassword(String(user.id), req.body.password);
            // create jwt token and send to client
            (0, httpsCookie_1.default)(user, 200, req, res);
        }
        else {
            return next(new appError_1.default('link is invalid', 404));
        }
    }
    catch (err) {
        next(err);
    }
});
exports.resetPassword = resetPassword;
