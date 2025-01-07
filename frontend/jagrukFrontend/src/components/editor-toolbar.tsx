import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ImageIcon, Users, Code2, Link2, Quote, MoreHorizontal, Plus } from 'lucide-react'
import { cn } from "@/lib/utils"
import { useRecoilState } from "recoil";
import { fileAtom } from "@/atoms";
import { Input } from "./ui/input";

interface EditorToolbarProps {
  onInsertCodeBlock: () => void;
  onInsertImage : () => void;
  onInsertLink : (content: string) => void;
}

export function EditorToolbar({ onInsertCodeBlock, onInsertImage, onInsertLink }: EditorToolbarProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [fileUrl, setFile] = useRecoilState(fileAtom)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const formData = new FormData();
  const [linkUrl, setLinkUrl] = useState("");

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      formData.append('file', file.arrayBuffer() as any);
      const cachedUrl = URL.createObjectURL(file);
      // const newFileUrl = cachedUrl.split("blob:")[1];
      setFile(cachedUrl);
    }
  }

  useEffect(() => {
    onInsertImage();
    console.log(fileUrl)
  }, [fileUrl])

  const triggerImageUpload = () => {
    fileInputRef.current?.click()
  }

  const handlInsertLink = () => {
    onInsertLink(linkUrl);
  }

  return (
    <div className="relative flex items-center gap-2">
      <Button 
        variant="ghost" 
        size="icon" 
        className="rounded-full w-8 h-8"
        onClick={() => setIsVisible(!isVisible)}
      >
        <Plus className={cn(
          "w-4 h-4 transition-transform duration-200",
          isVisible && "rotate-45"
        )} />
        <span className="sr-only">Toggle toolbar</span>
      </Button>

      <div className={cn(
        "flex items-center gap-1 border rounded-full bg-background p-1 transition-all duration-200",
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"
      )}>
        <Button variant="ghost" size="icon" className="rounded-full w-8 h-8" onClick={triggerImageUpload}>
          <ImageIcon className="w-4 h-4" />
          <span className="sr-only">Add image</span>
        </Button>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleImageUpload} 
          accept="image/*" 
          className="hidden" 
        />
        <Button variant="ghost" size="icon" className="rounded-full w-8 h-8" onClick={onInsertCodeBlock}>
          <Code2 className="w-4 h-4" />
          <span className="sr-only">Add code</span>
        </Button>
        <Button variant="ghost" size="icon" onClick={handlInsertLink} className="rounded-full w-8 h-8">
          <Link2 className="w-4 h-4" />
          <span className="sr-only">Add link</span>
        </Button>
      </div>
      { isVisible && (<Input onChange={(e) => setLinkUrl(e.target.value)} value={linkUrl} placeholder="Enter link here" className="w-full" />)}
    </div>
  )
}

