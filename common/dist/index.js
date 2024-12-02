"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addComment = exports.updateBlogField = exports.createBlogField = exports.signInField = exports.updateUserFields = exports.signUpfield = void 0;
const zod_1 = require("zod");
exports.signUpfield = zod_1.z.object({
    firstName: zod_1.z.string().min(3).max(50),
    lastName: zod_1.z.string().min(3).max(50),
    userName: zod_1.z.string().min(3).max(8),
    password: zod_1.z.string().min(3).max(50),
    email: zod_1.z.string().email()
});
exports.updateUserFields = zod_1.z.object({
    firstName: zod_1.z.string().min(3).max(50).optional(),
    lastName: zod_1.z.string().min(3).max(50).optional(),
    userName: zod_1.z.string().min(3).max(8).optional(),
    password: zod_1.z.string().min(3).max(50).optional(),
    oldPassword: zod_1.z.string().min(3).max(50).optional(),
    email: zod_1.z.string().email().optional(),
    bio: zod_1.z.string().optional(),
    socialMedia: zod_1.z.string().max(200).optional().array(),
});
exports.signInField = zod_1.z.object({
    userName: zod_1.z.string().min(3).max(8),
    password: zod_1.z.string().min(3).max(50)
});
exports.createBlogField = zod_1.z.object({
    postId: zod_1.z.number(),
    title: zod_1.z.string().min(3).max(50),
    content: zod_1.z.string().min(3).max(1000),
    image: zod_1.z.string().min(3).max(250).array(),
    video: zod_1.z.string().min(3).max(250).array()
});
exports.updateBlogField = zod_1.z.object({
    postId: zod_1.z.number(),
    title: zod_1.z.string().min(3).max(50).optional(),
    content: zod_1.z.string().min(3).max(1000).optional()
});
exports.addComment = zod_1.z.object({
    comment: zod_1.z.string().min(3).max(100),
});
