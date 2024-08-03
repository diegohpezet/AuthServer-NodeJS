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
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const jwt_1 = require("../utils/jwt");
const models_1 = require("../models");
class AuthController {
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const { accessToken, refreshToken } = yield auth_service_1.AuthService.login(email, password);
                return res
                    .setHeader('Authorization', 'Bearer ' + accessToken)
                    .cookie('refreshToken', refreshToken, { httpOnly: true })
                    .json({ message: 'Login successful', accessToken });
            }
            catch (err) {
                console.log(err);
                return res.status(500).json({ error: err.message });
            }
        });
    }
    /**
     * CHECK IF NECESSARY
     */
    static refreshSession(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                return res.status(401).json({ message: 'No refresh token provided' });
            }
            try {
                const decoded = (0, jwt_1.verifyRefreshToken)(refreshToken);
                const user = yield models_1.userModel.findByPk(decoded.id);
                if (!user) {
                    return res.status(401).json({ message: 'User not found' });
                }
                const newAccessToken = (0, jwt_1.generateAccessToken)(user.id);
                return res.status(200).json({ accessToken: newAccessToken });
            }
            catch (err) {
                console.log(err);
                return res.status(401).json({ error: 'Invalid refresh token' });
            }
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map