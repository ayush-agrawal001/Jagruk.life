import { Hono } from "hono";
import { createPrismaClient } from "../..";

const likeBlog = new Hono();

likeBlog.get("/:id/like", async (c) => {
    try {
        const prisma = createPrismaClient(c);
        const blogId = c.req.param("id");
        const jwtPayload = c.get("jwtPayload");
        const userId = jwtPayload.userId;
        
        const LikedBlogCheck = await prisma.likesOnPosts.findFirst({
            where: {
                post_id: blogId,
                user_id: String(userId),
            },
        });

        if (LikedBlogCheck) {
            if (LikedBlogCheck.user_id === userId) {
                 await prisma.likesOnPosts.delete({
                    where: {
                        id: LikedBlogCheck.id,
                        post_id: blogId,
                        user_id: userId,
                    },
                });
                return c.json({
                    message: "Blog unliked successfully",
                });
            }
        }

        const likedBlog = await prisma.likesOnPosts.create({
            data: {
                user_id: userId,
                post_id: blogId,
            },
        });

        if (likedBlog) {
            return c.json({
                message: "Blog liked successfully",
            });
        } else {
            return c.json({
                message: "Something went wrong",
            });
        }

    } catch (error) {
        console.error("Error while liking the blog", error);
        return c.json({
            message: "Error while liking the blog",
        });
    }
})

export default likeBlog;