import { Hono } from "hono";
import { createPrismaClient } from "../..";

export const profilePic = new Hono();

profilePic.post("/profilepic", async (c) => {
    try {
        const prisma = createPrismaClient(c);
        const body = await c.req.json();
        const jwtPayload = await c.get("jwtPayload");
        const userId = jwtPayload.userId;
        
        const user = await prisma.users.findFirst({where : {id : userId}})
    
        const userSocialMedia = user?.socialMedia;
    
        userSocialMedia![0] = body.profilePic; 
    
        const updatedUser = await prisma.users.update({
            where : {id : userId},
            data : {
                socialMedia : userSocialMedia
            }
        })
        if (updatedUser) {
            return c.json({
                message : "Profile pic updated successfully"
            })
        }
        return c.json({
            message : "Something went wrong"
        })
    } catch (error) {
        console.error("Error updating profile pic", error);
        return c.json({
            error : "Error updating profile pic please try again later"
        })
    }
});

profilePic.get("/getprofileinfo", async (c) => {
    try {
        const prisma = createPrismaClient(c);
        const jwtPayload = await c.get("jwtPayload");
        const userId = jwtPayload.userId;
        
        const user = await prisma.users.findFirst({where : {id : userId}})
    
        const fallbackText = (user!?.firstname[0] + user!?.lastname[0]) || "AA";

        return c.json({
            profilePic : user?.socialMedia[0] || "",
            fallbackText : fallbackText
        })
    } catch (error) {
        console.error("Error getting profile info", error);
        return c.json({
            error : "Error getting profile info please try again later"
        })
    }
});
