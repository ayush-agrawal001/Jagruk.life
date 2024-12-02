import { Hono } from "hono";
import { createPrismaClient } from "../..";
import { updateUserFields } from "@ayush8679/common";
import { Buffer } from "buffer";

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
                error : "Parsing data",
                message : parsedData.error.issues[0].message
            })
        }

        const userFields = parsedData.data;
        
        if (userFields.password && userFields.oldPassword) {
            c.status(404)
            return c.json({
                message : "Invalid route to change your password. Please check the URL and try again"
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
        console.log(jwtPayload)
        if (error.code === "P2002") {
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

updateUser.patch("/username", async (c) => {
    try {
        const prisma = createPrismaClient(c);
        const body = await c.req.json(); 
        const jwtPayload = c.get("jwtPayload");
        const userId = jwtPayload.userId;
        const parsedData = updateUserFields.safeParse(body);
        
        if (!parsedData.success) {
            return c.json({
                message : parsedData.error.issues[0].message
            })
        }

        const user = await prisma.users.update({where : {id : userId}, data : {username : parsedData.data.userName}})

        return c.json({
            message : "Updated successfully"
        })

    } catch (error : any) {
        console.error("Error updating username", error);
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
        return c.json({
            error : "Something went wrong while updating the userName please try again later"
        })
    } 
})

updateUser.patch("/password", async (c) => {
    try {
        const prisma = createPrismaClient(c);
        const body = await c.req.json();
        const jwtPayload = c.get("jwtPayload");
        const userId = jwtPayload.userId;
    
        const parsedData = updateUserFields.safeParse(body);
        if (!parsedData.success) {
            return c.json({
                message : parsedData.error.issues[0].message
            })
        }
        
        const oldPasswordTextEncode = new TextEncoder().encode(parsedData.data.oldPassword);
        const hasholdPass = await crypto.subtle.digest({
            name : "SHA-256"
        }, oldPasswordTextEncode);
        const hashOldPassBase64 = Buffer.from(hasholdPass).toString("base64")

        const user = await prisma.users.findUnique({where : {id : userId}})
        
        if (user?.password !== hashOldPassBase64) {
            return c.json({
                message : "Please enter a valid Password"
            })
        }
        
        const newPasswordTextEncode = new TextEncoder().encode(parsedData.data.password);
        const hashPass = await crypto.subtle.digest({
            name : "SHA-256"
        }, newPasswordTextEncode);
        const hashPassBase64 = Buffer.from(hashPass).toString("base64")
        
        const updatingUser = await prisma.users.update({ where : {id : user.id}, data : {password : hashPassBase64} })

        if (updatingUser) {
            return c.json({
                message : "Updated Password successfully"
            })
        }else{
            return c.json({
                messsge : "Something went wrong!!"
            })
        }

    } catch (error : any) {
        console.error("Error while changing password : ", error)
        return c.json({
            message : "Error while changing password"
        })
    }

    
})

export default updateUser;