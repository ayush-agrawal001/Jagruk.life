import { z } from "zod";

export const signUpfield = z.object({
    firstName : z.string().min(3).max(50),
    lastName : z.string().min(3).max(50),
    userName : z.string().min(3).max(8),
    password : z.string().min(3).max(50),
    email : z.string().email()
})

export const signInField = z.object({
    userName : z.string().min(3).max(8),
    password : z.string().min(3).max(50)
});

export const createBlogField = z.object({
    postId : z.number(),
    title : z.string().min(3).max(50).optional(),
    content : z.string().min(3).max(1000).optional()
})

export type SighnUpfield = z.infer<typeof signUpfield>
export type SignInField = z.infer<typeof signInField>
export type CreateBlogField = z.infer<typeof createBlogField>