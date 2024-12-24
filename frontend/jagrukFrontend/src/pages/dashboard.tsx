import { useState, useEffect, useCallback } from 'react'
import { Header } from "../components/header"
import { Nav } from "../components/nav"
import { ArticleCard } from "../components/article-card"
import { Sidebar } from "../components/sidebar"

// Function to generate a deterministic random number
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// Function to generate a random article with a seed
const generateRandomArticle = (id: number) => {
  const title = `Article ${id}: ${Lorem.generateSentences(1, id)}`;
  const excerpt = Lorem.generateSentences(2, id + 1000);
  const author = `Author ${id % 10 + 1}`;
  const date = `Dec ${(id % 30) + 1}`;
  const readTime = `${Math.floor(seededRandom(id) * 10) + 3}`;
  const image = `/placeholder.svg?height=200&width=300&text=Image${id}`;

  return { id, title, excerpt, author, date, readTime, image };
};

// Lorem ipsum generator with seed
const Lorem = {
  words: ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua'],
  generateSentences(count: number, seed: number) {
    return Array(count).fill(0).map((_, index) => 
      this.words.sort(() => seededRandom(seed + index) - 0.5).slice(0, 10).join(' ')
    ).join('. ')
  }
};

const INITIAL_ARTICLE_COUNT = 20;
const ARTICLES_PER_LOAD = 5;

export default function Dashboard() {
  const [articles, setArticles] = useState<ReturnType<typeof generateRandomArticle>[]>([]);
  const [displayedArticles, setDisplayedArticles] = useState<ReturnType<typeof generateRandomArticle>[]>([]);
  const [loading, setLoading] = useState(false);

  // Generate initial set of articles
  useEffect(() => {
    const initialArticles = Array(INITIAL_ARTICLE_COUNT).fill(0).map((_, index) => 
      generateRandomArticle(index + 1)
    );
    setArticles(initialArticles);
    setDisplayedArticles(initialArticles.slice(0, ARTICLES_PER_LOAD));
  }, []);

  const loadMoreArticles = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setDisplayedArticles(prevDisplayed => {
        const currentLength = prevDisplayed.length;
        const nextBatch = articles.slice(currentLength % INITIAL_ARTICLE_COUNT, (currentLength % INITIAL_ARTICLE_COUNT) + ARTICLES_PER_LOAD);
        return [...prevDisplayed, ...nextBatch];
      });
      setLoading(false);
    }, 1000);
  }, [articles]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) return;
      loadMoreArticles();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, loadMoreArticles]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* <Nav />
      <div className="container max-w-7xl mx-auto px-4 lg:px-8 py-6">
        <div className="flex gap-6">
          <main className="flex-1">
            <div className="grid gap-8">
              {displayedArticles.map((article, index) => (
                <ArticleCard key={`${article.id}-${index}`} {...article} />
              ))}
            </div>
            {loading && (
              <div className="text-center py-4">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                </div>
              </div>
            )}
          </main>
          <div className='hidden md:hidden lg:block'>
            <Sidebar />
          </div>
        </div>
      </div> */}
    </div>
  )
}

