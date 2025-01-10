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
  const [_isPostPublished, setIsPostPublished] = useState(false);
  const [_errorMessage, setErrorMessage] = useState("");

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

  let contentTextArray = blocks.filter(block => block.type === 'text' && block.content !== "");
  let contentImageArray = blocks.filter(block => block.type === 'image' && block.content !== "");
  let contentLinkArray = blocks.filter(block => block.type === 'link' && block.content !== "");
  let contentCodeArray = blocks.filter(block => block.type === 'code' && block.content !== "");

  const [imageTempLink, setImageTempLink] = useState<string>("");
  const [errorBlob, setErrorBlob] = useState<string>("");

  const onPostPublish = useCallback(async () => {
    try {
          
      const uploadImage = async (imageBlob: Blob) => {
        try {
            // Convert blob to base64
            const base64 = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(imageBlob);
            });
    
            // Remove the data:image/xxx;base64, prefix
            const base64String = (base64 as string).split(',')[1];
    
            const response = await axios.post(
                "https://my-app.ayushthestar8679.workers.dev/api/v1/user/uploadimage/", 
                { image: base64String },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            
            return response.data.imageUrl;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    }
      for (let imageTempLinkBlock of contentImageArray) {
        try {
            const response = await fetch(imageTempLinkBlock.content);
            const blob = await response.blob();
            console.log('Blob:', blob);
            
            const imageUrl = await uploadImage(blob);
            setImageTempLink(imageUrl);
            console.log(imageUrl)
            imageTempLinkBlock.content = imageUrl;
        } catch (error) {
            console.error('Error fetching Blob:', error);
            setErrorBlob("Something went wrong at publishing the blog 02");
            throw error;
        }
    }

        const postPublishReq = await axios.post("https://my-app.ayushthestar8679.workers.dev/api/v1/user/blog/", {
              title: title,
              postContent :{
                contentText: contentTextArray,
                contentImage: contentImageArray,
                contentLink: contentLinkArray,
                codeBlock: contentCodeArray
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
          throw error;
        }        
        }catch (error) {
      throw error;
    }
  }, [blocks, imageTempLink, errorBlob])

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

