import { z } from "zod";
export declare const signUpfield: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    userName: z.ZodString;
    password: z.ZodString;
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    email: string;
}, {
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    email: string;
}>;
export declare const signInField: z.ZodObject<{
    userName: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userName: string;
    password: string;
}, {
    userName: string;
    password: string;
}>;
export declare const createBlogField: z.ZodObject<{
    postId: z.ZodNumber;
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    postId: number;
    title?: string | undefined;
    content?: string | undefined;
}, {
    postId: number;
    title?: string | undefined;
    content?: string | undefined;
}>;
export type SighnUpfield = z.infer<typeof signUpfield>;
export type SignInField = z.infer<typeof signInField>;
export type CreateBlogField = z.infer<typeof createBlogField>;
