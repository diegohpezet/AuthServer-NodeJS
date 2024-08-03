"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const validateToken_1 = __importDefault(require("../middlewares/validateToken"));
const router = (0, express_1.Router)();
router.get('/', user_controller_1.UserController.getAllUsers);
router.get('/:id', user_controller_1.UserController.getUserById);
router.post('/', user_controller_1.UserController.createUser);
router.put('/:id', validateToken_1.default, user_controller_1.UserController.updateUser);
router.delete('/:id', validateToken_1.default, user_controller_1.UserController.deleteUser);
exports.default = router;
//# sourceMappingURL=user.routes.js.map