export function Nav() {
    const topics = [
      "For you",
      "Following",
      "Education",
      "Entrepreneurship",
      "React",
      "UX",
      "Web Dev"
    ]
  
    return (
      <nav className="border-b bg-secondary">
        <div className="container max-w-7xl mx-auto flex h-12 items-center space-x-4 px-4 lg:px-8">
          {topics.map((topic) => (
            <button
              key={topic}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {topic}
            </button>
          ))}
        </div>
      </nav>
    )
  }
  
  