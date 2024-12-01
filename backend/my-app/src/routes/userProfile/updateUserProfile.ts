import { Hono } from "hono";
import { createPrismaClient } from "../..";
import { updateUserFields } from "@ayush8679/common";

const updateUser = new Hono();

updateUser.patch("/commonfields", async (c) => {
    try {
        const prisma = createPrismaClient(c);
        const body = await c.req.json();
        const jwtPayload = await c.get("jwtPayload");
        const userId = jwtPayload.userId;
        
        const parsedData = updateUserFields.safeParse(body);
        
        if (!parsedData.success) {
            return c.json({
                message : parsedData.error.issues[0].message
            })
        }

        const userFields = parsedData.data;
        
        if (userFields.password && userFields.oldPassword) {
            c.status(404)
            return c.json({
                message : "Invalid route. Please check the URL and try again"
            })
        }

        interface Data {
            firstname? : string
            lastname? : string
            email? : string
            bio? : string
            socialMedia? : object
        }
        let data : Data = {};

        userFields.bio && (data.bio = userFields.bio),
        userFields.firstName && (data.firstname = userFields.firstName)
        userFields.lastName && (data.lastname = userFields.lastName)
        userFields.email && (data.email = userFields.email)
        userFields.socialMedia && (data.socialMedia = {push : userFields.socialMedia || ""})

        const user = await prisma.users.update({
            where : {id : userId},
            data : data
        })
        if (user) {
            return c.json({
                message : "Updated successfully"
            })
        }else{
            return c.json({
                message : "Something went wrong"
            })
        }
    } catch (error : any) {
        const jwtPayload = await c.get("jwtPayload");
        console.log()
        if (error.code === "P2002") {
            if (error.meta.target[0] === "username") {
                return c.json({
                    message : "Username already exists"
                })
            }
            if (error.meta.target[0] === "email") {
                return c.json({
                    message : "Email already exists"
                })
            }
        }
        console.error("Error updating user", error)
        return c.json({
            error : 'Error updating user please try again later'
        })
    }
});

export default updateUser;