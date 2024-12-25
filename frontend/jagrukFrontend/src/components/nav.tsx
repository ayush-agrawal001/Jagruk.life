import { topic } from '@/atoms'
import { useRecoilState } from 'recoil'

export function Nav() {
  const [selectedTopic, setSelectedTopic] = useRecoilState(topic)
  
  const topics = [
    "For you",
    "Following"
  ]
  
  return (
    <div className=''>
      <div className="border-b top-0 border-dashed container max-w-7xl mx-auto flex h-12 items-center space-x-4 px-4 lg:px-8">
        {topics.map((topic) => (
        <button
          key={topic}
          onClick={() => setSelectedTopic(topic)}
          className={`text-sm transition-colors ${
          selectedTopic === topic 
            ? "text-primary font-medium" 
            : "text-muted-foreground hover:text-primary"
          }`}
        >
          {topic}
        </button>
        ))}
      </div>
    </div>
  )
  }