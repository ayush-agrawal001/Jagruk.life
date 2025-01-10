import { Card, CardContent } from "@/components/ui/card"

interface LinkBlockProps {
  content: string;
}

export function LinkBlock({ content }: LinkBlockProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <iframe
          src={content}
          className="w-full aspect-video rounded-lg"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </CardContent>
    </Card>
  );
}

