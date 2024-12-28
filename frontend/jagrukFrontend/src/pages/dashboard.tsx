import { useState, useEffect } from 'react'
import { Header } from "../components/header"
import { Nav } from "../components/nav"
import { ArticleCard } from "../components/article-card"
import { Sidebar } from "../components/sidebar"
import axios from 'axios'

// Function to generate a deterministic random number
// const seededRandom = (seed: number) => {
//   const x = Math.sin(seed) * 10000;
//   return x - Math.floor(x);
// };

// Function to generate a random article with a seed
// const generateRandomArticle = (id: number) => {
//   const title = `Article ${id}: ${Lorem.generateSentences(1, id)}`;
//   const excerpt = Lorem.generateSentences(2, id + 1000);
//   const author = `Author ${id % 10 + 1}`;
//   const date = `Dec ${(id % 30) + 1}`;
//   const readTime = `${Math.floor(seededRandom(id) * 10) + 3}`;
//   const image = `/placeholder.svg?height=200&width=300&text=Image${id}`;

//   return { id, title, excerpt, author, date, readTime, image };
// };

// // Lorem ipsum generator with seed
// const Lorem = {
//   words: ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua'],
//   generateSentences(count: number, seed: number) {
//     return Array(count).fill(0).map((_, index) => 
//       this.words.sort(() => seededRandom(seed + index) - 0.5).slice(0, 10).join(' ')
//     ).join('. ')
//   }
// };

const ARTICLES_PER_LOAD = 5;

interface Article {
  id: string;
  title: string;
  content: string;
  images: string[]; 
  authorId: string;
  createdAt: string;
  readTime: string;
}

export default function Dashboard() {
  const [displayedArticles, setDisplayedArticles] = useState<Article[]>([]);
  // const [loading, setLoading] = useState(false);

  const getArticles = async () => {
    const response = await axios.get("http://127.0.0.1:8787/api/v1/user/blog/bulk", {
      headers : {
        Authorization : `Bearer ${localStorage.getItem("token")}`
      }
    });
    setDisplayedArticles(response.data.slice(0, ARTICLES_PER_LOAD));
  };
  
  // Generate initial set of articles
  useEffect(() => {
    getArticles();
    console.log("articles reneder");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className='flex w-[84vw] justify-center mx-auto'>
        <div className="container max-w-7xl mx-auto px-4 lg:px-8">
          <Nav /> 
          <div className="flex gap-6 py-6">
            <main className="flex-1">
              <div className="grid gap-8">
                {displayedArticles.map((article, index) => (
                  <ArticleCard id={article.id} key={index} title={article.title} excerpt={article.content} author={article.authorId} _date={article.createdAt} image={article.images[0]} />
                ))}
              </div>
              {/* {loading && (
                <div className="text-center py-4">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                  </div>
                </div>
              )} */}
            </main>

      </div>
        </div>
        <div className='border-black hidden md:hidden lg:block'>
          <Sidebar />
        </div>
      </div>
    </div>
  )
}

