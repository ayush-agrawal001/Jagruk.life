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

app.use("/api/v1/user/blog/", (c, next) => authMiddleware(c, next));
app.use("/api/v1/user/update/", (c, next) => authMiddleware(c, next));

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/api/v1/user/', signup);
app.route('/api/v1/user/', signin);
app.route('/api/v1/user/blog/', blog);
app.route('/api/v1/user/blog/', commentRoute);
app.route("/api/v1/user/update/", updateUser)

export default app
