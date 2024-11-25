import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { env } from "hono/adapter";
import { z } from "zod"
import { decode, sign, verify } from "hono/jwt";
import { createPrismaClient } from "..";
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import { Buffer } from "buffer";
const signup = new Hono();

signup.post('/signup',async (c) => {
    const { JWT_SECRET } = env<{ JWT_SECRET : string }>(c);

    const prisma = createPrismaClient(c);

    try {
        const request = c.req;
        // const formBody = await request.parseBody(); For form data
        const body = await request.json(); // for json  
    
        const userField = z.object({
            firstName : z.string().min(3).max(50),
            lastName : z.string().min(3).max(50),
            userName : z.string().min(3).max(8),
            password : z.string().min(3).max(50),
            email : z.string().email()
        })
    
        const parsedRequest = userField.safeParse(body);
        
        if(!parsedRequest.success){
            return c.json({
                error : parsedRequest.error.issues[0].message
            })
        }
        
        const usersInput = parsedRequest.data

        
        const passText = new TextEncoder().encode(usersInput.password);

        const hashPass = await crypto.subtle.digest(
            {
                name : "SHA-256"
            },
            passText
        );

        const hashBase64 = Buffer.from(hashPass).toString("base64");

        const users = await prisma.users.create({
            data : {
                username : usersInput.userName,
                firstname : usersInput.firstName,
                lastname : usersInput.lastName,
                password : hashBase64,
                email : usersInput.email
            }
        })

        console.log(users);

        const token = await sign({
            username : usersInput.userName,
            eamil : users.password,
            expiresIn : "24h",
        },JWT_SECRET)

        c.header("Authorization", `Bearer ${token}`);
        return c.json({
            message : `Hello from SignUp!! ${users.firstname}`,
            token : token
        });

    } catch (error : any) {

        if (error.code === "P2002") {
            if (error.meta.target[0] === "username") {
                return c.json({
                    message : "Username already exists"
                })
            }
            if (error.meta.target[0] === "email") {
                return c.json({
                    message : "Email already exists"
                })
            }
        }
        console.error(error);
        return c.json({
            error : "Something went wrong please try again later"
        });
    }

})



export default signup;