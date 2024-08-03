"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const validateToken_1 = __importDefault(require("../middlewares/validateToken"));
const router = (0, express_1.Router)();
router.post('/', AuthController_1.default.login);
router.get('/', validateToken_1.default, (req, res) => res.send(`Welcome user num. ${req.user ? req.user.id : 'undefined'}`));
exports.default = router;
//# sourceMappingURL=auth.js.map