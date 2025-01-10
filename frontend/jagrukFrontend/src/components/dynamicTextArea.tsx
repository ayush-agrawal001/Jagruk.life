import React, { useRef, useEffect, ChangeEvent, useState } from 'react'

interface DynamicTextareaProps {
  minHeight?: number,
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void,
  content? : string 
}

const DynamicTextarea: React.FC<DynamicTextareaProps> = ({minHeight = 50, onChange, content}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [renderTrigger, setRenderTrigger] = useState(0)

  const adjustHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${Math.max(textarea.scrollHeight, minHeight)}px`
    }
  }


  useEffect(() => {
    adjustHeight()
  }, [renderTrigger])

  return (
    <textarea
      ref={textareaRef}
      className={`w-full text-lg outline-none resize-none bg-transparent placeholder:text-muted-foreground font-mono`}
      style={{ minHeight: `${minHeight}px` }}
      placeholder={"Tell your story..."}
      onChange={(e) => {
          setRenderTrigger(renderTrigger + 1)
          onChange?.(e)
      }}
      value={content}
    />
  )
}

export default DynamicTextarea

