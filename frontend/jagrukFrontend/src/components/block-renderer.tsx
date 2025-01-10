import { Block } from "../types/block"
import { TextBlock } from "./text-block"
import { ImageBlock } from "./image-block"
import { CodeBlock01 } from "./code-block"
import { LinkBlock } from "./link-block"

interface BlockRendererProps {
  block: Block;
}

export function BlockRenderer({ block }: BlockRendererProps) {
  switch (block.type) {
    case 'Title':
      return (
        <div>
          <h1 className="text-4xl font-serif flex font-bold tracking-tight">{block.content}</h1>
          <div className="h-[1px] w-full bg-gray-200 mt-4"></div>
        </div>
    );
    case 'text':
      return <TextBlock content={block.content} />;
    case 'image':
      return <ImageBlock content={block.content} />;
    case 'code':
      return <CodeBlock01 content={block.content} />;
    case 'link':
      return <LinkBlock content={block.content} />;
    default:
      return null;
  }
}

