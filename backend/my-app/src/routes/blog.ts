import { Hono } from "hono";
import { createPrismaClient } from "..";
import { z } from "zod";
import { createBlogField } from "@ayush8679/common";

const blog = new Hono();

blog.post('/', async (c) => {
    try {
        const prisma = createPrismaClient(c);
        const jwtPayload = c.get("jwtPayload");
        const userId = jwtPayload.userId
    
        const req = c.req;
        const body = await req.json();

        const userField = z.object({
            title : z.string().min(3).max(50),
            content : z.string().min(3).max(1000)
        })
        const parsedData = userField.safeParse(body);

        if (!parsedData.success) {
            return c.json({
                message : parsedData.error.issues[0].message
            })
        }
        const usersInput = parsedData.data
        const user = await prisma.posts.create({
            data : {
                title : usersInput.title,
                content : usersInput.content,
                authorId : userId
            }
        })

        return c.text("Added your blog");
    } catch (error) {
        console.log(error);
        return c.json({
            message : "Error creating Blog"
        })
    }
})

blog.patch("/", async (c) => {
    try {
        const prisma = createPrismaClient(c);
        const req = c.req;
        const body = await req.json();
        const jwtPayload = await c.get("jwtPayload");
        const userId = jwtPayload.userId

        const parsedData = createBlogField.safeParse(body);
        
        if (!parsedData.success) {
            return c.json({
                message : parsedData.error.issues[0].message
            })
        }
        
        const usersInput = parsedData.data;

        const post = await prisma.posts.update({
            where : { id : usersInput.postId },
            data : {
                title : usersInput.title && usersInput.title,
                content : usersInput.content && usersInput.content,
             }
        })
        
        if (post.id) {
            return c.json({
                message : "Updated blog succesfully"
            })
        }

    } catch (error) {
        console.log(error);
        return c.json({
            message : "Error updating message"
        })
    }
})

blog.get('/id/:id', async (c) => {
    try {
        console.log("Single blog")
        const id = c.req.param("id");
        const prisma = createPrismaClient(c);

        const post = await prisma.posts.findUnique({
            where : {id : parseInt(id)}
        })
        return c.json(post);
    } catch (error) {
        console.log(error);
        return c.json({
            error : "Something went wrong at getting the blog post"
        })
    }
})

blog.get('/bulk', async (c) => {
    try {
        console.log("bulk blog")
        const prisma = createPrismaClient(c);
        const post = await prisma.posts.findMany();;
        return c.json(post);
    } catch (error) {
        console.log(error);
        return c.json({
            error : "Something went wrong at getting the bulk blog post"
        })
    }
})

export default blog;