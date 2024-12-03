import { addComment } from "@ayush8679/common";
import { Hono } from "hono";
import { createPrismaClient } from "../..";
import {z} from "zod"

const commentRoute = new Hono();

commentRoute.post("/:id/comment", async (c) => {
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

commentRoute.get("/:id/:commentid/like", async (c) => {
    try {
        const prisma = createPrismaClient(c);
        const jwtPayload = c.get("jwtPayload");
        const userId = jwtPayload.userId;
        const body = await c.req.json();
    
        const commentId = c.req.param("commentid");
        
        const commentCheck = await prisma.comments.findUnique({where : {id : commentId}})
        if (!commentCheck) {
            return c.json({
                message : "No comment found"
            })
        }
        const likesOnComments = commentCheck!.likesOnComments
        
        for (let i = 0; i < likesOnComments.length; i++) {
            if (likesOnComments[i] === userId) {
                await prisma.comments.update({
                    where : {id : commentId}, 
                    data : { likesOnComments : likesOnComments.filter((likeId) => likeId !== userId)}
                })
                return c.json({
                    mssage : "dis-liked"
                })
            }
        }

        const comment = await prisma.comments.update({where : {id : commentId}, data : {likesOnComments : {push : userId}}});

        if (comment) {
            return c.json({
                message : "Liked the comment"
            })
        }else{
            return c.json({
                message : "Something went wrong!!"
            })
        }
    } catch (error) {
        console.error("ERROR LIKING THE COMMENT", error)
        return c.json({
            error : "ERROR LIKING THE COMMENT"
        });
    }
    

})

export default commentRoute