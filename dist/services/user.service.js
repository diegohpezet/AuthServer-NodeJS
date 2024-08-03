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
exports.UserService = void 0;
const models_1 = require("../models");
const hash_1 = require("../utils/hash");
const validations_1 = require("../utils/validations");
class UserService {
    /**
     * Creates a new user and pushes it into database
     * @param { String } username - Username of the user
     * @param { String } password - Password of the user
     * @param { String } email - Email of the user
     * @returns { userModel } - The user that has been just created
     */
    static create(username, password, email) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if email is already in use
            const existingUser = yield models_1.userModel.findOne({ where: { email } });
            if (existingUser) {
                throw new Error("Email already in use");
            }
            // Check if password is valid
            const { isValid, errors } = (0, validations_1.validatePassword)(password);
            if (!isValid) {
                throw new Error(errors.join(' '));
            }
            // Hash password & create user
            const hashedPassword = yield (0, hash_1.hashPassword)(password);
            const user = yield models_1.userModel.create({ username, email, password: hashedPassword });
            return user;
        });
    }
    /**
     * Gets all instances of user from database
     * @returns { Array[userModel] } - Array of all users
     */
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield models_1.userModel.findAll();
            return users;
        });
    }
    /**
     * Gets an instance of an user from Databae
     * @param { String } id - The id of the user to find
     * @returns { userModel } - The user that has been found
     */
    static getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield models_1.userModel.findOne({ where: { id } });
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        });
    }
    /**
     * Updates an instance of an user from database
     * @param { String } id - The id of the user to update
     * @param { Partial<Object> } data - The data to update
     * @returns { userModel } - The user that has been updated
     */
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield models_1.userModel.findByPk(id);
            if (!user) {
                throw new Error("User not found");
            }
            if (data.password) {
                const { isValid, errors } = (0, validations_1.validatePassword)(data.password);
                if (!isValid) {
                    throw new Error(errors.join(' '));
                }
                data.password = yield (0, hash_1.hashPassword)(data.password);
            }
            const updatedUser = user.update(data);
            return updatedUser;
        });
    }
    /**
     * Deletes an user from database
     * @param { String } id - The id of the user to delete
     */
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield models_1.userModel.findByPk(id);
            if (!user) {
                throw new Error("User not found");
            }
            yield user.destroy();
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map