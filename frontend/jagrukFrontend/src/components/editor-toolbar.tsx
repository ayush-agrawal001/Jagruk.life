import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ImageIcon, Users, Code2, Link2, Quote, MoreHorizontal, Plus } from 'lucide-react'
import { cn } from "@/lib/utils"
import { useRecoilState } from "recoil";
import { fileAtom } from "@/atoms";
import axios from "axios";

interface EditorToolbarProps {
  onInsertCodeBlock: () => void;
  onInsertImage : () => void;
}

export function EditorToolbar({ onInsertCodeBlock, onInsertImage }: EditorToolbarProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [asdasd, setFile] = useRecoilState(fileAtom)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const formData = new FormData();

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('File selected:', await file.arrayBuffer())

      await new Promise(resolve => setTimeout(resolve, 1000));
      formData.append('file', file.arrayBuffer() as any);
      // console.log(formData)
      const blobImage = await file.arrayBuffer();
      const blob = new Blob([blobImage], { type: file.type });
      const cachedUrl = URL.createObjectURL(blob);
      setFile(cachedUrl.split("b:")[1]);
      // console.log(cachedUrl.split("b:")[1])
      onInsertImage();
      console.log(asdasd)
    }
  }

  const triggerImageUpload = () => {
    fileInputRef.current?.click()
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
        <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
          <Users className="w-4 h-4" />
          <span className="sr-only">Mention someone</span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full w-8 h-8" onClick={onInsertCodeBlock}>
          <Code2 className="w-4 h-4" />
          <span className="sr-only">Add code</span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
          <Link2 className="w-4 h-4" />
          <span className="sr-only">Add link</span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
          <Quote className="w-4 h-4" />
          <span className="sr-only">Add quote</span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
          <MoreHorizontal className="w-4 h-4" />
          <span className="sr-only">More options</span>
        </Button>
      </div>
    </div>
  )
}

