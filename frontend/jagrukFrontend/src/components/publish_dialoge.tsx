import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, AlertTriangle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface EditorHeaderProps {
    handlePostPublish: () => Promise<void>;
}
  
export default function PublishDialog({ handlePostPublish } : EditorHeaderProps) {
    const [open, setOpen] = useState(false)
    const [isPublishing, setIsPublishing] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const { toast } = useToast();

    const handlePublish = async () => {
        setIsPublishing(true)
        setError(null)

        try {
            await handlePostPublish();
            setOpen(false)
            toast({
                title: 'Blog post published',
                description: 'Your blog post has been published successfully.',
            })
        } catch (err) {
            setError('Failed to publish blog. Please try again later.')
            toast({
                title : "Failed to publish blog",
                description: "Something went wrong at publishing the blog",
            })
        } finally {
            setIsPublishing(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="rounded-full bg-green-600 hover:bg-green-700 text-white hover:text-white font-serif">
                    Publish
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] font-serif">
                <DialogHeader>
                    <DialogTitle>Publish Blog Post</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to publish your blog post? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Warning</AlertTitle>
                        <AlertDescription>
                            Publishing will make your blog post visible to the public.
                        </AlertDescription>
                    </Alert>
                </div>
                {error && (
                    <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)} disabled={isPublishing}>
                        Cancel
                    </Button>
                    <Button onClick={handlePublish} disabled={isPublishing}>
                        {isPublishing ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Publishing...
                            </>
                        ) : (
                            'Publish'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

