import { addComment } from "@ayush8679/common";
import { Hono } from "hono";
import { createPrismaClient } from "../..";
import {z} from "zod"

const commentRoute = new Hono();

commentRoute.post("/id/:id/comment", async (c) => {
    try {
        const prisma = createPrismaClient(c);
        const postId = c.req.param("id")
        const jwtPayload = c.get("jwtPayload")
        const userId = jwtPayload.userId
        const body = await c.req.json();
        const parsedData = z.object({comment : z.string().min(3).max(1000)}).safeParse(body)
        
        if (!parsedData.success){
            return c.json({
                message : parsedData.error.issues[0].message
            })
        }
    
        const userInput = parsedData.data;
    
        const comment = await prisma.comments.create({
            data : {
                post_id : postId,
                user_id : userId,
                content : userInput.comment,
            }
        })

        if(comment){
            return c.json({
                message : "Added successfully"
            })
        } else { return c.json({error : "DB error"})}
    } catch (error) {
        console.error(error);
        return c.json({
            error : "Something went wrong"
        })        
    }

})

export default commentRoute