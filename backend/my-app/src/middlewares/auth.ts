import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";
import { env } from "hono/adapter";
import { createPrismaClient } from "..";

export const authMiddleware = createMiddleware(async (c, next) => {    
    try {   
        const prisma = createPrismaClient(c);
        const { JWT_SECRET } = env<{ JWT_SECRET : string }>(c)
        const req = c.req;
        const Bearer = req.header("Authorization")
        const token = Bearer?.split(" ")[1];
        const isVerifiedToken = await verify(token!, JWT_SECRET);

        if(!isVerifiedToken.username){
            return c.json({
                message : "Please re-Sign-In"
            })
        }
        
        const userName = String(isVerifiedToken.username); 

        const user = await prisma.users.findUnique({
            where : {
                username : userName
            }
        })

        c.set("jwtPayload" , {userId : user?.id,})
        await next();
    } catch (error) {
        console.log("Error", error);
        return c.json({
            message : "Can not verify your token"
        })
    }

})