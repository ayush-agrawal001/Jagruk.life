import { Hono } from "hono";
import { createBlogField, updateBlogField } from "@ayush8679/common";
import { createPrismaClient } from "../..";

const blog = new Hono();

interface PostContent {
    postId : string;
    content : string;
    position : number;
}

interface PostContentImage {
    postId : string;
    images : string;
    position : number;
}

interface PostContentLink {
    postId : string;
    link : string;
    position : number;
}

interface PostContentCode {
    postId : string;
    code : string;
    position : number;
}

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
        const post = await prisma.posts.create({
            data : {
                title : usersInput.title,
                authorId : userId,
            }
        })

        const postContentTextData = usersInput.postContent?.contentText;
        const postContentImageData = usersInput.postContent?.contentImage;
        const postContentLinkData = usersInput.postContent?.contentLink;
        const postContentCodeData = usersInput.postContent?.codeBlock;

        const postContentData : PostContent[] = [];
        const postImageData : PostContentImage[] = [];
        const postLinkData : PostContentLink[] = [];
        const postCodeData : PostContentCode[] = [];

        for (let postContent of postContentTextData!){ 
            postContentData.push({postId : post.id, content : String(postContent.content), position : postContent.position!})
        }
        for (let postContent of postContentImageData!){ 
            postImageData.push({postId : post.id, images : String(postContent.content), position : postContent.position!})
        }
        for (let postContent of postContentLinkData!){ 
            postLinkData.push({postId : post.id, link : String(postContent.content), position : postContent.position!})
        }
        for (let postContent of postContentCodeData!){ 
            postCodeData.push({postId : post.id, code : String(postContent.content), position : postContent.position!})
        }


        try {
            const postContent = await prisma.postsContent.createMany({
                data : [
                    ...(postContentData ? postContentData : []),
                    ...(postImageData ? postImageData : []),
                    ...(postLinkData ? postLinkData : []),
                    ...(postCodeData ? postCodeData : [])
                ]
            })
        } catch (error) {
            console.log(error);
            return c.json({
                message : "Error creating Post Content"
            })
        }

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
                // content : usersInput.content && usersInput.content,
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

blog.get("/:userId/posts", async (c) => {
    try {
        const userId = c.req.param("userId");
        const prisma = createPrismaClient(c);
        const post = await prisma.posts.findMany({
            where : {
                authorId : userId
            }
        })
        return c.json({posts : post, count : post.length}); 
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