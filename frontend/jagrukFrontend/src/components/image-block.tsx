// import Image from "next/image"

interface ImageBlockProps {
  content: string; // URL of the image
}

export function ImageBlock({ content }: ImageBlockProps) {
  return (
    <div className="relative w-full aspect-[2/1]">
      <img
        src={content}
        alt="Block image"
        // layout="fill"
        // objectFit="cover"
        className="rounded-lg"
      />
    </div>
  );
}

