import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

interface Post {
  id: string
  content: string
  title : string
  createdAt: string
}

export function PostCard({ post }: { post: Post }) {
  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold">{post.title}</span>
              <span className="text-sm text-muted-foreground">·</span>
              <span className="text-sm text-muted-foreground">
                {new Date(post.createdAt).toDateString()}
              </span>
            </div>
            <p className="mt-2">{post.content}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

