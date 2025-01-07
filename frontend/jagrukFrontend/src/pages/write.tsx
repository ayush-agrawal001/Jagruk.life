import { useCallback, useState } from "react";
import { useRecoilValue } from "recoil";
import { v4 as uuidv4 } from "uuid";
import { fileAtom } from "@/atoms";
import { EditorHeader } from "../components/editor-header";
import { EditorToolbar } from "../components/editor-toolbar";
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';
// import { CopyBlock, dracula } from "react-code-blocks";
import Editor from "react-simple-code-editor";
import { highlight, languages } from 'prismjs';
import { Link } from "react-router-dom";
import DynamicTextareaProps from "../components/dynamicTextArea";
import axios from "axios";
import PublishDialog from "@/components/publish_dialoge";
import { Toaster } from "@/components/ui/toaster";
import { error } from "console";

type BlockType = 'text' | 'image' | 'code' | 'link';

interface Block {
  id: string;
  position: number;
  type: BlockType;
  content: string;
}

export default function BlogEditor() {
  const [title, setTitle] = useState("");
  const [blocks, setBlocks] = useState<Block[]>([
    { id: uuidv4(), type: 'text', content: '' , position: 0 }
  ]);
  const imageUrl = useRecoilValue(fileAtom);
  const [isPostPublished, setIsPostPublished] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleBlockChange = (id: string, content: string) => {
    setBlocks(blocks.map(block => 
      block.id === id ? { ...block, content } : block
    ));
  };

  const handleInsertCodeBlock = () => {
    const codeBlock = "Your code here"
    setBlocks(prev => [
      ...prev,
      { id: uuidv4(), type: 'code', content: codeBlock, position: prev[prev.length - 1].position + 1 },
      { id: uuidv4(), type: 'text', content: '', position: prev[prev.length - 1].position + 2 }
    ]);
  }

  const insertImageBlock = () => {
    if (!imageUrl || typeof imageUrl !== 'string') return;
    setBlocks(prev => [
      ...prev,
      { id: uuidv4(), type: 'image', content: imageUrl as string , position: prev[prev.length - 1].position + 1 },
      { id: uuidv4(), type: 'text', content: '' , position: prev[prev.length - 1].position + 2 }
    ]);
  };

  const onInsertLink = (content: string) => {
    setBlocks(prev => [
      ...prev,
      { id: uuidv4(), type: 'link', content: content, position: prev[prev.length - 1].position + 1 },
      { id: uuidv4(), type: 'text', content: '' , position: prev[prev.length - 1].position + 2 }
    ]);
  }

  const deleteBlock = (id: string) => {
    setBlocks(blocks.filter(block => block.id !== id));
  };

  const contentTextArray = blocks.filter(block => block.type === 'text' && block.content !== "");
  const contentImageArray = blocks.filter(block => block.type === 'image' && block.content !== "");
  const contentLinkArray = blocks.filter(block => block.type === 'link' && block.content !== "");

  const onPostPublish = useCallback(async () => {
    try {
      const postPublishReq = await axios.post("http://127.0.0.1:8787/api/v1/user/blog/", {
            title: title,
            postContent :{
              contentText: contentTextArray,
              contentImage: contentImageArray,
              contentLink: contentLinkArray
            }
      }, {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          },
      });
      if (postPublishReq.data === "Added your blog") {
        setIsPostPublished(true);
      }else {
        setErrorMessage("Something went wrong at publishing the blog 01");
        console.log(postPublishReq.data);
      }
    } catch (error) {
      throw error;
    }
  }, [blocks])

  return (
    <div className="min-h-screen bg-background">
      <EditorHeader handlePostPublish={onPostPublish} />
      <main className="container max-w-3xl mx-auto px-4 py-6">

        <div className="space-y-6">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full text-4xl font-serif outline-none bg-transparent placeholder:text-muted-foreground"
          />
          <EditorToolbar onInsertImage={insertImageBlock} onInsertCodeBlock={handleInsertCodeBlock} onInsertLink={onInsertLink} />
          <div className="space-y-4">
            {blocks.map(block => (
              <div key={block.id} className="relative group">
                {block.type === 'text' && (
                  <div className="">
                  <DynamicTextareaProps
                    content={block.content}
                    onChange={(e) => handleBlockChange(block.id, e.target.value)}
                  />
                  <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => deleteBlock(block.id)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Delete block</span>
                </Button>
                </div>
                )}
                {block.type === 'code' && (
                  <div className="relative">
                    {/* <textarea
                      value={block.content}
                      onChange={(e) => handleBlockChange(block.id, e.target.value)}
                      className="w-full min-h-[100px] text-sm outline-none bg-muted p-4 rounded-lg font-mono"
                    /> */}
                    <Editor
                      value={block.content}
                      onValueChange={code => handleBlockChange(block.id, code)}
                      highlight={code => highlight(code, languages.js, 'js')}
                      padding={10}
                      style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 20,
                      }}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => deleteBlock(block.id)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Delete block</span>
                    </Button>
                  </div>
                )}
                {block.type === 'image' && (
                  <div className="relative">
                    <img 
                      src={block.content}
                      alt="Blog content"
                      className="w-full rounded-lg"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => deleteBlock(block.id)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Delete block</span>
                    </Button>
                  </div>
                )}
                {
                  block.type === 'link' && (
                    <div className="relative">
                      <a href={block.content} target="_blank" rel="noreferrer">
                          <Link to={block.content} className="text-blue-500 hover:underline"></Link>
                          <span className="text-sm font-semibold hover:underline">{block.content}</span>
                      </a>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => deleteBlock(block.id)}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Delete block</span>
                      </Button>
                    </div>
                  )
                }
              </div>
            ))}
          </div>
        </div>
      </main>
      <Toaster></Toaster>
    </div>
  );
}

