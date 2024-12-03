import { Hono } from "hono";
import { createPrismaClient } from "../..";

const followUser = new Hono();

followUser.post("/:id/follow", async (c) => {
    try {
        const prisma = createPrismaClient(c);
        const jwtPayload = c.get("jwtPayload");
        const followedById = jwtPayload.userId;
        const userIdToFollow = c.req.param("id");
        
        if (followedById === userIdToFollow) {
            return c.json({
                message: "You can't follow yourself",
            });
        }

        const followCheck = await prisma.followRelationShip.findFirst({
            where: {
                followedBy_id: followedById,
                followedTo_id: userIdToFollow,
            },
        });

        if (followCheck) {
            if (followCheck.followedBy_id === followedById) {
                await prisma.followRelationShip.delete({
                    where: {
                        id: followCheck.id,
                        followedBy_id: followedById,
                        followedTo_id: userIdToFollow,
                    },
                });
                return c.json({
                    message: "User unfollowed successfully",
                });
            }
        }
    
        await prisma.followRelationShip.create({
            data: {
                followedBy_id: followedById,
                followedTo_id: userIdToFollow,
            },
        });

        return c.json({
            message: "User followed successfully",
        });
    } catch (error) {
        console.error("Error while following the user", error);
        return c.json({
            message: "Error while following the user",
        });
    }
})

export default followUser;