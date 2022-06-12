"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwtCredentials_1 = require("./jwtCredentials");
const createSendToken = (user, statusCode, req, res) => {
    const id = Number(user.id);
    if (id) {
        const token = (0, jwtCredentials_1.signToken)(id);
        res.cookie('jwt', token, {
            expires: new Date(Date.now() + jwtCredentials_1.jwtCookiesExpiresIn * 60 * 60 * 1000),
            httpOnly: true,
            secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
        });
        res.status(statusCode).json({
            status: 'success',
            token,
            data: {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                createAt: user.created_at,
            },
        });
    }
};
exports.default = createSendToken;
