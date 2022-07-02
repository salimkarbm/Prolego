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
const nodemailer_1 = __importDefault(require("nodemailer"));
const appError_1 = __importDefault(require("./errors/appError"));
const { MAIL_USER, MAIL_PASSWORD, SERVICE } = process.env;
const transport = nodemailer_1.default.createTransport({
    service: SERVICE,
    port: 587,
    secure: true,
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASSWORD,
    },
});
const resetPasswordEmail = (email, confirmationCode) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield transport.sendMail({
            from: String(MAIL_USER),
            to: email,
            subject: 'Request to change your Password',
            html: `
          <div> <h1>Reset your Password</h1>
          <p>We are sending you this email because you requested to change your password. kindly fill in this code at the redirected page.</p>
          <h3>Code: <strong>${confirmationCode}</strong></h3>
          </div>`,
        });
    }
    catch (err) {
        throw new appError_1.default(`${err}`, 400);
    }
});
exports.default = resetPasswordEmail;
