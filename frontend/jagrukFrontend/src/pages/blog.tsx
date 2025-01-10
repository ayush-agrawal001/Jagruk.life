import { useEffect, useState } from 'react'
// import { v4 as uuidv4 } from 'uuid'
import { Card } from "@/components/ui/card"
import { BlockRenderer } from '@/components/block-renderer'
import type { Block } from '../../types/block'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Header } from '@/components/header'
import { PropagateLoader } from 'react-spinners'

export default function Page() {
    const id = useParams().id;
    const [loading, setLoading] = useState(true);
    const [blocks, setBlocks] = useState<Block[]>([
    // { 
    //   id: uuidv4(),
    //   type: 'Title', 
    //   content: 'Welcome to our blog post! This is an example of a text block.', 
    //   position: -1
    // },
    // { 
    //   id: uuidv4(),
    //   type: 'text', 
    //   content: 'Welcome to our blog post! This is an example of a text block.', 
    //   position: 0 
    // },
    // { 
    //   id: uuidv4(), 
    //   type: 'image', 
    //   content: 'https://picsum.photos/800/400', 
    //   position: 1 
    // },
    // { 
    //   id: uuidv4(), 
    //   type: 'code', 
    //   content: 'console.log("Hello, World!");', 
    //   position: 2 
    // },
    // { 
    //   id: uuidv4(), 
    //   type: 'link', 
    //   content: 'https://www.youtube.com/embed/Qg9LxRHLbAk', 
    //   position: 3 
    // },
    // { 
    //   id: uuidv4(), 
    //   type: 'text', 
    //   content: 'This is another text block to demonstrate multiple blocks of the same type.', 
    //   position: 4 
    // }
  ]);

  const getBlog = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8787/api/v1/user/blog/id/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setBlocks(response.data);
      console.log(blocks);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  }

  useEffect(() => {
    getBlog();
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    }, []);

  // Sort blocks by position
  const sortedBlocks = [...blocks].sort((a, b) => a.position - b.position);

  return (
    <div>
        <Header showSearch={false}></Header>
    {!loading ? <div>
        <div className="max-w-4xl mx-auto p-6">
        <Card className="p-6 space-y-6">
            {sortedBlocks.map((block) => (
            <div key={block.id}>
                <BlockRenderer block={block} />
            </div>
            ))}
        </Card>
        </div>
    </div> : <div className='w-[98vw] h-[98vh] flex justify-center items-center'><PropagateLoader /></div>}
    </div>
  );
}

