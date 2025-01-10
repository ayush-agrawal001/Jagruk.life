import { Card, CardContent } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"

interface Post {
  id: string
  content: string
  title : string
  createdAt: string
}

export function PostCard({ post }: { post: Post }) {
  const navigate = useNavigate();

  return (
    <Card className="mb-4 hover:cursor-pointer" onClick={() => navigate(`/blog/${post.id}`)}>
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
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

