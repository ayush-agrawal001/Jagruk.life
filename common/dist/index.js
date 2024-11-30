"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBlogField = exports.signInField = exports.signUpfield = void 0;
const zod_1 = require("zod");
exports.signUpfield = zod_1.z.object({
    firstName: zod_1.z.string().min(3).max(50),
    lastName: zod_1.z.string().min(3).max(50),
    userName: zod_1.z.string().min(3).max(8),
    password: zod_1.z.string().min(3).max(50),
    email: zod_1.z.string().email()
});
exports.signInField = zod_1.z.object({
    userName: zod_1.z.string().min(3).max(8),
    password: zod_1.z.string().min(3).max(50)
});
exports.createBlogField = zod_1.z.object({
    postId: zod_1.z.number(),
    title: zod_1.z.string().min(3).max(50).optional(),
    content: zod_1.z.string().min(3).max(1000).optional()
});
