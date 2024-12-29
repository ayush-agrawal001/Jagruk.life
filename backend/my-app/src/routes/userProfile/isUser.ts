import { Hono } from "hono";

const isUser = new Hono();

isUser.get("/isuser/:id", async (c) => {
    try {
        const id = c.req.param("id");
        const jwtPayload = c.get("jwtPayload");

        if (!jwtPayload || !jwtPayload.userId) {
            return c.json({ isUser: false });
        }

        if (jwtPayload.userId !== id) {
            return c.json({ isUser: false });
        }
        return c.json({ isUser: true });
    } catch (error) {
        return c.json({ isUser: false, error: "Invalid request" });
    }
})

export default isUser;