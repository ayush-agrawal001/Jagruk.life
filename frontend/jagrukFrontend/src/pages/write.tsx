import { useState } from "react";
import { useRecoilValue } from "recoil";
import { v4 as uuidv4 } from "uuid";
import { fileAtom } from "@/atoms";
import { EditorHeader } from "../components/editor-header";
import { EditorToolbar } from "../components/editor-toolbar";

type BlockType = 'text' | 'image';

interface Block {
  id: string;
  type: BlockType;
  content: string;
}

export default function BlogEditor() {
  const [title, setTitle] = useState("");
  const [blocks, setBlocks] = useState<Block[]>([
    { id: uuidv4(), type: 'text', content: '' }
  ]);
  const imageUrl = useRecoilValue(fileAtom);

  const handleBlockChange = (id: string, content: string) => {
    setBlocks(blocks.map(block => 
      block.id === id ? { ...block, content } : block
    ));
  };

  const handleInsertCodeBlock = () => {
    const codeBlock = "\n```\n// Your code here\n```\n"
    setBlocks(prev => [
      ...prev,
      { id: uuidv4(), type: 'text', content: codeBlock },
      { id: uuidv4(), type: 'text', content: '' }
    ]);
  }

  const insertImageBlock = () => {
    console.log(imageUrl)
    if (!imageUrl || typeof imageUrl !== 'string') return;
    setBlocks(prev => [
      ...prev,
      { id: uuidv4(), type: 'image', content: imageUrl as string },
      { id: uuidv4(), type: 'text', content: '' }
    ]);
  };

  return (
    <div className="min-h-screen bg-background">
      <EditorHeader />
      <main className="container max-w-3xl mx-auto px-4 py-6">
        <div className="space-y-6">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full text-4xl font-serif outline-none bg-transparent placeholder:text-muted-foreground"
          />
          <EditorToolbar onInsertImage={insertImageBlock} onInsertCodeBlock={handleInsertCodeBlock} />
          
          <div className="space-y-4">
            {blocks.map(block => (
              <div key={block.id}>
                {block.type === 'text' ? (
                  <textarea
                    value={block.content}
                    onChange={(e) => handleBlockChange(block.id, e.target.value)}
                    placeholder="Tell your story..."
                    className="w-full min-h-[100px] text-lg outline-none bg-transparent placeholder:text-muted-foreground resize-none font-mono"
                  />
                ) : (
                  <img 
                    src={block.content} 
                    alt="Blog content"
                    className="w-full rounded-lg"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
