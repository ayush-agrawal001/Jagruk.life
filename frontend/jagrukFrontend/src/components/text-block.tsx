interface TextBlockProps {
  content: string;
}

export function TextBlock({ content }: TextBlockProps) {
  return (
    <div className="prose font-serif text-xl prose-lg max-w-none">
      <p className="whitespace-pre-wrap">{content}</p>
    </div>
  );
}

