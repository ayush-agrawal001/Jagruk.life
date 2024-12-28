import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Post {
  id: string
  content: string
  author: {
    name: string
    handle: string
    avatar?: string
  }
  createdAt: string
}

export function PostCard({ post }: { post: Post }) {
  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src={post.author.avatar} />
            <AvatarFallback>{post.author.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold">{post.author.name}</span>
              <span className="text-sm text-muted-foreground">
                {post.author.handle}
              </span>
              <span className="text-sm text-muted-foreground">·</span>
              <span className="text-sm text-muted-foreground">
                {post.createdAt}
              </span>
            </div>
            <p className="mt-2">{post.content}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

