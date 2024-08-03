"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const database_1 = __importDefault(require("../config/database"));
const user_model_1 = __importDefault(require("./user.model"));
exports.userModel = user_model_1.default;
database_1.default.sync()
    .then(() => console.log("Database synced"))
    .catch((error) => console.log(error));
//# sourceMappingURL=index.js.map