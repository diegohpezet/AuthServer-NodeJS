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
exports.UserController = void 0;
const models_1 = require("../models");
const hashPassword_1 = require("../utils/hashPassword");
const asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
const user_service_1 = require("../services/user.service");
class UserController {
    static createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (err) {
                res.status(500).json({ error: err.message });
            }
        });
    }
    ;
    static getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    ;
    static getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    ;
    static updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    ;
    static deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    ;
}
exports.UserController = UserController;
const userController = {
    getAll: (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield user_service_1.UserService.getAll();
        return res.status(200).json(users);
    })),
    getById: (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const user = yield user_service_1.UserService.getOne(id);
        if (!user)
            return res.status(404).json({ error: "User not found" });
        return res.status(200).json(user);
    })),
    create: (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { username, email, password } = req.body;
        // Check if user already exists
        const existingEmail = yield models_1.userModel.findOne({ where: { email } });
        if (existingEmail)
            return res.status(409).json({ error: "Email address already in use" });
        const existingUsername = yield models_1.userModel.findOne({ where: { username } });
        if (existingUsername)
            return res.status(409).json({ error: "Username already exists" });
        // Check if fields are valid
        if (!username || !email || !password)
            return res.status(400).json({ error: "All fields are required" });
        // Check if username is valid
        if (username.length < 3)
            return res.status(400).json({ error: "Name must be at least 3 characters long" });
        // Check if email is valid
        if (!/\S+@\S+\.\S+/.test(email))
            return res.status(400).json({ error: "Invalid email" });
        // Check if password is valid
        if (password.length < 6)
            return res.status(400).json({ error: "Password must be at least 6 characters long" });
        // Create user
        const user = yield user_service_1.UserService.create(username, password, email);
        return res.status(201).json({ user });
    })),
    update: (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        let { username, email, password } = req.body;
        const user = yield models_1.userModel.findByPk(id);
        if (user) {
            // Check if username or email is already in use
            const existingEmail = yield models_1.userModel.findOne({ where: { email } });
            if (existingEmail && existingEmail.id !== Number(id))
                return res.status(409).json({ error: "Email address already in use" });
            const existingUsername = yield models_1.userModel.findOne({ where: { username } });
            if (existingUsername && existingUsername.id !== Number(id))
                return res.status(409).json({ error: "Username already exists" });
            // Check if email is valid
            if (!/\S+@\S+\.\S+/.test(email))
                return res.status(400).json({ error: "Invalid email" });
            // Check if password is valid
            if (password.length < 6)
                return res.status(400).json({ error: "Password must be at least 6 characters long" });
            // Hash password if it is provided
            if (password)
                password = yield (0, hashPassword_1.hashPassword)(password);
            yield user.update({ username, email, password });
            return res.status(200).json({ message: "User updated successfully" });
        }
        else {
            return res.status(404).json({ message: "User not found" });
        }
    })),
    delete: (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            yield user_service_1.UserService.delete(id);
            return res.status(204).send();
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    })),
};
exports.default = userController;
//# sourceMappingURL=UserController.js.map