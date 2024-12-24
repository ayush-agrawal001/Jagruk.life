import React, { useState, useRef } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { Plus, GripVertical, Type, ImageIcon, Quote, List } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type BlockType = 'text' | 'image' | 'quote' | 'list'

interface Block {
  id: string
  type: BlockType
  content: string
  position: { x: number; y: number }
}

const BlockTypeIcons: Record<BlockType, React.ReactNode> = {
  text: <Type className="h-4 w-4" />,
  image: <ImageIcon className="h-4 w-4" />,
  quote: <Quote className="h-4 w-4" />,
  list: <List className="h-4 w-4" />,
}

export function WriteEditor() {
  const [heading, setHeading] = useState('')
  const [blocks, setBlocks] = useState<Block[]>([])
  const editorRef = useRef<HTMLDivElement>(null)

  const addBlock = (type: BlockType) => {
    const newBlock: Block = { 
      id: Date.now().toString(), 
      type, 
      content: '',
      position: { x: 0, y: blocks.length * 100 } // Default position
    }
    setBlocks([...blocks, newBlock])
  }

  const updateBlockContent = (id: string, content: string) => {
    setBlocks(blocks.map(block => 
      block.id === id ? { ...block, content } : block
    ))
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination || !editorRef.current) return

    const items = Array.from(blocks)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    
    // Update positions based on new indices
    const updatedItems = items.map((item, index) => ({
      ...item,
      position: { x: 0, y: index * 100 }
    }))
    
    setBlocks(updatedItems)
    
    setBlocks([...items, reorderedItem])
  }

  return (
    <div className="space-y-4">
      <Input
        type="text"
        value={heading}
        onChange={(e) => setHeading(e.target.value)}
        placeholder="Enter your blog title..."
        className="text-2xl font-bold mb-4"
      />
      <div ref={editorRef} className="relative w-full h-[600px] border border-dashed border-primary-foreground/50 rounded-lg overflow-hidden">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="blocks" type="BLOCK">
            {(provided) => (
              <div 
                {...provided.droppableProps} 
                ref={provided.innerRef} 
                className="absolute inset-0"
              >
                {blocks.map((block, index) => (
                  <Draggable key={block.id} draggableId={block.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={{
                          ...provided.draggableProps.style,
                          position: 'absolute',
                          left: `${block.position.x}px`,
                          top: `${block.position.y}px`,
                          width: '300px'
                        }}
                        className="bg-secondary p-4 rounded-md shadow-md"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div {...provided.dragHandleProps}>
                            <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                          </div>
                          <Select
                            value={block.type}
                            onValueChange={(value: BlockType) => {
                              setBlocks(blocks.map(b => 
                                b.id === block.id ? { ...b, type: value, content: '' } : b
                              ))
                            }}
                          >
                            <SelectTrigger className="w-[120px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(BlockTypeIcons).map(([type, icon]) => (
                                <SelectItem key={type} value={type}>
                                  <div className="flex items-center">
                                    {icon}
                                    <span className="ml-2 capitalize">{type}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        {block.type === 'text' && (
                          <Textarea
                            value={block.content}
                            onChange={(e) => updateBlockContent(block.id, e.target.value)}
                            placeholder="Start writing..."
                            className="w-full min-h-[100px]"
                          />
                        )}
                        {block.type === 'image' && (
                          <Input
                            type="text"
                            value={block.content}
                            onChange={(e) => updateBlockContent(block.id, e.target.value)}
                            placeholder="Enter image URL..."
                            className="w-full"
                          />
                        )}
                        {block.type === 'quote' && (
                          <Textarea
                            value={block.content}
                            onChange={(e) => updateBlockContent(block.id, e.target.value)}
                            placeholder="Enter a quote..."
                            className="w-full min-h-[100px]"
                          />
                        )}
                        {block.type === 'list' && (
                          <Textarea
                            value={block.content}
                            onChange={(e) => updateBlockContent(block.id, e.target.value)}
                            placeholder="Enter list items (one per line)..."
                            className="w-full min-h-[100px]"
                          />
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <div className="flex justify-between">
        <div>
          <Button onClick={() => addBlock('text')} variant="outline" className="mr-2">
            <Plus className="h-4 w-4 mr-2" /> Add Text
          </Button>
          <Button onClick={() => addBlock('image')} variant="outline" className="mr-2">
            <Plus className="h-4 w-4 mr-2" /> Add Image
          </Button>
          <Button onClick={() => addBlock('quote')} variant="outline" className="mr-2">
            <Plus className="h-4 w-4 mr-2" /> Add Quote
          </Button>
          <Button onClick={() => addBlock('list')} variant="outline" className="mr-2">
            <Plus className="h-4 w-4 mr-2" /> Add List
          </Button>
        </div>
        <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
          Publish
        </Button>
      </div>
    </div>
  )
}

