import { Hono } from "hono";
import { createPrismaClient } from "../..";
import { z } from "zod";

const commentReply = new Hono();

const replyFields = z.object({
    content : z.string().min(3).max(100),
})

commentReply.post("/:id/:commentid/reply", async (c) => {
    try {
        const prisma = createPrismaClient(c);
        const jwtPayload = c.get("jwtPayload");
        const userId = jwtPayload.userId;
        const body = await c.req.json();
        const commentId = c.req.param("commentid")
        const parsedData = replyFields.safeParse(body);

        if (!parsedData.success) {
            return c.json({
                message : parsedData.error.issues[0].message
            })
        }

        const reply = await prisma.repliesOnComments.create({
            data : {
                user_id : String(userId),
                content : parsedData.data.content,
                comments_id : commentId
            }
        })

        if (reply) {
            return c.json({
                message : "Reply added successfully"
            })
        }else{
            return c.json({
                message : "Something went wrong"
            })
        }
    } catch (error) {
        console.log("Error while adding reply", error)
        return c.json({
            message : "Error while adding reply",
        })
    }

})

commentReply.get("/:id/:replyid/reply/like", async (c) => {
    try {
        const prisma = createPrismaClient(c);
        const jwtPayload = c.get("jwtPayload");
        const userId = jwtPayload.userId;
        const body = await c.req.json();
    
        const replyid = c.req.param("replyid");
        
        const replyCheck = await prisma.repliesOnComments.findUnique({where : {id : replyid}})
        if (!replyCheck) {
            return c.json({
                message : "No Reply found"
            })
        }
        const likesOnReply = replyCheck!.likes
        
        for (let i = 0; i < likesOnReply.length; i++) {
            if (likesOnReply[i] === userId) {
                await prisma.repliesOnComments.update({
                    where : {id : replyid}, 
                    data : { likes : likesOnReply.filter((likeId) => likeId !== userId)}
                })
                return c.json({
                    mssage : "dis-liked"
                })
            }
        }

        const comment = await prisma.repliesOnComments.update({where : {id : replyid}, data : {likes : {push : userId}}});

        if (comment) {
            return c.json({
                message : "Liked the Reply"
            })
        }else{
            return c.json({
                message : "Something went wrong!!"
            })
        }
    } catch (error) {
        console.error("ERROR LIKING THE Reply", error)
        return c.json({
            error : "ERROR LIKING THE Reply"
        });
    }
    

})

export default commentReply;