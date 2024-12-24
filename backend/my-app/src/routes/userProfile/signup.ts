import { Hono } from "hono";
import { env } from "hono/adapter";
import {sign } from "hono/jwt";
import { createPrismaClient } from "../..";
import { Buffer } from "buffer";
import { signUpfield } from "@ayush8679/common";

const signup = new Hono();

signup.post('/signup',async (c) => {
    const { JWT_SECRET } = env<{ JWT_SECRET : string }>(c);

    const prisma = createPrismaClient(c);

    try {
        const request = c.req;
        // const formBody = await request.parseBody(); For form data
        const body = await request.json(); // for json  

        const parsedRequest = signUpfield.safeParse(body);
        
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
                email : usersInput.email,
                socialMedia : [],
            }
        })

        console.log(users);

        const token = await sign({
            username : usersInput.userName,
            email : users.email,
            expiresIn : "24h",
        },JWT_SECRET)

        c.status(201);
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