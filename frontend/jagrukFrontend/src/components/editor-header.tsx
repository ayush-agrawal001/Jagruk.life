import { Button } from "@/components/ui/button"
import { BellIcon, MoreHorizontal } from 'lucide-react'

export function EditorHeader() {
  return (
    <header className="flex items-center justify-between border-b p-4">
      <div className="flex items-center gap-4 justify-center">
          <a href="/" className="flex items-center space-x-2 ml-44">
          <span className="text-xl font-serif text-primary">Jagruk.life</span>
        </a>
      </div>
      <div className="mr-44 flex items-center gap-2">
        <Button variant="ghost" size="icon" className="rounded-full">
          <BellIcon className="w-4 h-4" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <MoreHorizontal className="w-4 h-4" />
          <span className="sr-only">More options</span>
        </Button>
        <Button className="rounded-full bg-green-600 hover:bg-green-700">
          Publish
        </Button>
      </div>
    </header>
  )
}

