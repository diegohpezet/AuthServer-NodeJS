"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePassword = void 0;
const validatePassword = (password) => {
    const errors = [];
    // Minimum and maximum length
    if (password.length < 6) {
        errors.push("Password must be at least 6 characters long.");
    }
    if (password.length > 128) {
        errors.push("Password must not exceed 128 characters.");
    }
    // Uppercase letter
    if (!/[A-Z]/.test(password)) {
        errors.push("Password must contain at least one uppercase letter.");
    }
    // Lowercase letter
    if (!/[a-z]/.test(password)) {
        errors.push("Password must contain at least one lowercase letter.");
    }
    // Digit
    if (!/[0-9]/.test(password)) {
        errors.push("Password must contain at least one digit.");
    }
    // Special character
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push("Password must contain at least one special character.");
    }
    return {
        isValid: errors.length === 0,
        errors,
    };
};
exports.validatePassword = validatePassword;
//# sourceMappingURL=validations.js.map