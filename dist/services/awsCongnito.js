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
const express_validator_1 = require("express-validator");
const crypto_1 = __importDefault(require("crypto"));
const client_cognito_identity_provider_1 = require("@aws-sdk/client-cognito-identity-provider");
const appError_1 = __importDefault(require("../utils/errors/appError"));
// import { SSOClient, LogoutCommand } from '@aws-sdk/client-sso';
const client = new client_cognito_identity_provider_1.CognitoIdentityProviderClient({ region: 'us-east-1' });
// const SSOClient = new CognitoIdentityProviderClient({ region: 'us-east-1' });
const clientId = 'f01ogqv9h0c31f4d8tsfcs5ni';
const SecretKey = '1ehe3mbc0ll9vn9hmotrpaoj9t4pah4su9mc3qdjstt21bu71e62';
function generateHash(email) {
    const hashKey = crypto_1.default
        .createHmac('SHA256', SecretKey)
        .update(email + clientId)
        .digest('base64')
        .toString();
    return hashKey;
}
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, email, password } = req.body;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const err = errors.array();
        return next(err);
    }
    try {
        const userAttr = [];
        userAttr.push({ Name: 'Firstname', Value: firstname }, { Name: 'Lastname', Value: lastname }, { Name: 'Email', Value: email });
        const params = {
            Password: password,
            Email: email,
            Username: email,
            ClientId: clientId,
            UserAttributes: userAttr,
            SecretHash: generateHash(req.body.email),
        };
        // console.log(params);
        const command = new client_cognito_identity_provider_1.SignUpCommand(params);
        const data = yield client.send(command);
        // console.log(data);
        if (data) {
            return res.status(200).json({
                status: 'success',
                message: data.$metadata,
                message2: data.UserSub,
            });
        }
    }
    catch (err) {
        console.log(err);
        throw new appError_1.default('Unable to create user', 400);
    }
});
// const confirmSignUp = used(async (req: Request, res: Response) => {
//   const { username, ConfirmationCode } = req.body;
//   const Username = username;
//   const ConfirmCode = ConfirmationCode;
//   console.log(Username, ConfirmCode);
//   const input = {
//     Username,
//     ConfirmationCode: ConfirmCode,
//     ClientId: clientId,
//     SecretHash: generateHash(req.body.username),
//   };
//   const command = new ConfirmSignUpCommand(input);
//   const response = await client.send(command);
//   if (response) {
//     return res.json({
//       success: true,
//       message: response,
//     }).statusCode;
//   }
// });
// const signIn = used(async (req: Request, res: Response) => {
//   const { username, password } = req.body;
//   const input = {
//     AuthFlow: 'USER_PASSWORD_AUTH',
//     AuthParameters: {
//       USERNAME: username,
//       PASSWORD: password,
//       SECRET_HASH: generateHash(username),
//     },
//     ClientId: clientId,
//   };
//   const command = new InitiateAuthCommand(input);
//   const response = await client.send(command);
//   if (response) {
//     return res.json({
//       success: true,
//       message: response,
//     }).statusCode;
//   }
//   console.log(response);
// });
// const signOut = async (req: Request, res: Response) => {
//   const {} = req.body;
//   const input = {
//     // AccessToken: accessToken
//   };
//   // const command = new LogoutCommand(input);
//   // const response = await client.send(command);
//   //     if (response) {
//   //         return res.json({
//   //            success: true,
//   //             message: response
//   //         }).statusCode
//   //     }
// };
// const test = async (req: Request, res: Response) => {
//   return res.send(' testing is okay ');
// };
// export { signUp, confirmSignUp, signIn, test };
exports.default = signUp;
