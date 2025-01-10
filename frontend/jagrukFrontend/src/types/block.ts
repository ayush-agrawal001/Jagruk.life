export type BlockType = 'text' | 'image' | 'code' | 'link' | 'Title';

export interface Block {
  id: string;
  type: BlockType;
  content: string;
  position: number;
}
