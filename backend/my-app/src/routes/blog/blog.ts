import { Hono } from "hono";
import { createBlogField, updateBlogField } from "@ayush8679/common";
import { createPrismaClient } from "../..";

const blog = new Hono();

blog.post('/', async (c) => {
    try {
        const prisma = createPrismaClient(c);
        const jwtPayload = c.get("jwtPayload");
        const userId = jwtPayload.userId
    
        const req = c.req;
        const body = await req.json();

        const parsedData = createBlogField.safeParse(body);

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
                authorId : userId,
                images : usersInput.image,
                videos : usersInput.video,
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

        const parsedData = updateBlogField.safeParse(body);
        
        if (!parsedData.success) {
            return c.json({
                message : parsedData.error.issues[0].message
            })
        }
        
        const usersInput = parsedData.data;

        const post = await prisma.posts.update({
            where : { id : String(usersInput.postId) },
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
            where : {id : id}
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