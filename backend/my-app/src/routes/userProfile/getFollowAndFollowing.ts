import { Hono } from "hono";
import { createPrismaClient } from "../..";

const getFollowersAndFollowing = new Hono();

getFollowersAndFollowing.get("/:id/followers", async (c) => {
    try {
        const prisma = createPrismaClient(c);
        const jwtPayload = c.get("jwtPayload");
        const userId = c.req.param("id");
        const followers = await prisma.followRelationShip.findMany({
            where: {
                followedTo_id: userId,
            },
            select: {
                followedBy_id: true,
            },
        });

        return c.json({
            followers: followers.map((follower) => follower.followedBy_id),
            count : followers.length,
        });
    } catch (error) {
        console.error("Error while getting followers", error);
        return c.json({
            message: "Error while getting followers",
        });
    }
});

getFollowersAndFollowing.get("/:id/following", async (c) => {
    try {
        const prisma = createPrismaClient(c);
        const jwtPayload = c.get("jwtPayload");
        const userId = c.req.param("id");
        const following = await prisma.followRelationShip.findMany({
            where: {
                followedBy_id: userId,
            },
            select: {
                followedTo_id: true,
            },
        });

        return c.json({
            following: following.map((following) => following.followedTo_id),
            count : following.length,
        });
    } catch (error) {
        console.error("Error while getting following", error);
        return c.json({
            message: "Error while getting following",
        });
    }
});

export default getFollowersAndFollowing;