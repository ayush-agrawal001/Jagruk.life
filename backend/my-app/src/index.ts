
import { Context, Hono } from 'hono'
import signup from './routes/userProfile/signup'
import signin from './routes/userProfile/signin'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { env } from 'hono/adapter'
import { authMiddleware } from './middlewares/auth'
import commentRoute from './routes/blog/comment'
import blog from './routes/blog/blog'
import updateUser from './routes/userProfile/updateUserProfile'
import commentReply from './routes/blog/commentReply'
import likeBlog from './routes/blog/likeBlog'
import followUser from './routes/userProfile/followUser'
import { cors } from 'hono/cors'
import { profilePic } from './routes/userProfile/addProfilePic'
import getUserInfo from './routes/userProfile/getUserInfo'

const app = new Hono<{Bindings : {
  DATABASE_URL : string,
  JWT : string,
  Variables : {
    userId : string
  }
},}>();

export function createPrismaClient(c : Context) {
  const DATABASE_URL = c.env.DATABASE_URL;
  return new PrismaClient({
    datasourceUrl: DATABASE_URL,
  }).$extends(withAccelerate());
}
app.use(cors(
  {
    origin : "http://localhost:5173",
    allowMethods : ["GET","POST","PUT","DELETE"],
    allowHeaders : ["Content-Type","Authorization"]
  }
));
app.use("/api/v1/user/blog/*", (c, next) => authMiddleware(c, next));
app.use("/api/v1/user/update/*", (c, next) => authMiddleware(c, next));
app.use("/api/v1/user/:id/follow", (c, next) => authMiddleware(c, next));

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/api/v1/user/', signup);
app.route('/api/v1/user/', signin);
app.route('/api/v1/user/', followUser);
app.route('/api/v1/user/blog/', blog);
app.route('/api/v1/user/blog/', commentRoute);
app.route('/api/v1/user/blog/', commentReply);
app.route('/api/v1/user/blog/', likeBlog);
app.route("/api/v1/user/update/", updateUser);
app.route("/api/v1/user/update/", profilePic);
app.route("/api/v1/user/getinfo/", getUserInfo);

export default app
