import { z } from "zod";

export const signUpfield = z.object({
    firstName : z.string().min(3).max(50),
    lastName : z.string().min(3).max(50),
    userName : z.string().min(6).max(8),
    password : z.string().min(8).max(50),
    email : z.string().email()
})

export const updateUserFields = z.object({
    firstName : z.string().min(3).max(50).optional(),
    lastName : z.string().min(3).max(50).optional(),
    userName : z.string().min(6).max(8).optional(),
    password : z.string().min(8).max(50).optional(),
    oldPassword : z.string().min(8).max(50).optional(),
    email : z.string().email().optional(),
    bio : z.string().optional(),
    socialMedia : z.string().max(200).optional().array(),
})

export const signInField = z.object({
    userName : z.string().min(6).max(8),
    password : z.string().min(8).max(50)
});


const postContentText = z.object({
    content : z.string().min(3).optional(),
    position : z.number().min(0).optional(),
})

const postContentImage = z.object({
    content : z.string().min(3).optional(),
    position : z.number().min(0).optional(),
})

const postContentLink = z.object({
    content : z.string().min(3).optional(),
    position : z.number().min(0).optional(),
})

const postContentCode = z.object({
    content : z.string().min(3).optional(),
    position : z.number().min(0).optional(),
})

export   const createBlogField = z.object({
    title : z.string().min(3),
    postContent : z.object({contentText : z.array(postContentText).optional(), contentImage : z.array(postContentImage).optional(), contentLink : z.array(postContentLink).optional(), codeBlock : z.array(postContentCode).optional()}).optional(),
})

export const updateBlogField = z.object({
    postId : z.number(),
    title : z.string().min(3).max(50).optional(),
    content : z.string().min(3).max(1000).optional(),
    image : z.string().min(3).max(250).array().optional(),
    video : z.string().min(3).max(250).array().optional()
})

export const addComment = z.object({
    comment : z.string().min(3).max(100),
})

export type SignUpfield = z.infer<typeof signUpfield>
export type SignInField = z.infer<typeof signInField>
export type CreateBlogField = z.infer<typeof createBlogField>
export type AddComment = z.infer<typeof addComment>
export type UpdateBlogField = z.infer<typeof updateBlogField>
export type UpdateUserFields = z.infer<typeof updateUserFields>