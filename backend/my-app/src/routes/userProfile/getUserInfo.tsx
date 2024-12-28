import { Hono } from "hono";
import { createPrismaClient } from "../..";

const getUserInfo = new Hono();

getUserInfo.get("/:userId", async (c) => {
    try {
    const prisma = createPrismaClient(c);
    const userId = c.req.param('userId');

    const user = await prisma.users.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
            bio: true,
            username: true,
            createdAt: true,
        },
    });

    return c.json(user);
    } catch (error : any) {
        console.error(error);
        c.status(500);
        return c.json({
            error : "Something went wrong please try again later"
        });
    }
});

export default getUserInfo;