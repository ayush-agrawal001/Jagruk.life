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
export declare const updateUserFields: z.ZodObject<{
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    userName: z.ZodOptional<z.ZodString>;
    password: z.ZodOptional<z.ZodString>;
    oldPassword: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    bio: z.ZodOptional<z.ZodString>;
    socialMedia: z.ZodArray<z.ZodOptional<z.ZodString>, "many">;
}, "strip", z.ZodTypeAny, {
    socialMedia: (string | undefined)[];
    firstName?: string | undefined;
    lastName?: string | undefined;
    userName?: string | undefined;
    password?: string | undefined;
    email?: string | undefined;
    oldPassword?: string | undefined;
    bio?: string | undefined;
}, {
    socialMedia: (string | undefined)[];
    firstName?: string | undefined;
    lastName?: string | undefined;
    userName?: string | undefined;
    password?: string | undefined;
    email?: string | undefined;
    oldPassword?: string | undefined;
    bio?: string | undefined;
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
    title: z.ZodString;
    postContent: z.ZodOptional<z.ZodObject<{
        contentText: z.ZodOptional<z.ZodArray<z.ZodObject<{
            content: z.ZodOptional<z.ZodString>;
            position: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            content?: string | undefined;
            position?: number | undefined;
        }, {
            content?: string | undefined;
            position?: number | undefined;
        }>, "many">>;
        contentImage: z.ZodOptional<z.ZodArray<z.ZodObject<{
            content: z.ZodOptional<z.ZodString>;
            position: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            content?: string | undefined;
            position?: number | undefined;
        }, {
            content?: string | undefined;
            position?: number | undefined;
        }>, "many">>;
        contentLink: z.ZodOptional<z.ZodArray<z.ZodObject<{
            content: z.ZodOptional<z.ZodString>;
            position: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            content?: string | undefined;
            position?: number | undefined;
        }, {
            content?: string | undefined;
            position?: number | undefined;
        }>, "many">>;
        codeBlock: z.ZodOptional<z.ZodArray<z.ZodObject<{
            content: z.ZodOptional<z.ZodString>;
            position: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            content?: string | undefined;
            position?: number | undefined;
        }, {
            content?: string | undefined;
            position?: number | undefined;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        contentText?: {
            content?: string | undefined;
            position?: number | undefined;
        }[] | undefined;
        contentImage?: {
            content?: string | undefined;
            position?: number | undefined;
        }[] | undefined;
        contentLink?: {
            content?: string | undefined;
            position?: number | undefined;
        }[] | undefined;
        codeBlock?: {
            content?: string | undefined;
            position?: number | undefined;
        }[] | undefined;
    }, {
        contentText?: {
            content?: string | undefined;
            position?: number | undefined;
        }[] | undefined;
        contentImage?: {
            content?: string | undefined;
            position?: number | undefined;
        }[] | undefined;
        contentLink?: {
            content?: string | undefined;
            position?: number | undefined;
        }[] | undefined;
        codeBlock?: {
            content?: string | undefined;
            position?: number | undefined;
        }[] | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    title: string;
    postContent?: {
        contentText?: {
            content?: string | undefined;
            position?: number | undefined;
        }[] | undefined;
        contentImage?: {
            content?: string | undefined;
            position?: number | undefined;
        }[] | undefined;
        contentLink?: {
            content?: string | undefined;
            position?: number | undefined;
        }[] | undefined;
        codeBlock?: {
            content?: string | undefined;
            position?: number | undefined;
        }[] | undefined;
    } | undefined;
}, {
    title: string;
    postContent?: {
        contentText?: {
            content?: string | undefined;
            position?: number | undefined;
        }[] | undefined;
        contentImage?: {
            content?: string | undefined;
            position?: number | undefined;
        }[] | undefined;
        contentLink?: {
            content?: string | undefined;
            position?: number | undefined;
        }[] | undefined;
        codeBlock?: {
            content?: string | undefined;
            position?: number | undefined;
        }[] | undefined;
    } | undefined;
}>;
export declare const updateBlogField: z.ZodObject<{
    postId: z.ZodNumber;
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    video: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    postId: number;
    content?: string | undefined;
    title?: string | undefined;
    image?: string[] | undefined;
    video?: string[] | undefined;
}, {
    postId: number;
    content?: string | undefined;
    title?: string | undefined;
    image?: string[] | undefined;
    video?: string[] | undefined;
}>;
export declare const addComment: z.ZodObject<{
    comment: z.ZodString;
}, "strip", z.ZodTypeAny, {
    comment: string;
}, {
    comment: string;
}>;
export type SignUpfield = z.infer<typeof signUpfield>;
export type SignInField = z.infer<typeof signInField>;
export type CreateBlogField = z.infer<typeof createBlogField>;
export type AddComment = z.infer<typeof addComment>;
export type UpdateBlogField = z.infer<typeof updateBlogField>;
export type UpdateUserFields = z.infer<typeof updateUserFields>;
