// import { Card } from "./ui/card";
// import { CodeBlock01 } from "./ui/code-block";

// import { CodeBlock } from "./ui/code-block";
import React from 'react'

interface CodeBlock01Props {
  content: string;
}

export function CodeBlock01({ content }: CodeBlock01Props) {
  return (
    <div className="max-w-3xl mx-auto w-full">
    <CodeBlock
        code={content}
        language="javascript"
      />
  </div>
  );
}

interface CodeBlockProps {
  code: string
  language: string
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  return (
    <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-auto">
      <code className={`language-${language}`}>
        {code}
      </code>
    </pre>
  )
}

export default CodeBlock

