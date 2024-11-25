import { Context, Hono } from 'hono'
import signup from './routes/signup'
import signin from './routes/signin'
import blog from './routes/blog'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { env } from 'hono/adapter'
import { authMiddleware } from './middlewares/auth'

const app = new Hono();

export function createPrismaClient(c : Context) {
  const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c);
  return new PrismaClient({
    datasourceUrl: DATABASE_URL,
  }).$extends(withAccelerate());
}

app.use("/api/v1/user/blog/", (c, next) => authMiddleware(c, next));

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/api/v1/user/', signup);
app.route('/api/v1/user/', signin);
app.route('/api/v1/user/blog/', blog);

  

export default app
