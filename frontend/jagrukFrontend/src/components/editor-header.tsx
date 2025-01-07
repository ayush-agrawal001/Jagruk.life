import { Button } from "@/components/ui/button"
import PublishDialog from "./publish_dialoge";

interface EditorHeaderProps {
  handlePostPublish: () => Promise<void>;
}

export function EditorHeader({ handlePostPublish }: EditorHeaderProps) {

  return (
    <header className="flex items-center justify-between border-b p-4">
      <div className="flex items-center gap-4 justify-center">
          <a href="/" className="flex items-center space-x-2 ml-44">
          <span className="text-xl font-serif text-primary">Jagruk.life</span>
        </a>
      </div>
      <div className="mr-44 flex items-center gap-2">
        {/* <Button onClick={handlePublish} className="rounded-full bg-green-600 hover:bg-green-700">
          Publish
        </Button> */}
        <PublishDialog handlePostPublish={handlePostPublish}></PublishDialog>
      </div>
    </header>
  )
}

