import { useState } from 'react'
// import { v4 as uuidv4 } from 'uuid'
import { Card } from "@/components/ui/card"
import { BlockRenderer } from '@/components/block-renderer'
import type { Block } from '@/types/block'

export default function Page() {
  const [blocks, _setBlocks] = useState<Block[]>([
    // { 
    //   id: uuidv4(), 
    //   type: 'text', 
    //   content: 'Welcome to our blog post! This is an example of a text block.', 
    //   position: 0 
    // },
    // { 
    //   id: uuidv4(), 
    //   type: 'image', 
    //   content: 'https://picsum.photos/800/400', 
    //   position: 1 
    // },
    // { 
    //   id: uuidv4(), 
    //   type: 'code', 
    //   content: 'console.log("Hello, World!");', 
    //   position: 2 
    // },
    // { 
    //   id: uuidv4(), 
    //   type: 'link', 
    //   content: 'https://www.youtube.com/embed/dQw4w9WgXcQ', 
    //   position: 3 
    // },
    // { 
    //   id: uuidv4(), 
    //   type: 'text', 
    //   content: 'This is another text block to demonstrate multiple blocks of the same type.', 
    //   position: 4 
    // }
  ]);

  // Sort blocks by position
  const sortedBlocks = [...blocks].sort((a, b) => a.position - b.position);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="p-6 space-y-6">
        {sortedBlocks.map((block) => (
          <div key={block.id}>
            <BlockRenderer block={block} />
          </div>
        ))}
      </Card>
    </div>
  );
}

