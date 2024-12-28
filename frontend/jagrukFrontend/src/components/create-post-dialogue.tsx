import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface CreatePostDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onPost: (content: string) => void
}

export function CreatePostDialog({
  open,
  onOpenChange,
  onPost,
}: CreatePostDialogProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const content = formData.get("content") as string
    onPost(content)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create post</DialogTitle>
          <DialogDescription>
            Share your thoughts with your followers.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="What's on your mind?"
                className="min-h-[150px]"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Post</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

