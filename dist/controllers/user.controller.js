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
exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
class UserController {
    static createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password, email } = req.body;
                const user = yield user_service_1.UserService.create(username, password, email);
                return res.status(201).json(user);
            }
            catch (err) {
                return res.status(500).json({ error: err.message });
            }
        });
    }
    ;
    static getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_service_1.UserService.getAll();
                return res.status(200).json(users);
            }
            catch (err) {
                return res.status(500).json({ error: err.message });
            }
        });
    }
    ;
    static getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield user_service_1.UserService.getOne(id);
                return res.status(200).json(user);
            }
            catch (err) {
                return res.status(500).json({ error: err.message });
            }
        });
    }
    ;
    static updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { id } = req.params;
                const { username, password } = req.body;
                if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) != id) {
                    return res.status(403).json({ error: "You are not authorized to update this user" });
                }
                ;
                const user = yield user_service_1.UserService.update(id, { username, password });
                return res.status(200).json(user);
            }
            catch (err) {
                return res.status(500).json({ error: err.message });
            }
        });
    }
    ;
    static deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { id } = req.params;
                if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) != id) {
                    return res.status(403).json({ error: "You are not authorized to update this user" });
                }
                ;
                yield user_service_1.UserService.delete(id);
                return res.status(204).json({ message: "User deleted successfully" });
            }
            catch (err) {
                return res.status(500).json({ error: err.message });
            }
        });
    }
    ;
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map