import { Hono } from "hono";
import { z } from "zod";
import { env } from "hono/adapter";
import { createPrismaClient } from "..";
import { Buffer } from "buffer";
import { sign } from "hono/jwt";

const signin = new Hono();

signin.post('/signin', async (c) => {
    try {
        const { JWT_SECRET } = env<{ JWT_SECRET : string }>(c);
        const prisma = createPrismaClient(c);
    
        const req = c.req;
        const body = await req.json();
    
        const userField = z.object({
            userName : z.string().min(3).max(8),
            password : z.string().min(3).max(50)
        });
    
        const parsedRequest = userField.safeParse(body);
        
        if(!parsedRequest.success){
            return c.json({
                error : parsedRequest.error.issues[0].message
            })
        }
        
        const usersInput = parsedRequest.data
    
        const user = await prisma.users.findUnique({
            where : {
                username : usersInput.userName
            }
        })
    
        const passText = new TextEncoder().encode(usersInput.password);
    
        const hashPass = await crypto.subtle.digest(
            {
                name : "SHA-256"
            },
            passText
        );
    
        const hashBase64 = Buffer.from(hashPass).toString("base64");
    
        const isPass = (hashBase64 === user?.password);
        console.log(isPass);
        if (!isPass) {
            c.status(403);
            return c.json({
                message : "Wrong password please try again"
            })
        }
        const token = await sign({
            username : usersInput.userName,
            eamil : usersInput.password,
            expiresIn : "24h",
        },JWT_SECRET)

        c.header("Authorization", `Bearer ${token}`);
        return c.json({
            message : `Hello again ${user?.firstname}!!!`
        })
    } catch (error) {
        console.log("Error", error);
        c.status(500);
        c.json({
            error : "Server error verifying the user at sighn-In"
        })
    }

})

export default signin;